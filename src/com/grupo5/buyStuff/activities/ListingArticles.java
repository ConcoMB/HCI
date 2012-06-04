package com.grupo5.buyStuff.activities;

import java.io.Serializable;
import java.util.List;

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
import android.widget.Toast;

import com.grupo5.buyStuff.model.Article;
import com.grupo5.buyStuff.services.ArticleMasterService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;
import com.grupo5.buyStuff.R;

public class ListingArticles extends ListActivity {

	private static final int MAX_TEXT_LENGTH = 12;
	private List<Article> articles;

	@SuppressWarnings("unchecked")
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		Bundle data = getIntent().getExtras();
		articles = (List<Article>) data
				.getSerializable(BSBundleConstants.ARTICLES.getText());
		String path = data.getString(BSBundleConstants.PATH.getText());
		setTitle(Html.fromHtml(path));
		String[] products = getArticleNames();
		setListAdapter(new ArrayAdapter<String>(this, R.layout.list_item,
				R.id.listText, products));
		ListView listView = getListView();
		listView.setTextFilterEnabled(true);
		Animation animation = AnimationUtils.makeInAnimation(getBaseContext(),
				false);
		animation.setDuration(500);
		listView.setAnimation(animation);
	}

	@Override
	protected void onListItemClick(ListView l, View view, int position, long id) {
		loadArticle(articles.get(position).getId());
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

	public boolean onKeyLongPress(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_SEARCH) {
			return super.onKeyDown(keyCode, event);
		}
		return super.onKeyLongPress(keyCode, event);
	}

	private void loadArticle(int prodId) {
		MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null, this,
				ArticleMasterService.class);
		myIntent.addAttribute(BSBundleConstants.COMMAND.getText(), String
				.valueOf(ArticleMasterService.InnerServerMessages.LOAD_ARTICLE
						.getNumber()));
		myIntent.addAttribute(BSBundleConstants.ARTICLE_ID.getText(),
				String.valueOf(prodId));
		myIntent.addReceiver(new ResultReceiver(new Handler()) {
			@Override
			protected void onReceiveResult(int resultCode, Bundle resultData) {
				super.onReceiveResult(resultCode, resultData);
				switch (ServerMessages.parse(resultCode)) {
				case STATUS_OK:
					Serializable article = resultData
							.getSerializable(BSBundleConstants.ARTICLE
									.getText());
					MyIntent myIntent = new MyIntent(ListingArticles.this,
							ShowingArticle.class);
					myIntent.addAttribute(
							BSBundleConstants.ARTICLE.getText(), article);
					myIntent.addAttribute(
							BSBundleConstants.PATH.getText(),
							getTitle().toString()
									+ ((Article) article).getName());
					startActivity(myIntent);
					break;
				case STATUS_ERROR:
					CharSequence text = getText(R.string.connectionError);
					Toast.makeText(getApplicationContext(), text,
							Toast.LENGTH_SHORT).show();
					break;
				}
			}
		});
		startService(myIntent);
	}

	private String[] getArticleNames() {
		String[] articleNames = new String[articles.size()];
		int i = 0;
		String text;
		for (Article article : articles) {
			text = article.getName();
			if (text.length() > MAX_TEXT_LENGTH) {
				text = text.substring(0, MAX_TEXT_LENGTH) + "...";
			}
			articleNames[i++] = text + " - " + Article.CURRENCY + " "
					+ article.getPrice();
		}
		return articleNames;
	}

}