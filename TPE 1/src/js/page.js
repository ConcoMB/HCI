function updatePages(page, size){
	/*if(page==1){
		$('#prev').addClass('hide');
	}
	else{
		$('#prev').attr('href',getHash('page',parseInt(page)-1));
	}
	if((page)*IPP>=size){
		$('#next').addClass('hide');
	}else{
		$('#next').attr('href',getHash('page',parseInt(page)+1));
	}*/
	if(size<=IPP){
		$('.pages').addClass('hide');
	}
	else{
		for(var i=1; i*IPP<=size;i++){
			var a=$('<a></a>').attr('href',getHash('page',i)).text(' '+i).addClass('page');
			if(i==page){
				$(a).addClass('currentPage')
			}
			$('.pages').append(a);
		}
	}
}
