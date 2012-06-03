package com.grupo5.buyStuff.utilities;

public enum ServerXMLConstants {
	ARTICLE("product"), NAME("name"), CATEGORY("category"), ID("id"), 
	SUBCATEGORY("subcategory"), PRICE("price"), CAT_ID("category_id"), 
	SALES_RANK("sales_rank"), IMAGE_SRC("image_url"), AUTH_TOKEN("token"), 
	PRODUCT_ID("product_id"), ARTICLES("products"), ERROR_MESSAGE("errorMessage"), 
	ORDER("order"), LATITUDE("latitude"), LONGITUDE("longitude"), STATUS("status"), 
	CREATED_DATE("created_date");

	private String s;

	private ServerXMLConstants(String s) {
		this.s = s;
	}

	public String getText() {
		return this.s;
	}
}
