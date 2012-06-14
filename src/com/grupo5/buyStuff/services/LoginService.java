package com.grupo5.buyStuff.services;

import java.io.IOException;
import java.net.SocketTimeoutException;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;

import android.app.IntentService;
import android.content.Intent;
import android.os.Bundle;
import android.os.ResultReceiver;
import android.util.Log;

import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;
import com.grupo5.buyStuff.utilities.ServerXMLConstants;
import com.grupo5.buyStuff.utilities.URLGenerator;
import com.grupo5.buyStuff.utilities.XMLParser;

public class LoginService extends IntentService {

	public static final String DO_LOGIN = "doLogin";

	private final String TAG = getClass().getSimpleName();

	public LoginService() {
		super("LoginService");
	}

	@Override
	protected void onHandleIntent(Intent intent) {
		MyIntent myIntent = new MyIntent(intent);
		ResultReceiver receiver = myIntent.getReceiver();
		String command = myIntent.getStringAttribute(BSBundleConstants.COMMAND.getText());
		String user = myIntent.getStringAttribute(BSBundleConstants.USERNAME.getText());
		String password = myIntent.getStringAttribute(BSBundleConstants.PASSWORD.getText());
		Bundle b = new Bundle();
		try {
			if (command.equals(DO_LOGIN)) {
				if (doLogin(receiver, b, user, password)) {
					receiver.send(ServerMessages.STATUS_OK.getNumber(), b);
				} else {
					receiver.send(ServerMessages.STATUS_ERROR.getNumber(), b);
				}
			}
		} catch (SocketTimeoutException e) {
			Log.e(TAG, e.getMessage());
			receiver.send(ServerMessages.STATUS_CONNECTION_ERROR.getNumber(), b);
		} catch (Exception e) {
			Log.e(TAG, e.getMessage());
			receiver.send(ServerMessages.STATUS_ERROR.getNumber(), b);
		}
	}

	private boolean doLogin(ResultReceiver r, Bundle b, String userName,String password) throws IOException, ClientProtocolException {
		 URLGenerator security = new URLGenerator("Security");
		 security.addParameter("method", "SignIn");
		 security.addParameter("username", userName);
		 security.addParameter("password", password); 
		 HttpResponse response = security.getServerResponse();
		try {
			XMLParser xp = new XMLParser(response);
			return this.checkLogin(b, xp);
		} catch (Exception e) {
		}
		return false;

	}

	private boolean checkLogin(Bundle b, XMLParser xp) {
		if (xp.getErrorMessage() != null) {
			b.putString(BSBundleConstants.ERROR_MESSAGE.getText(),xp.getErrorMessage());
			return false;
		}
		b.putString(BSBundleConstants.AUTH_TOKEN.getText(), xp.getStringFromSingleElement(ServerXMLConstants.AUTH_TOKEN.getText()));
		return true;
	}

}
