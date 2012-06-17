package com.grupo5.buyStuff.activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.model.Order;
import com.grupo5.buyStuff.services.OrderMasterService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;

public class ViewingOrders extends Activity {
	private String userName;
	private String token;
	private Order order;
	//private List<Article> articles;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		if(Menu.color%2==0){
			setTheme(R.style.LightTheme);

		}else{
			setTheme(R.style.BlackTheme);
		}
		setContentView(R.layout.order_info);
		Bundle data = getIntent().getExtras();
		this.userName = data.getString(BSBundleConstants.USERNAME.getText());
		this.token = data.getString(BSBundleConstants.AUTH_TOKEN.getText());
		this.order = (Order) data.getSerializable(BSBundleConstants.ORDER.getText());
		//articles = (List<Article>) data.getSerializable(BSBundleConstants.ARTICLES.getText());
		String title = data.getString(BSBundleConstants.PATH.getText());
		setTitle(title+ getText(R.string.orderTitle).toString()+" "+ order.getId());
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
		
		Button b;
		b = (Button) findViewById(R.id.viewProductsBtn);
		b.setText(R.string.orderProductBtn);
	}

	private void setValues() {
		TextView t;
		t = (TextView) findViewById(R.id.orderStatusValue);
		t.setText(" " + order.getStatusName());
		t = (TextView) findViewById(R.id.shippedDateValue);
		t.setText(" " + order.getShippedDate());
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
	
	
	public void viewOrderItems(View button) {
		
		MyIntent i = new MyIntent(Intent.ACTION_SYNC, null, this,OrderMasterService.class);
		i.addAttribute(BSBundleConstants.ID,order.getId());
		i.addAttribute(BSBundleConstants.USERNAME,this.userName);
		i.addAttribute(BSBundleConstants.AUTH_TOKEN,this.token);
		

		//final Bundle b = getIntent().getExtras();
		i.addReceiver(new ResultReceiver(new Handler()) {
			@Override
			protected void onReceiveResult(int resultCode, Bundle resultData) {
				super.onReceiveResult(resultCode, resultData);
				switch (ServerMessages.parse(resultCode)) {
				case STATUS_OK:
					MyIntent myIntent = new MyIntent(ViewingOrders.this,ListingArticles.class);
					myIntent.putExtras(resultData);
					startActivity(myIntent);
					break;
				case STATUS_ERROR:
					CharSequence text = getText(R.string.connectionError);
					Toast.makeText(getApplicationContext(), text,Toast.LENGTH_SHORT).show();
					break;
				}
			}
		});
		startService(i);
	}

}