package com.grupo5.buyStuff.services;

import java.io.IOException;
import java.io.Serializable;
import java.net.ConnectException;
import java.util.LinkedList;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import android.app.IntentService;
import android.content.Intent;
import android.os.Bundle;
import android.os.ResultReceiver;
import android.text.Html;
import android.util.Log;

import com.grupo5.buyStuff.model.Article;
import com.grupo5.buyStuff.model.Category;
import com.grupo5.buyStuff.utilities.ArticleConstants;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.LanguageManager;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;
import com.grupo5.buyStuff.utilities.ServerXMLConstants;
import com.grupo5.buyStuff.utilities.URLGenerator;
import com.grupo5.buyStuff.utilities.XMLParser;

public class ArticleMasterService extends IntentService {

	private static URLGenerator catalogServer = new URLGenerator("Catalog");

	public ArticleMasterService() {
		super("ArticleMasterService");
	}

	public static List<Category> fetchCategories()
			throws ClientProtocolException, IOException {

		catalogServer.clearParameters();
		catalogServer.addParameter("method", "GetCategoryList");
		catalogServer.addParameter("language_id",
				LanguageManager.getLanguageId());
		HttpResponse response = catalogServer.getServerResponse();

		try {
			List<Category> categories = new LinkedList<Category>();
			XMLParser parser = new XMLParser(response);
			NodeList catNodes = parser.getElements(ServerXMLConstants.CATEGORY.getText());
			for (int i = 0; i < catNodes.getLength(); i++) {
				categories.add(parseCategory(parser, catNodes.item(i)));
			}
			return categories;
		} catch (Exception e) {
			return null;
		}
	}

	private static Category parseCategory(XMLParser parser, Node node) {
		int id = Integer.parseInt(node.getAttributes().getNamedItem(ServerXMLConstants.ID.getText()).getNodeValue());
		String name = Html.fromHtml(parser.getStringFromSingleElement(ServerXMLConstants.NAME.getText(), (Element) node)).toString();
		return new Category(name, id);
	}

	public static List<Category> fetchSubCategories(int categoryId)
			throws ClientProtocolException, IOException {

		catalogServer.clearParameters();
		catalogServer.addParameter("method", "GetSubcategoryList");
		catalogServer.addParameter("language_id",LanguageManager.getLanguageId());
		catalogServer.addParameter("category_id", categoryId + "");
		HttpResponse response = catalogServer.getServerResponse();

		try {
			List<Category> categories = new LinkedList<Category>();
			XMLParser parser = new XMLParser(response);
			NodeList subCatNodes = parser.getElements(ServerXMLConstants.SUBCATEGORY.getText());
			for (int i = 0; i < subCatNodes.getLength(); i++) {
				categories.add(parseCategory(parser, subCatNodes.item(i)));
			}
			return categories;

		} catch (ParserConfigurationException e) {
		} catch (SAXException e) {
		}

		return null;
	}
	private List<Article> fetchArticlesByOrder(int oid) {
		// TODO Auto-generated method stub
		return null;
	}

	public static List<Article> fetchArticlesBySubcategory(int categoryId,
			int subcategoryId) throws IOException {
		catalogServer.clearParameters();

		catalogServer.addParameter("method", "GetProductListBySubcategory");
		catalogServer.addParameter("language_id",LanguageManager.getLanguageId());
		catalogServer.addParameter("category_id", categoryId + "");
		catalogServer.addParameter("subcategory_id", subcategoryId + "");
		HttpResponse response = catalogServer.getServerResponse();

		try {
			List<Article> articles = new LinkedList<Article>();
			XMLParser parser = new XMLParser(response);
			NodeList articleNodes = parser
					.getElements(ServerXMLConstants.ARTICLE.getText());
			for (int i = 0; i < articleNodes.getLength(); i++) {
				articles.add(parseArticle(parser, articleNodes.item(i)));
			}
			return articles;

		} catch (ParserConfigurationException e) {
		} catch (SAXException e) {
		}

		return null;
	}

