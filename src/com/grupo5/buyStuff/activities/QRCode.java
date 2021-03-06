package com.grupo5.buyStuff.activities;

import java.io.Serializable;
import java.util.List;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.util.Log;
import android.widget.Toast;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.model.Article;
import com.grupo5.buyStuff.services.ArticleMasterService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;

public class QRCode extends Activity{
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Uri data = getIntent().getData();
		List<String> params = data.getPathSegments();
		String first = params.get(0); // "status"
		int i = Integer.valueOf(first);
		Log.v("articleid:",i+"");
		loadArticle(i);
	}

	private void loadArticle(int prodId) {
		MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null, this,ArticleMasterService.class);
		myIntent.addAttribute(BSBundleConstants.COMMAND.getText(), String.valueOf(ArticleMasterService.InnerServerMessages.LOAD_ARTICLE.getNumber()));
		myIntent.addAttribute(BSBundleConstants.ARTICLE_ID.getText(), String.valueOf(prodId));
		myIntent.addReceiver(new ResultReceiver(new Handler()) {
			@Override
			protected void onReceiveResult(int resultCode, Bundle resultData) {
				super.onReceiveResult(resultCode, resultData);
				switch (ServerMessages.parse(resultCode)) {
				case STATUS_OK:
					Serializable article = resultData.getSerializable(BSBundleConstants.ARTICLE.getText());
					MyIntent myIntent = new MyIntent(QRCode.this, ShowingArticle.class);
					myIntent.addAttribute(BSBundleConstants.ARTICLE.getText(),article);
					String title=getTitle().toString();
					String aname=((Article) article).getName();
					Log.v("title+a:",title+aname);
					myIntent.addAttribute(BSBundleConstants.PATH.getText(),title +aname );
					startActivity(myIntent);
					break;
				case STATUS_ERROR:
					CharSequence text = getText(R.string.connectionError);
					Toast.makeText(getApplicationContext(), text,Toast.LENGTH_SHORT).show();
					break;
				}
			}
		});
		startService(myIntent);
	}
}



