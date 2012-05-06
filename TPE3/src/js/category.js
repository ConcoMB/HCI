/*CATEGORY LISTS*/

function getCategoryList() {
	return request('categoryList');
}

function getSubcategoryList(categoryID) {
	return request('subcategoryList');
}

function updateCategoryList() {
	var categories = getCategoryList();
	$(categories).find('category').each(function() {
		var cname = $(this).find('name').text();
		var cid = $(this).attr('id');
		var div = $('<div></div>').addClass('subCat');
		var a = $('<a></a>').addClass('category').attr('href', '#').text(cname).data('cid', cid);
		var h3 = $('<h3></h3>');
		h3.append(a);
		$("#searchCat").append($("<option></option>").text(cname).attr("value", cid));
		var subcategories = getSubcategoryList($(this).attr('id'));

		$(subcategories).find('subcategory').each(function() {
			var sub = $('<a></a>').addClass('subcategory').attr('href', '#').text($(this).find('name').text());
			sub.data('sid', $(this).attr('id'));
			sub.data('cid', $(this).find('category_id').text());
			sub.data('cname', cname);
			div.append(sub, '<br>');
			$("#searchCat").append($("<option></option>").text(cname + " -> " + sub.text()).attr("value", $(this).attr('id')));
		});

		$('#accordion').append(h3, div);
	});

}

/*CATEGORY PRODUCTS*/

function getProductListBySubcategory(cid, sid, page) {
	return request('productList');
}

function getProductListByCategory(cid, page) {
	return request('productList');
}

function subcategoryClickHandler() {
	var name = $(this).text();
	var sid = $(this).data('sid');
	var cid = $(this).data('cid');
	var cname = $(this).data('cname');
	$.ajax({
		url : "category.html"
	}).done(function(html) {
		$('#main').html(html);
		$("#subcategoryName").text(name);
		$("#categoryName").text(cname);
		updateProductList(cid, sid, 1);
	});
}

function categoryClickHandler() {
	var name = $(this).text();
	var cid = $(this).data('cid');
	$.ajax({
		url : "category.html"
	}).done(function(html) {
		$('#main').html(html);
		$("#categoryName").text(name);
		updateProductList(cid, null, 1);
	});
}

function updateProductList(cid, sid, page) {
	var products;
	if(!sid) {
		products = getProductListByCategory(cid, page);
	} else {
		products = getProductListBySubcategory(cid, sid, page);
	}
	fillProducts(products);
}


