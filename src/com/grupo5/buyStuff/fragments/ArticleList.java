package com.grupo5.buyStuff.fragments;

import java.io.Serializable;
import java.util.List;

import android.app.ListActivity;
import android.app.ListFragment;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.text.Html;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.inputmethod.InputMethodManager;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.activities.Menu;
import com.grupo5.buyStuff.activities.ShowingArticle;
import com.grupo5.buyStuff.model.Article;
import com.grupo5.buyStuff.services.ArticleMasterService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.Listable;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;

public class ArticleList extends ListFragment implements Listable{

	private static final int MAX_TEXT_LENGTH = 20;
	private List<Article> articles;

	@Override
	public void onStart() {
		super.onStart();
		String[] products = {};
		Bundle data = getActivity().getIntent().getExtras();
		if(data!=null){
			articles = (List<Article>) data.getSerializable(BSBundleConstants.ARTICLES.getText());
			products=getArticleNames();
			String path = data.getString(BSBundleConstants.PATH.getText());
			Log.v("EMEPZO", "empezo");
			if (path != null) {
				getActivity().setTitle(Html.fromHtml(path));
			}
			
		}
		setListAdapter(new ArrayAdapter<String>(getActivity(), R.layout.list_item,R.id.listText, products));
		ListView listView = getListView();
		listView.setTextFilterEnabled(true);
		Animation animation = AnimationUtils.makeInAnimation(getActivity().getBaseContext(),false);
		animation.setDuration(500);
		listView.setAnimation(animation);
	}

	public void fill(Object o){
		articles = (List<Article>)o;
		String[] products = getArticleNames();
		setListAdapter(new ArrayAdapter<String>(getActivity(), R.layout.list_item,R.id.listText, products));
	}

	@Override
	public void onListItemClick(ListView l, View view, int position, long id) {
		loadArticle(articles.get(position).getId());
	}

	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_MENU) {
			MyIntent myIntent = new MyIntent(getActivity(), Menu.class);
			myIntent.putExtras(getActivity().getIntent());
			startActivity(myIntent);
			return true;
		}

		if (keyCode == KeyEvent.KEYCODE_SEARCH) {
			((InputMethodManager) getActivity().getSystemService(ListActivity.INPUT_METHOD_SERVICE)).toggleSoftInput(0, 0);
			return true;
		}
		return getActivity().onKeyDown(keyCode, event);
	}

	public boolean onKeyLongPress(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_SEARCH) {
			return getActivity().onKeyDown(keyCode, event);
		}
		return getActivity().onKeyLongPress(keyCode, event);
	}

	private void loadArticle(int prodId) {
		MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null, getActivity(),ArticleMasterService.class);
		Log.v("article:",""+ArticleMasterService.InnerServerMessages.LOAD_ARTICLE.getNumber());
		myIntent.addAttribute(BSBundleConstants.COMMAND.getText(), String.valueOf(ArticleMasterService.InnerServerMessages.LOAD_ARTICLE.getNumber()));
		myIntent.addAttribute(BSBundleConstants.ARTICLE_ID.getText(), String.valueOf(prodId));
		myIntent.addReceiver(new ResultReceiver(new Handler()) {
			@Override
			protected void onReceiveResult(int resultCode, Bundle resultData) {
				super.onReceiveResult(resultCode, resultData);
				switch (ServerMessages.parse(resultCode)) {
				case STATUS_OK:
					Serializable article = resultData.getSerializable(BSBundleConstants.ARTICLE.getText());
					MyIntent myIntent = new MyIntent(getActivity(),ShowingArticle.class);
					myIntent.addAttribute(BSBundleConstants.ARTICLE.getText(),article);
					myIntent.addAttribute(BSBundleConstants.PATH.getText(), getActivity().getTitle().toString()+ ((Article) article).getName());
					startActivity(myIntent);
					break;
				case STATUS_ERROR:
					CharSequence text = getText(R.string.connectionError);
					Toast.makeText(getActivity().getApplicationContext(), text,Toast.LENGTH_SHORT).show();
					break;
				}
			}
		});
		getActivity().startService(myIntent);
	}

	private String[] getArticleNames() {
		String[] articleNames = new String[articles.size()];
		int i = 0;
		String text;
		for (Article article : articles) {
			text = article.getName();
			if (text.length() > MAX_TEXT_LENGTH) {
				text = text.substring(0, MAX_TEXT_LENGTH) + "...";
			}
			articleNames[i++] = text;
		}
		return articleNames;
	}

}
