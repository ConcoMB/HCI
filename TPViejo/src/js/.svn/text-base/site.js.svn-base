function Site(server, dictionary) {
	this.tree = new Tree();
	this.server = server;
	this.dictionary = dictionary;
	this.tree.add("home", null, null, null,null,null);
	this.tree.addMany(["categories", "control panel", "search", "advanced search", "help", "about us", "log in", "register", "my account", "article"], "home");
	this.tree.add("my orders",null,"home",null,null,null); 
	this.tree.add("my wishlist",new List(),"my orders",null,null,null); 
	this.tree.add("my cart",new List(),"my orders",null,null,null);
	this.tree.add("my purchases",new List(),"my orders",null,null,null); 
	this.tree.add("shipping",new List(),"my orders",null,null,null); 
	this.tree.add("received",new List(),"my orders",null,null,null); 
	this.tree.add("my addresses",new List(),"my account",null,null,null); 
	
	var catFalsa=new Category(1,null,"categoria falsa",false);
	var subCatFalsa=new Category(2,null,"subcategoria falsa",true);
	var aux1=[];
	var aux2=[];
	this.addCategories(aux1.concat(catFalsa));
	this.addSubcategories(aux2.concat(subCatFalsa),catFalsa)
	for(var i=0;i<10;i++){
		this.addArticles([new Article(i+10,1,2,"article "+i,10,15,null)],catFalsa,subCatFalsa);
		this.addArticles([new Article(i+10,1,2,"article "+i,10,15,null)],catFalsa,null);
	}
}

Site.prototype.init = function() {
	this.dictionary.init();
	this.tree.moveToRoot();

	var siteSelf = this;
	this.categories = this.getCategoryList(this.getCurrentLanguage());

	this.addCategories(this.categories);
	$(this.categories).each(function(index, cat) {
		siteSelf.addSubcategories(siteSelf.getSubcategoryList(siteSelf.getCurrentLanguage(), cat), cat);
	});
	
	console.log(this.tree);
}
Site.prototype.getAddresses=function(){
	return this.tree.getData("my addresses");
}

Site.prototype.getCategories = function(){
	return this.tree.find("categories").getChildren();
}
Site.prototype.getSubcategories = function(category){
	return this.tree.findDataNode(category).getChildren();
}
Site.prototype.isRoot = function(subsite_name) {
	return this.getRoot() == subsite_name
}
Site.prototype.stackLast = function() {
	return this.tree.stackLast();
}
Site.prototype.stackToString=function(){
	return this.tree.stackToString();
}
Site.prototype.getTree = function() {
	return this.tree;
}
Site.prototype.getRoot = function() {
	return this.tree.getRootValue();
}
Site.prototype.moveTo = function(subsite_name) {
	console.log("moviendome a : " + subsite_name);
	console.log(this.tree.moveTo(subsite_name));
	return this.tree.moveTo(subsite_name);
}
Site.prototype.getBaseLanguage = function() {
	return this.dictionary.getBaseLanguage();
}
Site.prototype.getCurrentLanguage = function() {
	return this.dictionary.getCurrentLanguage();
}

Site.prototype.isInWishlist=function(article){
	var matchingArtInWishlist=this.tree.getDataObj("my wishlist").filter(function(innerArt){
		if(innerArt==article){
			return true;
		}
	});
	
	return matchingArtInWishlist.length==1;
}

