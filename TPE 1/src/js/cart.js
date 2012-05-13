function cart(){
	var ord= getOrderList($(user).find("user").attr("id"),$(user).find("token").text());
	ordersToCart(ord);
}

function toCartHandler(product, order, cant){
	var sendXML="<order_item><product_id>"+product+"</product_id><count>"+cant+"</count></order_item>";
	if(order=="new"){
		var aux=CreateOrder();
		var err=parseError(aux);
		if(!err){
			order=$(aux).find("order").attr("id");
		}else{
			alert(err);
		}
	}
	err=AddOrderItem(order, sendXML);
	err=parseError(err);
	if(err){
		alert(err);
	}else{
		alert("Product added to order");
	}
}

