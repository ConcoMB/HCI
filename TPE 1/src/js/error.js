function parseError(xml){
	if($(xml).find('response').attr('status')=='fail'){
		return $(xml).find('error').attr('code');
	}
	return false;
}


function orderError(err){
	var string;
	switch(err){
		case "1":
		case "4":
		case "6":
		case "13":
		case "15":
			string=$(language).find('missing_info');
			break;
		case "101":
		case "104":
		case "105":
		case "115":
		case "114":
		case "116":
			string=$(language).find('invalid_params');
			break;
		case "999":
			string=$(language).find('unknown_error');
			break;
	}
	$("#error").append(string);
}

