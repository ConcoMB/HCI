package com.grupo5.buyStuff.activities;

import java.io.Serializable;

import android.app.Activity;
import android.app.Fragment;
import android.app.ListActivity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.view.KeyEvent;
import android.view.inputmethod.InputMethodManager;
import android.widget.Toast;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.fragments.SubcategoryList.MyResultReceiver;
import com.grupo5.buyStuff.model.CacheManager;
import com.grupo5.buyStuff.model.Category;
import com.grupo5.buyStuff.services.ArticleMasterService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.Listable;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;



public class ListingArticles extends Activity {
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		if(Menu.color%2==0){
			setTheme(R.style.LightTheme);

		}else{
			setTheme(R.style.BlackTheme);
		}
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

	
}