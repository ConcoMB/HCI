function cart(){
	var ord= getOrderList($(user).find("user").attr("id"),$(user).find("token").text());
	ordersToCart(ord);
}

function toCartHandler(product, order, cant){
	var sendXML="<order_item><product_id>"+product+"</product_id><count>"+cant+"</count></order_item>";
	if(order="new"){
		order=$(CreateOrder()).find("order").attr("id");
	}
	AddOrderItem(order, sendXML);
}

