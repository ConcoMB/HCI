package com.grupo5.buyStuff.activities;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;

import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.R;

public class SplashScreen extends Activity {
	private static final int STOP = 0;
	private static final int WAIT_MILIS = 2000;

	private Handler splashHandler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			switch (msg.what) {
			case SplashScreen.STOP:
				MyIntent myIntent = new MyIntent(SplashScreen.this,Login.class);
				startActivity(myIntent);
				SplashScreen.this.finish();
				break;
			}
			super.handleMessage(msg);
		}
	};

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		try {
			setContentView(R.layout.splash);
			Message message = new Message();
			message.what = STOP;
			splashHandler.sendMessageDelayed(message, WAIT_MILIS);
		} catch (Exception e) {
		}
	}
}
