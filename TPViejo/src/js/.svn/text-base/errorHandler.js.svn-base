function ErrorHandler() {
	this.map = new Map();
	this.init();
};

ErrorHandler.prototype.init = function() {
	this.map.put(1, new Exception("Missing method"/*, view.missingMethod)*/));
	this.map.put(2, new Exception("Missing language id"/*, view.missingLanguageId)*/));
	this.map.put(3, new Exception("Missing country id"/*, view.missingCountryId)*/));
	this.map.put(4, new Exception("Missing username"/*, view.missingUsername)*/));
	this.map.put(5, new Exception("Missing password"/*, view.missingPassword)*/));
	this.map.put(6, new Exception("Missing authentication token"/*, view.missingAuthenticationToken*/));
	this.map.put(7, new Exception("Misssing account"/*, view.missingAccount*/));
	this.map.put(8, new Exception("Missing new password"/*, view.missingNewPassword*/));
	this.map.put(9, new Exception("Missing category id"/*, view.missingCategoryId*/));
	this.map.put(10, new Exception("Missing sub-category id"/*, view.missingSubCategoryId*/));
	this.map.put(11, new Exception("Missing criteria"/*, view.missingCriteria*/));
	this.map.put(12, new Exception("Missing product id"/*, view.missingProductId*/));
	this.map.put(13, new Exception("Missing order id"/*, view.missingOrderId)*/));
	this.map.put(14, new Exception("Missing address id"/*, view.missingAddressId*/));
	this.map.put(15, new Exception("Missing order item"/*, view.missingOrderItem*/));
	this.map.put(16, new Exception("Missing address"/*, view.missingAddress)*/));
	this.map.put(101, new Exception("Invalid method"/* view.invalidMethod*/));
	this.map.put(102, new Exception("Invalid lenguage id"/* view.invalidLanguageId*/));
	this.map.put(103, new Exception("Invalid country id"/* view.invalidCountryId*/));
	this.map.put(104, new Exception("Invalid user"/* view.invalidUser*/));
	this.map.put(105, new Exception("Invalid authetication token"/* view.invalidationAutheticationToken*/));
	this.map.put(107, new Exception("Invalid username"/* view.invalidUsername*/));
	this.map.put(108, new Exception("Invalid password"/* view.invalidPassword*/));
	this.map.put(109, new Exception("Invalid name"/* view.invalidName*/));
	this.map.put(110, new Exception("Invalid email"/* view.invalidEmail*/));
	this.map.put(111, new Exception("Invalid birth date"/* view.invalidBirthDate*/));
	this.map.put(112, new Exception("Invalid category id"/* view.invalidCategoryId*/));
	this.map.put(113, new Exception("Invalid sub-category id"/* view.invalidSubCategoryId*/));
	this.map.put(114, new Exception("Invalid product id"/* view.invalidProductId*/));
	this.map.put(115, new Exception("Invalid order id"/* view.invalidOrderId*/));
	this.map.put(116, new Exception("Invalid operation"/* view.invalidOperation*/));
	this.map.put(117, new Exception("Invalid address id"/* view.invalidAddressId*/));
	this.map.put(118, new Exception("Invalid full name"/* view.invalidFullName*/));
	this.map.put(119, new Exception("Invalid address line 1"/* view.invalidAddressLine1*/));
	this.map.put(120, new Exception("Invalid address line 2"/* view.invalidAddressLine2*/));
	this.map.put(121, new Exception("Invalid state id"/* view.invalidStateId*/));
	this.map.put(122, new Exception("Invalid city"/* view.invalidCity*/));
	this.map.put(123, new Exception("Invalid zip code"/* view.invalidZipCode*/));
	this.map.put(124, new Exception("Invalid phone number"/* view.invalidPhoneNumber*/));
	this.map.put(201, new Exception("User already exists"/* view.userAlreadyExists*/));
	this.map.put(202, new Exception("Address already exists"/* view.addressAlreadyExists*/));
	this.map.put(999, new Exception("Unknown error"/* view.unknownMethod*/));
};
ErrorHandler.prototype.handle = function(excNumb) {
	if(this.map.get(excNumb) == null) {
		return null;
	}
	this.map.get(excNumb).solve();
}