function getProduct(pid){
	return request('product');
}

function productClickHandler(){
	var name=$(this).text();
	var pid=$(this).data('pid');
	$.ajax({
		url : "detail.html"
	}).done(function(html) {
		$('#main').html(html);
		updateProduct(pid);
	});
}

function updateProduct(pid){
	var product=getProduct(pid);
	$('#artName').text($(product).find('name').text());
	$('#artPrice').text($(product).find('price').text());
	$('#artRank').text($(product).find('sales_rank').text());
	$('#artDesc').text($(product).find('actors').text());
}
