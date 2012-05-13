function viewAddrs() {
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
				var state = $(GetStateList(language, countryID)).find("state[id=" + stateID + "]").find("name").text();
				$(div).find(".astate").text(state);
				var addrID=$(this).attr("id");
				$(div).find(".editAddr").attr("href", "#target=editSD&id="+addrID);
				$("#addrs").append(div);

			});
			$("#addrs").accordion({
				collapsible : true,
				active:false
			});
		}
	});
}

function GetAddressList() {
	var params={
		username: $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text()
	}
	return request("GetAddressList", params, 'Order');
}

function GetStateList(cID) {
	var params={
		language_id: $(language).find('language').attr('id'),
		country_id: cID
	}
	return request("GetStateList", params, 'Common');
}

function GetCountryList() {
	var params={
		language_id: $(language).find('language').attr('id')
	}
	return request('GetCountryList', params, 'Common');
}

function newAddrHandler(){
	var name=$('#sd_name').attr("value");
	var address1=$('#sd_address1').attr("value");
	var address2=$('#sd_address2').attr("value");
	var country=$('#sd_country').attr("value");
	var state=$('#sd_state').attr("value");
	var city=$('#sd_city').attr("value");
	var zipCode=$('#sd_ZC').attr("value");
	var phone=$('#sd_phone').attr("value");
	var error='';
	$('#errors').html('');
	
	if(!name){
		error+=$(language).find('empty_sd_name').text()+"<br>";
		$('#reqAddressName').css('visibility','visible');
	}else{
		$('#reqAddressName').css('visibility','hidden');	
	}
	
	if(!address1){
		error+=$(language).find('empty_sd_address1').text()+"<br>";
		$('#reqAddress1').css('visibility','visible');
	}else{
		$('#reqAddress1').css('visibility','hidden');
	}
	
	if(country=="no"){
		error+=$(language).find('empty_sd_country').text()+"<br>";
		$('#reqCountry').css('visibility','visible');
	}else{
		$('#reqCountry').css('visibility','hidden');
	}
	
	if(state=="no"){
		error+=$(language).find('empty_sd_state').text()+"<br>";
		$('#reqState').css('visibility','visible');
	}else{
		$('#reqState').css('visibility','hidden');
	}
	
	if(!city){
		error+=$(language).find('empty_sd_name').text()+"<br>";
		$('#reqCity').css('visibility','visible');
	}else{
		$('#reqCity').css('visibility','hidden');
	}
	
	if(!zipCode){
		error+=$(language).find('empty_sd_ZC').text()+"<br>";
		$('#reqZC').css('visibility','visible');
	}else{
		$('#reqZC').css('visibility','hidden');
	}
	
	if(!phone){
		error+=$(language).find('empty_sd_phone').text()+"<br>";
		$('#reqPhone').css('visibility','visible');
	}else{
		var pn=parseInt(phone);
		if(!pn){
			error+=$(language).find('invalid_sd_phone').text()+"<br>";
		}
		$('#reqPhone').css('visibility','hidden');
	}
	
	//$('#errors').append(error);
	if(!error){
		var xml= '<address><full_name>' + name + '</full_name><address_line_1>';
		xml += address1 + '</address_line_1><address_line_2>' + address2 + '</address_line_2><country_id>';
		xml += country + '</country_id><state_id>' + state + '</state_id><city>' + city + '</city><zip_code>';
		xml += zipCode + '</zip_code><phone_number>' + phone + '</phone_number></address>';
		var params={
			username: $(user).find("user").attr("username"),
			authentication_token: $(user).find("token").text(),
			address: xml
		}
		request("CreateAddress", params, "Order");
		
		if(window.location.hash.match(/oid/)){
			var aux=window.location.hash.split("oid=");
			var orderID=aux[1];
			window.location.hash="#target=checkOut&oid="+orderID;
		}else{
			window.location.hash="#target=addresses";
		}
	}
}

function createAddress(addr){
	var params={
		address: addr,
		username: $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text()
	}
	return request('CreateAddress', params, 'Order');
}

function newAddr(){
	var countries = GetCountryList();
	$("#sd_country").append('<option value="no">Choose a country</option>');
	$(countries).find('country').each(function() {
		var cID=$(this).attr("id");
		var cName=$(this).find("name").text();
		var country = '<option value="'+cID +'">'+cName+'</option>';
		$("#sd_country").append(country);
	});
	updateStates();
	$("#sd_country").change(updateStates);
	$('#addrForm').submit(newAddrHandler);
}

function updateStates(){
	$("#sd_state").html("");
	var thisCountryID=$("#sd_country").attr("value");
	var states= GetStateList(thisCountryID);
	$("#sd_state").append('<option value="no">Choose a state</option>');
	$(states).find('state').each(function() {
		var sID=$(this).attr("id");
		var sName=$(this).find("name").text();
		var state = '<option value="'+sID +'">'+sName+'</option>';
		$("#sd_state").append(state);
	});
	
}

function GetAddress(addressID){
	var params={
		username: $(user).find("user").attr("username"),
		authentication_token: $(user).find("token").text(),
		address:addressID
	}
	return request("GetAddress", params, "Order");
}
