function newShipDestForm(){
	$.ajax({
		url : "newShipDest.html"
	}).done(function(html) {
		$('#main').html(html);
		$('#shipDestForm').submit(newShipDestFormHandler);
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
		var req=request('CreateAddress');
	}
	return false;	
}
