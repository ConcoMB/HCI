function 

$(document).ready(function() {
	$('#loginForm').submit(function() {
		var username=$('#name').val();
		var password=$('#password').val();
		if(!username||!password) {
			alert('Error');
			return false;
		} else{
			var sv=new Server();
			var ans=sv.signIn(username,password);
			return false;
		}
		return false;
	});
});