Site.prototype.addCategories = function(categories) {
	var siteSelf = this;
	$(categories).each(function(index, domEle) {
		if(!siteSelf.tree.add(domEle.getName(), domEle, "categories", null)) {
			return null;
		}
	});
}
Site.prototype.addSubcategories = function(subcategories, category) {
	var siteSelf = this;
	$(subcategories).each(function(index, domEle) {
		if(!siteSelf.tree.add(domEle.getName(), domEle, category.getName(), null)) {
			return null;
		}
	});
}
Site.prototype.addArticles = function(articles, category, subcategory) {
	var siteSelf = this;
	$(articles).each(function(index, domEle) {
		if(subcategory!=null&&subcategory.getName() != null) {
			siteSelf.tree.add(domEle.getName(), domEle, category.getName(), subcategory.getName());
		} else {
			siteSelf.tree.add(domEle.getName(),domEle, category.getName(), null);
		}
	});
}
Site.prototype.findIn=function(toSearch,where,order,items_per_page,page){
	if(where==null){
		return this.getProductListByName(toSearch,order,items_per_page,page);
	}
	if(where.size()==0){
		return null;
	}
	var ans;
	if(where.get(0).isOrder()){
		var elem=where.get(0);
		ans=elem.getItems().filter(function(elem){
			if(elem.isArticle()){
				return elem.getName()==toSearch;
			}else{
				throw new Exception();
			}
		});
	}else{
		ans=where.filter(function(elem){
			if(elem.isArticle()){
				return elem.getName()==toSearch;
			}else{
				throw new Exception();
			}
		});
	}
	return ans.slice((ans.length/items_per_page)*page,
	(ans.length/items_per_page)*page+items_per_page);
}
Site.prototype.addArticlesOf = function(category, subcategory, order, items_per_page, page) {
	if(category == null || (order != "ASC" && order != "DESC")) {
		return false;
	}
	if(subcategory == null) {
		this.addArticles(this.getProductListByCategory(this.getCurrentLanguage().getId(), category.getId(), order, items_per_page, page), category.getName(), null);
	} else {
		this.addArticles(this.getProductListBySubcategory(this.getCurrentLanguage().getId(), category.getId(), subcategory.getId(), order, items_per_page, page), category.getName(), subcategory.getName());
	}
}

Site.prototype._addToCart=function(cartName,articles){
	if(articles==null){
		var self=this;
		$.each(articles,function(index,art){
			self.tree.get(cartName).getDataObj().add(art);
		});
	}
}
Site.prototype._removeFromCart=function(cartName,articles){
	if(articles==null){
		var self=this;
		$.each(articles,function(index,art){
			self.tree.get(cartName).getDataObj().remove(art);
		});
	}
}

Site.prototype.getCart=function(){
	return this.tree.getData("my cart");
}

Site.prototype.addToCart=function(articles){
	return this._addToCart("my cart",articles);
}

Site.prototype.removeFromCart = function(articles) {
	return this._addToCart("my cart",articles);
}

Site.prototype.getPurchases=function(){
	return this.tree.getData("my purchases");
}

Site.prototype.getConfirmed=function(){
	return this.getPurchases();
}

Site.prototype.addToPurchases=function(articles){
	return this._addToCart("my purchases",articles);
}

Site.prototype.removeFromPurchases = function(articles) {
	return this._addToCart("my purchases",articles);
}

Site.prototype.getWishlist=function(){
	return this.tree.getData("my wishlist");
}

Site.prototype.addToWishlist = function(article) {
	return this._addToCart("my wishlist",articles);
}

Site.prototype.removeFromWishlist = function(articles) {
	return this._addToCart("my wishlist",articles);
}

Site.prototype.getShipped=function(){
	return this.getShipping();
}	

Site.prototype.getShipping=function(){
	return this.tree.getData("shipping");
}

Site.prototype.addToShipping = function(article) {
	return this._addToCart("shipping",articles);
}

Site.prototype.removeFromShipping = function(articles) {
	return this._addToCart("shipping",articles);
}

Site.prototype.getReceived=function(){
	return this.tree.getData("received");
}

Site.prototype.addRreceived = function(article) {
	return this._addToCart("received",articles);
}

Site.prototype.removeFromReceived = function(articles) {
	return this._addToCart("received",articles);
}

Site.prototype.addAddresses = function(addresses) {
	var siteSelf = this;
	var ans=true;
	$(addresses).each(function(index, address) {
		if(ans){
		ans=siteSelf.tree.add(address.getName(),$(address),"my account", null, "my addresses", null);
	}});
	return ans;
}

