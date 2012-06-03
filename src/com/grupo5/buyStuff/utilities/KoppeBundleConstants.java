package com.grupo5.buyStuff.utilities;

public enum KoppeBundleConstants {
	ARTICLE("article"), ARTICLES("articles"), CAT_ID("categoryId"), SUBCAT_ID(
			"subcategoryId"), CAT_POSITION("categoryPos"), PATH(
			"path"), CATEGORIES("categories"), SUBCATEGORIES(
			"subcategories"), USERNAME("username"), PASSWORD("password"), AUTH_TOKEN(
			"authToken"), ERROR_MESSAGE("errorMessage"), TYPE("type"), ID("id"), ORDER(
			"order"), COMMAND("command"), ARTICLE_ID("productId"), ORDER_ID(
			"orderId"), UPDATED("updated"), YES("yes");

	private String s;

	private KoppeBundleConstants(String s) {
		this.s = s;
	}

	public String getText() {
		return this.s;
	}
}
