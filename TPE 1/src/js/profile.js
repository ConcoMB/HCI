function viewProfile() {
	var account = GetAccount();
	$("#uname").text($(account).find("name").text());
	$("#usern").text($(account).find("username").text());
	$("#uemail").text($(account).find("email").text());
	$("#ubdate").text($(account).find("birth_date").text());
	$("#editProfileButton").click(editProfileHandler);
	$("#cancelEditProfile").click(function() {
		$(window).trigger('hashchange');
	});
	$("#changePasswordButton").click(changePassHandler);
	$("#cancelChangePassword").click(function() {
		$(window).trigger('hashchange');
	});

}

function GetAccount() {
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text()
	}
	return request("GetAccount", params, 'Security');
}

function editProfileHandler() {

	$("#editProfileButton").addClass('hide');
	$(".profData").addClass('hide');

	var name = $("#uname").text();
	var email = $("#uemail").text();
	var bdate = $("#ubdate").text();

	$("#prof_name").attr("value", name);
	$("#prof_mail").attr("value", email);
	$("#prof_birthDate").attr("value", bdate);

	$(".prof_input").removeClass('hide');
	$("#cancelEditProfile").removeClass('hide');
	$("#acceptProfileButton").removeClass('hide');

	$("#prof_update").submit(acceptProfileHandler);
}

function acceptProfileHandler() {

	var name = $("#prof_name").attr("value");
	var email = $("#prof_mail").attr("value");
	var bdate = $("#prof_birthDate").attr("value");
	var error = false;

	if(!name) {
		$('#reqProfName').text($(language).find('requiredField').text());
		error = true;
	}

	if(!email) {
		$('#reqProfEmail').text($(language).find('requiredField').text());
		error = true;
	}

	if(!bdate) {
		$('#reqProfBdate').text($(language).find('requiredField').text());
		error = true;
	}

	if(!error) {

		var xml = '<account><name>' + name + '</name><email>';
		xml += email + '</email><birth_date>' + bdate + '</birth_date></account>';
		var req = updateAccount(xml);
		var err=parseError(req);
		if(!err) {
			$(window).trigger('hashchange');
		} else{
			editProfileError(err);
		}
	}

	return false;
}

function editProfileError(code){
	switch(code){
		case '109':
			$('#reqProfName').text($(language).find('name_length'));
			break;
		case '110':
			$('#reqProfEmail').text($(language).find('email_length'));
			break;
		case '111':
			$('#reqProfBdate').text($(language).find('invalid_date'));
			break;	
	}
}

function updateAccount(acc) {
	var params = {
		username : $(user).find("user").attr("username"),
		authentication_token : $(user).find("token").text(),
		account : acc
	};
	return request('UpdateAccount', params, 'Security');
}

function changePassHandler() {

	$("#changePasswordButton").addClass('hide');
	$(".profDataPass").addClass('hide');

	$(".prof_inputPass").removeClass('hide');
	$(".prof_newPass_item").removeClass('hide');

	$("#acceptChangePassword").removeClass('hide');
	$("#cancelChangePassword").removeClass('hide');

	$("#changePasswordForm").submit(changePasswordHandler);

}

function changePasswordHandler() {

	var pass = $("#prof_pass").attr("value");
	var newPass = $("#prof_newPass").attr("value");
	var confPass = $("#prof_confPass").attr("value");
	var error = false;

	$('[id^="reqProf"]').text('');
	if(!pass) {
		$('#reqProfPass').text($(language).find('requiredField').text());
		error = true;
	}
	if(!newPass) {
		$('#reqProfNewPass').text($(language).find('requiredField').text());
		error = true;
	}

	if(!confPass) {
		$('#reqProfConfPass').text($(language).find('requiredField').text());
		error = true;
	}

	if(newPass != confPass) {
		$('#reqProfNewPass').text($(language).find('password_mismatch').text());
		error= true;
	}

	if(!error) {

		var req=ChangePassword(pass, newPass);
		var err=parseError(req);
		if(!err) {

			$(window).trigger('hashchange');
		}
		else{
			$('#reqProfPass').text($(language).find('incorrectPassword').text());
		}
	}

	return false;
}

function ChangePassword(pass, nPass){
	var params = {
			username : $(user).find("user").attr("username"),
			password : pass,
			new_password : nPass
		}
		return request('ChangePassword', params, 'Security');
}
