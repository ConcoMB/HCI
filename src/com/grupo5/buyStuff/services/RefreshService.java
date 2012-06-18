package com.grupo5.buyStuff.services;

import java.io.IOException;
import java.net.SocketTimeoutException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import android.app.IntentService;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.ResultReceiver;
import android.util.Log;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.activities.Menu;
import com.grupo5.buyStuff.model.Order;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.LanguageManager;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;
import com.grupo5.buyStuff.utilities.ServerXMLConstants;
import com.grupo5.buyStuff.utilities.URLGenerator;
import com.grupo5.buyStuff.utilities.XMLParser;

public class RefreshService extends IntentService {
	private static final int NOTIFICATION_ID = 1;
	private static final int REFRESH_RATE_IN_SECONDS = 10;
	public boolean isFirst;
	private TimerTask timerTask;
	private static List<Order> orderList;

	public RefreshService() {
		super("RefreshService");
		this.isFirst = true;
		RefreshService.orderList = new ArrayList<Order>();
	}

	public static List<Order> getOrders() {
		return RefreshService.orderList;
	}

	@Override
	protected void onHandleIntent(Intent intent) {
		MyIntent myIntent = new MyIntent(intent);
		ResultReceiver receiver = myIntent.getReceiver();
		String userName = myIntent.getStringAttribute(BSBundleConstants.USERNAME.getText());
		String authToken = myIntent.getStringAttribute(BSBundleConstants.AUTH_TOKEN.getText());
		Bundle b = new Bundle();
		Timer timer = new Timer();
		this.timerTask = new MyTimerTask(receiver, userName, authToken, b,timer);
		this.timerTask.run();
		timer.scheduleAtFixedRate(this.timerTask, new Date(),1000 * REFRESH_RATE_IN_SECONDS);
	}

	private void createNotification(Integer order) {
		String langId = LanguageManager.getLanguageId();
		String ns = Context.NOTIFICATION_SERVICE;
		NotificationManager mNotificationManager = (NotificationManager) getSystemService(ns);
		CharSequence tickerText;
		int icon = R.drawable.ic_menu_companylogo;
		if (langId.equals(LanguageManager.ENGLISH)) {
			tickerText = "Orders updated";
		} else {
			tickerText = "Ordenes actualizadas";
		}
		long when = System.currentTimeMillis();

		Notification notification = new Notification(icon, tickerText, when);

		Context context = getApplicationContext();
		CharSequence contentTitle;
		CharSequence contentText;
		// TODO use correct class
		MyIntent notificationIntent = new MyIntent(this, Menu.class);
		contentTitle = getString(R.string.orderModified);
		if (order != null) {
			contentText = getString(R.string.orderUpdated) + " " + order;
			notificationIntent.addAttribute(
					BSBundleConstants.ORDER_ID.getText(),
					String.valueOf(order));
		} else {
			contentText = getString(R.string.orderModified);
		}
		PendingIntent contentIntent = PendingIntent.getActivity(this, 0,notificationIntent, 0);

		notification.setLatestEventInfo(context, contentTitle, contentText,contentIntent);

		mNotificationManager.notify(NOTIFICATION_ID, notification);
	}

	private boolean getOrderInfo(ResultReceiver receiver, Bundle b,String username, String token) 
			throws ClientProtocolException,IOException, SocketTimeoutException {

		URLGenerator order = new URLGenerator("Order");
		order.addParameter("method", "GetOrderList");
		order.addParameter("username", username);
		order.addParameter("authentication_token", token);
		HttpResponse response = order.getServerResponse();

		try {
			XMLParser xp;
			xp = new XMLParser(response);
			List<Order> newOrders = this.parseOrderResponse(b, xp, username, token);
			if (newOrders == null) {
				return false;
			}
			if (this.compareWithOldOrders(newOrders, b)) {
				RefreshService.orderList = newOrders;
				return true;
			}
			return false;
		} catch (Exception e) {
			b.putString(BSBundleConstants.ERROR_MESSAGE.getText(),e.getMessage());
			receiver.send(ServerMessages.STATUS_CONNECTION_ERROR.getNumber(), b);
		}
		return false;
	}

	private boolean compareWithOldOrders(List<Order> old, Bundle b) {
		if (old.size() != RefreshService.orderList.size()) {
			return true;
		} else {
			for (int i = 0; i < old.size(); i++) {
				for (int j = 0; j < RefreshService.orderList.size(); j++) {
					Order oi = old.get(i);
					Order oj = RefreshService.orderList.get(j);
					if (oi.getId().equals(oj.getId())) {
						if (!(oi.getLatitude().equals(oj.getLatitude())&& oi.getLongitude().equals(oj.getLongitude()) && oi.getStatus().equals(oj.getStatus()))) {
							b.putInt(BSBundleConstants.ORDER_ID.getText(),new Integer(oi.getId()));
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	private List<Order> parseOrderResponse(Bundle b, XMLParser xp,String username, String token) {
		if (xp.getErrorMessage() != null) {
			b.putString(ServerXMLConstants.ERROR_MESSAGE.getText(),xp.getErrorMessage());
			return null;
		}
		NodeList orders = xp.getElements(ServerXMLConstants.ORDER.getText());
		List<Order> orderList = new ArrayList<Order>();
		for (int i = 0; i < orders.getLength(); i++) {
			this.fillOrderData(orderList, orders.item(i), xp,username, token);
		}
		return orderList;
	}

	private void fillOrderData(List<Order> orderList, Node order, XMLParser xp, String username, String token) {
		int orderID=Integer.valueOf(xp.getAttribute((Element) order,ServerXMLConstants.ID.getText()));
		Order o = new Order(getApplicationContext());		
		o.setId(orderID+"");
		o.setLatitude(xp.getStringFromSingleElement(ServerXMLConstants.LATITUDE.getText(), (Element) order));
		o.setLongitude(xp.getStringFromSingleElement(ServerXMLConstants.LONGITUDE.getText(), (Element) order));
		o.setStatus(xp.getStringFromSingleElement(ServerXMLConstants.STATUS.getText(), (Element) order));
		o.setCreatedDate(xp.getStringFromSingleElement(ServerXMLConstants.CREATED_DATE.getText(), (Element) order));
		orderList.add(o);
	}

	private class MyTimerTask extends TimerTask {
		private final ResultReceiver receiver;
		private final String userName;
		private final String authToken;
		private final Bundle b;

		public MyTimerTask(ResultReceiver receiver, String userName,String authToken, Bundle b, Timer timer) {
			this.receiver = receiver;
			this.userName = userName;
			this.authToken = authToken;
			this.b = b;
		}

		public void run() {
			try {
				if (getOrderInfo(receiver, b, userName, authToken)) {
					Integer order = null;
					if (b.containsKey(BSBundleConstants.ORDER_ID.getText())) {
						order = b.getInt(BSBundleConstants.ORDER_ID.getText());
					}
					if (!RefreshService.this.isFirst) {
						RefreshService.this.createNotification(order);
					} else {
						RefreshService.this.isFirst = false;
					}
					b.putString(BSBundleConstants.UPDATED.getText(),BSBundleConstants.YES.getText());
				}
				receiver.send(ServerMessages.STATUS_OK.getNumber(), b);
			} catch (SocketTimeoutException e) {
				receiver.send(ServerMessages.STATUS_CONNECTION_ERROR.getNumber(), b);
			} catch (Exception e) {
				receiver.send(ServerMessages.STATUS_ERROR.getNumber(), b);
			}
		};
	};

}
