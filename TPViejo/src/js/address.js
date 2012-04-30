function Address(full_name, address_line_1, address_line_2, country_id, state_id, city, zip_code, phone_number,address_id) {
	this.full_name = full_name;
	this.address_line_1 = address_line_1;
	this.address_line_2 = address_line_2;
	this.country_id = country_id;
	this.state_id = state_id;
	this.city = city;
	this.zip_code = zip_code;
	this.phone_number = phone_number;
	this.address_id = address_id;
}

Address.prototype.getName = function() {
	return this.getFullName;
}

Address.prototype.getFullName = function() {
	return this.full_name;
}
Address.prototype.getAddressLine1 = function() {
	return this.address_line_1;
}
Address.prototype.getAddressLine2 = function() {
	return this.address_line_2;
}
Address.prototype.getCountryId = function() {
	return this.country_id;
}
Address.prototype.getStateId = function() {
	return this.state_id;
}
Address.prototype.getCity = function() {
	return this.city;
}
Address.prototype.getZipCode = function() {
	return this.zip_code;
}
Address.prototype.getPhoneNumber = function() {
	return this.phone_number;
}

Address.prototype.setId = function(address_id) {
	this.address_id = address_id;
}
Address.prototype.toAddressXML = function() {
	return getDOMParser("<address>" + "<full_name>" + this.full_name + "</full_name>" + "<address_line_1>" + this.address_line_1 + "</address_line_1>" + "<address_line_2>" + this.address_line_2 + "</address_line_2>" + "<country_id>" + this.country_id + "</country_id>" + "<state_id>" + this.state_id + "</state_id>" + "<city>" + this.city + "</city>" + "<zip_code>" + this.zip_code + "</zip_code>" + "<phone_number>" + this.phone_number + "</phone_number>" + "</address>");
}