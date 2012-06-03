package com.grupo5.buyStuff.utilities;

public enum ServerMessages {

	STATUS_CONNECTION_ERROR(-1), STATUS_ERROR(0), STATUS_OK(1);

	private int number;
	private static Integer biggestIndex = null;

	private ServerMessages(int number) {
		this.number = number;
	}

	public int getNumber() {
		return number;
	}

	public static ServerMessages parse(int resultCode) {
		for (ServerMessages svm : values()) {
			if (svm.getNumber() == resultCode) {
				return svm;
			}
		}
		return null;
	}

	public static int getBiggestIndex() {
		if (biggestIndex == null) {
			for (ServerMessages svm : values()) {
				if (biggestIndex == null) {
					biggestIndex = svm.getNumber();
				} else {
					biggestIndex = Math.max(biggestIndex, svm.getNumber());
				}
			}
		}
		return biggestIndex;
	}

}