Site.prototype.addOrders = function(orders) {
	var siteSelf = this;
	var ans=true;
	$(orders).each(function(index, domEle) {
		if(ans){
		var toWhom;
		switch(domEle.getStatus()) {
			case 1:
				toWhom="my cart";
				break;
			case 2:
				toWhom="my purchases";
				break;
			case 3:
				toWhom="shipping";
				break;
			case 4:
				toWhom="received";
				break;
		};
		ans=siteSelf.tree.add(domEle.getName(),$(domEle), toWhom, null,null,null);
		}
	});
	return ans;
}

Site.prototype.logOut = function() {
	var ans = this.server.signOut(user.username, user.authentication);
	user = null;
}
Site.prototype._checkResponse = function(ans) {
	aux = $(ans).find("response");
	if(aux == undefined || aux == null || aux.attr("status") != "ok") {
		console.log("error");
		errorHandler.handle(ans);
		//TODO
	}
}
Site.prototype.logIn = function(username, password) {
	var ans = this.server.signIn(username, password);
	this._checkResponse(ans);
	var aux = getAttr(ans, "user");
	user = new User(aux.attr("id"), aux.attr("name"), username, password, getAttr(ans, "authentication").text(), aux.attr("birth_date"), aux.attr("last_login_date"),true);
	this.addAddresses(this.getAddressList());
	this.addOrders(this.getOrderList());
	console.log(this.tree)
	return true;
}
Site.prototype.register = function(name, username, password, birth_date) {
	var auxUser = new User(null, name, username, password, null, birth_date, null, null);
	var ans = this.server.createAccount(auxUser.toUserXML());
	this._checkResponse(ans);
	return true;
}
Site.prototype.changePassword = function(password, newPassword) {
	if(user == null || user.password != password) {
		return false;
	}
	var ans = this.server.changePassword(user.username, user.password, newPassword);
	this._checkResponse(ans);
	return true;
}
Site.prototype.getAccount = function() {
	if(user == null) {
		return false;
	}
	var ans = this.server.getAccount(user.username, user.authentication_token);
	this._checkResponse(ans);
	user.created_date = getAttr(ans, "created_date");
	user.last_password_change = getAttr(ans, "last_password_change");
	return true;
}
Site.prototype.createAccount = function() {
	if(user == null) {
		return false;
	}
	var ans = this.server.createAccount(user.username, user.authentication_token, user.toUserXML());
	this._checkResponse(ans);
}
Site.prototype.checkPassword = function(pass, passConfirm) {
	return pass == passConfirm;
}
Site.prototype.getLanguageList = function() {
	var ans = this.server.getLanguageList();
	this._checkResponse(ans);
	var lang = [];
	$(ans).find("language").each(function(index, domEle) {
		lang = lang.concat(new Language($(domEle).find("code").text(), $(domEle).find("name").text(), $(domEle).attr("id")));
	});
	return lang;
}
Site.prototype.getCountryList = function() {
	var ans = this.server.getCountryList(this.dictionary.getCurrentLanguage());

	this._checkResponse(ans);

	var countries = [];
	$(ans).find("country").each(function(index, domEle) {
		countries = countries.concat(new Country({
			code : $(domEle).find("code").text(),
			name : $(domEle).find("name").text(),
			id : $(domEle).attr("id")
		}));
	})
	return countries;
}
Site.prototype.getStateList = function(country_id) {
	var ans = this.server.getStateList(this.dictionary.getCurrentLanguage(), country_id);
	this._checkResponse(ans);
	var states = [];
	$(ans).find("state").each(function(index, domEle) {
		states = states.concat(new State({
			country_id : country_id,
			code : $(domEle).find("code").text(),
			name : $(domEle).find("name").text(),
			id : $(domEle).attr("id")
		}))
	})
	return states;
}
Site.prototype.getCategoryList = function(language_id) {
	if(language_id == null || language_id == undefined) {
		return false;
	}
	var ans = this.server.getCategoryList(language_id);

	this._checkResponse(ans);

	var categories = [];
	$(ans).find("category").each(function(index, domEle) {
		categories = categories.concat(new Category($(domEle).attr("category_id"), $(domEle).find("code").text(), $(domEle).find("name").text(), false));
	})
	return categories;
}
Site.prototype.getSubcategoryList = function(language_id, category_id) {
	if(language_id == null || language_id == undefined || category_id == null || category_id == undefined) {
		return false;
	}
	var ans = this.server.getSubcategoryList(language_id, category_id);

	this._checkResponse(ans);

	var subcategories = [];
	$(ans).find("subcategory").each(function(index, domEle) {
		subcategories = subcategories.concat(new Category($(domEle).attr("subcategory_id"), $(domEle).find("code").text(), $(domEle).find("name").text(), true));
	})
	return subcategories;
}
Site.prototype.getProductListBySubcategory = function(language_id, category_id, subcategory_id, order, items_per_page, page) {
	if(language_id == null || language_id == undefined || category_id == null || category_id == undefined || subcategory_id == null || subcategory_id == undefined) {
		return false;
	}
	var ans = this.server.getProductListBySubcategory(language_id, category_id, subcategory_id, order, items_per_page, page);

	this._checkResponse(ans);

	var articles = [];
	$(ans).find("product").each(function(index, domEle) {
		articles = articles.concat(new Article($(domEle).attr("id"), $(domEle).find("category_id").text(), $(domEle).find("subcategory_id").text(), $(domEle).find("name").text(), $(domEle).find("sales_rank").text(), $(domEle).find("price").text(), $(domEle).find("image_url").text()));
	});
	return articles;
}
Site.prototype.getProductListByCategory = function(language_id, category_id, order, items_per_page, page) {
	if(language_id == null || language_id == undefined || category_id == null || category_id == undefined || subcategory_id == null || subcategory_id == undefined || order == null || order == undefined) {
		return false;
	}
	var ans = this.server.getProductListByCategory(language_id, category_id, order, items_per_page, page);

	this._checkResponse(ans);

	var articles = [];
	$(ans).find("product").each(function(index, domEle) {
		articles = articles.concat(new Article($(domEle).attr("id"), $(domEle).find("category_id").text(), $(domEle).find("subcategory_id").text(), $(domEle).find("name").text(), $(domEle).find("sales_rank").text(), $(domEle).find("price").text(), $(domEle).find("image_url").text()));
	});
	return articles;
}
Site.prototype.getProductListByName = function(criteria, order, items_per_page, page) {
	if(criteria==null||!(order=="ASC"||order=="DESC")||items_per_page<=0||page<=0){
		return false;
	}
	var ans = this.server.getProductListByName(this.getCurrentLanguage().getId(), order, items_per_page, page);

	this._checkResponse(ans);

	var articles = [];
	$(ans).find("product").each(function(index, domEle) {
		articles = articles.concat(new Article($(domEle).attr("id"), $(domEle).find("category_id").text(), $(domEle).find("subcategory_id").text(), $(domEle).find("name").text(), $(domEle).find("sales_rank").text(), $(domEle).find("price").text(), $(domEle).find("image_url").text()));
	});
	return articles;
}
Site.prototype.getProduct = function(product_id) {
	if(product_id == null || product_id == undefined) {
		return false;
	}
	var ans = this.server.getProduct(product_id);

	this._checkResponse(ans);

	var product;
	$(ans).find("product").each(function(index, domEle) {
		product = new Article($(domEle).attr("id"), $(domEle).find("category_id").text(), $(domEle).find("subcategory_id").text(), $(domEle).find("name").text(), $(domEle).find("sales_rank").text(), $(domEle).find("price").text(), $(domEle).find("image_url").text());
	});
	return product;
}

