function request(method){
	/*DUMMY FUNCTION*/
	var ans;
	$.ajax({
		type : "GET",
		url : "response/"+method+".xml",
		dataType : "xml",
		async: false,
		success : function(xml) {
			var status = $(xml).find('response').attr('status');
			if(status == 'ok') {
				ans=xml;
			}
		}
	});
	return ans;
}
