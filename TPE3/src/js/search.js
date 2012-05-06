function searchHandler(){
	var query = $("#query").attr("value");
	var cid = $("#searchCat").attr("value");
	var req = "<criteria>"+query+"</criteria>";	
	$.ajax({
		url : "search.html"
	}).done(function(html) {
		$('#main').html(html);
		$("#searchTitle").text(query);
		search(query, cid, req);
	});
}

function search(query, cid, req){
	var response = getProductListByName(req);
	fillProducts(response);
}

function getProductListByName(req){
	return request("search");
}
