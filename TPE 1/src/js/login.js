function signIn(name, pass) {
	var params = {
		username : name,
		password : pass
	}
	return request('SignIn', params, 'Security');
}

function updateUserPanel() {
	var name = $(user).find('user').attr('name');
	$.ajax({
		url : "signed.html"
	}).done(function(html) {
		$(".userhead").html(html);
		$("#userName").text(name);
		//$('#myCart').click(cartClickHandler);
		$('#logOut').click(logOutHandler);
		//translate($('.userhead'));
		$(window).trigger('hashchange');
	});
}

function loginFormHandler() {
	var username = $('#name').val();
	var password = $('#password').val();
	if(!username || !password) {
		return false;
	}
	var resp = signIn(username, password)
	var err = parseError(resp);
	if(!err) {
		user = resp;
		updateUserPanel();
	} else {
		var errString = $(language).find('incorrectLogin').text();
		$('#loginError').text(errString);
		$('#loginError').css('visibility', 'visible');
	}
	
	return false;
}

function logOutHandler() {
	window.location = "index.html"
	//$('#main').load('home.html');
}