package com.grupo5.buyStuff.fragments;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import android.app.Fragment;
import android.app.ListFragment;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.activities.ListingOrderTypes;
import com.grupo5.buyStuff.model.Order;
import com.grupo5.buyStuff.model.Order.OrderStates;
import com.grupo5.buyStuff.services.RefreshService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.Listable;
import com.grupo5.buyStuff.utilities.MyIntent;

public class MyOrders extends ListFragment{
	@Override
	public void onStart() {
		super.onStart();
		ListView lv = getListView();
		getActivity().setTitle(getText(R.string.myOrder).toString() + " > ");
		lv.setTextFilterEnabled(true);
		this.refreshList();
		Animation a = AnimationUtils.makeInAnimation(getActivity().getBaseContext(), false);
		a.setDuration(500);
		lv.setAnimation(a);
	}

	@Override
	public void onListItemClick(ListView l, View view, int position, long id) {
		int type = position + 1;
		Bundle b = getActivity().getIntent().getExtras();
		String userName = b.getString(BSBundleConstants.USERNAME.getText());
		String token = b.getString(BSBundleConstants.AUTH_TOKEN.getText());
		MyIntent myIntent = new MyIntent(getActivity(),ListingOrderTypes.class);
		myIntent.putExtra(BSBundleConstants.USERNAME.getText(), userName);
		myIntent.putExtra(BSBundleConstants.AUTH_TOKEN.getText(), token);
		myIntent.putExtra(BSBundleConstants.TYPE.getText(),Integer.toString(type));
		myIntent.putExtra(BSBundleConstants.PATH.getText(), getActivity().getTitle());
		Listable lis = (Listable) getFragmentManager().findFragmentById(R.id.myordersf);
		if(lis==null || !((Fragment)lis).isInLayout()){
			startActivity(myIntent);
		}else{		
			lis.fill(myIntent.getExtras());
		}
	}

	private void refreshList() {
		
		setListAdapter(new ArrayAdapter<String>(getActivity(), R.layout.list_item,R.id.listText, this.getListItems()));
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
