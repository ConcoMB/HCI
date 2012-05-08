function viewSDests() {
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
				var state = $(GetStateList()).find("state[id=" + stateID + "]").find("name").text();
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
	return request("GetAddressList");
}

function GetStateList() {
	return request("GetStateList");
}

function GetCountryList() {
	return request('GetCountryList');
}
