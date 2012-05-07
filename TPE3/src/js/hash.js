function hashChangeHandler(event) {
	if(!window.location.hash) {
		window.location.hash = '#target=home';
	}
	var hash = window.location.hash || '#target=home';
	var params = parseHash(hash);
	$.ajax({
		url : params.target + '.html'
	}).done(function(html) {
		$('#main').html(html);
		/*ADDITIONAL FUNCTIONS*/
		switch(params.target) {
			case 'home':
				//$('#main').load('home.html');
				break;
			case 'signUp':
				signupForm();
				break;
			case 'category':
				category(params.cname,params.sname, params.cid, params.sid, params.page);
				break;
			case 'detail':
				updateProduct(params.pid);
				break;
			case 'cart':
				cart();
				break;
			case 'search':
				search(params.query, params.cid);
				break;
		}
		translate();
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
