user=null;
language=null;

$(document).ready(function(){
	updateLanguageList();
	updateCategoryList();
	$(function() {
				$("#accordion").accordion({
					collapsible : true
				});
			});
	$('#loginForm').submit(loginFormHandler);
	$('.subcategory').click(subcategoryClickHandler);
	$('.category').click(categoryClickHandler);
	$('.artName').click(productClickHandler);
	$('#signupLink').click(signupForm);
	$('#main').load('home.html');
	translate();
});