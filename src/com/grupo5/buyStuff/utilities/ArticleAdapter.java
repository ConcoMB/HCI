package com.grupo5.buyStuff.utilities;

import java.io.InputStream;
import java.net.URL;
import java.util.List;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.TextView;

import com.grupo5.buyStuff.model.Article;
import com.grupo5.buyStuff.R;

public class ArticleAdapter extends ArrayAdapter<Article> implements ListAdapter {

	private List<Article> articles;
	private Context context;
	
	public ArticleAdapter(Context context, int textViewResourceId,List<Article> objects) {
		super(context, textViewResourceId, objects);
		this.articles = objects;
		this.context = context;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		View rowView = inflater.inflate(R.layout.article_item, parent, true);
		TextView textView = (TextView) rowView.findViewById(R.id.articleText);
		ImageView imageView = (ImageView) rowView.findViewById(R.id.articleThumbnail);
		textView.setText(this.articles.get(position).getName());
		String src = this.articles.get(position).getImgSrc();
		try {
			URL url;
			url = new URL(src);
			Object content = url.getContent();
			Drawable img = Drawable.createFromStream((InputStream) content, "src");
			imageView.setImageDrawable(img);
		} catch (Exception e) {
		}	
		return rowView;
	}

}
