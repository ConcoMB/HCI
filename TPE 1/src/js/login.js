function signIn(name, pass) {
	var params = {
		username : name,
		password : pass
	}
	return request('SignIn', params, 'Security');
}

function updateUserPanel() {
	var name = $(user).find('user').attr('username');
	$.ajax({
		url : "html/signed.html"
	}).done(function(html) {
		$(".userhead").html(html);
		$("#userName").html(name);
		//$('#myCart').click(cartClickHandler);
		$('#logOut').click(logOutHandler);
		$('#themeChooser').change(themeHandler);
		updateUserTheme();
		//translate($('.userhead'));
		//$(window).trigger('hashchange');
	});
}

function loginFormHandler() {
	var username = $('#name').val();
	var password = $('#password').val();
	if(!username || !password) {
		return false;
	}
	if(login(username,password)){
		location.reload();
	}
	return false;
}

function login(username, password)
{
	var resp = signIn(username, password)
	var err = parseError(resp);
	if(!err) {
		user = resp;
		var array=new Array(username, password);
		setCookie("login", array, 1);
		return true;
	} else {
		var errString = $(language).find('incorrectLogin').text();
		$('#loginError').text(errString);
		$('#loginError').removeClass('hide');
	}

	return false;
}

function logOutHandler() {
	destroyCookie("login");
	window.location = "index.html"
	window.location.hash="";
	//$('#main').load('home.html');
}

function destroyCookie(name){
	var expdate = new Date();
	expdate.setTime(expdate.getTime() - 1);
	document.cookie = name += "=; expires=" + expdate.toGMTString();
}

function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
	var i, x, y, ARRcookies = document.cookie.split(";");
	for( i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if(x == c_name) {
			return unescape(y);
		}
	}
}

