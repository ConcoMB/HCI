function searchHandler() {
	var query = $("#query").attr("value");
	var value = $("#searchCat").attr("value");
	var array = value.split('.');
	var cid = array[0];
	var sid = array[1];
	/*$.ajax({
	 url : "search.html"
	 }).done(function(html) {
	 $('#main').html(html);
	 $("#searchTitle").text(query);
	 search(query, cid, req);
	 });*/
	window.location.hash = '#target=search&page=1&order=ASC&cid=' + cid + ( sid ? ('&sid=' + sid) : '') + '&query=' + query;
	return false;
}

function search(query, cid, sid, page, order) {
	$('#searchTitle').text(query);
	var response = GetProductListByName(query, order, page);
	$('#numberResults').text($(response).find('products').attr('size') + ' ');
	if(cid != -1) {
		$(response).find('product').each(function() {
			if($(this).find('category_id').text() != cid) {
				$(this).remove();
			} else if(sid && $(this).find('subcategory_id').text() != sid) {
				$(this).remove();
			}
		});
	}
	fillProducts(response);
	updatePages(page, $(response).find('products').attr('size'));
	updateSort(order);
}

function GetProductListByName(crit, ord, p) {
	var params = {
		criteria : crit,
		order : ord,
		items_per_page : IPP,
		page : p
	};
	return request("GetProductListByName", params, 'Catalog');
}

function updateSearchAutocomplete() {
	var names = new Array();
	$('#searchCat').find('option').each(function() {
		var id = $(this).val();
		if(id >= 0 && id % 1 == 0) {
			var path = 'service/Catalog.groovy?method=GetProductListByCategory&category_id=' + id + '&language_id=' + $(language).find('language').attr('id');
			//alert(path);
			$.ajax({
				type : "GET",
				url : path,
				contentType : "text/html; charset=iso-8859-1",
				dataType : "xml",
				success : function(xml) {
					$(xml).find('name').each(function() {
						names.push($(this).text());
					});
					$('#query').autocomplete({
						source : names,
						appendTo : '#autoc',
						open : function() {
							$('#input').autocomplete("widget").width(300);
						}
					});
				}
			});
		}
	});
}
