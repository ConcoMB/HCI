/*SHOW FORM*/


function signupForm(){
	/*$.ajax({
		url : "signUp.html"
	}).done(function(html) {
		$('#main').html(html);
		translate($('#main'));
		$('#signupForm').submit(signupFormHandler);
	});*/
	$('#signupForm').submit(signupFormHandler);
}

/*SEND FORM*/
function signupFormHandler(){
	var username=$('#su_username').attr("value");
	var password=$('#su_password').attr("value");
	var rPassword=$('#su_rPassword').attr("value");
	var email=$('#su_email').attr("value");
	var name=$('#su_name').attr("value");
	var date=$('#su_birth_month').attr("value")+'-'+$('#su_birth_day').attr("value")+'-'+$('#su_birth_year').attr("value");
	var error='';
	$('#errors').html('');
	if(!username){
		error+=$(language).find('empty_username').text()+"<br>";
		$('#reqUser').css('visibility','visible');
	}else{
		$('#reqUser').css('visibility','hidden');
	}
	if(!password){
		error+=$(language).find('empty_password').text()+"<br>";
		$('#reqPass').css('visibility','visible');
	}else{
		$('#reqPass').css('visibility','hidden');
	}
	if(password!=rPassword){
		error+=$(language).find('password_mismatch').text()+"<br>";
	};
	if(!rPassword){
		$('#reqConf').css('visibility','visible');
	}else{
		$('#reqConf').css('visibility','hidden');
	}
	if(!email){
		error+=$(language).find('empty_email').text()+"<br>";
		$('#reqMail').css('visibility','visible');
	}else{
		$('#reqMail').css('visibility','hidden');
	}
	var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(!email.match(exp)){
		error+=$(language).find('wrong_email').text()+"<br>";
	}
	if(!name){
		error+=$(language).find('empty_name').text()+"<br>";
		$('#reqName').css('visibility','visible');
	}else{
		$('#reqName').css('visibility','hidden');
	}
	if(!ValidateForm(date)){
		error+=$(language).find('invalid_date').text()+"<br>";
		$('#reqDate').css('visibility','visible');
	}else{
		$('#reqDate').css('visibility','hidden');
	}
	if(!error){
		var xml='<account><username>'+username+'</username><name>'+name+'</name><password>';
		xml+=password+'</password><email>'+email+'</email> <birth_date>'+date+'</birth_date></account>';
		var req=createAccount(xml);
		var err=parseError(req);
		if(!err){
			user=signIn(username, password);
			updateUserPanel();
			$('#main').load('home.html');
		}else{
			/*FALLO*/
			signupError(err);
		}
	}
	$('#errors').append(error);
	return false;
}

function signupError(code){
	var errString, id;
	switch(code){
		case '107':
			errString=$(language).find('username_length');
			break;
		case '108':
			errString=$(language).find('password_length');
			break;
		case '109':
			errString=$(language).find('name_length');
			break;
		case '110':
			errString=$(language).find('email_length');
			break;
		case '111':
			errString=$(language).find('invalid_date');
			break;
		case '201':
			errString=$(language).find('username_exists');
			break;		
	}
	$('#errors').append(errString);
}

function createAccount(acc){
	var params={account: acc};
	return request('CreateAccount',params,'Security');
}

var dtCh= "-";
var minYear=0;
var maxYear=2011;

function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag){
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary (year){
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31;
		if (i==4 || i==6 || i==9 || i==11) {
			this[i] = 30;
		}
		if (i==2) {
			this[i] = 29;
		}
   } 
   return this
}

function isDate(dtStr){
	var daysInMonth = DaysArray(12);
	var pos1=dtStr.indexOf(dtCh);
	var pos2=dtStr.indexOf(dtCh,pos1+1);
	var strMonth=dtStr.substring(0,pos1);
	var strDay=dtStr.substring(pos1+1,pos2);
	var strYear=dtStr.substring(pos2+1);
	strYr=strYear;
	if (strDay.charAt(0)=="0" && strDay.length>1) 
		strDay=strDay.substring(1);
	if (strMonth.charAt(0)=="0" && strMonth.length>1) 
		strMonth=strMonth.substring(1);
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) 
			strYr=strYr.substring(1);
	}
	month=parseInt(strMonth);
	day=parseInt(strDay);
	year=parseInt(strYr);
	if (pos1==-1 || pos2==-1){
		return false;
	}
	if (strMonth.length<1 || month<1 || month>12){
		return false;
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		return false;
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		return false;
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		return false;
	}
	return true;
}

function ValidateForm(date){
	if (isDate(date)==false){
		//date.focus();
		return false;
	}
    return true;
 }

