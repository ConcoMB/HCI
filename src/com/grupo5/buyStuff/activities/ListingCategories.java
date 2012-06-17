package com.grupo5.buyStuff.activities;

import android.app.Activity;
import android.os.Bundle;

import com.grupo5.buyStuff.R;

public class ListingCategories extends Activity {


	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		if(Menu.color%2==0){
			setTheme(R.style.LightTheme);

		}else{
			setTheme(R.style.BlackTheme);
		}
		setContentView(R.layout.categoryf);
		
	}
}
