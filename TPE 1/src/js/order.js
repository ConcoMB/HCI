
function getOrderList() {
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text()
	}
	return request("GetOrderList", params, 'Order');
}

function updateOrderList(orders, where) {
	$("#dumb").remove();
	$(where).append('<option value="new">'+$(language).find('createNewOrder').text()+'</option>');
	$(orders).find("order").each(function() {
		if(!$(this).find("confirmed_date").text()) {
			var id = $(this).attr("id");
			$(where).append("<option value='" + id + "'>"+ $(language).find('Order').text()+ id + "</option>");
		}
	});
}

function ordersToCart(orders) {
	var cant = 1;
	$.ajax({
		type : "GET",
		url : "orderPreview.html",
		dataType : "html",
		async:false,
		success : function(template) {
			$(orders).find('order').each(function() {
				$("#dumb").remove();
				var div = $(template).clone();
				//div=$(div).find("body");
				var orderID = $(this).attr("id");
				$(div).attr('id', 'orderTab' + orderID);
				$(div).find('.orderName').text("Order " + orderID);
				$(div).find(".crDate").text($(this).find("created_date").text());
				var status = $(this).find("status").text();
				var stat;
				switch(status) {
					case "1":
						stat = "translate_created";
						$(div).find(".cnfDiv").addClass('hide');
						$(div).find(".shpDiv").addClass('hide');
						$(div).find(".dlvDiv").addClass('hide');
						break;
					case "2":
						stat = "translate_confirmed";
						$(div).find(".shpDiv").addClass('hide');
						$(div).find(".dlvDiv").addClass('hide');
						$(div).find(".cnfDate").text($(this).find("confirmed_date").text());

						break;
					case "3":
						stat = "translate_transported";
						$(div).find(".dlvDiv").addClass('hide');
						$(div).find(".cnfDate").text($(this).find("confirmed_date").text());
						$(div).find(".shpDate").text($(this).find("shipped_date").text());

						break;
					case "4":
						stat = "translate_delivered";
						$(div).find(".cnfDate").text($(this).find("confirmed_date").text());
						$(div).find(".shpDate").text($(this).find("shipped_date").text());
						$(div).find(".dlvDate").text($(this).find("delivered_date").text());
						break;
				}
				if(status != "1") {
					var addressID = $(this).find("address_id").text();
					var address = GetAddress(addressID);
					$(div).find(".addressData").text($(address).find("full_name").text());
					$(div).find(".translate_deleteOrder").addClass('hide');
				} else {
					$(div).find(".addrDiv").addClass('hide');
					$(div).find(".translate_deleteOrder").click(function() {
							deleteOrderH(orderID);
					});
				}
				$(div).find('.status').addClass(stat);
				$(div).find('.goToOrder').attr('href', '#target=order&oid=' + orderID + "&status=" + status);
				var a = $('<a></a>').attr('href', '#orderTab' + orderID).append('<span class="translate_Order"></span>', orderID);
				var li = $('<li></li>').append(a);
				$('#orderTabs').append(li);
				$('#content').append(div);
				cant++;
			});
			$('#content').tabs();
			if(cant == 1) {
				$("#content").addClass('hide');
				$("#sort").addClass('hide');
				$(".invisible").removeClass('hide');
				$("#noOrd").removeClass("invisible");
			}
		}
	});

}

function deleteOrderH(orderID) {
	if(confirm($(language).find("rmvOrder").text())) {
		params = {
			username : $(user).find("user").attr("username"),
			authentication_token : $(user).find("token").text(),
			order_id : orderID
		}
		request("DeleteOrder", params, "Order");
		$(window).trigger('hashchange');
	}
}

function goToOrder(orderID, status) {
	var ord = GetOrder(orderID);
	err = parseError(ord);
	if(err) {
		orderError(err);
	} else {
		var totalPrice = 0;
		$("#nro").text(orderID);		
		switch(status) {
			case "1":
				$("#stat").attr("id","created");
				break;
			case "2":
				$("#stat").attr("id","confirmed");
				$("#checkOut").addClass('hide');
				var addr=GetAddress($(ord).find("address_id").text());
				$("#myAddr").removeClass('hide');
				$("#addr").text($(addr).find("full_name").text());
				break;
			case "3":
				$("#stat").attr("id","transported");
				$("#checkOut").addClass('hide');
				var addr=GetAddress($(ord).find("address_id").text());
				$("#myAddr").removeClass('hide');
				$("#addr").text($(addr).find("full_name").text());
				var lat = parseInt($(ord).find("latitude").text());
				var longit = parseInt($(ord).find("longitude").text());
				$("#mapHere").append('<h3><span id="position" class="translate"></span></h3>');
				$("#mapHere").append('<div id="map_canvas" style="width:250px; height:250px"></div>');
				gMap(lat,longit);
				$("#mapHere").addClass("goToRight");
				$("#mid").removeClass("center");
				$("#mid").addClass("goToLeft");
				break;
			case "4":
				$("#stat").attr("id","delivered");
				$("#checkOut").addClass('hide');
				var addr=GetAddress($(ord).find("address_id").text());
				$("#myAddr").removeClass('hide');
				$("#addr").text($(addr).find("full_name").text());
				break;
		}
		$("#orderID").text(name);
		$.ajax({
			type : "GET",
			url : "html/orderProduct.html",
			async:false,
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
					$(div).find(".artPrice").text("$"+price);
					$(div).find(".artAmount").text(amount);
					$(div).find(".ranking").text($(this).find("sales_rank").text());
					$(div).find('.articleImg').attr("src",$(product).find('image_url').text());
					$(div).find(".namePr").attr("href","#target=detail&pid="+prodID);
					$('#items').append(div);
					if(status != "1") {
						$(div).find(".remove").addClass('hide');
					} else {
						$(div).find(".rmform").submit(function() {
							if(confirm($(language).find("removeThisItem").text())) {
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
				$("#totalPrice").text("$"+totalPrice);
				$("#checkOut").attr("href", "#target=checkOut&oid=" + orderID);
				if(totalPrice == 0) {
					$("#checkOut").addClass('hide');
					$("#price").addClass('hide');
					$(".invisible").removeClass('hide');
					$("#sort").addClass('hide');

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
		url : "html/addressTemplate.html",
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
				$(div).find(".adrBut").attr("value", $(language).find("selectAddr").text());
				$(div).find(".editAddr").attr("href", "#target=confirmed&oid=" + orderID + "&aid=" + addrID);
				$(div).find(".adrRmv").addClass("hide");
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
		//alert(err);
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

/*
function updateorder(order, stat){
	var params={
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text(),
		order_id : order,
		status:stat,
		latitude:la,
		longitude: lo
	}
	var path = 'updateorder.groovy?'+ method + parseParams(params);
	$.ajax({
			type : "GET",
			url : path,
			contentType: "text/html; charset=UTF-8",		
			dataType : "html",
			async : false,
			success : function(xml) {
				var status = $(xml).find('response').attr('status');
				ans = xml;
			}
		});}*/
