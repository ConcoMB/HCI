function List(elements) {
	if(elements==null||elements==undefined){
		this.elements = [];
	}else{
		this.elements=elements;
	}
}

List.prototype.add = function(element) {
	this.elements = this.elements.concat(element);
}

List.prototype.remove = function(element) {
	this.removeFrom(element, element);
}

List.prototype.removeFrom = function(from, to) {
	var rest = this.elements.slice((to || from) + 1 || this.elements.length);
	this.elements.length = from < 0 ? this.elements.length + from : from;
	return this.elements.push.apply(this.elements, rest);
}

List.prototype.get = function(index) {
	return this.elements[index];
}

List.prototype.toArray = function() {
	return this.elements;
}

List.prototype.filter = function(param) {
	var ans = [];
	for(x in this.elements) {
		if(param(this.elements[x])) {
			ans = ans.concat(this.elements[x]);
		}
	}
	return ans;
}

List.prototype.print = function(printFn) {
	var ans = "";
	for(x in this.elements) {
		ans = ans.concat(printFn(this.elements[x]));
	}
	return ans;
}


List.prototype.size=function(){
	return this.elements.length;
}
