function signIn(name, pass) {
	var params={
		username: name,
		password: pass
	}
	return request('SignIn', params, 'Security');
}

function updateUserPanel() {
	var name=$(user).find('user').attr('name');
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
	user = signIn(username, password)
	if(user) {
		updateUserPanel();
	}
	return false;
}

function logOutHandler(){
	window.location = "index.html"
	//$('#main').load('home.html');
}