function searchHandler(){
	var query = $("#query").attr("value");
	var cid = $("#searchCat").attr("value");
	/*$.ajax({
		url : "search.html"
	}).done(function(html) {
		$('#main').html(html);
		$("#searchTitle").text(query);
		search(query, cid, req);
	});*/
	window.location.hash='#target=search&cid='+cid+'&query='+query;
	return false;
}

function search(query, cid){
	$('#searchTitle').text(query);
	var req = "<criteria>"+query+"</criteria>";	
	var response = GetProductListByName(req);
	fillProducts(response);
}

function GetProductListByName(req){
	return request("GetProductListByName");
}
