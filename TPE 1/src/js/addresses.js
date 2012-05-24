function viewAddrs() {
	var list = GetAddressList();
	var flag = false;
	$.ajax({
		type : "GET",
		url : "html/addressTemplate.html",
		dataType : "html",
		success : function(template) {
			$(list).find('address').each(function() {
				flag = true;
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
				$(div).find(".editAddr").attr("href", "#target=editAddr&id=" + addrID);
				$(div).find(".adrRmv").click(function() {
					/*if(confirm("Remove this address?")){
					removeAddr(addrID);
					}*/
					//alert("We're working on this event... check again later!");
				});
				translate(div);
				$("#addrs").append(div);

			});
			$("#addrs").accordion({
				collapsible : true,
				active : false
			});
			if(!flag) {
				$("#addrs").addClass('hide');
				$(".invisible").removeClass('hide');
				$("#noAddr").removeClass("invisible");
			}
		}
	});

}

function GetAddressList() {
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text()
	}
	return request("GetAddressList", params, 'Order');
}

function GetStateList(cID) {
	var params = {
		language_id : $(language).find('language').attr('id'),
		country_id : cID
	}
	var states = request('GetStateList', params, 'Common');
	var err = parseError(err);
	if(err) {
		alert("error state" + err);
	} else {
		return states;
	}
}

function GetCountryList() {
	var params = {
		language_id : $(language).find('language').attr('id')
	}
	var countries = request('GetCountryList', params, 'Common');
	var err = parseError(err);
	if(err) {
		alert("error country" + err);
	} else {
		return countries;
	}
}

function newAddrHandler() {
	var name = $('#sd_name').attr("value");
	var address1 = $('#sd_address1').attr("value");
	var address2 = $('#sd_address2').attr("value");
	var country = $('#sd_country').attr("value");
	var state = $('#sd_state').attr("value");
	var city = $('#sd_city').attr("value");
	var zipCode = $('#sd_ZC').attr("value");
	var phone = $('#sd_phone').attr("value");
	var error = false;
	$('#errors').html('');

	if(!name) {
		$('#reqAddressName').text($(language).find('requiredField').text());
		error=true;
	}

	if(!address1) {
		$('#reqAddress1').text($(language).find('requiredField').text());
		error=true;
	}

	if(country == "no") {
		$('#reqCountry').text($(language).find('requiredField').text());
		error=true;
	}

	if(state == "no") {
		$('#reqState').text($(language).find('requiredField').text());
		error=true;
	}

	if(!city) {
		$('#reqCity').text($(language).find('requiredField').text());
		error=true;
	}

	if(!zipCode) {
		text($(language).find('requiredField').text());
		error=true;
	}

	if(!phone) {
		$('#reqPhone').text($(language).find('requiredField').text());
		error=true;
	} else {
		var pn = parseInt(phone);
		if(!pn) {
			$('#reqPhone').text($(language).find('wrong_phone').text());
			error=true;
		}
	}

	//$('#errors').append(error);
	if(!error) {
		var xml = '<address><full_name>' + name + '</full_name><address_line_1>';
		xml += address1 + '</address_line_1><address_line_2>' + address2 + '</address_line_2><country_id>';
		xml += country + '</country_id><state_id>' + state + '</state_id><city>' + city + '</city><zip_code>';
		xml += zipCode + '</zip_code><phone_number>' + phone + '</phone_number></address>';
		var resp = CreateAddress(xml);
		var err = parseError(resp);
		if(!err) {
			if(window.location.hash.match(/oid/)) {
				var aux = window.location.hash.split("oid=");
				var orderID = aux[1];
				var addrID = $(resp).find("address").attr("id");
				window.location.hash = "#target=checkOut&oid=" + orderID;
			} else {
				window.location.hash = "#target=addresses";
			}
		} else {
			createAddressError(err);
		}
	}
}

function updateOrderAddr(order, addr) {
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text(),
		order_id : order,
		address_id : addr
	}
	return request("ChangeOrderAddress", params, "Order");
}

function CreateAddress(addr) {
	var params = {
		address : addr,
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text()
	}
	return request('CreateAddress', params, 'Order');
}

function UpdateAddress(addr) {
	var params = {
		address : addr,
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text()
	}
	return request('UpdateAddress', params, 'Order');
}

function createAddressError(code) {
	switch(code) {
		case '202':
			$('#reqAddressName').text($(language).find('address_exists').text());
			break;
		case '118':
			$('#reqAddressName').text($(language).find('wrong_addrname').text());
			break;
		case '119':
			$('#reqAddress1').text($(language).find('wrong_addrline1').text());
			break;
		case '123':
			$('#reqZC').text($(language).find('wrong_zip').text());
			break;
	}
}

