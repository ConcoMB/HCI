function cartClickHandler(){
	$('#main').load('cart.html');
	var ord= getOrderList($(user).find("user").attr("id"),$(user).find("token").text());
}
