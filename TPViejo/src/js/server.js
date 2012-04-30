function Server(serverAddress) {
	//private methods and variables

	this.serverAddress = serverAddress;
	this.common = "Common.groovy?method=";
	this.security = "Security.groovy?method=";
	this.catalog = "Catalog.groovy?method=";
	this.order = "Order.groovy?method=";

	this._dumbGetLanguageList = function() {
		return getDOMParser('<response status="ok">' + '<languages>' + '<language id="1">' + '<code>en</code>' + '<name>English</name>' + '</language>' + '<language id="2">' + '<code>es</code>' + '<name>Español</name>' + '</language>' + '</languages>' + '</response>');
	}
	this._dumbGetCountryList = function() {
		return getDOMParser('<response status="ok">' + '<countries>' + '<country id="1">' + '<code>ARG</code>' + '<name>Argentina</name>' + '</country>' + '<country id="2">' + '<code>USA</code>' + '<name>United States</name>' + '</country>' + '</countries>' + '</response>');
	}
	this._dumbGetStateList = function() {
		return getDOMParser('<response status="ok">' + '<states>' + '<stateid="1">' + '<country_id>' + '2</country_id>' + '<code>' + 'FL</code>' + '<name>' + 'Florida</name>' + '</country>' + '<countryid="2">' + '<country_id>' + '2</country_id>' + '<code>' + 'TX</code>' + '<name>' + 'Texas</name>' + '</country>' + '</countries>' + '</response>');
	}
	this._dumbGetAddress = function() {
		return getDOMParser('<response status="ok"> <address id="1"> <full_name>ITBA 1</full_name> <address_line_1>Av. Eduardo Madero 399</address_line_1> <address_line_2 /> <country_id>1</country_id> <state_id>1</state_id> <city>Capital Federal</city> <zip_code>C1106ACD</zip_code> <phone_number>0800-888-ITBA</phone_number> </address> </response>');
	}
	this._dumbGetAddressList = function() {
		return getDOMParser('<response status="ok"> <addresses> <address id="1"> <full_name>ITBA 1</full_name> <address_line_1>Av. Eduardo Madero 399</address_line_1> <address_line_2 /> <country_id>1</country_id> <state_id>1</state_id> <city>Capital Federal</city> <zip_code>C1106ACD</zip_code> <phone_number>0800-888-ITBA</phone_number> </address> </addresses> </response>');
	}
	this._dumbUpdateAddress = function() {
		return getDOMParser('<response status="ok"/>');
	}
	this._dumbCreateAddress = function() {
		return getDOMParser('<response status="ok"> <address id="1" /> </response>');
	}
	this._dumbDeleteOrderItem = function() {
		return getDOMParser('<response status="ok"/>');
	}
	this._dumbAddOrderItem = function() {
		return getDOMParser('<response status="ok"/>');
	}
	this._dumbGetOrder = function() {
		return getDOMParser('<response status="ok">  <order id="10">    <address_id>1</address_id><status>2</status><created_date>2009-09-07</created_date>    <confirmed_date>2009-09-08</confirmed_date>    <shipped_date /><delivered_date /><latitude>-38</latitude>    <longitude>-50</longitude><items><item id="1"><product_id>2</product_id><count>2</count><price>17.13</price></item></items></order></response>');
	}
	this._dumbGetOrderList = function() {
		return getDOMParser('<response status="ok"> <orders> <order id="24"> <address_id>1</address_id> <status>1</status> <created_date>2009-10-04</created_date> <confirmed_date /> <shipped_date /> <delivered_date /> <latitude>45</latitude> <longitude>-10</longitude> </order> <order id="10"> <address_id>1</address_id> <status>2</status> <created_date>2009-09-07</created_date> <confirmed_date>2009-09-08</confirmed_date> <shipped_date /> <delivered_date /> <latitude>-38</latitude> <longitude>-50</longitude> </order> </orders> </response>');
	}
	this._dumbConfirmOrder = function() {
		return getDOMParser('<response status="ok"/>');
	}
	this._dumbChangeOrderAddress = function() {
		return getDOMParser('<response status="ok"/>');
	}
	this._dumbDeleteOrder = function() {
		return getDOMParser('<response status="ok"/>');
	}
	this._dumbCreateOrder = function() {
		return getDOMParser('<response status="ok"> <order id="1"/> </response>');
	}
	this._dumbSignIn = function() {
		return getDOMParser('<response status="ok"> <authentication> <token>244f6439f45f207f1eb89fb2355a4768</token> <user id="1" username="itba" name="ITBA" last_login_date="2009-06-31" /> </authentication></response>');
	}
	this._dumbSignOut = function() {
		return getDOMParser('<response status="ok" />');
	}
	this._dumbChangePassword = function() {
		return getDOMParser('<response status="ok" />');
	}
	this._dumbCreateAccount = function() {
		return getDOMParser('<response status="ok">  <account id="1" /> </response>');
	}
	this._dumbGetAccount = function() {
		return getDOMParser('<response status="ok"> <account id="1" /> </response>');
	}
	this._dumbUpdateAccount = function() {
		return getDOMParser('<response status="ok" />');
	}
	this._dumbGetCategoryList = function() {
		return getDOMParser('<response status="ok">  <categories>    <category id="1">      <code>DVD</code><name>DVD</name>    </category><category id="2">      <code>BOO</code><name>Books</name>    </category>  </categories></response>');
	}
	this._dumbGetSubcategoryList = function() {
		return getDOMParser('<response status="ok">  <subcategories>    <subcategory id="1">      <category_id>1</category_id>      <code>ACTIO</code><name>Action</name>    </subcategory><subcategory id="2">      <category_id>1</category_id>      <code>COMED</code><name>Comedy</name>    </subcategory>...<subcategory id="7">      <category_id>1</category_id>      <code>SCIEN</code><name>Science Fiction</name>    </subcategory>  </subcategories></response>');
	}
	this._dumbGetProductListByCategory = function() {
		return getDOMParser('<response status="ok">  <products size="1">    <product id="1">      <category_id>1</category_id><subcategory_id>7</subcategory_id><name>X-Men Origins: Wolverine</name>      <sales_rank>85</sales_rank><price>27.99</price><image_url />    </product>  </products></response>');
	}
	this._dumbGetProductListBySubcategory = function() {
		return getDOMParser('<response status="ok">  <products size="1">    <product id="1">       <category_id>1</category_id><subcategory_id>7</subcategory_id><name>X-Men Origins: Wolverine</name>       <sales_rank>85</sales_rank><price>27.99</price><image_url />    </product>  </products></response>');
	}
	this._dumbGetProductListByName = function() {
		return getDOMParser('<response status="ok">  <products size="2">    <product id="1"> <category_id>1</category_id><subcategory_id>7</subcategory_id><name>X-Men Origins: Wolverine</name>       <sales_rank>85</sales_rank><price>27.99</price><image_url />    </product>   <product id="2">      <category_id>2</category_id><subcategory_id>11</subcategory_id><name>Intervention</name><sales_rank>845</sales_rank>      <price>17.13</price><image_url />    </product>  </products></response>')
	}
	this._dumbGetProduct = function() {
		return getDOMParser('<response status="ok"><product id="1">    <category_id>1</category_id><subcategory_id>7</subcategory_id><name>X-Men Origins: Wolverine</name>    <sales_rank>85</sales_rank><price>27.99</price><image_url /><actors>Hugh Jackman, Liev Schreiber</actors><format>AC-3, Color, Dolby, DTS Surround Sound, Dubbed, Subtitled,Widescreen</format>    <language>English</language><subtitles>English, French, Spanish</subtitles><region>Region 1</region><aspect_ratio>2.35:1</aspect_ratio><number_discs>2</number_discs><release_date>2009-09-15</release_date>    <run_time>107</run_time><ASIN>B001GCUO16</ASIN>  </product></response>');
	}
	this._dumbUpdateOrder = function() {
		return getDOMParser('<response status="ok" />');
	}
	
	
}

