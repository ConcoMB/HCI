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
	var username=$('#su_username').attr("value");
	var password=$('#su_password').attr("value");
	var rPassword=$('#su_rPassword').attr("value");
	var email=$('#su_email').attr("value");
	var name=$('#su_name').attr("value");
	var date = '6/6/1991';
	var error='';
	$('#errors').html('');
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
	var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(!email.match(exp)){
		error+=$(language).find('wrong_email').text()+"<br>";
	}
	if(!name){
		error+=$(language).find('empty_name').text()+"<br>";
	}
	$('#errors').append(error);
	if(!error){
		var xml='<account><username>'+username+'</username><name>'+name+'</name><password>';
		xml+=password+'</password><email>'+email+'</email> <birth_date>'+date+'</birth_date></account>';
		var req=request('createAccount');
		signIn(username, password);
		updateUserPanel(username);
		$('#main').load('home.html');
	}
	return false;
}
