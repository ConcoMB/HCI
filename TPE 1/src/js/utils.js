function request(method, params, service) {
	var ans;
	if(dummy) {
		/*DUMMY FUNCTION*/
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
	} else {
		/*API CALL*/
		var path = 'service/'+service+'.groovy?'+'method='+method+parseParams(params);
		alert(path);
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

	return ans;
}

function parseParams(params){
	var string='';
	for(var name in params){
		string+='&'+name+'='+params[name];
	}
	return string;
}
