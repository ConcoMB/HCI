/*CATEGORY LISTS*/

function getCategoryList() {
	var params = {
		language_id : $(language).find('language').attr('id')
	}
	return request('GetCategoryList', params, 'Catalog');
}

function getSubcategoryList(categoryID) {
	var params = {
		category_id : categoryID,
		language_id : $(language).find('language').attr('id')
	}
	return request('GetSubcategoryList', params, 'Catalog');
}

function updateCategoryList() {
	var categories = getCategoryList();
	$(categories).find('category').each(function() {
		var cname = $(this).find('name').text();
		var cid = $(this).attr('id');
		var div = $('<div></div>').addClass('subCat');
		var href = '#target=category&page=1&order=ASC&cname=' + cname + '&cid=' + cid;
		var a = $('<a></a>').addClass('subcategory, translate_all').attr('href', href).attr('id', -1);
		var h3 = $('<h3></h3>').addClass('category');
		h3.append($('<a></a>').html(cname).attr('href', '#').attr('id', cid));
		div.append(a, '<br>');
		$("#searchCat").append($("<option></option>").html(cname).attr("value", cid).attr("id","search"+cid));
		var subcategories = getSubcategoryList($(this).attr('id'));

		$(subcategories).find('subcategory').each(function() {
			var sid = $(this).attr('id');
			var sname = $(this).find('name').text();
			var sub = $('<a></a>').addClass('subcategory').attr('href', href + '&sid=' + sid + '&sname=' + sname).html(sname)
			$(sub).attr('id', cid + "." + sid);
			sub.data('sid', sid);
			sub.data('cid', $(this).find('category_id').text());
			sub.data('cname', cname);
			div.append(sub, '<br>');
			$("#searchCat").append($("<option></option>").html(cname + " -> " + sub.text()).attr("value", cid + '.' + sid).attr("id", "search"+cid + '.' + sid));
		});

		$('#accordion').append(h3, div);
	});
}

function translateCategories() {
	var categories = getCategoryList();
	$(categories).find('category').each(function() {
		var cname = $(this).find('name').text();
		var cid = $(this).attr('id');
		var cat=document.getElementById(cid)
		$(cat).text(cname);
		//.text(cname);
		var sear=document.getElementById("search"+cid);
		$(sear).text(cname);		
		var subcategories = getSubcategoryList($(this).attr('id'));
		$(subcategories).find('subcategory').each(function() {
			var sid = $(this).attr('id');
			var sname = $(this).find('name').text();
			var sub=document.getElementById(cid+"."+sid);
			$(sub).text(sname);
			//$(cid + "." + sid).text(sname);
			var search=document.getElementById("search"+cid + '.' + sid);
			$(search).text(cname + " -> " + sname);
			//.text(cname + " -> " +sid);
		});
	});

}

/*CATEGORY PRODUCTS*/

/*function subcategoryClickHandler() {
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
 }*/

function categoryClickHandler() {
	/*var name = $(this).text();
	 var cid = $(this).data('cid');
	 $.ajax({
	 url : "category.html"
	 }).done(function(html) {
	 $('#main').html(html);
	 $("#categoryName").text(name);
	 updateProductList(cid, null, 1);
	 });*/
	window.location.hash = $(this).attr('href');
}

function category(cname, sname, cid, sid, page, order) {
	updateProductList(cid, sid, page, order);
	$('#categoryName').html(cname);
	$("#subcategoryName").text(sname);
	updateSort(order);
}

function updateProductList(cid, sid, page, order) {
	var products;
	if(!sid) {
		products = getProductListByCategory(cid, page, order);
	} else {
		products = getProductListBySubcategory(cid, sid, page, order);
	}
	fillProducts(products);
	updatePages(page, $(products).find('products').attr('size'));
}

