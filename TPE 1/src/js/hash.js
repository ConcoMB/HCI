function hashChangeHandler(event) {
	var hash = window.location.hash || '#target=home';
	var params = parseHash(hash);
	$("#main").html('<img id="loading" src="img/loading.gif"/>');
	$.ajax({
		url : 'html/'+params.target + '.html'
	}).done(function(html) {
		$('#main').append(html);
		/*ADDITIONAL FUNCTIONS*/
		switch(params.target) {
			case 'signUp':
				if(user)
				{
					window.location.hash="#target=home";					
				}else{
					signupForm();
				}
				break;
			case 'category':
				category(params.cid, params.sid, params.page, params.order);
				break;
			case 'detail':
				updateProduct(params.pid);
				break;
			case 'cart':
				cart();
				break;
			case 'search':
				search(params.query, params.cid, params.sid, params.page, params.order);
				break;
			case 'order':
				goToOrder(params.oid, params.status);
				break;
			case 'profile':
				viewProfile();
				break;
			case 'addresses':
				viewAddrs();
				break;
			case 'newAddr':
				newAddr();
				break;
			case "checkOut":
				checkOut(params.oid);
				break;
			case "confirmed":
				confirmed(params.oid,params.aid);
				break;
			case "editAddr":
				editAddressHandler(params.id);
				break;
			case "home":
				carousel();
		}
		translate();
		$("#loading").remove();	
	});
}

function parseHash(hash) {
	var params = {};
	var paramStrings = hash.substr(1).split('&');
	for( i = 0; i < paramStrings.length; i++) {
		var a = paramStrings[i].split('=');
		params[a[0]] = a[1];
	}
	return params;
}

function getHash(param, value){
	var hash=window.location.hash;
	if(!param||!value){
		return hash;
	}
	var params=parseHash(hash);
	var newHash='#';
	params[param]=value;
	var first=true;
	for(var name in params){
		if(!first){
			newHash+='&';
		}else{
			first=false;
		}
		newHash+=name+'='+params[name];
	}
	return newHash;
}
