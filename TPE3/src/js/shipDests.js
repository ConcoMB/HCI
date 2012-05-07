function viewSDests(){
	var list=GetAddressList();
	$.ajax({
		type : "GET",
		url : "shipDestTemplate.html",
		dataType : "html",
		success : function(template) {
			$(list).find('orderBox').each(function() {
						
			}
		}
	});
}

function GetAddressList(){
	return request("GetAddressList");
}


<response status="ok">
	<addresses>
		<address id="1">
			<full_name>ITBA 1</full_name>
			<address_line_1>Av. Eduardo Madero 399</address_line_1>
			<address_line_2 />
			<country_id>1</country_id>
			<state_id>1</state_id>
			<city>Capital Federal</city>
			<zip_code>C1106ACD</zip_code>
			<phone_number>0800-888-ITBA</phone_number>
		</address>
	</addresses>
</response>