/*SHOW FORM*/

function getCountryList(){
	return request('countryList');	
}

function signupForm(){
	$.ajax({
		url : "signUp.html"
	}).done(function(html) {
		$('#main').html(html);
		$('#signupForm').submit(signupFormHandler);
	});
}

/*SEND FORM*/
function signupFormHandler(){
	var username=$('#su_username').text();
	var password=$('#su_password').text();
	var rPassword=$('#su_rPassword').text();
	var email=$('#su_email').text();
	var name=$('#su_name').text()+$('#su_lastname').text();
	var error='';
	if(!username){
		error+=$(language).find('empty_username').text()+"<br>";
	}
	if(!password){
		error+=$(language).find('empty_password').text()+"<br>";
	}
	else if(password!=rPassword){
		error+=$(language).find('password_mismatch').text()+"<br>";
	};
	if(!email){
		error+=$(language).find('empty_email').text()+"<br>";
	}
	if(!name){
		error+=$(language).find('empty_name').text()+"<br>";
	}
	$('#errors').append(error);
	return false;
}
