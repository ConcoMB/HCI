package com.grupo5.buyStuff.activities;

import java.io.Serializable;

import android.app.Activity;
import android.app.Fragment;
import android.app.SearchManager;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.util.Log;
import android.widget.Toast;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.services.ArticleMasterService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.Listable;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;

public class Searcher extends Activity{
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.v("HOLA", "pase por aca");
		Intent intent = this.getIntent();
			String query = intent.getStringExtra(SearchManager.QUERY);
			Log.v("QUERY", query);
			MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null, this,ArticleMasterService.class);
			myIntent.addCommand(ArticleMasterService.InnerServerMessages.LOAD_ARTICLES_BY_NAME);
			myIntent.addAttribute("query",query);
			myIntent.addReceiver(new MyResultReceiverS(new Handler(), query));
			startService(myIntent);
	}
	
	protected void onHandleIntent(Intent intent) {
		if(intent.getAction().equals(Intent.ACTION_SEARCH)){
			String query = intent.getDataString();
			Log.v("QUERY", query);
			MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null, this,ArticleMasterService.class);
			myIntent.addCommand(ArticleMasterService.InnerServerMessages.LOAD_ARTICLES_BY_NAME);
			myIntent.addAttribute("query",query);
			myIntent.addReceiver(new MyResultReceiverS(new Handler(), query));
			startService(myIntent);
		}
	}
	
	public class MyResultReceiverS extends ResultReceiver {

		String query;
		MyResultReceiverS(Handler h, String query) {
			super(h);
			this.query=query;
		}

		@Override
		protected void onReceiveResult(int resultCode, Bundle resultData) {
			super.onReceiveResult(resultCode, resultData);
			switch (ServerMessages.parse(resultCode)) {
			case STATUS_OK:
				Serializable productList = resultData.getSerializable(BSBundleConstants.ARTICLES.getText());
				MyIntent myIntent = new MyIntent(Searcher.this,ListingArticles.class);
				myIntent.addAttribute(BSBundleConstants.ARTICLES.getText(),productList);
				myIntent.addAttribute(BSBundleConstants.PATH.getText(), getText(R.string.search_label).toString()+query);	
				Listable lis = (Listable) getFragmentManager().findFragmentById(R.id.articlef);
				if(lis==null || !((Fragment)lis).isInLayout()){
					startActivity(myIntent);					
				}else{
					lis.fill(productList);	
				}
				break;
			case STATUS_ERROR:
				CharSequence text = getText(R.string.connectionError);
				Toast.makeText(Searcher.this.getApplicationContext(), text,Toast.LENGTH_SHORT).show();
				break;
			}
		}
	}
}
