user = null;
language = null;
IPP=8;
dummy=false;

$(document).ready(function() {
	updateLanguageList();
	updateCategoryList();
	$("#accordion").accordion({
		collapsible : true,
		active: false
	});
	$('#loginForm').submit(loginFormHandler);
	$('#search').submit(searchHandler);
	//$('.subcategory').click(subcategoryClickHandler);
	$('.category').click(categoryClickHandler);
	//$('.artName').click(productClickHandler);
	$('#signupLink').attr('href', '#target=signUp');
	$(window).bind('hashchange', hashChangeHandler);
	$(window).trigger('hashchange');
	translate();
}); 