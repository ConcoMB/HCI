function updatePages(page, size){
	if(page==0){
		$('#prev').css('visibility','hidden');
	}
	else{
		$('#prev').attr('href',getHash('page',page-1));
	}
	if((page+1)*IPP>=size){
		$('#next').css('visibility','hidden');
	}else{
		$('#next').attr('href',getHash('page',page+1));
	}
}
