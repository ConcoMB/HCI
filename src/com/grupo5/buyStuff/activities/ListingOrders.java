package com.grupo5.buyStuff.activities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import android.app.ListActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.inputmethod.InputMethodManager;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.model.Order;
import com.grupo5.buyStuff.model.Order.OrderStates;
import com.grupo5.buyStuff.services.RefreshService;
import com.grupo5.buyStuff.utilities.BuyStuffBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;

public class ListingOrders extends ListActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		ListView lv = getListView();
		lv.setTextFilterEnabled(true);
		this.refreshList();
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

	@Override
	protected void onListItemClick(ListView l, View view, int position, long id) {
		int type = position + 1;
		Bundle b = getIntent().getExtras();
		String userName = b.getString(BuyStuffBundleConstants.USERNAME.getText());
		String token = b.getString(BuyStuffBundleConstants.AUTH_TOKEN.getText());
		MyIntent myIntent = new MyIntent(ListingOrders.this,
				ListingOrderTypes.class);
		myIntent.putExtra(BuyStuffBundleConstants.USERNAME.getText(), userName);
		myIntent.putExtra(BuyStuffBundleConstants.AUTH_TOKEN.getText(), token);
		myIntent.putExtra(BuyStuffBundleConstants.TYPE.getText(),
				Integer.toString(type));
		startActivity(myIntent);
	}

	private void refreshList() {
		setListAdapter(new ArrayAdapter<String>(this, R.layout.list_item,
				R.id.listText, this.getListItems()));
	}

	private List<String> getListItems() {
		List<String> types = this.getOrderTypes();
		List<String> items = new ArrayList<String>();
		Map<String, String> strings = this.getTypeStrings();

		for (int i = 0; i < types.size(); i++) {
			items.add(strings.get(types.get(i)));
		}

		return items;
	}

	private boolean listContains(List<String> l, String s) {
		int oldV, newV;
		for (int i = 0; i < l.size(); i++) {
			oldV = new Integer(l.get(i));
			newV = new Integer(s);
			if (oldV == newV) {
				return true;
			}
		}
		return false;
	}

	private Map<String, String> getTypeStrings() {
		Map<String, String> map = new HashMap<String, String>();
		for (OrderStates o : Order.OrderStates.values()) {
			map.put(String.valueOf(o.getCode()), o.getName());
		}
		return map;
	}

	private List<String> getOrderTypes() {
		List<Order> orders = RefreshService.getOrders();
		List<String> types = new ArrayList<String>();

		for (int i = 0; i < orders.size(); i++) {
			String status = orders.get(i).getStatus();
			if (!this.listContains(types, status)) {
				if (types.size() == 0) {
					types.add(status);
				} else {
					boolean added;
					int size = types.size();
					for (int j = 0; j < size; j++) {
						added = false;
						Integer newItem = new Integer(status);
						Integer currItem = new Integer(types.get(j));
						int comparison = newItem.compareTo(currItem);
						if (comparison < 0 /* && newItem != currItem */) {
							added = true;
							types.add(j, status);
							break;
						} else if (j == types.size() - 1 && !added) {
							types.add(j, status);
							added = true;
						}

						if (added) {
							break;
						}
					}
				}
			}
		}

		return types;
	}
}
