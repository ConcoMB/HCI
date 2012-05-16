function GetProduct(pid){
	var params={
		product_id: pid
	}
	return request('GetProduct', params, 'Catalog');
}
function getProductListBySubcategory(cid, sid, p, ord) {
	var params={
		category_id: cid,
		subcategory_id: sid,
		page: p,
		items_per_page: IPP,
		order:	ord,
		language_id: $(language).find('language').attr('id')
	}
	return request('GetProductListBySubcategory', params, 'Catalog');
}

function getProductListByCategory(cid, p, ord) {
	var params={
		category_id: cid,
		page: p,
		items_per_page: IPP,
		order:	ord,
		language_id: $(language).find('language').attr('id')
	}
	return request('GetProductListByCategory', params, 'Catalog');
}

/*function productClickHandler(){
	var name=$(this).text();
	var pid=$(this).data('pid');
	$.ajax({
		url : "detail.html"
	}).done(function(html) {
		$('#main').html(html);
		updateProduct(pid);
		$("#BUY").submit(addToOrderHandler);
		translate($('#product'));
	});
}*/

function updateProduct(pid){
	var product=GetProduct(pid);
	$('#artName').text($(product).find('name').text());
	$('#artPrice').text($(product).find('price').text());
	$('#artRank').text($(product).find('sales_rank').text());
	$("#product").data("pid", pid);
	var catID = $(product).find("category_id").text();
	if(catID=="1"){
		//DVD
		$(".book").css("display","none");
		$("#artActor").text($(product).find("actors").text());
		$("#artFormat").text($(product).find("format").text());
		$("#artlang").text($(product).find("language").text());
		$("#artSubtit").text($(product).find("subtitles").text());
		$("#artRegion").text($(product).find("region").text());
		$("#artAspect").text($(product).find("aspect_ratio").text());
		$("#artDiscs").text($(product).find("numer_discs").text());
		$("#artRelease").text($(product).find("release_date").text());
		$("#artRuntime").text($(product).find("run_time").text());
		$("#artASIN").text($(product).find("ASIN").text());
	}else if(catID=="2"){
		//BOOK
		$(".DVD").css("display","none");
		$("#artAuthors").text($(product).find("authors").text());
		$("#artPublisher").text($(product).find("publisher").text());
		$("#artPDate").text($(product).find("published_date").text());
		$("#artISBN_10").text($(product).find("ISBN_10").text());
		$("#artISBN_13").text($(product).find("ISBN_13").text());
		$("#artLangu").text($(product).find("language").text());
	}
	if(user){
		var ord= getOrderList($(user).find("user").attr("id"),$(user).find("token").text());
		updateOrderList(ord,$("#orderList"));
		$("#addToOrder").click(function(){
			var cant=$("#buyCant").attr("value");
			var order=$("#orderList").attr("value");
			toCartHandler(pid, order, cant);
		});
	}else{
		$("#BUY").css("visibility", "hidden");
		$(".notLogged").css("visibility", "visible");
	}
}

function fillProducts(products) {
	$.ajax({
		type : "GET",
		url : "product.html",
		dataType : "html",
		success : function(template) {
			$(products).find('product').each(function() {
				var name = $(this).find('name').text();
				var price = $(this).find('price').text();
				var pid = $(this).attr('id');
				var div = $(template).clone();
				var nameLink='#target=detail&pid='+pid;
				$(div).find('.artName').text(name).attr('href',nameLink).data('pid', pid);
				$(div).find('.artPrice').text(price);
				$(div).data("pid", pid);
				$('#productList').append(div);
				if(user){
					$(div).find(".toTheCartF").submit(function(){
						var order=$(div).find(".orderList").attr("value");
						var cant=$(div).find(".buyCant").attr("value");
						toCartHandler(pid, order, cant);
					});
					var or=getOrderList($(user).find("user").attr("id"), $(user).find("token").text());
					updateOrderList(or, $(div).find(".orderList"));
				}else{
					$(div).find(".toTheCart").css("visibility", "hidden");
					$(div).find(".notLogged").css("visibility", "visible");
				}
				translate($('#productList'));
			});
			//$('.artName').click(productClickHandler);
			//translate($('#productList'));
		}
	});
}
