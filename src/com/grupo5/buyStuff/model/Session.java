package com.grupo5.buyStuff.model;

public class Session {
	private String username;
	private String authToken;

	public Session(String username, String authToken) {
		this.username = username;
		this.authToken = authToken;
	}

	public String getUsername() {
		return username;
	}

	public String getAuthToken() {
		return authToken;
	}

}
