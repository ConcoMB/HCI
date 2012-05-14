
function getOrderList() {
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text()
	}
	return request("GetOrderList", params, 'Order');
}

function updateOrderList(orders, where) {
	$(where).append('<option value="new">'+$(language).find('createNewOrder').text()+'</option>');
	$(orders).find("order").each(function() {
		if(!$(this).find("confirmed_date").text()) {
			var id = $(this).attr("id");
			$(where).append("<option value='" + id + "'>"+ $(language).find('order').text()+ id + "</option>");
		}
	});
}

function ordersToCart(orders) {
	var cant = 1;
	$.ajax({
		type : "GET",
		url : "orderPreview.html",
		dataType : "html",
		success : function(template) {
			$(orders).find('order').each(function() {

				var div = $(template).clone();
				var orderID = $(this).attr("id");
				$(div).attr('id', 'orderTab' + orderID);
				$(div).find('.orderName').text("Order " + orderID);
				$(div).find(".crDate").text($(this).find("created_date").text());
				var status = $(this).find("status").text();
				var stat;
				switch(status) {
					case "1":
						stat = "Created";
						$(div).find(".cnfDiv").css("display", "none");
						$(div).find(".shpDiv").css("display", "none");
						$(div).find(".dlvDiv").css("display", "none");
						break;
					case "2":
						stat = "Confirmed";
						$(div).find(".shpDiv").css("display", "none");
						$(div).find(".dlvDiv").css("display", "none");
						$(div).find(".cnfDate").text($(this).find("confirmed_date").text());

						break;
					case "3":
						stat = "Transported";
						$(div).find(".dlvDiv").css("display", "none");
						$(div).find(".cnfDate").text($(this).find("confirmed_date").text());
						$(div).find(".shpDate").text($(this).find("shipped_date").text());

						break;
					case "4":
						stat = "Delivered";
						$(div).find(".cnfDate").text($(this).find("confirmed_date").text());
						$(div).find(".shpDate").text($(this).find("shipped_date").text());
						$(div).find(".dlvDate").text($(this).find("delivered_date").text());
						break;
				}
				if(status != "1") {
					var addressID = $(this).find("address_id").text();
					var address = GetAddress(addressID);
					$(div).find(".addressData").text($(address).find("full_name").text());
					$(div).find(".deleteOrder").css("display", "none");
				} else {
					$(div).find(".addrDiv").css("display", "none");
					$(div).find(".deleteOrder").click(function() {
						deleteOrderH(orderID);
					});
				}
				$(div).find('.status').text(stat);
				$(div).find('.goToOrder').attr('href', '#target=order&oid=' + orderID + "&oname=Order " + orderID + "&status=" + status);
				var a = $('<a></a>').attr('href', '#orderTab' + orderID).text('Order ' + orderID);
				var li = $('<li></li>').append(a);
				$('#orderTabs').append(li);
				$('#content').append(div);
				cant++;
			});
			$('#content').tabs();
			if(cant == 1) {
				$("#content").css("display", "none");
				$("#sort").css("display", "none");
				$("#noOrd").css("display", "inline");
				$("#noOrd").css("visibility", "visible");
			}
		}
	});

}

function deleteOrderH(orderID) {
	if(confirm("Remove this order?")) {
		params = {
			username : $(user).find("user").attr("username"),
			authentication_token : $(user).find("token").text(),
			order_id : orderID
		}
		request("DeleteOrder", params, "Order");
		$(window).trigger('hashchange');
	}
}

