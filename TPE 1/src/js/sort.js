function sortByHandler() {
	var newHash=getHash('order',$(this).val());
	window.location.hash=newHash;
}

function updateSort(order){
	$('#sortBy').val(order);
	$('#sortBy').change(sortByHandler);
}
