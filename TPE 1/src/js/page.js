function updatePages(page, size){
	if(page==1){
		$('#prev').addClass('hide');
	}
	else{
		$('#prev').attr('href',getHash('page',parseInt(page)-1));
	}
	if((page)*IPP>=size){
		$('#next').addClass('hide');
	}else{
		$('#next').attr('href',getHash('page',parseInt(page)+1));
	}
}
