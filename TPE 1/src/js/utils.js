function request(method, params, service) {
	var ans;
	if(dummy) {
		ans = dummyCall(method, params, service);
	} else {
		/*API CALL*/
		var path = 'service/' + service + '.groovy?' + 'method=' + method + parseParams(params);
		//alert(path);
		$.ajax({
			type : "GET",
			url : path,
			contentType : "text/html; charset=iso-8859-1",
			dataType : "xml",
			async : false,
			success : function(xml) {
				var status = $(xml).find('response').attr('status');
				ans = xml;
			}
		});
	}
	/*if(!ans || $(ans).find('response').attr('status')!='ok') {
	 alert('Error on request');
	 return dummyCall(method, params, service);
	 }*/
	var ok = $(ans).find("response").attr("status");
	if(ok != "ok") {
		alert($(language).find("errorX").text());
	} else {
		return ans;
	}
}

function parseParams(params) {
	var string = '';
	for(var name in params) {
		if(params[name]) {
			string += '&' + name + '=' + params[name];
		}
	}
	return string;
}

function dummyCall(method, params, service) {
	/*DUMMY FUNCTION*/
	var ans;
	$.ajax({
		type : "GET",
		url : "response/" + method + ".xml",
		dataType : "xml",
		async : false,
		success : function(xml) {
			var status = $(xml).find('response').attr('status');
			if(status == 'ok') {
				ans = xml;
			}
		}
	});
	return ans;
}