	private static Article parseArticle(XMLParser parser, Node node) {
		int id = Integer.parseInt(node.getAttributes().getNamedItem(ServerXMLConstants.ID.getText()).getNodeValue());
		String name = Html.fromHtml(parser.getStringFromSingleElement(ServerXMLConstants.NAME.getText(), (Element) node)).toString();
		double price = Double.parseDouble(parser.getStringFromSingleElement(ServerXMLConstants.PRICE.getText(), (Element) node));
		return new Article(id, name, price);
	}

	public static Article fetchArticle(int ArticleId) throws ClientProtocolException, IOException {

		catalogServer.clearParameters();
		catalogServer.addParameter("method", "GetProduct");
		catalogServer.addParameter("product_id", ArticleId + "");
		HttpResponse response = catalogServer.getServerResponse();

		try {
			XMLParser parser = new XMLParser(response);
			Node articleNode = parser.getElements(ServerXMLConstants.ARTICLE.getText()).item(0);
			if (articleNode == null) {
				throw new Exception("Should never happen: unexisting article");
			}
			return parseArticleComplete(parser, articleNode);
		} catch (ParserConfigurationException e) {
		} catch (SAXException e) {
		} catch (Exception e) {
		}

		return null;
	}

	private static Article parseArticleComplete(XMLParser parser, Node node) {
		Article p = parseArticle(parser, node);
		int categoryId = Integer.parseInt(parser.getStringFromSingleElement(ServerXMLConstants.CAT_ID.getText(), (Element) node));
		p.setCategoryId(categoryId);
		int rank = Integer.parseInt(parser.getStringFromSingleElement(ServerXMLConstants.SALES_RANK.getText(), (Element) node));
		p.setSaleRank(rank);
		String imgSrc = parser.getStringFromSingleElement(ServerXMLConstants.IMAGE_SRC.getText(), (Element) node);
		p.setImgSrc(imgSrc);

		if (categoryId == 1) {
			p.setInformation(ArticleConstants.ACTORS.getValue(),parser.getStringFromSingleElement("actors", (Element) node));
			p.setInformation(ArticleConstants.FORMAT.getValue(),parser.getStringFromSingleElement("format", (Element) node));
			p.setInformation(ArticleConstants.LANGUAGE.getValue(), parser.getStringFromSingleElement("language", (Element) node));
			p.setInformation(ArticleConstants.SUBTITLES.getValue(), parser.getStringFromSingleElement("subtitles", (Element) node));
			p.setInformation(ArticleConstants.REGION.getValue(),parser.getStringFromSingleElement("region", (Element) node));
			p.setInformation(ArticleConstants.ASPECT_RATIO.getValue(), parser.getStringFromSingleElement("aspect_ratio", (Element) node));
			p.setInformation(ArticleConstants.NUMBER_DISC.getValue(), parser.getStringFromSingleElement("number_discs", (Element) node));
			p.setInformation(ArticleConstants.RELEASE_DATE.getValue(), parser.getStringFromSingleElement("release_date", (Element) node));
			p.setInformation(ArticleConstants.RUN_TIME.getValue(), parser.getStringFromSingleElement("run_time", (Element) node));
			p.setInformation(ArticleConstants.ASIN.getValue(),parser.getStringFromSingleElement("ASIN", (Element) node));
		} else {
			p.setInformation(ArticleConstants.AUTHORS.getValue(), parser.getStringFromSingleElement("authors", (Element) node));
			p.setInformation(ArticleConstants.PUBLISHER.getValue(), parser.getStringFromSingleElement("publisher", (Element) node));
			p.setInformation(ArticleConstants.PUBLISHED_DATE.getValue(), parser.getStringFromSingleElement("published_date",(Element) node));
			p.setInformation(ArticleConstants.ISBN10.getValue(), parser.getStringFromSingleElement("ISBN_10", (Element) node));
			p.setInformation(ArticleConstants.ISBN13.getValue(), parser.getStringFromSingleElement(	"ISBN_13", (Element) node));
			p.setInformation(ArticleConstants.LANGUAGE.getValue(), parser.getStringFromSingleElement("language", (Element) node));
		}
		return p;
	}

