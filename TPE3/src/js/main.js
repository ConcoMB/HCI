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
	$('#search').submit(searchHandler);
	//$('.subcategory').click(subcategoryClickHandler);
	$('.category').click(categoryClickHandler);
	//$('.artName').click(productClickHandler);
	$('#signupLink').attr('href','#target=signUp');
	$(window).bind( 'hashchange', hashChangeHandler);
	$(window).trigger( 'hashchange' );
	translate();
});