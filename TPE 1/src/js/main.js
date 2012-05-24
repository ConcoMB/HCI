user = null;
language = null;
IPP=8;
dummy=false;
defaultLang=1;

$(document).ready(function() {
	updateLanguageList();
	var lang=getCookie("lang");
	if(lang){
		loadLanguage(lang);
	}
	else{
		loadLanguage(defaultLang);
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
	updateSearchAutocomplete();
	//$('.subcategory').click(subcategoryClickHandler);
//	$('.category').click(categoryClickHandler);
	//$('.artName').click(productClickHandler);
	$(window).bind('hashchange', hashChangeHandler);
	$(window).trigger('hashchange');
	//translate();
}); 