	@Override
	protected void onHandleIntent(Intent intent) {
		MyIntent myIntent = new MyIntent(intent);
		ResultReceiver receiver = myIntent.getReceiver();
		Integer commandNumber = myIntent.getIntegerAttribute(BSBundleConstants.COMMAND.getText());
		Bundle bundle = new Bundle();
		List<Category> categories;
		Log.v("ME LLEGA EL COMMAND NUMBER", String.valueOf(commandNumber));
		try {
			switch (InnerServerMessages.parse(commandNumber)) {
			case LOAD_CATEGORIES:
				categories = fetchCategories();
				if (categories != null) {
					bundle.putSerializable(
							BSBundleConstants.COMMAND.getText(),
							(Serializable) categories);
				} else {
					throw new ConnectException("Connection error");
				}
				break;
			case LOAD_SUBCATEGORIES:
				int id = myIntent
						.getIntegerAttribute(BSBundleConstants.SUBCAT_ID
								.getText());
				categories = fetchSubCategories(id);
				bundle.putSerializable(
						BSBundleConstants.SUBCATEGORIES.getText(),
						(Serializable) categories);
				break;
			case LOAD_ARTICLES_BY_SUBCATEGORY:
				int catId = myIntent
						.getIntegerAttribute(BSBundleConstants.CAT_ID
								.getText());
				int subCatId = myIntent
						.getIntegerAttribute(BSBundleConstants.SUBCAT_ID
								.getText());
				List<Article> articles = fetchArticlesBySubcategory(catId,
						subCatId);
				bundle.putSerializable(BSBundleConstants.ARTICLES.getText(),
						(Serializable) articles);
				break;
			case LOAD_ARTICLE:
				Log.v("Hola", "facu");
				int prodId = myIntent
						.getIntegerAttribute(BSBundleConstants.ARTICLE_ID
								.getText());
				Article p = fetchArticle(prodId);
				bundle.putSerializable(BSBundleConstants.ARTICLE.getText(),
						p);
				break;
			
			case LOAD_ARTICLES_BY_ORDER:
				int oid = myIntent.getIntegerAttribute(BSBundleConstants.ORDER_ID.getText());
				List<Article> arts = fetchArticlesByOrder(oid);
				bundle.putSerializable(BSBundleConstants.SUBCATEGORIES.getText(),(Serializable) arts);
				break;
			}
			
			receiver.send(ServerMessages.STATUS_OK.getNumber(), bundle);
		} catch (IOException ioe) {
			// Log.v("ERROR", e.getMessage());
			bundle.putString(BSBundleConstants.ERROR_MESSAGE.getText(),
					ioe.getMessage());
			receiver.send(ServerMessages.STATUS_ERROR.getNumber(), bundle);
		}
	}



	public enum InnerServerMessages {
		LOAD_CATEGORIES(), LOAD_SUBCATEGORIES(), LOAD_ARTICLES_BY_SUBCATEGORY(), LOAD_ARTICLE(), LOAD_ARTICLES_BY_ORDER();

		private int number;

		private InnerServerMessages() {
			this.number = ServerMessages.getBiggestIndex() + 1 + this.ordinal();
		}

		public int getNumber() {
			return this.number;
		}

		public static InnerServerMessages parse(int resultCode) {
			Log.v("Entro", "entro");
			for (InnerServerMessages svm : values()) {
				Log.v("ISM",
						svm.toString() + " number="
								+ String.valueOf(svm.getNumber()));
				Log.v("Hola", "hola");
				Log.v("JP", String.valueOf(svm.getNumber() == resultCode));
				if (svm.getNumber() == resultCode) {
					Log.v("Salgo", "salgo");
					return svm;
				}
			}
			Log.v("Salgo mal", "salgo mal");
			return null;
		}
	}
}