/*
 * Common
 */
Server.prototype.getLanguageList = function() {
	if(this.serverAddress == null){
		return this._dumbGetLanguageList();	
	}
	
	return $.ajax({
		url: this.serverAddress + this.common + "GetLanguageList"
	});
	
}
Server.prototype.getCountryList = function(language_id) {
	if(this.serverAddress == null) {
		return this._dumbGetCountryList();
	}
	
	return $.ajax({
		url: this.serverAddress + this.common + "GetCountryList",
		data: {
			language_id : language_id
		}
	});
	
}
Server.prototype.getStateList = function(language_id, country_id) {
	if(this.serverAddress == null){
		return this._dumbGetStateList();
	}
	
	return $.ajax({
		url: this.serverAddress + this.common + "GetStateList",
		data: {
			language_id: language_id,
			country_id: country_id
		}
	});
	
}
/*
 * Security
 */

Server.prototype.signIn = function(username, password) {
	if(this.serverAddress == null) {
		return this._dumbSignIn();
	}
	
	return $.ajax({
		url: this.serverAddress + this.security + "SignIn",
		data: {
			username: username,
			password: password
		}
	});
	
}
Server.prototype.signOut = function(username, authentication_token) {
	if(this.serverAddress == null) {
		return this._dumbSignOut();
	}
	
	return $.ajax({
		url: this.serverAddress + this.security + "SignOut",
		data: {
			username: username,
			authentication_token: authentication_token
		}
	});
	
}
Server.prototype.changePassword = function(username, password, new_password) {
	if(this.serverAddress == null) {
		return this._dumbChangePassword();
	}
	
	return $.ajax({
		url: this.serverAddress + this.security + "ChangePassword",
		data: {
			username: username,
			password: password,
			new_password: new_password
		}
	});
	
}
Server.prototype.createAccount = function(userXML) {
	if (this.serverAddress == null) {
		return this._dumbCreateAccount();		
	}
	
	return $.ajax({
		type: "POST",
		url: this.serverAddress + this.security + "CreateAccount",
		data: {
			account: userXML
		}
	});
	
}

