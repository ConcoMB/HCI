package com.grupo5.buyStuff.fragments;

import java.io.Serializable;

import android.app.Fragment;
import android.app.ListFragment;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.text.Html;
import android.util.Log;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Adapter;
import android.widget.ArrayAdapter;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.grupo5.buyStuff.R;
import com.grupo5.buyStuff.activities.ListingArticles;
import com.grupo5.buyStuff.model.CacheManager;
import com.grupo5.buyStuff.model.Category;
import com.grupo5.buyStuff.services.ArticleMasterService;
import com.grupo5.buyStuff.utilities.BSBundleConstants;
import com.grupo5.buyStuff.utilities.Listable;
import com.grupo5.buyStuff.utilities.MyIntent;
import com.grupo5.buyStuff.utilities.ServerMessages;

public class SubcategoryList extends ListFragment implements Listable{
	int cat;

	@Override
	public void onStart() {
		super.onStart();

		Bundle recdData = getActivity().getIntent().getExtras();
		String[] s ={};
		if(recdData!=null){
			int catPosition = Integer.parseInt(recdData.getString(BSBundleConstants.CAT_POSITION.getText()));
			String breadCrumb = recdData.getString(BSBundleConstants.PATH.getText());
			getActivity().setTitle(Html.fromHtml(breadCrumb + " > "));
			CacheManager catManager = CacheManager.getInstance();
			s=catManager.getSubcategoryNames(catPosition);
			cat=catPosition;
		}
		setListAdapter(new ArrayAdapter<String>(getActivity(), R.layout.list_item,R.id.listText, s));
		ListView lv = getListView();
		lv.setTextFilterEnabled(true);
		Animation a = AnimationUtils.makeInAnimation(getActivity().getBaseContext(), false);
		a.setDuration(500);
		lv.setAnimation(a);
	}

	public void fill(Object o){
		int catPosition=(Integer)o;
		Log.v("subcat:",""+catPosition);
		CacheManager catManager = CacheManager.getInstance();
		ArrayAdapter<String> adapter=new ArrayAdapter<String>(getActivity(), R.layout.list_item,R.id.listText, catManager.getSubcategoryNames(catPosition));
		setListAdapter(adapter);
		adapter.notifyDataSetChanged();
		cat=catPosition;
	}

	@Override
	public void onListItemClick(ListView l, View view, int position, long id) {
		CharSequence text = ((TextView) view.findViewById(R.id.listText)).getText();
		Toast.makeText(getActivity().getApplicationContext(), text, Toast.LENGTH_SHORT).show();
		loadProductList(position);
	}

	private void loadProductList(final int subCatIndex) {
		
		//	Bundle data = getActivity().getIntent().getExtras();
		
		int catIndex = cat;
		MyIntent myIntent = new MyIntent(Intent.ACTION_SYNC, null, getActivity(),ArticleMasterService.class);
		myIntent.addCommand(ArticleMasterService.InnerServerMessages.LOAD_ARTICLES_BY_SUBCATEGORY);
		Category category = CacheManager.getInstance().getCategories().get(catIndex);
		int catId = category.getId();
		int subCatId = category.getSubcategories().get(subCatIndex).getId();
		myIntent.addAttribute(BSBundleConstants.CAT_ID.getText(),String.valueOf(catId));
		myIntent.addAttribute(BSBundleConstants.SUBCAT_ID.getText(),String.valueOf(subCatId));
		myIntent.addReceiver(new MyResultReceiver(new Handler(), category,subCatIndex));
		getActivity().startService(myIntent);
	}

	public class MyResultReceiver extends ResultReceiver {
		private final Category category;
		private final int subCatIndex;

		MyResultReceiver(Handler h, Category category, int subCatIndex) {
			super(h);
			this.category = category;
			this.subCatIndex = subCatIndex;
		}

		@Override
		protected void onReceiveResult(int resultCode, Bundle resultData) {
			super.onReceiveResult(resultCode, resultData);
			switch (ServerMessages.parse(resultCode)) {
			case STATUS_OK:
				Serializable productList = resultData.getSerializable(BSBundleConstants.ARTICLES.getText());
				MyIntent myIntent = new MyIntent(getActivity(),ListingArticles.class);
				myIntent.addAttribute(BSBundleConstants.ARTICLES.getText(),productList);
				myIntent.addAttribute(BSBundleConstants.PATH.getText(),getActivity().getTitle().toString()+ category.getSubcategories().get(subCatIndex).getName() + " > ");	
				Listable lis = (Listable) getFragmentManager().findFragmentById(R.id.articlef);
				if(lis==null || !((Fragment)lis).isInLayout()){
					startActivity(myIntent);					
				}else{
					lis.fill(productList);	
				}
				break;
			case STATUS_ERROR:
				CharSequence text = getText(R.string.connectionError);
				Toast.makeText(getActivity().getApplicationContext(), text,Toast.LENGTH_SHORT).show();
				break;
			}
		}
	}
}
