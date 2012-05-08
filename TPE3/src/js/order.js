function addToOrderHandler(){
	addToOrder($("#product").data("pid"));
}

function toTheCartHandler(){
	addToOrder($(this).parents(".itemBox").data("pid"));
}

function addToOrder(pid){
	var orderID=$("#orderList").attr("value");
	var cant=$("#buyCant").attr("value");
	var u =$(user).find("user").attr("id");
	var tkn= $(user).find("token").text();
	var item="<order_item> <product_id>"+ pid +"</product_id> <count>"+ cant +"</count></order_item>"
	if(orderID=="new"){
		//CreateOrder(u,tkn);	
	}else{
		//AddOrderItem(u, tkn, orderID, item);
	}
}


function getOrderList(user, token){
	return request("getOrderList");
}

function updateOrderList(orders, where){
	var cant=1;
	$(where).append('<option value="new">Create new Order</option>');
	$(orders).find("order").each(function(){
		if(!$(this).find("confirmed_date").text()){
			var id=$(this).attr("id");
			$(where).append("<option value='"+id+"'>Order"+cant+"</option>");
			cant++;
		}
	});
}

function ordersToCart(orders){
	var cant=1;
	$.ajax({
		type : "GET",
		url : "orderPreview.html",
		dataType : "html",
		success : function(template) {
			$(orders).find('order').each(function() {

				var div = $(template).clone();
				var orderID = $(this).attr("id");
				$(div).find('.orderName').text("Order"+cant);
				$(div).find('.goToOrder').attr('href','#target=order&oid='+orderID+"&oname=Order"+cant++);
				$('#content').append(div);
			});
		}
	});

}

function goToOrder(orderID, name){
	var ord=GetOrder($(user).find("user").attr("id"), $(user).find("token").text(), orderID);
	var totalPrice=0;
	$("#orderID").text(name);	
	$.ajax({
		type : "GET",
		url : "orderProduct.html",
		dataType : "html",
		success : function(template) {
			$(ord).find('item').each(function() {
				var prodID = $(this).find('product_id').text();
				var div = $(template).clone();
				var amount = $(this).find("count").text();
				var price = $(this).find("price").text();
				totalPrice+=parseFloat(price);
				var product = GetProduct(prodID);
				$(div).find(".artName").text($(product).find("name").text());
				$(div).find(".artPrice").text($(product).find("price").text());
				$('#items').append(div);
			});
			$("#totalPrice").text(totalPrice);
		}
		
	});
	
}


function GetOrder(user, token, orderID){
	return request("GetOrder");
}
