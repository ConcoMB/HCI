function signIn(username,password){
	/*DUMMY FUNCTION*/
	var txt='<response status="ok"><authentication><token>244f6439f45f207f1eb89fb2355a4768</token><user id="1" username="itba" name="ITBA" last_login_date="2009-06-31" /></authentication></response>';
	/*PARSE*/
	var xmlDoc = $.parseXML( txt );
    var $xml = $( xmlDoc );
   	var status=$xml.find('response').attr('status');
   	if(status=='ok'){
   		return {name:$xml.find('user').attr('username')};
   	}
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

function loginFormHandler(){
	var username=$('#name').val();
		var password=$('#password').val();
		if(!username||!password){
			return false;
		}
		user=signIn(username,password)
		if(user){
			updateUserPanel(user.name);
		}
		return false;
}