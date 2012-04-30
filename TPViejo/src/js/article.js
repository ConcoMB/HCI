function Article(product_id, category_id, subcategory_id, name, sales_rank, price, image_url) {
	this.product_id = product_id;
	this.category_id = category_id;
	this.subcategory_id = subcategory_id;
	this.name = name;
	this.sales_rank = sales_rank;
	this.price = price;
	this.image_url = image_url;
}

Article.prototype.getLocation = function() {
	return "N/A";
}

Article.prototype.getId = function() {
	return this.product_id;
}

Article.prototype.getCategoryId = function() {
	return this.category_id;
}

Article.prototype.getSubcategoryId = function() {
	return this.subcategory_id;
}

Article.prototype.getStock = function() {
	return Math.floor(Math.random(0, 1) * 50);
}

Article.prototype.getName = function() {
	return this.name;
}

Article.prototype.getSalesRank = function() {
	return this.sales_rank;
}

Article.prototype.getPrice = function() {
	return this.price;
}

Article.prototype.getImageURL = function() {
	return this.image_url;
}

Article.prototype.isCategory = function() {
	return false;
}

Article.prototype.isSubcategory = function() {
	return false;
}

Article.prototype.getBriefDescription = function(){
	return "N/A";
}

Article.prototype.isArticle = function() {
	return true;
}

Article.prototype.toHash=function(){
	var value = ":";
	value = value.concat(product_id + "=" + this[product_id]);
	return value;
}
