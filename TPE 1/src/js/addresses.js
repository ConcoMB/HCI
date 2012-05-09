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


function newShipDestForm(){
	$.ajax({
		url : "newAddr.html"
	}).done(function(html) {
		$('#main').html(html);
		$('#addrForm').submit(newShipDestFormHandler);
	});
}


function newShipDestFormHandler(){
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
	
	if(!username){
		error+=$(language).find('empty_sd_name').text()+"<br>";
		$('#reqAddressName').css('visibility','visible');
	}
	if(!address1){
		error+=$(language).find('empty_sd_address1').text()+"<br>";
		$('#reqAddress1').css('visibility','visible');
	}
	if(!country){
		error+=$(language).find('empty_sd_country').text()+"<br>";
		$('#reqCountry').css('visibility','visible');
	}
	if(!state){
		error+=$(language).find('empty_sd_state').text()+"<br>";
		$('#reqState').css('visibility','visible');
	}
	if(!city){
		error+=$(language).find('empty_sd_name').text()+"<br>";
		$('#reqCity').css('visibility','visible');
	}
	if(!zipCode){
		error+=$(language).find('empty_sd_ZC').text()+"<br>";
		$('#reqZC').css('visibility','visible');
	}
	if(!phone){
		error+=$(language).find('empty_sd_phone').text()+"<br>";
		$('#reqPhone').css('visibility','visible');
	}
	
	$('#errors').append(error);
	if(!error){
		var xml= '<address><full_name>' + name + '</full_name><address_line_1>';
		xml += address1 + '</address_line_1><address_line_2>' + address2 + '</address_line_2><country_id>';
		xml += country + '</country_id><state_id>' + state + '</state_id><city>' + city + '</city><zip_code>';
		xml += zipCode + '</zip_code><phone_number>' + phone + '</phone_number></address>';
		var req=createAddress(xml);
	}
	return false;	
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
	$(countries).find('country').each(function() {
		var cID=$(this).attr("id");
		var cName=$(this).find("name").text();
		var country = '<option value="'+cID +'">'+cName+'</option>';
		$("#sd_country").append(country);
	});
	updateStates();
	$("#sd_country").change(updateStates);
}

function updateStates(){
	var thisCountryID=$("#sd_country").attr("value");
	var states= GetStateList(thisCountryID);
	$(states).find('state').each(function() {
		var sID=$(this).attr("id");
		var sName=$(this).find("name").text();
		var state = '<option value="'+sID +'">'+sName+'</option>';
		$("#sd_state").append(state);
	});
}
