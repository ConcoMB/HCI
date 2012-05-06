function getLanguageList() {
	return request('languageList');
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
			$('#footer').append('|');
		} else {
			first = false;
			loadLanguage(lid, name);
		}
		$('#footer').append(lang);
	});
	$('.language').click(languageClickHandler);
}

function loadLanguage(lid, name) {
	$.ajax({
		type : "GET",
		url : "lang/" + name.toLowerCase() + ".xml",
		dataType : "xml",
		async : false,
		success : function(xml) {
			$(xml).find('language').attr('id', lid);
			language = xml;
		}
	});
}

function translate() {
	$('.translate').each(function() {
		var id = $(this).attr('id');
		if(this.nodeName.toLowerCase() == 'input' && $(this).attr('type') == 'submit') {
			$(this).attr('value', $(language).find(id).text());
		} else {
			$(this).text($(language).find(id).text());
		}
	});
	$('[class*="translate_"]').each(function(){
		var classStr=$(this).attr('class');
		//alert(classStr);
		var code=classStr.replace(/.*translate_([^\s]*)[\s.*]?/,'$1');
		//alert(code);
		$(this).text($(language).find(code).text());
	});
}

function languageClickHandler() {
	loadLanguage($(this).data('lid'), $(this).text());
	translate();
}
