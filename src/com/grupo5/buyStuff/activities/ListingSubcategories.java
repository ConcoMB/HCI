package com.grupo5.buyStuff.activities;

import java.io.Serializable;

import android.app.ListActivity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.text.Html;
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

public class ListingSubcategories extends ListActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		Bundle recdData = getIntent().getExtras();
		int catPosition = Integer.parseInt(recdData.getString(BSBundleConstants.CAT_POSITION.getText()));
		String breadCrumb = recdData.getString(BSBundleConstants.PATH.getText());
		setTitle(Html.fromHtml(breadCrumb + " > "));

		CacheManager catManager = CacheManager.getInstance();
		setListAdapter(new ArrayAdapter<String>(this, R.layout.list_item,R.id.listText, catManager.getSubcategoryNames(catPosition)));

		ListView lv = getListView();
		lv.setTextFilterEnabled(true);

		Animation a = AnimationUtils.makeInAnimation(getBaseContext(), false);
		a.setDuration(500);
		lv.setAnimation(a);
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_MENU) {
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

	@Override
	protected void onListItemClick(ListView l, View view, int position, long id) {
		CharSequence text = ((TextView) view.findViewById(R.id.listText)).getText();
		Toast.makeText(getApplicationContext(), text, Toast.LENGTH_SHORT).show();
		loadProductList(position);
	}

	private void loadProductList(final int subCatIndex) {
		Bundle data = getIntent().getExtras();
		int catIndex = Integer.parseInt(data.getString(BSBundleConstants.CAT_POSITION.getText()));
		MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null, this,ArticleMasterService.class);
		myIntent.addCommand(ArticleMasterService.InnerServerMessages.LOAD_ARTICLES_BY_SUBCATEGORY);
		Category category = CacheManager.getInstance().getCategories().get(catIndex);
		int catId = category.getId();
		int subCatId = category.getSubcategories().get(subCatIndex).getId();
		myIntent.addAttribute(BSBundleConstants.CAT_ID.getText(),String.valueOf(catId));
		myIntent.addAttribute(BSBundleConstants.SUBCAT_ID.getText(),String.valueOf(subCatId));
		myIntent.addReceiver(new MyResultReceiver(new Handler(), category,subCatIndex));
		startService(myIntent);
	}

	public class MyResultReceiver extends ResultReceiver {
		private final Category category;
		private final int subCatIndex;

		MyResultReceiver(Handler h, Category category, int subCatIndex) {
			super(h);
			this.category = category;
			this.subCatIndex = subCatIndex;
		}

		@Override
		protected void onReceiveResult(int resultCode, Bundle resultData) {
			super.onReceiveResult(resultCode, resultData);
			switch (ServerMessages.parse(resultCode)) {
			case STATUS_OK:
				Serializable productList = resultData
						.getSerializable(BSBundleConstants.ARTICLES
								.getText());
				MyIntent myIntent = new MyIntent(ListingSubcategories.this,
						ListingArticles.class);
				myIntent.addAttribute(BSBundleConstants.ARTICLES.getText(),
						productList);
				myIntent.addAttribute(BSBundleConstants.PATH.getText(),
						getTitle().toString()
								+ category.getSubcategories().get(subCatIndex)
										.getName() + " > ");
				startActivity(myIntent);
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
