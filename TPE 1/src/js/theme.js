function themeHandler(){
	var theme=$(this).val();
	$('#theme').attr('href','css/'+theme+'.css');
	SetAccountPreferences('theme='+theme);
}

function updateUserTheme(){
	var resp=GetAccountPreferences();
	var val=$(resp).find('value').text();
	var theme;
	if(!val.match(/theme=.*/)){
		SetAccountPreferences('theme=style');
	}else{
		theme=val.split('=')[1];
	}
	if(theme){
		$('#themeChooser').val(theme);
		$('#theme').attr('href','css/'+theme+'.css');
	}
}

function GetAccountPreferences(){
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text()
	}
	return request("GetAccountPreferences", params, 'Common');
}

function SetAccountPreferences(theme){
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text(),
		value: theme
	}
	return request("SetAccountPreferences", params, 'Common');
}
