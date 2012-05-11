function cart(){
	var ord= getOrderList($(user).find("user").attr("id"),$(user).find("token").text());
	ordersToCart(ord);
}

function toCartHandler(){
	var order=$("#orderList").attr("value");
	if(order="new"){
		//newOrder();
	}else{
		//ponerlo en esa order
	}
}
