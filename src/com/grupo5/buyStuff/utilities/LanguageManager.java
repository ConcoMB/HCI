package com.grupo5.buyStuff.utilities;

import java.util.Locale;

public class LanguageManager {
	public static final String ENGLISH = "1";
	public static final String SPANISH = "2";

	public static String getLanguageId() {
		String language = Locale.getDefault().getDisplayLanguage();
		return language.contains("English") ? ENGLISH : SPANISH;
	}
}
