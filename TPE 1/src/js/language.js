function getLanguageList() {
	return request('GetLanguageList', null,'Common');
}

function updateLanguageList() {
	var first = true;
	var languages = getLanguageList();
	$(languages).find('language').each(function() {
		var name = $(this).find('name').text();
		var lid = $(this).attr('id');
		var lang = $('<a></a>').addClass('language').attr('href', '#');
		$(lang).text(name);
		$(lang).data('lid', lid);
		if(!first) {
			$('#footer').append(' | ');
		} else {
			first = false;
			loadLanguage(lid);
		}
		$('#footer').append(lang);
	});
	$('.language').click(languageClickHandler);
}

function loadLanguage(lid) {
	$.ajax({
		type : "GET",
		url : "lang/" + lid + ".xml",
		dataType : "xml",
		async : false,
		success : function(xml) {
			$(xml).find('language').attr('id', lid);
			language = xml;
		}
	});
}

function translate(elem) {
	if(!elem){
		elem=$(document);
	}
	$('.translate',elem).each(function() {
		var id = $(this).attr('id');
		if(this.nodeName.toLowerCase() == 'input' && ($(this).attr('type') == 'submit' || $(this).attr('type')=="button")) {
			$(this).attr('value', $(language).find(id).text());
		} else {
			$(this).text($(language).find(id).text());
		}
	});
	$('[class*="translate_"]',elem).each(function(){
		var classStr=$(this).attr('class');
		//alert(classStr);
		var code=classStr.replace(/.*translate_([^\s]*)[\s.*]?/,'$1');
		//alert(code);
		if(this.nodeName.toLowerCase() == 'input' && ($(this).attr('type') == 'submit' || $(this).attr('type')=="button")) {
			$(this).attr('value', $(language).find(code).text());
		} else {
			$(this).text($(language).find(code).text());
		}
		
	});
}

function languageClickHandler() {
	loadLanguage($(this).data('lid'));
	translate();
	setCookie("lang", $(this).data('lid'), 1);
	return false;
}
