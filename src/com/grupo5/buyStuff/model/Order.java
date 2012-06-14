package com.grupo5.buyStuff.model;

import java.io.Serializable;

import android.content.Context;

import com.grupo5.buyStuff.R;

@SuppressWarnings("serial")
public class Order implements Serializable {
	private String id;
	private String latitude;
	private String longitude;
	private String status;
	private static Context context;
	private String createdDate;

	public Order(Context context) {
		Order.context = context;
	}

	public String getId() {
		return id;
	}

	public String getLatitude() {
		return latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public String getStatus() {
		return status;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatusName() {
		return OrderStates.parse(Integer.valueOf(getStatus())).getName();
	}

	public String getShippedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public enum OrderStates {
		CREATED( context.getString(R.string.created)), CONFIRMED(context.getString(R.string.confirmed)), 
		TRANSPORTED(context.getString(R.string.transported)), DELIVERED(context.getString(R.string.delivered));

		private int code;
		private String name;

		private OrderStates(String name) {
			this.code = this.ordinal()+1;
			this.name = name;
		}

		public static OrderStates parse(Integer i) {
			for (OrderStates o : values()) {
				if (i.equals(o.getCode())) {
					return o;
				}
			}
			return null;
		}

		public int getCode() {
			return this.code;
		}

		public String getName() {
			return this.name;
		}
	}
}