function goToOrder(orderID, name, status) {
	var ord = GetOrder(orderID);
	err = parseError(ord);
	if(err) {
		orderError(err);
	} else {
		var totalPrice = 0;
		$("#orderStatus").text($(language).find("status").text());
		$("#orderShipped").text($(language).find("shippedTo").text());
		$("#amount").text($(language).find("amount").text());
		$("#noOrd").text($(language).find("noItems").text());
		$("#orderBy").text($(language).find("orderBy").text());
		$("#asc").text($(language).find("asc").text());
		$("#desc").text($(language).find("desc").text());
		$("#pr").text($(language).find("price").text());
		$("#nam").text($(language).find("name").text());
		$("#rank").text($(language).find("ranking").text());

		switch(status) {
			case "1":
				$("#stat").text($(language).find("created").text());
				break;
			case "2":
				$("#stat").text($(language).find("confirmed").text());
				$("#checkOut").css("display", "none");
				var addr=GetAddress($(ord).find("address_id").text());
				$("#myAddr").css("visibility", "visible");
				$("#myAddr").css("display", "inline");
				$("#addr").text($(addr).find("full_name").text());
				break;
			case "3":
				$("#stat").text($(language).find("transported").text());
				$("#checkOut").css("display", "none");
				var addr=GetAddress($(ord).find("address_id").text());
				$("#myAddr").css("visibility", "visible");
				$("#myAddr").css("display", "inline");
				$("#addr").text($(addr).find("full_name").text());

				break;
			case "4":
				$("#stat").text($(language).find("delivered").text());
				$("#checkOut").css("display", "none");
				var addr=GetAddress($(ord).find("address_id").text());
				$("#myAddr").css("visibility", "visible");
				$("#myAddr").css("display", "inline");
				$("#addr").text($(addr).find("full_name").text());

				break;
		}
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
					totalPrice += parseFloat(price)*parseInt(amount);
					var product = GetProduct(prodID);
					$(div).find(".artName").text($(product).find("name").text());
					$(div).find(".artPrice").text(price);
					$(div).find(".artAmount").text(amount);
					$('#items').append(div);
					if(status != "1") {
						$(div).find(".remove").css("display", "none");
					} else {
						$(div).find(".rmform").submit(function() {
							if(confirm("Remove this item?")) {
								var cant = $(div).find(".howMany").attr("value");
								if(cant>amount){
									cant=amount;
								}
								removeItemHandler(prodID, cant, orderID);
							}
						});
						$(div).find(".rmform").data("prodID", prodID);
					}
				});
				$("#totalPrice").text(totalPrice);
				$("#checkOut").attr("href", "#target=checkOut&oid=" + orderID);
				if(totalPrice == 0) {
					$("#checkOut").css("display", "none");
					$("#price").css("display", "none");
					$("#noOrd").css("display", "inline");
					$("#noOrd").css("visibility", "visible");
					$("#sort").css("display", "none");

				}
			}
		});
	}
}

function removeItemHandler(pid, cant, oid) {
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text(),
		order_id : oid,
		order_item : "<order_item> <product_id>" + pid + "</product_id> <count>" + cant + "</count></order_item>"
	}
	var err = request("DeleteOrderItem", params, "Order");
	err = parseError(err);
	if(err) {
		orderError(err);
	}
	$(window).trigger('hashchange');
}

function GetOrder(orderID) {
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text(),
		order_id : orderID
	}
	return request("GetOrder", params, 'Order');
}

function AddOrderItem(orderID, xml) {
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text(),
		order_id : orderID,
		order_item : xml
	}

	return request("AddOrderItem", params, "Order");
}

function CreateOrder() {
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text()
	}
	return request("CreateOrder", params, "Order");
}

function checkOut(orderID) {
	$("#check").attr("href", "#target=newAddr&oid=" + orderID);
	var list = GetAddressList();
	$.ajax({
		type : "GET",
		url : "addressTemplate.html",
		dataType : "html",
		success : function(template) {
			$(list).find('address').each(function() {
				var div = $(template).clone();
				$(div).find(".shipName").text($(this).find("full_name").text());
				var addr = $(this).find("address_line_1").text() + ", " + $(this).find("address_line_2").text();
				$(div).find(".addr").text(addr);
				var countryID = $(this).find("country_id").text();
				var stateID = $(this).find("state_id").text();
				$(div).find(".acity").text($(this).find("city").text());
				$(div).find(".azip").text($(this).find("zip_code").text());
				$(div).find(".apnumber").text($(this).find("phone_number").text());
				var country = $(GetCountryList()).find("country[id=" + countryID + "]").find("name").text();
				$(div).find(".acountry").text(country);
				var state = $(GetStateList(countryID)).find("state[id=" + stateID + "]").find("name").text();
				$(div).find(".astate").text(state);
				var addrID = $(this).attr("id");
				$(div).find(".adrBut").attr("value", "Select address");
				$(div).find(".editAddr").attr("href", "#target=confirmed&oid=" + orderID + "&aid=" + addrID);
				$("#addrs").append(div);

			});
			$("#addrs").accordion({
				collapsible : true,
				active : false
			});

		}
	});
}

function confirmed(order, address) {
	var err = updateOrderAddr(order, address);
	err = parseError(err);
	if(err) {
		alert(err);
		orderError(err);
	} else {
		var params = {
			username : $(user).find("user").attr("username"),
			authentication_token : $(user).find("token").text(),
			order_id : order,
			address_id : address
		}
		return request("ConfirmOrder", params, "Order");
	}
}
