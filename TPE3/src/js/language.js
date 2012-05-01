function getLanguageList(){
	return request('languageList');
}

function updateLanguageList(){
	var first=true;
	var languages=getLanguageList();
	var html='';
	$(languages).find('language').each(function(){
		var name=$(this).find('name').text();
		var lid=$(this).attr('id');
		if(!first){
			html+='|';
		} else{
			first=false;
			loadLanguage(lid,name);
		}
		html+='<a> '+name+' </a>';
	});
	$('#footer').append(html);
}

function loadLanguage(lid,name){
	$.ajax({
		type : "GET",
		url : "lang/"+name.toLowerCase()+".xml",
		dataType : "xml",
		async: false,
		success : function(xml) {
			language=xml;
		}
	});
}
