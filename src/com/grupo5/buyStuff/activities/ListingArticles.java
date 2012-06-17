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

public class ListingArticles extends Activity {
>>>>>>> fb933f1fa210f020e813895db5b211ef21345070
	
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
<<<<<<< HEAD
	}



=======
	}
>>>>>>> fb933f1fa210f020e813895db5b211ef21345070

}