Server.prototype.getAccount = function(username, authentication_token) {
	if(this.serverAddress == null) {
		return this._dumbGetAccount();
	}
	
	return $.ajax({
		url: this.serverAddress + this.security + "GetAccount",
		data: {
			username : username,
			authentication_token : authentication_token
		}
	});
	
}
Server.prototype.updateAccount = function(username, authentication_token, userXML) {
	if(this.serverAddress == null) {
		return this._dumbUpdateAccount();
	}
	
	return $.ajax({
		type: "POST",
		url: this.serverAddress + this.security + "UpdateAccount",
		data: {
			username : username,
			authentication_token : authentication_token,
			account: userXML
		}
	});
	
}
/*
 * Catalog
 */
Server.prototype.getCategoryList = function(language_id) {
	if(this.serverAddress == null){
		return this._dumbGetCategoryList();
	}
	
	return $.ajax({
		url: this.serverAddress + this.catalog + "GetCategoryList",
		data: {
			language_id: language_id
		}
	});
	
}
Server.prototype.getSubcategoryList = function(language_id, category_id) {
	if(this.serverAddress == null){
		return this._dumbGetSubcategoryList();
	}
	
	return $.ajax({
		url: this.serverAddress + this.catalog + "GetSubcategoryList",
		data: {
			language_id: language_id,
			category_id: category_id
		}
	});
	
}
Server.prototype.getProductListByCategory = function(language_id, category_id, order, items_per_page, page) {
	if(this.serverAddress == null){
		return this._dumbGetProductListByCategory();
	}
	
	return $.ajax({
		url: this.serverAddress + this.catalog + "getProductListByCategory",
		data: {
			language_id: language_id,
			category_id: category_id,
			order: order,
			items_per_page: items_per_page,
			page: page
		}
	});
	
}
Server.prototype.getProductListBySubcategory = function(language_id, category_id, subcategory_id, order, items_per_page, page) {
	if(this.serverAddress == null){
		return this._dumbGetProductListBySubcategory();
	}
	
	return $.ajax({
		url: this.serverAddress + this.catalog + "GetProductListBySubcategory",
		data: {
			language_id: language_id,
			category_id: category_id,
			subcategory_id: subcategory_id,
			order: order,
			items_per_page: items_per_page,
			page: page
		}
	});
	
}
Server.prototype.getProductListByName = function(criteria, order, items_per_page, page) {
	if(this.serverAddress == null){
		return this._dumbGetProductListByName();
	}
	
	return $.ajax({
		url: this.serverAddress + this.catalog + "GetProductListByName",
		data: {
			criteria: criteria,
			order: order,
			items_per_page: items_per_page,
			page: page
		}
	});
	
}
Server.prototype.getProduct = function(product_id) {
	if(this.serverAddress == null){
		return this._dumbGetProduct();
	}
	
	return $.ajax({
		url: this.serverAddress + this.catalog + "GetProduct",
		data: {
			product_id: product_id
		}
	});
	
}
Server.prototype.getAddress = function(username, authentication_token, address_id) {
	if(this.serverAddress == null){
		return this._dumbGetAddress();
	}
	
	return $.ajax({
		url: this.serverAddress + this.order + "GetAddress",
		data: {
			username: username,
			authentication_token: authentication_token,
			address_id: address_id
		}
	});
	
}
Server.prototype.getAddressList = function(username, authentication_token) {
	if(this.serverAddress == null){
		return this._dumbGetAddressList();
	}
	
	return $.ajax({
		url: this.serverAddress + this.order + "GetAddressList",
		data: {
			username: username,
			authentication_token: authentication_token,
		}
	});
	
}
Server.prototype.updateAddress = function(username, authentication_token, address) {
	if(this.serverAddress == null){
		return this._dumbUpdateAddress();
	}
	
	return $.ajax({
		type: "POST",
		url: this.serverAddress + this.order + "UpdateAddress",
		data: {
			username: username,
			authentication_token: authentication_token,
			address: address
		}
	});
	
}
Server.prototype.createAddress = function(username, authentication_token, address) {
	if(this.serverAddress == null){
		return this._dumbCreateAddress();
	}
	
	return $.ajax({
		type: "POST",
		url: this.serverAddress + this.order + "CreateAddress",
		data: {
			username: username,
			authentication_token: authentication_token,
			address: address
		}
	});
	
}
Server.prototype.deleteOrderItem = function(username, authentication_token, order_id, order_item) {
	if(this.serverAddress == null){
		return this._dumbDeleteOrderItem();
	}
	
	return $.ajax({
		type: "POST",
		url: this.serverAddress + this.order + "DeleteOrderItem",
		data: {
			username: username,
			authentication_token: authentication_token,
			order_id: order_id,
			order_item: order_item
		}
	});
	
}
Server.prototype.addOrderItem = function(username, authentication_token, order_id, order_item) {
	if(this.serverAddress == null){
		return this._dumbAddOrderItem();
	}
	
	return $.ajax({
		type: "POST",
		url: this.serverAddress + this.order + "AddOrderItem",
		data: {
			username: username,
			authentication_token: authentication_token,
			order_id: order_id,
			order_item: order_item
		}
	});
	
}
Server.prototype.getOrder = function(username, authentication_token, order_id) {
	if(this.serverAddress == null){
		return this._dumbGetOrder();
	}
	
	return $.ajax({
		url: this.serverAddress + this.order + "GetOrder",
		data: {
			username: username,
			authentication_token: authentication_token,
			order_id: order_id,
		}
	});
	
}
Server.prototype.getOrderList = function(username, authentication_token) {
	if(this.serverAddress == null){
		return this._dumbGetOrderList();
	}
	
	return $.ajax({
		url: this.serverAddress + this.order + "GetOrderList",
		data: {
			username: username,
			authentication_token: authentication_token,
		}
	});
	
}
Server.prototype.confirmOrder = function(username, authentication_token, order_id, address_id) {
	if(this.serverAddress == null){
		return this._dumbConfirmOrder();
	}
	
	return $.ajax({
		type: "POST",
		url: this.serverAddress + this.order + "ConfirmOrder",
		data: {
			username: username,
			authentication_token: authentication_token,
			order_id: order_id,
			address_id: address_id
		}
	});
	
}
Server.prototype.changeOrderAddress = function(username, authentication_token, order_id, address_id) {
	if(this.serverAddress == null){
		return this._dumbChangeOrderAddress();
	}
	
	return $.ajax({
		type: "POST",
		url: this.serverAddress + this.order + "ChangeOrderAddress",
		data: {
			username: username,
			authentication_token: authentication_token,
			order_id: order_id,
			address_id: address_id
		}
	});
	
}
Server.prototype.deleteOrder = function(username, authentication_token, order_id) {
	if(this.serverAddress == null){
		return this._dumbDeleteOrder();
	}
	
	return $.ajax({
		type: "POST",
		url: this.serverAddress + this.order + "DeleteOrder",
		data: {
			username: username,
			authentication_token: authentication_token,
			order_id: order_id,
		}
	});
	
}
Server.prototype.createOrder = function(username, authentication_token) {
	if(this.serverAddress == null){
		return this._dumbCreateOrder();
	}
	
	return $.ajax({
		type: "POST",
		url: this.serverAddress + this.order + "CreateOrder",
		data: {
			username: username,
			authentication_token: authentication_token,
		}
	});
	
}
Server.prototype.updateOrder = function(username, authentication_token, order_id, latitude, longitude) {
	if(this.serverAddress == null){
		return this._dumbUpdateOrder();
	}
	
	return $.ajax({
		type: "POST",
		url: this.serverAddress + this.order + "UpdateOrder",
		data: {
			username: username,
			authentication_token: authentication_token,
			order_id: order_id,
			latitude: latitude,
			longitude: longitude
		}
	});
	
}