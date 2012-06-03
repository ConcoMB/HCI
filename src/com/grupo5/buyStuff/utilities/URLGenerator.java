package com.grupo5.buyStuff.utilities;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

public class URLGenerator {
	private final String baseUrl = "http://eiffel.itba.edu.ar/hci/service/";
	private String url;
	private Map<String, String> arguments;

	public URLGenerator(String service) {
		this.url = this.baseUrl.concat(service).concat(".groovy");
		this.arguments = new HashMap<String, String>();
	}

	public void addParameter(String key, String value) {
		if (this.arguments.get(key) == null) {
			this.arguments.put(key, value);
		}
	}

	public String getFullUrl() {
		return this.url.concat(this.argsToString());
	}

	private String argsToString() {
		String out = "";
		Boolean first = true;
		Iterator<Map.Entry<String, String>> it = this.arguments.entrySet().iterator();

		while (it.hasNext()) {
			Map.Entry<String, String> keyVal = it.next();
			if (first == true) {
				out += "?" + keyVal.getKey().toString() + "="
						+ keyVal.getValue().toString();
				first = false;
			} else {
				out += "&" + keyVal.getKey().toString() + "="
						+ keyVal.getValue().toString();
			}
		}
		return out;
	}

	public HttpResponse getServerResponse() throws ClientProtocolException,
			IOException {
		DefaultHttpClient client = new DefaultHttpClient();
		return client.execute(new HttpGet(this.getFullUrl()));
	}

	public void clearParameters() {
		arguments.clear();
	}

}
