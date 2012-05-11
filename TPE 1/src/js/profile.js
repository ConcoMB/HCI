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

	$("#editProfileButton").css('display', 'none');
	$(".profData").css('display', 'none');

	var name = $("#uname").text();
	var email = $("#uemail").text();
	var bdate = $("#ubdate").text();

	$("#prof_name").attr("value", name);
	$("#prof_mail").attr("value", email);
	$("#prof_birthDate").attr("value", bdate);

	$(".prof_input").css('display', 'inline');
	$("#cancelEditProfile").css('display', 'inline');
	$("#acceptProfileButton").css('display', 'inline');

	$("#prof_update").submit(acceptProfileHandler);
}

function acceptProfileHandler() {

	var name = $("#prof_name").attr("value");
	var email = $("#prof_mail").attr("value");
	var bdate = $("#prof_birthDate").attr("value");
	var error = false;

	if(!name) {
		$('#reqProfName').css('display', 'inline');
		error = true;
	} else {
		$('#reqProfName').css('display', 'none');
	}

	if(!email) {
		$('#reqProfEmail').css('display', 'inline');
		error = true;
	} else {
		$('#reqProfEmail').css('display', 'none');
	}

	if(!bdate) {
		$('#reqProfBdate').css('display', 'inline');
		error = true;
	} else {
		$('#reqProfBdate').css('display', 'none');
	}

	if(error == false) {

		var xml = '<account><name>' + name + '</name><email>';
		xml += email + '</email><birth_date>' + bdate + '</birth_date><account>';
		var req = updateAccount(xml);
		if($(req).find('response').attr('status') == 'ok') {

			$(window).trigger('hashchange');
		}
	}

	return false;
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

	$("#changePasswordButton").css('display', 'none');
	$(".profDataPass").css('display', 'none');

	$(".prof_inputPass").css('display', 'inline');
	$(".prof_newPass_item").css('display', 'block');

	$("#acceptChangePassword").css('display', 'inline');
	$("#cancelChangePassword").css('display', 'inline');

	$("#changePasswordForm").submit(changePasswordHandler);

}

function changePasswordHandler() {

	var pass = $("#prof_pass").attr("value");
	var newPass = $("#prof_newPass").attr("value");
	var confPass = $("#prof_confPass").attr("value");
	var error = false;

	if(!pass) {
		$('#reqProfPass').css('display', 'inline');
		error = true;
	} else {
		$('#reqProfPass').css('display', 'none');
	}

	if(!newPass) {
		$('#reqProfNewPass').css('display', 'inline');
		$('#reqProfNewPassMatch').css('display', 'none');
		error = true;
	} else {
		$('#reqProfNewPass').css('display', 'none');
	}

	if(!confPass) {
		$('#reqProfConfPass').css('display', 'inline');
		$('#reqProfNewPassMatch').css('display', 'none');
		error = true;
	} else {
		$('#reqProfConfPass').css('display', 'none');
	}

	if(newPass != confPass) {
		$('#reqProfNewPass').css('display', 'none');
		$('#reqProfConfPass').css('display', 'none');
		$('#reqProfNewPassMatch').css('display', 'inline');
		error = true;
	}

	if(error == false) {

		var params = {
			username : $(user).find("user").attr("username"),
			password : pass,
			new_password : newPass
		}
		var req = request('ChangePassword', params, 'Security');

		if($(req).find('response').attr('status') == 'ok') {

			$(window).trigger('hashchange');
		}
	}

	return false;
}
