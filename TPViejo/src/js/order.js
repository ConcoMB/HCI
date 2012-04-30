function Order(order_id, address_id, status, created_date, confirmed_date, shipped_date, delivered_date, latitude, longitude, items) {
	this.order_id = order_id;
	this.address_id = address_id;
	this.status = status;
	this.created_date = created_date;
	this.confirmed_date = confirmed_date;
	this.shipped_date = shipped_date;
	this.delivered_date = delivered_date;
	this.latitude = latitude;
	this.longitude = longitude;
	this.items = new List(items);
	this.name = null;
}

Order.prototype.getName = function() {
	return this.name;
}
Order.prototype.setName = function(name) {
	return this.name = name;
}

Order.prototype.isConfirmed = function() {
	return this.status != 1;
}
Order.prototype.getId = function() {
	return this.order_id;
}
Order.prototype.getStatus = function() {
	return this.status;
}
Order.prototype.addItem = function(item) {
	this.items = this.items.concat(item);
}
Order.prototype.isOrder = function() {
	return true;
}
Order.prototype.isArticle = function() {
	return false;
}
Order.prototype.getItems = function() {
	return this.items;
}
Order.prototype.getPrice = function() {
	var arts = this.getItems();
	var total = 0;
	for(x in arts) {
		total += arts[x].getPrice() * arts[x].getQuantity();
	}
	return total;
}