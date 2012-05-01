function signIn(username, password) {
	return request('signIn');
}

function updateUserPanel(name) {
	$.ajax({
		url : "signed.html"
	}).done(function(html) {
		$(".userhead").html(html);
		$("#userName").text(name);
	});
	/*$(".userhead").load('signed.html');
	 $("#userName").text(name);*/
}

function loginFormHandler() {
	var username = $('#name').val();
	var password = $('#password').val();
	if(!username || !password) {
		return false;
	}
	user = signIn(username, password)
	if(user) {
		updateUserPanel($(user).find('user').attr('name'));
	}
	return false;
}