Site.prototype.updateAccount = function(authentication_token, account) {
	if(user == null || user == undefined || user.username == null || user.username == undefined || authentication_token == null || authentication_token == undefined || account == null || account == undefined) {
		return false;
	}
	var ans = this.server.updateAccount(user.username, authentication_token, account);

	this._checkResponse(ans);

	return true;
}
Site.prototype.createAddress = function(authentication_token, address) {
	if(user == null || user == undefined || user.username == null || user.username == undefined || authentication_token == null || authentication_token == undefined || address == null || address == undefined) {
		return false;
	}
	var ans = this.server.createAddress(user.username, authentication_token, address.toAddressXML());

	this._checkResponse(ans);

	address.setId($(ans).find("address").attr("id"));
	return address;
}
Site.prototype.getAddress = function(authentication_token, address_id) {
	if(user == null || user == undefined || user.username == null || user.username == undefined || authentication_token == null || authentication_token == undefined || address_id == null || address_id == undefined) {
		return false;
	}
	var ans = this.server.getAddress(user.username, authentication_token, address_id);

	this._checkResponse(ans);
	return new Address($(ans).find("full_name").text(), $(ans).find("address_line_1").text(), $(ans).find("address_line_2").text(), $(ans).find("country_id").text(), $(ans).find("state_id").text(), $(ans).find("city").text(), $(ans).find("zip_code").text(), $(ans).find("phone_number").text());
}
Site.prototype.getAddressList = function() {
	if(user == null || user == undefined || user.username == null || user.username == undefined || user.authentication_token == null || user.authentication_token == undefined) {
		return false;
	}
	var ans = this.server.getAddressList(user.username, user.authentication_token);

	this._checkResponse(ans);
	var addresses = [];
	$(ans).find("address").each(function(index, domEle) {
		addresses = addresses.concat(new Address($(domEle).find("full_name").text(), $(domEle).find("address_line_1").text(), $(domEle).find("address_line_2").text(), $(domEle).find("country_id").text(), $(domEle).find("state_id").text(), $(domEle).find("city").text(), $(domEle).find("zip_code").text(), $(domEle).find("phone_number").text()));
	});
	return addresses;
}
Site.prototype.updateAddress = function(address_id, address) {
	if(user == null || user == undefined || user.username == null || user.username == undefined || user.authentication_token == null || user.authentication_token == undefined || address_id == null || address_id == undefined) {
		return false;
	}
	var ans = this.server.updateAddress(user.username, user.authentication_token, address.toAddressXML());
	this._checkResponse(ans);
}
Site.prototype.createOrder = function() {
	if(user == null || user == undefined || user.username == null || user.username == undefined || user.authentication_token == null || user.authentication_token == undefined) {
		return false;
	}
	var ans = this.server.createOrder(user.username, user.authentication_token);

	this._checkResponse(ans);

	var order = new Order(ans.find("order").attr(id));
	return address;
}
Site.prototype.deleteOrder = function(order_id) {
	if(user == null || user == undefined || user.username == null || user.username == undefined || user.authentication_token == null || user.authentication_token == undefined) {
		return false;
	}
	var ans = this.server.deleteOrder(user.username, user.authentication_token, order_id);

	this._checkResponse(ans);
}
Site.prototype.changeOrderAddress = function(order, address_id) {
	if(user == null || user == undefined || user.username == null || user.username == undefined || user.authentication_token == null || user.authentication_token == undefined || address == null || address == undefined || order.isConfirmed()) {
		return false;
	}
	var ans = this.server.changeOrderAddress(user.username, user.authentication_token, order.getId(), address.getId());

	this._checkResponse(ans);
}
Site.prototype.confirmOrder = function(order, address_id) {
	if(user == null || user == undefined || user.username == null || user.username == undefined || user.authentication_token == null || user.authentication_token == undefined || address == null || address == undefined || order.isConfirmed()) {
		return false;
	}
	var ans = this.server.confirmOrder(user.username, user.authentication_token, order.getId(), address.getId());

	this._checkResponse(ans);
}
Site.prototype.getOrderList = function() {
	if(user == null || user == undefined || user.username == null || user.username == undefined || user.authentication_token == null || user.authentication_token == undefined) {
		return false;
	}
	var ans = this.server.getAddressList(user.username, user.authentication_token);

	this._checkResponse(ans);
	var orders = [];
	$(ans).find("order").each(function(index, domEle) {
		orders = orders.concat(new Order($(domEle).find("order").attr("id"), $(domEle).find("address_id").text(), $(domEle).find("status").text(), $(domEle).find("created_date").text(), $(domEle).find("confirmed_date").text(), $(domEle).find("shipped_date").text(), $(domEle).find("delivered_date").text(), $(domEle).find("latitude").text(), $(domEle).find("longitude").text()));
	});
	return orders;
}
Site.prototype.getOrder = function(order_id) {
	if(user == null || user == undefined || user.username == null || user.username == undefined || user.authentication_token == null || user.authentication_token == undefined || order_id == null || order_id == undefined) {
		return false;
	}
	var ans = this.server.getOrder(user.username, user.authentication_token, order_id);

	this._checkResponse(ans);
	return new Order($(domEle).find("order").attr("id"), $(domEle).find("address_id").text(), $(domEle).find("status").text(), $(domEle).find("created_date").text(), $(domEle).find("confirmed_date").text(), $(domEle).find("shipped_date").text(), $(domEle).find("delivered_date").text(), $(domEle).find("latitude").text(), $(domEle).find("longitude").text());
}

