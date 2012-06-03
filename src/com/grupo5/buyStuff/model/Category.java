package com.grupo5.buyStuff.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.grupo5.buyStuff.utilities.LanguageManager;

public class Category {

	private String name;
	private int id;
	private List<Category> subcategories;
	private String locale;

	public Category(String name, int id) {
		this.name = name;
		this.id = id;
		subcategories = new ArrayList<Category>();
		locale = LanguageManager.getLanguageId();
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public List<Category> getSubcategories() {
		return subcategories;
	}

	public void setSubcategories(Collection<Category> subcategories) {
		this.subcategories.clear();
		this.subcategories.addAll(subcategories);
	}

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	@Override
	public String toString() {
		return "[ category: " + name + " subcategories: "
				+ subcategories.toString() + " ]";
	}
}
