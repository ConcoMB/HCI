package com.grupo5.buyStuff.activities;

import java.util.List;

import android.app.ListActivity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.view.KeyEvent;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.inputmethod.InputMethodManager;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.grupo5.buyStuff.model.CacheManager;
import com.grupo5.buyStuff.model.Category;
import com.grupo5.buyStuff.services.ArticleMasterService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;
import com.grupo5.buyStuff.R;

public class ListingCategories extends ListActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		CacheManager catManager = CacheManager.getInstance();
		setListAdapter(new ArrayAdapter<String>(this, R.layout.list_item,
				R.id.listText, catManager.getCategoryNames()));
		setTitle(R.string.categoryTitle);
		ListView listView = getListView();

		CharSequence text = getText(R.string.listHint);
		Toast.makeText(getApplicationContext(), text, Toast.LENGTH_LONG).show();

		listView.setTextFilterEnabled(true);
		Animation animation = AnimationUtils.makeInAnimation(getBaseContext(),
				false);
		animation.setDuration(500);
		listView.setAnimation(animation);
	}

	@Override
	protected void onListItemClick(ListView l, View view, int position, long id) {
		CharSequence text = ((TextView) view.findViewById(R.id.listText))
				.getText();
		Toast.makeText(getApplicationContext(), text, Toast.LENGTH_SHORT)
				.show();
		if (!CacheManager.getInstance().loadedSubcategory(position)) {
			loadSubcategory(position);
		} else {
			startSubcategoriesActivity(position);
		}
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_MENU
				|| keyCode == KeyEvent.KEYCODE_BACK) {
			MyIntent myIntent = new MyIntent(this, Menu.class);
			myIntent.putExtras(getIntent());
			startActivity(myIntent);
			return true;
		}

		if (keyCode == KeyEvent.KEYCODE_SEARCH) {
			((InputMethodManager) this
					.getSystemService(ListActivity.INPUT_METHOD_SERVICE))
					.toggleSoftInput(0, 0);
			return true;
		}

		return super.onKeyDown(keyCode, event);
	}

	private void loadSubcategory(final int catIndex) {
		MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null, this,
				ArticleMasterService.class);
		myIntent.addCommand(ArticleMasterService.InnerServerMessages.LOAD_SUBCATEGORIES);
		int categoryId = CacheManager.getInstance().getCategories()
				.get(catIndex).getId();
		myIntent.addAttribute(BSBundleConstants.SUBCAT_ID.getText(),
				String.valueOf(categoryId));
		myIntent.addReceiver(new MyResultReceiver(new Handler(), catIndex));
		startService(myIntent);
	}

	private void startSubcategoriesActivity(int catIndex) {
		MyIntent myIntent = new MyIntent(ListingCategories.this,
				ListingSubcategories.class);
		myIntent.addAttribute(BSBundleConstants.CAT_POSITION.getText(),
				String.valueOf(catIndex));
		myIntent.addAttribute(BSBundleConstants.PATH.getText(), CacheManager
				.getInstance().getCategories().get(catIndex).getName());
		startActivity(myIntent);
	}

	private class MyResultReceiver extends ResultReceiver {
		private final int catIndex;

		MyResultReceiver(Handler h, int catIndex) {
			super(h);
			this.catIndex = catIndex;
		}

		@SuppressWarnings("unchecked")
		@Override
		protected void onReceiveResult(int resultCode, Bundle resultData) {
			super.onReceiveResult(resultCode, resultData);
			switch (ServerMessages.parse(resultCode)) {
			case STATUS_OK:
				List<Category> subCategories = (List<Category>) resultData
						.getSerializable(BSBundleConstants.SUBCATEGORIES
								.getText());
				CacheManager.getInstance().persistSubcategories(catIndex,
						subCategories);
				startSubcategoriesActivity(catIndex);
				break;
			case STATUS_ERROR:
				CharSequence text = getText(R.string.connectionError);
				Toast.makeText(getApplicationContext(), text,
						Toast.LENGTH_SHORT).show();
				break;
			}
		}
	}
}
