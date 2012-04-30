function Exception(string,method){
	this.string = string;
	this.method = method;
};

Exception.prototype.solve = function() {
	this.method(this.string);  
};


