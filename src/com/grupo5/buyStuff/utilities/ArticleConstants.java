package com.grupo5.buyStuff.utilities;

public enum ArticleConstants {
	
	ACTORS(0), FORMAT(1), LANGUAGE(2), SUBTITLES(3), REGION(4), ASPECT_RATIO(5), NUMBER_DISC(6), RELEASE_DATE(7), RUN_TIME(8), ASIN(9),
	AUTHORS(0), PUBLISHER(1), PUBLISHED_DATE(2), ISBN10(3), ISBN13(4);
	
	private int i;
	
	private ArticleConstants(int i){
		this.i = i;
	}
	
	public int getValue(){
		return i;
	}

}
