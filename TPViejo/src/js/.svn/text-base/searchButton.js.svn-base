function SearchButton(element, input, callBack) {
	$(element).click(function() {
		if(subscriber.on) {
			view.search(input.val(),"ASC",5, 1);
			view.moveTo("search","", callBack);
			subscriber.on = false;
		}
	});
}