Site.prototype.addOrderItem = function(order, order_item) {
	if(user == null || user == undefined || user.username == null || user.username == undefined || user.authentication_token == null || user.authentication_token == undefined || order_id == null || order_id == undefined) {
		return false;
	}
	var ans = this.server.addOrderItem(user.username, user.authentication_token, order.getId(), order_item.toOrderItemXML());

	this._checkResponse(ans);
}
Site.prototype.deleteOrderItem = function(order, order_item) {
	if(user == null || user == undefined || user.username == null || user.username == undefined || user.authentication_token == null || user.authentication_token == undefined || order_id == null || order_id == undefined) {
		return false;
	}
	var ans = this.server.deleteOrderItem(user.username, user.authentication_token, order.getId(), order_item.toOrderItemXML());

	this._checkResponse(ans);
	return new Order($(domEle).find("order").attr("id"), $(domEle).find("address_id").text(), $(domEle).find("status").text(), $(domEle).find("created_date").text(), $(domEle).find("confirmed_date").text(), $(domEle).find("shipped_date").text(), $(domEle).find("delivered_date").text(), $(domEle).find("latitude").text(), $(domEle).find("longitude").text());
}
Site.prototype.deleteOrderItem = function(order, order_item) {
	if(user == null || user == undefined || user.username == null || user.username == undefined || user.authentication_token == null || user.authentication_token == undefined || order_id == null || order_id == undefined) {
		return false;
	}
	var ans = this.server.deleteOrderItem(user.username, user.authentication_token, order.getId(), order_item.toOrderItemXML());

	this._checkResponse(ans);
	return new Order($(domEle).find("order").attr("id"), $(domEle).find("address_id").text(), $(domEle).find("status").text(), $(domEle).find("created_date").text(), $(domEle).find("confirmed_date").text(), $(domEle).find("shipped_date").text(), $(domEle).find("delivered_date").text(), $(domEle).find("latitude").text(), $(domEle).find("longitude").text());
}
/*
 * CUIDADO, STATUS ACA ES 3: TRANSPORTANDO, 4: ENTREGADA, NO EL 0: NO CONFIRMADA, NI 1:CONFIRMADA
 */
Site.prototype.updateOrder = function(order) {
	if(user == null || user == undefined || user.username == null || user.username == undefined || user.authentication_token == null || user.authentication_token == undefined || order_id == null || order_id == undefined) {
		return false;
	}
	var ans = this.server.updateOrder(authentication_token, order.getId(), order.getLatitude(), order.getLongitude());

	this._checkResponse(ans);
}
Site.prototype.getDictionary = function() {
	return this.dictionary;
}
