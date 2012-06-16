package com.grupo5.buyStuff.activities;

import android.app.Activity;
import android.app.ListActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.inputmethod.InputMethodManager;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.utilities.MyIntent;

<<<<<<< HEAD
public class ListingArticles extends Activity {
=======
public class ListingArticles extends ListActivity {

	private static final int MAX_TEXT_LENGTH = 20;
	private List<Article> articles;
>>>>>>> ee808a61219358e8cbf3687835837c06d2f5ed6f

	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.articlef);

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
			((InputMethodManager) this.getSystemService(ListActivity.INPUT_METHOD_SERVICE)).toggleSoftInput(0, 0);
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}


<<<<<<< HEAD
=======
	private String[] getArticleNames() {
		String[] articleNames = new String[articles.size()];
		int i = 0;
		String text;
		for (Article article : articles) {
			text = article.getName();
			if (text.length() > MAX_TEXT_LENGTH) {
				text = text.substring(0, MAX_TEXT_LENGTH) + "...";
			}
			articleNames[i++] = text;
			//+ " - " + Article.CURRENCY + " "+ article.getPrice();
		}
		return articleNames;
	}
>>>>>>> ee808a61219358e8cbf3687835837c06d2f5ed6f

}