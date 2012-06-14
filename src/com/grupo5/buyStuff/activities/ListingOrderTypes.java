package com.grupo5.buyStuff.activities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.grupo5.buyStuff.model.Order;
import com.grupo5.buyStuff.model.Order.OrderStates;
import com.grupo5.buyStuff.services.OrderMasterService;
import com.grupo5.buyStuff.services.RefreshService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;
import com.grupo5.buyStuff.R;

public class ListingOrderTypes extends ListActivity {
	private String type;
	private String userName;
	private String token;
	private List<Order> orders;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Bundle b = getIntent().getExtras();
		this.type = b.getString(BSBundleConstants.TYPE.getText());
		this.userName = b.getString(BSBundleConstants.USERNAME.getText());
		this.token = b.getString(BSBundleConstants.AUTH_TOKEN.getText());
		this.orders = new ArrayList<Order>();
		String breadCrumb = b.getString(BSBundleConstants.PATH.getText());
		String st = "type";
		switch (Integer.valueOf(this.type)){
			case 1:
				st=getText(R.string.created).toString();
				break;
			case 2:
				st=getText(R.string.confirmed).toString();
				break;
			case 3:
				st=getText(R.string.transported).toString();
				break;
			case 4:
				st=getText(R.string.delivered).toString();
				break;
		}
		setTitle(Html.fromHtml(breadCrumb+ st + " > "));

		//this.setViewTitle();
		this.loadOrders();
		this.setClickCallback();

		ListView lv = getListView();
		lv.setTextFilterEnabled(true);
		Animation a = AnimationUtils.makeInAnimation(getBaseContext(), false);
		a.setDuration(500);
		lv.setAnimation(a);
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

//	private void setViewTitle() {
//		Map<String, String> strings = new HashMap<String, String>();
//		for (OrderStates o : Order.OrderStates.values()) {
//			strings.put(String.valueOf(o.getCode()), o.getName());
//		}
//		setTitle(strings.get(this.type));
//	}

	private void setClickCallback() {
		final ListView lv = getListView();
		lv.setTextFilterEnabled(true);
		final ListingOrderTypes me = this;
		lv.setOnItemClickListener(new OnItemClickListener() {
			public void onItemClick(AdapterView<?> parent, View view,
					int position, long id) {
				TextView tv = (TextView) view.findViewById(R.id.listText);
				String text = tv.getText().toString();
				me.launchOrdersByType(position, text);
			}
		});
	}

	private List<String> getItemStringList() {
		List<String> strings = new ArrayList<String>();

		for (Order o : this.orders) {
			strings.add(getString(R.string.orderTitle) + " " + o.getId());
		}

		return strings;
	}

	private void launchOrdersByType(int position, final String title) {
		MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null, this,OrderMasterService.class);
		myIntent.addAttribute(BSBundleConstants.ID.getText(),String.valueOf(this.orders.get(position).getId()));
		myIntent.addAttribute(BSBundleConstants.USERNAME.getText(),this.userName);
		myIntent.addAttribute(BSBundleConstants.AUTH_TOKEN.getText(),this.token);
		myIntent.putExtra(BSBundleConstants.TYPE.getText(),this.getTitle());	
		myIntent.putExtra(BSBundleConstants.PATH.getText(), title /*+ " > "*/);
		Order order = this.orders.get(position);
		String userN = this.userName;
		String toK = this.token;
		myIntent.addReceiver(new MyResultReceiver(new Handler(), order, userN,toK, title));
		startService(myIntent);
	}

	private void fillOrders() {
		List<Order> orders = RefreshService.getOrders();
		for (int i = 0; i < orders.size(); i++) {
			String o = orders.get(i).getStatus();
			if (o.equals(this.type)) {
				this.orders.add(orders.get(i));
			}
		}
	}

	private void loadOrders() {
		this.fillOrders();
		setListAdapter(new ArrayAdapter<String>(this, R.layout.list_item,R.id.listText, this.getItemStringList()));
	}

	private class MyResultReceiver extends ResultReceiver {
		private final Order order;
		private final String userName;
		private final String authToken;
		private final String title;

		MyResultReceiver(Handler h, Order order, String userName,String authToken, String title) {
			super(h);
			this.order = order;
			this.userName = userName;
			this.authToken = authToken;
			this.title = title;
		}

		@Override
		protected void onReceiveResult(int resultCode, Bundle resultData) {
			super.onReceiveResult(resultCode, resultData);
			switch (ServerMessages.parse(resultCode)) {
			case STATUS_OK:
				Serializable productList = resultData.getSerializable(BSBundleConstants.ARTICLES.getText());
				MyIntent myIntent = new MyIntent(ListingOrderTypes.this,ViewingOrders.class);
				Bundle b = new Bundle();
				b.putSerializable(BSBundleConstants.ARTICLES.getText(),productList);
				b.putSerializable(BSBundleConstants.ORDER.getText(),(Serializable) order);
				b.putString(BSBundleConstants.USERNAME.getText(), userName);
				b.putString(BSBundleConstants.AUTH_TOKEN.getText(),authToken);
				b.putString(BSBundleConstants.PATH.getText(), getTitle().toString());
				myIntent.putExtras(b);
				startActivity(myIntent);
				break;
			case STATUS_ERROR:
				break;
			}
		}
	}
}
