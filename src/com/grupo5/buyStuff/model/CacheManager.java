package com.grupo5.buyStuff.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.grupo5.buyStuff.utilities.LanguageManager;

public class CacheManager {
	private static CacheManager instance = null;
	private Session session;
	private List<Category> categories;

	public static CacheManager getInstance() {
		if (instance == null) {
			instance = new CacheManager();
		}
		return instance;
	}

	private CacheManager() {
		categories = new ArrayList<Category>();
	}

	public String[] getCategoryNames() {
		return getCategoryNames(categories);
	}

	public String[] getSubcategoryNames(int index) {
		Category c = null;
		try {
			c = categories.get(index);
		} catch (Exception e) {
		}
		return getCategoryNames(c.getSubcategories());
	}

	private String[] getCategoryNames(List<Category> categories) {
		if (categories == null) {
			return new String[] {};
		}
		String[] categoryNames = new String[categories.size()];
		int i = 0;
		for (Category subCat : categories) {
			categoryNames[i++] = subCat.getName();
		}
		return categoryNames;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public Session getSession() {
		return this.session;
	}

	public void persistSession(String username, String authToken) {
		this.session = new Session(username, authToken);
	}

	public void persistCategories(Collection<Category> categories) {
		this.categories.clear();
		this.categories.addAll(categories);
	}

	public void persistSubcategories(int index, List<Category> subCategories) {
		categories.get(index).setSubcategories(subCategories);
	}

	public boolean loadedCategories() {
		return !this.categories.isEmpty()&& categories.get(0).getLocale().equals(LanguageManager.getLanguageId());
	}

	public boolean loadedSubcategory(int index) {
		Category c = this.categories.get(index);
		return c != null && !c.getSubcategories().isEmpty()&& c.getLocale().equals(LanguageManager.getLanguageId());
	}

}
