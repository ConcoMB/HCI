function Category(category_id, code, name, isSubcategory) {
	this.subcategory = isSubcategory;
	this.id = category_id;
	this.code = code;
	this.name = name;
}

Category.prototype.getId = function() {
	return this.id;
}

Category.prototype.getCode = function() {
	return this.code;
}

Category.prototype.getName = function() {
	return this.name;
}

Category.prototype.isCategory = function() {
	return !this.subcategory;
}

Category.prototype.isSubcategory = function() {
	return this.subcategory;
}

Category.prototype.isArticle = function() {
	return false;
}