function newAddr() {

	updateCountries();
	$('#addrForm').submit(newAddrHandler);
}

function updateCountries() {
	$("#dumbC").remove();
	var countries = GetCountryList();
	$("#sd_country").append('<option value="no">' + $(language).find("chooseCountry").text() + '</option>');
	$(countries).find('country').each(function() {
		var cID = $(this).attr("id");
		var cName = $(this).find("name").text();
		var country = '<option value="' + cID + '">' + cName + '</option>';
		$("#sd_country").append(country);
	});
	updateStates();
	$("#sd_country").change(updateStates);
}

function updateStates() {
	$("#sd_state").html("");
	var thisCountryID = $("#sd_country").attr("value");
	if(thisCountryID == "no") {
		$("#sd_state").append('<option id="no" value="no">' + $(language).find("noCountry").text() + '</option>')
	}else{
		var states = GetStateList(thisCountryID);
		$("#sd_state").append('<option value="no">' + $(language).find("chooseState").text() + '</option>');
		$(states).find('state').each(function() {
			var sID = $(this).attr("id");
			var sName = $(this).find("name").text();
			var state = '<option value="' + sID + '">' + sName + '</option>';
			$("#sd_state").append(state);
		});
	}
}

function GetAddress(addressID) {
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text(),
		address_id : addressID
	}

	return request("GetAddress", params, "Order");
}

function editAddressHandler(addressID) {

	updateCountries();

	var a = GetAddress(addressID);

	var name = $(a).find("full_name").text();
	var address1 = $(a).find("address_line_1").text()
	var address2 = $(a).find("address_line_2").text();
	var country = $(a).find("country_id").text();
	var state = $(a).find("state_id").text();
	var city = $(a).find("city").text();
	var zipCode = $(a).find("zip_code").text();
	var phone = $(a).find("phone_number").text();

	$("#addr_name").attr("value", name);
	$("#addr_address1").attr("value", address1);
	$("#addr_address2").attr("value", address2);
	$("#sd_country").val(country);

	updateStates();

	$("#sd_state").val(state);
	$("#addr_city").attr("value", city);
	$("#addr_ZC").attr("value", zipCode);
	$("#addr_phone").attr("value", phone);
	$("#sd_country").change(updateStates);

	$("#editAddressButton").click(function(){
		editAddressButtonHandler(addressID);
	});
	$("#cancelButton").click(function() {
		window.location.hash = "#target=addresses";
	});
}

function editAddressButtonHandler(addressID) {

	var name = $('#addr_name').attr("value");
	var address1 = $('#addr_address1').attr("value");
	var address2 = $('#addr_address2').attr("value");
	var country = $('#sd_country').attr("value");
	var state = $('#sd_state').attr("value");
	var city = $('#addr_city').attr("value");
	var zipCode = $('#addr_ZC').attr("value");
	var phone = $('#addr_phone').attr("value");
	var error = false;
	$('#errors').html('');

	if(!name) {
		$('#reqAddressName').text($(language).find('requiredField').text());
		error=true;
	}

	if(!address1) {
		$('#reqAddress1').text($(language).find('requiredField').text());
		error=true;
	}

	if(country == "no") {
		$('#reqCountry').text($(language).find('requiredField').text());
		error=true;
	}

	if(state == "no") {
		$('#reqState').text($(language).find('requiredField').text());
		error=true;
	}

	if(!city) {
		$('#reqCity').text($(language).find('requiredField').text());
		error=true;
	}

	if(!zipCode) {
		$("#reqZC").text($(language).find('requiredField').text());
		error=true;
	}

	if(!phone) {
		$('#reqPhone').text($(language).find('requiredField').text());
		error=true;
	} else {
		var pn = isNumber(phone);
		if(!pn) {
			$('#reqPhone').text($(language).find('wrong_phone').text());
			error=true;
		}
	}

	//$('#errors').append(error);
	if(!error) {
		var xml = '<address id="'+addressID+'"><full_name>' + name + '</full_name><address_line_1>';
		xml += address1 + '</address_line_1><address_line_2>' + address2 + '</address_line_2><country_id>';
		xml += country + '</country_id><state_id>' + state + '</state_id><city>' + city + '</city><zip_code>';
		xml += zipCode + '</zip_code><phone_number>' + phone + '</phone_number></address>';
		var resp = UpdateAddress(xml);
		var err = parseError(resp);
		if(!err) {
			window.location.hash = "#target=addresses";
		} else {
			createAddressError(err);
		}
	}
	return false;
}

function isNumber(number){
	if(number.match(/[^0-9 \-]+/)){
		return false;
	}
	return true;
}
