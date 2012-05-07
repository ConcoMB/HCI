function cart(){
	var ord= getOrderList($(user).find("user").attr("id"),$(user).find("token").text());
	ordersToCart(ord);
}
