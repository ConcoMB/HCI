function GetProduct(pid){
	return request('GetProduct');
}
function getProductListBySubcategory(cid, sid, page) {
	return request('productList');
}

function getProductListByCategory(cid, page) {
	return request('productList');
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
	$('#artDesc').text($(product).find('actors').text());
	$("#product").data("pid", pid);
	if(user){
		var ord= getOrderList($(user).find("user").attr("id"),$(user).find("token").text());
		updateOrderList(ord,$("#orderList"));
	}else{
		$("#BUY").css("visibility", "hidden");
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
					$(div).find("#toTheCart").submit(toTheCartHandler);
					var or=getOrderList($(user).find("user").attr("id"), $(user).find("token").text());
					updateOrderList(or, $(div).find("#orderList"));
				}else{
					$(div).find("#toTheCart").css("visibility", "hidden");
				}
				translate($('#productList'));
			});
			//$('.artName').click(productClickHandler);
			//translate($('#productList'));
		}
	});
}