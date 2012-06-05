package com.grupo5.buyStuff.activities;

import java.util.List;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.TextView;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.activities.ListingSubcategories.MyResultReceiver;
import com.grupo5.buyStuff.model.Article;
import com.grupo5.buyStuff.model.CacheManager;
import com.grupo5.buyStuff.model.Category;
import com.grupo5.buyStuff.model.Order;
import com.grupo5.buyStuff.services.ArticleMasterService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;

public class ViewingOrders extends Activity {
	@SuppressWarnings("unused")
	private String userName;
	@SuppressWarnings("unused")
	private String token;
	private Order order;
	private List<Article> articles;

	@SuppressWarnings("unchecked")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.order_info);
		Bundle data = getIntent().getExtras();

		Log.v(Order.OrderStates.CONFIRMED.getName(),
				String.valueOf(Order.OrderStates.CONFIRMED.getCode()));
		this.userName = data.getString(BSBundleConstants.USERNAME.getText());
		this.token = data.getString(BSBundleConstants.AUTH_TOKEN.getText());
		this.order = (Order) data.getSerializable(BSBundleConstants.ORDER.getText());
		articles = (List<Article>) data.getSerializable(BSBundleConstants.ARTICLES.getText());
		setInformation(data);
	}

	private void setInformation(Bundle data) {
		TextView t = (TextView) findViewById(R.id.title);
		t.setText(R.string.orderInformation);
		setLabels();
		setValues();
	}

	private void setLabels() {
		TextView t;
		t = (TextView) findViewById(R.id.orderStatusLabel);
		t.setText(R.string.orderStatusLabel);
		t = (TextView) findViewById(R.id.shippedDateLabel);
		t.setText(R.string.orderShippedDateLabel);
		t = (TextView) findViewById(R.id.myArts);
		t.setText(R.string.myArts);

		/*t = (TextView) findViewById(R.id.locationLabel);
		t.setText(R.string.orderLocationLabel);*/
	}

	private void setValues() {
		TextView t;
		t = (TextView) findViewById(R.id.orderStatusValue);
		t.setText(" " + order.getStatusName());
		t = (TextView) findViewById(R.id.shippedDateValue);
		t.setText(" " + order.getShippedDate());
		t = (TextView) findViewById(R.id.myArts);
		//t = (TextView) findViewById(R.id.locationValue);
		/*String coord = " ( " + order.getLatitude()
				+ ((Integer.valueOf(order.getLatitude()) < 0) ? "ºS" : "ºN")
				+ ", " + order.getLongitude()
				+ ((Integer.valueOf(order.getLongitude()) < 0) ? "ºW" : "ºE")
				+ ")";
		t.setText(coord);*/
	}

	private void showArts(){
		Bundle data = getIntent().getExtras();
		int catIndex = Integer.parseInt(data.getString(BSBundleConstants.CAT_POSITION.getText()));
		MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null, this,ArticleMasterService.class);
		myIntent.addCommand(ArticleMasterService.InnerServerMessages.LOAD_ARTICLES_BY_ORDER);
		int ordID = Integer.parseInt(order.getId());
		myIntent.addAttribute(BSBundleConstants.ORDER_ID.getText(),String.valueOf(ordID));
		//myIntent.addReceiver(new MyResultReceiver(new Handler(), category,subCatIndex));
		startService(myIntent);
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
