package com.grupo5.buyStuff.activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.view.KeyEvent;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.grupo5.buyStuff.model.CacheManager;
import com.grupo5.buyStuff.services.LoginService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;
import com.grupo5.buyStuff.R;

public class Login extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.login_layout);
		((EditText) findViewById(R.id.usernameInput)).setLines(1);
		((EditText) findViewById(R.id.usernameInput)).setMaxLines(1);
	}

	public void login(View button) {
		this.startLoginService();
	}

	public void startLoginService() {
		String username = ((EditText) findViewById(R.id.usernameInput))
				.getText().toString();
		String password = ((EditText) findViewById(R.id.passwordInput))
				.getText().toString();

		MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null, this,
				LoginService.class);
		myIntent.addAttribute(BSBundleConstants.USERNAME.getText(), username);
		myIntent.addAttribute(BSBundleConstants.PASSWORD.getText(), password);
		myIntent.addCommand(LoginService.DO_LOGIN);
		myIntent.addReceiver(new MyResultReceiver(new Handler(), username));
		startService(myIntent);
	}

	private class MyResultReceiver extends ResultReceiver {
		private final String name;

		MyResultReceiver(Handler h, String name) {
			super(h);
			this.name = name;
		}

		@Override
		protected void onReceiveResult(int resultCode, Bundle resultData) {
			super.onReceiveResult(resultCode, resultData);
			ServerMessages svm = ServerMessages.parse(resultCode);
			switch (svm) {
			case STATUS_OK:
				MyIntent myIntent = new MyIntent(Login.this, Menu.class);
				myIntent.addAttribute(BSBundleConstants.USERNAME.getText(),
						name);
				myIntent.addAttribute(
						BSBundleConstants.AUTH_TOKEN.getText(), resultData
								.getString(BSBundleConstants.AUTH_TOKEN
										.getText()));
				CacheManager.getInstance().persistSession(
						name,
						resultData.getString(BSBundleConstants.AUTH_TOKEN
								.getText()));
				startActivity(myIntent);
				Login.this.finish();
				break;
			case STATUS_CONNECTION_ERROR:
				break;
			case STATUS_ERROR:
				if (resultData.containsKey(BSBundleConstants.ERROR_MESSAGE
						.getText())) {
					String errorMessage = resultData
							.getString(BSBundleConstants.ERROR_MESSAGE
									.getText());
					Toast.makeText(getApplicationContext(), errorMessage,
							Toast.LENGTH_LONG).show();
				}
				break;
			default:
				break;
			}
		}
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}

}
