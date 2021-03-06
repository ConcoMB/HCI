package com.grupo5.buyStuff.utilities;

import java.io.Serializable;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.ResultReceiver;

import com.grupo5.buyStuff.services.ArticleMasterService.InnerServerMessages;

public class MyIntent extends Intent {
	private static final String RECEIVER = "receiver";
	private final Intent intent;

	public MyIntent(String action, Uri uri, Context caller, Class<?> service) {
		super(action, null, caller, service);
		intent = this;
	}

	public MyIntent(Intent i) {
		this.intent = i;
	}

	public MyIntent(Context caller, Class<?> service) {
		super(caller, service);
		this.intent = MyIntent.this;
	}

	public void addAttribute(BSBundleConstants name, String value) {
		addAttribute(name.getText(), value);
	}

	public void addAttribute(String name, String value) {
		intent.putExtra(name, value.toString());
	}

	public void addCommand(InnerServerMessages ism) {
		intent.putExtra(BSBundleConstants.COMMAND.getText(),String.valueOf(ism.getNumber()));
	}

	public void addCommand(String name) {
		intent.putExtra(BSBundleConstants.COMMAND.getText(), name);
	}

	public void addReceiver(ResultReceiver rr) {
		intent.putExtra(RECEIVER, rr);
	}

	public ResultReceiver getReceiver() {
		return intent.getParcelableExtra(RECEIVER);
	}

	public String getStringAttribute(String name) {
		return intent.getStringExtra(name);
	}

	public int getIntegerAttribute(String name) {
		return Integer.parseInt(this.getStringAttribute(name));
	}

	public void addAttribute(String name, Serializable product) {
		intent.putExtra(name, product);
	}

}
