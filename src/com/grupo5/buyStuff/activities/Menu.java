package com.grupo5.buyStuff.activities;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import android.app.ListActivity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.view.KeyEvent;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.model.CacheManager;
import com.grupo5.buyStuff.model.Category;
import com.grupo5.buyStuff.model.Session;
import com.grupo5.buyStuff.services.ArticleMasterService;
import com.grupo5.buyStuff.services.RefreshService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;
import com.grupo5.buyStuff.utilities.Themes;

public class Menu extends ListActivity {
	private static boolean refreshOrderStarted = false;
	private boolean isLoggedIn = true;
	private boolean ordersAvailable;
	private List<String> menuOptions;
	private Map<String, ActivityLauncher> optionHandler;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.init();

		setContentView(R.layout.menu_layout);
		setListAdapter(new ArrayAdapter<String>(this, R.layout.list_item,R.id.listText, this.menuOptions));
		setTitle(R.string.menuTitle);

		ListView lv = getListView();
		lv.setTextFilterEnabled(true);
		if (!refreshOrderStarted) {
			this.toggleOrders(false);
			this.startOrderRefreshService(getIntent().getExtras());
			refreshOrderStarted = true;
		}
	}
	 public void changeTheme(View v) 
     {
         Themes.changeToTheme(this, Themes.THEME_BLACK);

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
				if (!Menu.this.isLoggedIn()) {
					Menu.this.showLoginErrorStatus();
					return;
				}
				if (CacheManager.getInstance().loadedCategories()) {
					Menu.this.startCategoriesActivity();
					return;
				}
				MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null,Menu.this, ArticleMasterService.class);
				myIntent.addCommand(ArticleMasterService.InnerServerMessages.LOAD_CATEGORIES);
				myIntent.addReceiver(new MyResultReceiver(new Handler()));
				Menu.this.startService(myIntent);

			}
		});
		CharSequence orders = getText(R.string.myOrder);
		this.menuOptions.add(orders.toString());
		this.optionHandler.put(orders.toString(), new ActivityLauncher() {

			@Override
			public void launchActivity() {
				if (!Menu.this.isLoggedIn()) {
					Menu.this.showLoginErrorStatus();
					return;
				}
				if (!Menu.this.ordersAvailable()) {
					CharSequence text = getText(R.string.ordersNotLoaded);
					Toast.makeText(getApplicationContext(), text,Toast.LENGTH_LONG).show();
				}

				Bundle b = getIntent().getExtras();
				MyIntent myIntent = new MyIntent(Menu.this,ListingOrders.class);

				Session u = CacheManager.getInstance().getSession();
				if (u != null) {
					myIntent.addAttribute(BSBundleConstants.USERNAME.getText(),u.getUsername());
					myIntent.addAttribute(BSBundleConstants.AUTH_TOKEN.getText(),u.getAuthToken());
				} else {
					myIntent.addAttribute(BSBundleConstants.USERNAME.getText(), b.getString(BSBundleConstants.USERNAME.getText()));
					myIntent.addAttribute(BSBundleConstants.AUTH_TOKEN.getText(), b.getString(BSBundleConstants.AUTH_TOKEN.getText()));
				}
				Menu.this.startActivity(myIntent);

			}
		});

	}

	public void logout(View v) {
		Menu.this.setIsLoggedin(false);
		Intent intent = new Intent(Menu.this, Login.class);
		Menu.this.startActivity(intent);
	}

	protected void onListItemClick(ListView l, View v, int position, long id) {
		String option = ((TextView) v.findViewById(R.id.listText)).getText()
				.toString();
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
		MyIntent intent = new MyIntent(Intent.ACTION_SYNC, null, this,RefreshService.class);
		intent.addAttribute(BSBundleConstants.USERNAME.getText(),b.getString(BSBundleConstants.USERNAME.getText()));
		intent.addAttribute(BSBundleConstants.AUTH_TOKEN.getText(),b.getString(BSBundleConstants.AUTH_TOKEN.getText()));
		intent.addReceiver(new ResultReceiver(new Handler()) {
			@Override
			protected void onReceiveResult(int resultCode, Bundle resultData) {
				super.onReceiveResult(resultCode, resultData);
				ServerMessages svm = ServerMessages.parse(resultCode);
				switch (svm) {
				case STATUS_OK:
					Menu.this.toggleOrders(true);
					break;
				case STATUS_ERROR:
					if (resultData.containsKey(BSBundleConstants.ERROR_MESSAGE.getText())) {
						String errorMessage = resultData.getString(BSBundleConstants.ERROR_MESSAGE.getText());
						Toast.makeText(getApplicationContext(), errorMessage,Toast.LENGTH_SHORT).show();
					}
					break;
				default:
					break;
				}
			}
		});
		startService(intent);
	}

	public void showLoginErrorStatus() {
		CharSequence errorMessage = getText(R.string.notLoggedIn);
		Context cont = getApplicationContext();
		Toast.makeText(cont, errorMessage, Toast.LENGTH_LONG).show();
	}

	private void startCategoriesActivity() {
		MyIntent myIntent = new MyIntent(Menu.this,ListingCategories.class);
		startActivity(myIntent);
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			return true;
		}

		return super.onKeyDown(keyCode, event);
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
				List<Category> categories = (List<Category>) resultData.getSerializable("command");
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
