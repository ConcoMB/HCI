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

