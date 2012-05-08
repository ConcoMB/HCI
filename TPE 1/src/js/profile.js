function viewProfile(){
	var account=GetAccount($(user).find("user").attr("id"), $(user).find("token").text());
	$("#uname").text($(account).find("name").text());
	$("#usern").text($(account).find("username").text());
	$("#uemail").text($(account).find("email").text());
	$("#ubdate").text($(account).find("birth_date").text());
}

function GetAccount(user, token){
	return request("GetAccount");
}
