function cart() {
	var ord = getOrderList();
	var err = parseError(ord);
	if(err) {
		orderError(err);
	} else {
		ordersToCart(ord);
	}
}

function toCartHandler(product, order, cant) {
	var sendXML = "<order_item><product_id>" + product + "</product_id><count>" + cant + "</count></order_item>";
	if(order == "new") {
		var aux = CreateOrder();
		var err = parseError(aux);
		if(err) {
			orderError(err);
		} else {
			order = $(aux).find("order").attr("id");
		}
	}
	err = AddOrderItem(order, sendXML);
	err = parseError(err);
	if(err) {
		orderError(err);
	} else {
		alert("Product added to your order");
	}
}

