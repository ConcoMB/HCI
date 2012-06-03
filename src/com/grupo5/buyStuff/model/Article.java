package com.grupo5.buyStuff.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Article implements Serializable {

	private static final long serialVersionUID = 1L;

	public final static String CURRENCY = "U$D";

	private int id;
	private String imgSrc;
	private String name;
	private double price;
	private float salesRank;
	private List<String> properties;
	private int categoryId;

	public Article(int id, String name, double price) {
		properties = new ArrayList<String>();
		this.id = id;
		this.name = name;
		this.price = price;
	}

	public String getName() {
		return name;
	}

	public double getPrice() {
		return price;
	}

	public String getImgSrc() {
		return imgSrc;
	}

	public int getId() {
		return id;
	}

	public void setInformation(Integer key, String value) {
		properties.add(key, value);
	}

	public String getProperty(Integer key) {
		return properties.get(key);
	}

	public void setSaleRank(float salesRank) {
		this.salesRank = salesRank;
	}

	public float getSalesRank() {
		return salesRank;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setImgSrc(String imgSrc) {
		this.imgSrc = imgSrc;
	}

	@Override
	public String toString() {
		return name + " -- Prop: " + properties.toString();
	}
}