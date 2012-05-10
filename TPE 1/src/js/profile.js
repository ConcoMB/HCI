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

function editProfileHandler(){
	
	$("#editProfileButton").css('display','none');
	$(".profData").css('display','none');
	
	var name = $("#uname").text();
	var email = $("#uemail").text();
	var bdate = $("#ubdate").text();
	
	
	$("#prof_name").attr("value",name);
	$("#prof_mail").attr("value",email);
	$("#prof_birthDate").attr("value",bdate);
	
	$(".prof_input").css('display','inline');
	
	$("#acceptProfileButton").css('display','inline');
	
	$("#acceptProfileButton").submit(acceptProfileHandler);
}

function acceptProfileHandler(){
		
	
	var name = $("#prof_name").attr("value");
	var email = $("#prof_mail").attr("value");
	var bdate = $("#prof_bdate").attr("value");
	var error = false;
	
	if(!name){
		$('#reqProfName').css('display','inline');
		error = true;
	}
	if(!email){
		$('#reqProfEmail').css('display','inline');
		error = true;
	}
	if(!bdate){
		$('#reqProfBdate').css('display','inline');
		error = true;
	}
	
	if(error == false){
		var xml = '<account><name>' + name + '</name><email>'; 
		xml += email + '</email><birth_date>' + bdate + '</birth_date><account>';
		var req=updateAccount(xml);
	}
	
	return false;
}

function updateAccount(acc){
	var params={
		username: $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text(),
		account: acc
	};
	return request('UpdateAccount',params,'Security');
}