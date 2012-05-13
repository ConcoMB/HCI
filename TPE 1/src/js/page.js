function updatePages(page, size){
	if(page==1){
		$('#prev').css('visibility','hidden');
	}
	else{
		$('#prev').attr('href',getHash('page',parseInt(page)-1));
	}
	if((page)*IPP>=size){
		$('#next').css('visibility','hidden');
	}else{
		$('#next').attr('href',getHash('page',parseInt(page)+1));
	}
}
