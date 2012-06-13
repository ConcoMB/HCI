package com.grupo5.buyStuff.activities;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

import android.app.Activity;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.StrictMode;
import android.text.Html;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.ImageView;
import android.widget.TextView;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.model.Article;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;

public class ShowingArticle extends Activity {

	private static final int[] labelFields = new int[] { R.id.label1,
		R.id.label2, R.id.label3, R.id.label4, R.id.label5, R.id.label6,
		R.id.label7, R.id.label8, R.id.label9 };
	private static final int[] infoFields = new int[] { R.id.info1, R.id.info2,
		R.id.info3, R.id.info4, R.id.info5, R.id.info6, R.id.info6,
		R.id.info7, R.id.info8, R.id.info9 };
	@SuppressWarnings("unused")
	private static final int MAX_ATTRIBUTE_LENGTH = 10;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.article);

		Bundle recdData = getIntent().getExtras();
		Article article = (Article) recdData.getSerializable(BSBundleConstants.ARTICLE.getText());
		String path = recdData.getString(BSBundleConstants.PATH.getText());
		setTitle(Html.fromHtml(path));

		TextView textView = (TextView) findViewById(R.id.title);
		textView.setText(article.getName());
		textView = (TextView) findViewById(R.id.price);
		textView.setText(Article.CURRENCY + " " + article.getPrice());
		
		
		ImageView imgView = (ImageView) findViewById(R.id.image);
		
		StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

		StrictMode.setThreadPolicy(policy); 
		
		try{
			URL url = new URL(article.getImgSrc());
			InputStream is = (InputStream)url.getContent();
			imgView.setImageDrawable(Drawable.createFromStream(is, "src"));
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
		/*  
		Object obj = fetch(article.getImgSrc());
		if (obj != null) {
			Drawable img = Drawable.createFromStream((InputStream) obj, "src");
			ImageView imgView = (ImageView) findViewById(R.id.image);
			imgView.setImageDrawable(img);
		}*/
		String[] fields;
		switch (article.getCategoryId()) {
		case 1:
			fields = this.getResources().getStringArray(R.array.dvd_labels);
			break;
		case 2:
			fields = this.getResources().getStringArray(R.array.book_labels);
			break;
		default:
			fields = this.getResources().getStringArray(R.array.dvd_labels);
		}

		int i = 0;
		TextView label;
		for (String fieldName : fields) {
			label = (TextView) findViewById(labelFields[i]);
			textView = (TextView) findViewById(infoFields[i]);
			String value = article.getProperty(i);
			value = value.trim();
			label.setText(fieldName);
			textView.setText(value);
			if (value != null) {
				i++;
			}
		}
		for (; i < infoFields.length && i < labelFields.length; i++) {
			textView = (TextView) findViewById(infoFields[i]);
			textView.setText("");
			textView = (TextView) findViewById(labelFields[i]);
			textView.setText("");
		}
	}

	private Object fetch(String address) {
		try {
			URL url = new URL(address);
			Object content = url.getContent();
			return content;
		} catch (MalformedURLException e) {
			Log.v("ERROR URL", "error1");
			return null;
		} catch (IOException e) {
			Log.v("ERROR URL", "error2");
			return null;
		}
	}
	private Drawable ImageOperations(Context ctx, String url) {
		InputStream is = (InputStream) this.fetch(url);
		Drawable d = Drawable.createFromStream(is, "src");
		return d;
	}
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_MENU) {
			MyIntent myIntent = new MyIntent(this, Menu.class);
			myIntent.putExtras(getIntent());
			startActivity(myIntent);
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}
}
