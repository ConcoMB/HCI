$(document).ready(function() {
	$('#loginForm').submit(function() {
		var username=$('#name').val();
		var password=$('#password').val();
		if(!username||!password) {
			alert('Error'+username+password);
			return false;
		} else{
			var sv=new Server();
			var ans=sv.signIn(username,password);
			alert('Hello');
			return false;
		}
		alert('asd');
		return false;
	});
});