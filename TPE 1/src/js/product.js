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
	$("#like").attr("src","https://www.facebook.com/plugins/like.php?href=www.hciGrupo5/"+window.location.hash);
	$('#artName').html($(product).find('name').text());
	$('#artPrice').text("$"+ $(product).find('price').text());
	$('#artRank').text($(product).find('sales_rank').text());
	$("#product").data("pid", pid);
	$('.detailImg').attr("src",$(product).find('image_url').text());
	var catID = $(product).find("category_id").text();
	if(catID=="1"){
		//DVD
		$(".book").addClass('hide');
		$("#artActor").text($(product).find("actors").text());
		$("#artFormat").text($(product).find("format").text());
		$("#artlang").text($(product).find("language").text());
		$("#artSubtit").text($(product).find("subtitles").text());
		$("#artRegion").text($(product).find("region").text());
		$("#artAspect").text($(product).find("aspect_ratio").text());
		$("#artDiscs").text($(product).find("number_discs").text());
		$("#artRelease").text($(product).find("release_date").text());
		$("#artRuntime").text($(product).find("run_time").text());
		$("#artASIN").text($(product).find("ASIN").text());
		$(".DVD").accordion({
				collapsible : true,
				active : false
		});
	}else if(catID=="2"){
		//BOOK
		$(".DVD").addClass('hide');
		$("#artAuthors").text($(product).find("authors").text());
		$("#artPublisher").text($(product).find("publisher").text());
		$("#artPDate").text($(product).find("published_date").text());
		$("#artISBN_10").text($(product).find("ISBN_10").text());
		$("#artISBN_13").text($(product).find("ISBN_13").text());
		$("#artLangu").text($(product).find("language").text());
		$(".book").accordion({
				collapsible : true,
				active : false
		});
	}
	if(user){
		var ord= getOrderList();
		updateOrderList(ord,$("#orderList"));
		$("#addToOrder").click(function(){
			var cant=$("#buyCant").attr("value");
			var order=$("#orderList").attr("value");
			toCartHandler(pid, order, cant);
		});
	}else{
		$("#BUY").addClass('hide');
		$(".translate_notLogged").removeClass('hide');
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
				var rank=$(this).find("sales_rank").text();
				var img=$(this).find("image_url").text();
				var div = $(template).clone();
				var nameLink='#target=detail&pid='+pid;
				$(div).find('.artName').html(name).attr('href',nameLink).data('pid', pid);
				$(div).find('.artPrice').text("$"+price);
				$(div).data("pid", pid);
				$(div).find(".ranking").text(rank);
				$(div).find('.articleImg').attr("src",img);
				$(div).find(".prodImg").attr("href", nameLink);
				$(div).find(".like").attr("src","https://www.facebook.com/plugins/like.php?href=www.hciGrupo5/"+nameLink);

				$('#productList').append(div);
				if(user){
					$(div).find(".toTheCartF").submit(function(){
						var order=$(div).find(".orderList").attr("value");
						var cant=$(div).find(".buyCant").attr("value");
						toCartHandler(pid, order, cant);
						return false;
					});
					var or=getOrderList();
					updateOrderList(or, $(div).find(".orderList"));
					
				}else{
					$(div).find(".toTheCart").addClass('hide');
					$(div).find(".translate_notLogged").removeClass('hide');
				}
				translate($('#productList'));
			});
			//$('.artName').click(productClickHandler);
			//translate($('#productList'));
		}
	});
}
