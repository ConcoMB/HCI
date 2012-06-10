package com.grupo5.buyStuff.fragments;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import android.app.ListFragment;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.activities.ListingCategories;
import com.grupo5.buyStuff.activities.ListingOrders;
import com.grupo5.buyStuff.activities.Login;
import com.grupo5.buyStuff.model.CacheManager;
import com.grupo5.buyStuff.model.Category;
import com.grupo5.buyStuff.model.Session;
import com.grupo5.buyStuff.services.ArticleMasterService;
import com.grupo5.buyStuff.services.RefreshService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;

public class MenuFragment extends ListFragment{

	private static boolean refreshOrderStarted = false;
	private boolean isLoggedIn = true;
	private boolean ordersAvailable;
	private List<String> menuOptions;
	private Map<String, ActivityLauncher> optionHandler;
	
	public void onCreate(Bundle savedInstanceState){
		setListAdapter(new ArrayAdapter<String>(getActivity(), R.layout.list_item,R.id.listText, this.menuOptions));

		ListView lv = getListView();
		lv.setTextFilterEnabled(true);
		if (!refreshOrderStarted) {
			this.toggleOrders(false);
			this.startOrderRefreshService(getActivity().getIntent().getExtras());
			refreshOrderStarted = true;
		}
	}
	
	public boolean isLoggedIn() {
		return this.isLoggedIn;
	}

	public boolean setIsLoggedin(boolean b) {
		return this.isLoggedIn = b;
	}

	private void init() {
		this.optionHandler = new HashMap<String, ActivityLauncher>();
		this.menuOptions = new LinkedList<String>();
		CharSequence categories = getText(R.string.categoryTitle);
		this.menuOptions.add(categories.toString());
		this.optionHandler.put(categories.toString(), new ActivityLauncher() {

			@Override
			public void launchActivity() {
				if (!isLoggedIn()) {
					showLoginErrorStatus();
					return;
				}
				if (CacheManager.getInstance().loadedCategories()) {
					startCategoriesActivity();
					return;
				}
				MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null,getActivity(), ArticleMasterService.class);
				myIntent.addCommand(ArticleMasterService.InnerServerMessages.LOAD_CATEGORIES);
				myIntent.addReceiver(new MyResultReceiver(new Handler()));
				getActivity().startService(myIntent);

			}
		});
		CharSequence orders = getText(R.string.myOrder);
		menuOptions.add(orders.toString());
		optionHandler.put(orders.toString(), new ActivityLauncher() {

			@Override
			public void launchActivity() {
				if (!isLoggedIn()) {
					showLoginErrorStatus();
					return;
				}
				if (!ordersAvailable()) {
					CharSequence text = getText(R.string.ordersNotLoaded);
					Toast.makeText(getActivity().getApplicationContext(), text,Toast.LENGTH_LONG).show();
				}

				Bundle b = getActivity().getIntent().getExtras();
				MyIntent myIntent = new MyIntent(getActivity(),ListingOrders.class);

				Session u = CacheManager.getInstance().getSession();
				if (u != null) {
					myIntent.addAttribute(BSBundleConstants.USERNAME.getText(),u.getUsername());
					myIntent.addAttribute(BSBundleConstants.AUTH_TOKEN.getText(),u.getAuthToken());
				} else {
					myIntent.addAttribute(BSBundleConstants.USERNAME.getText(), b.getString(BSBundleConstants.USERNAME.getText()));
					myIntent.addAttribute(BSBundleConstants.AUTH_TOKEN.getText(), b.getString(BSBundleConstants.AUTH_TOKEN.getText()));
				}
				getActivity().startActivity(myIntent);
			}
		});

	}

	public void logout(View v) {
		setIsLoggedin(false);
		Intent intent = new Intent(getActivity(), Login.class);
		getActivity().startActivity(intent);
	}

	public void onListItemClick(ListView l, View v, int position, long id) {
		String option = ((TextView) v.findViewById(R.id.listText)).getText().toString();
		this.optionHandler.get(option).launchActivity();
	}

	public boolean ordersAvailable() {
		return this.ordersAvailable;
	}

	public void toggleOrders(boolean enabled) {
		this.ordersAvailable = enabled;
	}

	public void startOrderRefreshService(Bundle b) {
		if (!isLoggedIn) {
			showLoginErrorStatus();
			return;
		}
		MyIntent intent = new MyIntent(Intent.ACTION_SYNC, null, getActivity(),RefreshService.class);
		intent.addAttribute(BSBundleConstants.USERNAME.getText(),b.getString(BSBundleConstants.USERNAME.getText()));
		intent.addAttribute(BSBundleConstants.AUTH_TOKEN.getText(),b.getString(BSBundleConstants.AUTH_TOKEN.getText()));
		intent.addReceiver(new ResultReceiver(new Handler()) {
			@Override
			protected void onReceiveResult(int resultCode, Bundle resultData) {
				super.onReceiveResult(resultCode, resultData);
				ServerMessages svm = ServerMessages.parse(resultCode);
				switch (svm) {
				case STATUS_OK:
					toggleOrders(true);
					break;
				case STATUS_ERROR:
					if (resultData.containsKey(BSBundleConstants.ERROR_MESSAGE.getText())) {
						String errorMessage = resultData.getString(BSBundleConstants.ERROR_MESSAGE.getText());
						Toast.makeText(getActivity().getApplicationContext(), errorMessage,Toast.LENGTH_SHORT).show();
					}
					break;
				default:
					break;
				}
			}
		});
		getActivity().startService(intent);
	}

	public void showLoginErrorStatus() {
		CharSequence errorMessage = getText(R.string.notLoggedIn);
		Context cont = getActivity().getApplicationContext();
		Toast.makeText(cont, errorMessage, Toast.LENGTH_LONG).show();
	}

	private void startCategoriesActivity() {
		MyIntent myIntent = new MyIntent(getActivity(),ListingCategories.class);
		startActivity(myIntent);
	}


	private class MyResultReceiver extends ResultReceiver {
		MyResultReceiver(Handler h) {
			super(h);
		}

		@SuppressWarnings("unchecked")
		@Override
		protected void onReceiveResult(int resultCode, Bundle resultData) {
			super.onReceiveResult(resultCode, resultData);

			switch (ServerMessages.parse(resultCode)) {
			case STATUS_OK:
				List<Category> categories = (List<Category>) resultData	.getSerializable("command"/*
												 * KoppeBundleConstants.CATEGORIES
												 * .getText()
												 */);
				CacheManager.getInstance().persistCategories(categories);
				startCategoriesActivity();
				break;
			case STATUS_ERROR:
				break;
			}
		}
	}

	private interface ActivityLauncher {

		public void launchActivity();

	}

}
