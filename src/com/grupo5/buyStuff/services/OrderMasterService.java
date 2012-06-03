package com.grupo5.buyStuff.services;

import java.util.ArrayList;

import org.apache.http.HttpResponse;
import org.w3c.dom.NodeList;

import android.app.IntentService;
import android.content.Intent;
import android.os.Bundle;
import android.os.ResultReceiver;

import com.grupo5.buyStuff.model.Article;
import com.grupo5.buyStuff.utilities.BuyStuffBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;
import com.grupo5.buyStuff.utilities.ServerXMLConstants;
import com.grupo5.buyStuff.utilities.URLGenerator;
import com.grupo5.buyStuff.utilities.XMLParser;

public class OrderMasterService extends IntentService {

	public OrderMasterService() {
		super("OrderMasterService");
	}

	@Override
	protected void onHandleIntent(Intent intent) {
		MyIntent myIntent = new MyIntent(intent);
		ResultReceiver receiver = myIntent.getReceiver();
		String userName = myIntent
				.getStringAttribute(BuyStuffBundleConstants.USERNAME.getText());
		String authToken = myIntent
				.getStringAttribute(BuyStuffBundleConstants.AUTH_TOKEN.getText());
		String orderId = myIntent.getStringAttribute(BuyStuffBundleConstants.ID
				.getText());

		URLGenerator order = new URLGenerator("Order");
		order.addParameter("method", "GetOrder");
		order.addParameter("authentication_token", authToken);
		order.addParameter("username", userName);
		order.addParameter("order_id", orderId);
 
		Bundle b = new Bundle();
		try {
			HttpResponse response = order.getServerResponse(); 
			XMLParser xp = new XMLParser(response);
			if (xp.getErrorMessage() != null) {
			} else {
				NodeList items = xp.getElements(ServerXMLConstants.PRODUCT_ID
						.getText());
				ArrayList<Article> products = new ArrayList<Article>();
				for (int j = 0; j < items.getLength(); j++) {
					products.add(ArticleMasterService
							.fetchArticle(new Integer(items.item(j)
									.getFirstChild().getNodeValue())));
				}
				b.putSerializable(ServerXMLConstants.ARTICLES.getText(),
						products);
				receiver.send(ServerMessages.STATUS_OK.getNumber(), b);
			}
		} catch (Exception e) {
			b.putString(BuyStuffBundleConstants.ERROR_MESSAGE.getText(),
					e.getMessage());
			receiver.send(ServerMessages.STATUS_ERROR.getNumber(), b);
		}
	}

}
