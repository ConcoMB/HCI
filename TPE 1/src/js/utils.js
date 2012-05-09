function request(method, params, service) {
	var ans;
	if(dummy) {
		dummyCall(method, params, service);
	} else {
		/*API CALL*/
		var path = 'service/' + service + '.groovy?' + 'method=' + method + parseParams(params);
		$.ajax({
			type : "GET",
			url : path,
			dataType : "xml",
			async : false,
			success : function(xml) {
				var status = $(xml).find('response').attr('status');
				if(status == 'ok') {
					ans = xml;
				}
			}
		});
	}
	//alert(path+'\n'+ans);
	if(!ans || $(ans).find('response').attr('status')!='OK') {
		alert('Error on request');
		return dummyCall(method, params, service);
	}
	return ans;
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
