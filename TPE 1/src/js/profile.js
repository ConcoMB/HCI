function viewProfile(){
	var account=GetAccount();
	$("#uname").text($(account).find("name").text());
	$("#usern").text($(account).find("username").text());
	$("#uemail").text($(account).find("email").text());
	$("#ubdate").text($(account).find("birth_date").text());
}

function GetAccount(){
	var params={
		username: $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text()
	}
	return request("GetAccount", params, 'Security');
}
