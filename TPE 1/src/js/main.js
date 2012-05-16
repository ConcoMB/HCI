user = null;
language = null;
IPP=8;
dummy=true;

$(document).ready(function() {
	updateLanguageList();
	var lang=getCookie("lang");
	if(lang){
		loadLanguage(lang);
	}
	var resp=getCookie("login");
	if(!resp){
		$('#loginForm').submit(loginFormHandler);
		$('#signupLink').attr('href', '#target=signUp');
	}else{
		var arr=resp.split(",");
		login(arr[0],arr[1]);
		updateUserPanel();
	}
	updateCategoryList();
	$("#accordion").accordion({
		collapsible : true,
		active: false
	});
	$('#search').submit(searchHandler);
	//$('.subcategory').click(subcategoryClickHandler);
	$('.category').click(categoryClickHandler);
	//$('.artName').click(productClickHandler);
	$(window).bind('hashchange', hashChangeHandler);
	$(window).trigger('hashchange');
	//translate();
}); 