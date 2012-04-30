$(document).ready(function() {
	$('#loginForm').submit(function() {
		if(!$('#name').val()||!$('#password').val()) {
			return false;
		}
	});
});