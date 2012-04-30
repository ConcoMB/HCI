function SearchData(searchText, order, items_per_page, page) {
	this.searchText = searchText;
	this.order = order;
	this.items_per_page = items_per_page;
	this.page = page;
}

SearchData.prototype.toHash = function() {
	var value = ":";
	for(var v in this) {
		if( typeof this[v] == 'function') {
		} else {
			value = value.concat(v + "=" + this[v] + ";");
		}
	}

	return value.substring(0, value.length - 1);
}

SearchData.prototype.parseHash = function(hshStr) {
	if(hshStr == null || hshStr == undefined) {
		return null;
	}
	var i = 0;
	while(i < hshStr.length && hshStr.charAt(i) != ':') {
		i++;
	}
	if(i >= hshStr.length) {
		return null;
	}
	var search = hshStr.substring(i + 1, hshStr.length);
	var searchArr = search.split(";");
	var split = null;
	for(i in searchArr) {
		split = searchArr[i].split("=");
		this[split[0]] = split[1];
	}
	return this;
}

SearchData.prototype.getObjectSearchedToSearch = function() {
	var hshStr=this.searchText;
	
	if(hshStr == null || hshStr == undefined) {
		return null;
	}
	var i = 0;
	while(i < hshStr.length && hshStr.charAt(i) != ':') {
		i++;
	}
	if(i >= hshStr.length) {
		return null;
	}
	var search = hshStr.substring(i + 1, hshStr.length);
	var searchArr = search.split(";");
	var split = null;
	var data={};//data blob
	for(i in searchArr) {
		split = searchArr[i].split("=");
		data[split[0]] = split[1];
	}
	return data;
}