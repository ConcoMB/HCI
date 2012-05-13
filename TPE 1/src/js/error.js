function parseError(xml){
	if($(xml).find('response').attr('status')=='fail'){
		return $(xml).find('error').attr('code');
	}
	return false;
}
