function cart(){
	var ord= getOrderList($(user).find("user").attr("id"),$(user).find("token").text());
	ordersToCart(ord);
}

function toCartHandler(){
	var order=$("#orderList").attr("value");
	var product = window.location.hash.split("pid=");
	product=product[1];
	var howMany = $("#buyCant").attr("value"); 
	var sendXML="<order_item><product_id>"+product+"</product_id><count>"+howMany+"</count></order_item>";
	if(order="new"){
		order=$(CreateOrder()).find("order").attr("id");
	}
	AddOrderItem(order, sendXML);
}

