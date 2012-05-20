function themeHandler(){
	$('#theme').attr('href','css/'+$(this).val()+'.css');
}

function getUserTheme(){
	
}

function GetAccountPreferences(){
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text()
	}
	return request("GetAccountPreferences", params, 'Common');
}

function SetAccountPreferences(){
	
}
