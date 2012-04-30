var root = "site/";

function View(server, dictionary) {
	this.site = new Site(server, dictionary);
	this.searchData = null;
};

View.prototype.makeCategories = function() {
	var catString = '<div>';
	site.getCategories().each(function(index, category) {
		catString += '<a title="' + category.getValue() + '" class="translateMe" href="javascript:void(view.moveTo(\'' + category.getValue() + '\'))">' + category.getValue() + '</a>';
	});
	catString += '</div>';
}

View.prototype.makeSubcategories = function(categoryNode) {
	var subcatString = '<div>'
	categoryNode.getChildren().each(function(index, subcategory) {
		subcatString += '<a title="' + subcategory.getValue() + '" class="translateMe" href="javascript:void(view.moveTo(\'' + subcategory.getValue() + '\'))">' + subcategory.getValue() + '</a>';
	});
	catString += '</div>';
}

View.prototype.init = function() {

	console.log("hola")
	this.site.init();
	this.refresh("");
	if(location.hash == "") {
		this.moveTo("home", null, callbackHandler.get("home"));
		this.moveTitle(this.site.getRoot());
	} else {
		var searchHashIndex = getStackHashLength(location.hash);
		var stackHash;
		if(searchHashIndex > 0) {
			this.searchData = new SearchData().parseHash((location.hash).substr(searchHashIndex, location.hash.length))
			stackHash = (location.hash).substr(0, searchHashIndex);
		} else {
			stackHash = location.hash;
		}
		var last = getLastFromHash(stackHash);
		console.log(last)
		this.moveTo(last, null, callbackHandler.get(last));
		this.moveTitle(last);
	}

	var categories = this.site.getCategories();
	//	str.html('<link rel="stylesheet" type="text/css" href="style/default.css"/>');
	//	start.html(start.html() + '<script type="text/javascript" src="js/initJQueryUI.js"></script>');

	var ddownStr = "";
	var str = "";
	console.log(categories)
	$.each(categories, function(i, categoryNode) {
		str = str.concat('<li><a href="#">' + (categoryNode.getDataObj()).getName() + '</a><ul>');
		ddownStr = ddownStr.concat('<option value="categories">' + (categoryNode.getDataObj()).getName() + '</option>');
		var subCat = view.site.getSubcategories(categoryNode.getDataObj());
		$.each(subCat, function(j, elem) {
			if(!(elem.getDataObj().constructor == Array ) && (elem.getDataObj()).isSubcategory()) {
				str = str.concat('<li><a href="#" class="link">' + (elem.getDataObj()).getName() + '</a></li>');
			}
		});
		str += '</ul></li>';
		ddownStr += '</ul></li>';
	});
	$("ul#categoryMenu").html(($("ul#categoryMenu").html()) + str);
	$("select.searchbarCombo").html($("select.searchbarCombo").html() + ddownStr);
	this.logIn(null, null);
}
View.prototype.moveTo = function(subsite_name, isAsync, callback, callbackArguments) {
	if(this.site.moveTo(subsite_name)) {
		var aux = this.searchData;
		if(this.searchData == null) {
			aux = "";
		} else {
			aux = this.searchData.toHash();
		}
		location.hash = this.site.stackToString() + aux;
		$.ajax({
			url : root + clearSpaces(subsite_name) + ".html",
			async : (isAsync == null),
			success : function(data, textStatus, jqXHR) {
				$("div#contentArea").html(jqXHR.responseText);
				view.refresh("div#contentArea" + " ", callback, callbackArguments);
				view.moveTitle(subsite_name);
			},
			datatype : "html",
		});
	}
};
View.prototype.logIn = function(username, password) {
	if((user != null && username == null && password == null) || (username != null && password != null && this.site.logIn(username, password) && user != null)) {
		$.ajax({
			url : root + "loggedinbar" + ".html",
			success : function(data, textStatus, jqXHR) {
				view.translateSubsiteToBase("div#topRightLinks", false);
				$("div#topRightLinks").attr("former", $("div#topRightLinks").html());
				$("div#topRightLinks").html(jqXHR.responseText);
				view.refresh("div#topRightLinks" + " ");
			},
			datatype : "html",
		});
		$("div#loginPopUp").dialog("close");
	}
};
View.prototype.logOut = function() {
	if(user != null) {
		this.site.logOut();
		$("div#topRightLinks").html($("div#topRightLinks").attr("former"));
		this.translateSubsiteToCurrent("div#topRightLinks", false);
		this.refresh("div#topRightLinks" + " ");
		this.moveTo("home", null, callbackHandler.get("home"));
		persistence.remove("user");
	}
};
View.prototype.moveTitle = function(where) {
	$("title").text(($("title").attr("base") + "-" + firstToUpperCase(where)));
};
View.prototype.getTree = function() {
	return this.site.getTree();
};
View.prototype.refresh = function(container, callback, callbackArguments) {

	console.log("refresh");
	//TODO: al no hacer las busquedas aca, no sirve recargar, xq no vuelve a buscar en base a location.hash
	if(callback != null && callback != undefined) {
		callback(callbackArguments);
	}

	//Translator Crawler
	$(container + ".containingTranslators").each(function(index, domEle) {
		$(domEle).attr("former", $(domEle).html());
		var separator = "<li><span class='listDivisor'>| </span></li>";
		var text = "<li><a class='baseTranslator'>" + view.getDictionary().getBaseLanguage().getName() + " </a></li>";
		text += separator;
		$(languageList).each(function(i, language) {
			var aux = view.getDictionary().getLanguage(language.getCode());
			if(aux != undefined && aux != null) {
				text += "<li><a class='translate" + firstToUpperCase(language.code) + "'>" + view.getDictionary().getLanguage(language.getCode()).getName() + " </a></li>";
				if(i < languageList.length) {
					text += separator;
				}
			}
		});
		$(domEle).html(text + $(domEle).attr("former"));
	});

	$(container + " " + ".translateMe").each(function(index, domEle) {
		$(domEle).attr("base", $(domEle).text());
	});
	$(container + " " + "input.translateMe").each(function(index, domEle) {
		$(domEle).attr("base", $(domEle).attr("title").trim());
		$(domEle).attr("value", $(domEle).attr("title").trim());
		console.log(domEle);
	});
	$(container + " " + "div#accordion .translateMe").each(function(index, domEle) {
		$(domEle).attr("who", $(domEle).text());
		$(domEle).attr("base", "says...");
		$(domEle).text($(domEle).attr("who") + " " + $(domEle).attr("base"));
	});
	if(user != null) {
		$(container + " " + ".greeting").each(function(index, domEle) {
			$(domEle).attr("base", "Hi,");
			$(domEle).attr("end", "!");
		});
	}
	if(container == "") {
		$(container + "title .translateMe").each(function(index, domEle) {
			$(domEle).attr("base", this.site.stackLast());
			$(domEle).text(($(domEle).attr("base") + "-" + $(domEle).attr("base")));
		});
	}
	$(container + " " + "a.translateDe").each(function(index, domEle) {
		new TranslatorButton($(domEle), "de", view.getDictionary())
	});
	$(container + " " + "a.translateIt").each(function(index, domEle) {
		new TranslatorButton($(domEle), "it", view.getDictionary())
	});
	$(container + " " + "a.translateEs").each(function(index, domEle) {
		new TranslatorButton($(domEle), "es", view.getDictionary())
	});
	$(container + " " + "a.baseTranslator").each(function(index, domEle) {
		new BaseTranslatorButton($(domEle))
	});
	$(container + " " + "div.PathElement").each(function(index, domEle) {
		var anchorText = $(domEle).find("a.pathLink").attr("base").trim().toLowerCase();
		if(anchorText == "search") {
			new SearchButton(domEle, $(container + " " + "input#searchBarInput"), callbackHandler.get(anchorText));
		} else {
			new MyLink($(domEle), anchorText, callbackHandler.get(anchorText));
		}
	});
	$(container + " " + "a#koppeLogo").each(function(index, domEle) {
		new MyLink($(domEle), "home", callbackHandler.get("home"));
	});

	$(container + " " + ".link").each(function(index, domEle) {
		var aux = null;
		if($(domEle).attr("base") == "articleSearchIndex") {
			if($(domEle).attr("id") == "bottomSearchGoToFirst") {
				new MyLink($(domEle), null, callbackHandler.get($(domEle).attr("base")), 1);
			} else if($(domEle).attr("id") == "bottomSearchGoToPrevious") {
				new MyLink($(domEle), null, callbackHandler.get($(domEle).attr("base")), {
					indexPage : parseInt(this.searchData.page) - 1
				});
			} else if($(domEle).attr("id") == "bottomSearchGoToNext") {
				new MyLink($(domEle), null, callbackHandler.get($(domEle).attr("base")), {
					indexPage : parseInt(this.searchData.page) + 1
				});
			} else {
				new MyLink($(domEle), null, callbackHandler.get($(domEle).attr("base")), {
					indexPage : parseInt($(domEle).text())
				});
			}
		} else {
			new MyLink($(domEle), null, callbackHandler.get($(domEle).attr("base").toLowerCase()));
		}
	});
	$(container + " " + "a#login").each(function(index, domEle) {
		new LogInButton($(domEle))
	});
	$(container + " " + "a#logout").each(function(index, domEle) {
		new LogOutButton($(domEle))
	});
	$(container + " " + "input#endRegistrationButton").each(function(index, domEle) {
		new EndRegistrationButton(container + "div#form", domEle)
	});

	$(container + " " + "li.editableLine").each(function(index, domEle) {
		new EditButton(container, $(domEle));
	});

	$(container + " " + "li.editableLine").each(function(index, domEle) {
		new CancelButton($(container), $(domEle), null);
	});

	$(container + " " + "button#searchButton").each(function(index, domEle) {
		new SearchButton(domEle, $(container + " " + "input#searchBarInput"), callbackHandler.get($(domEle).attr("base").trim().toLowerCase()));
	});

	this.translateSubsiteToCurrent(container, false);

}

View.prototype.displaySearch = function(whereToLook, printFn, whereToShow, kindOfIndex) {
	if(this.searchData != null) {
		var articlesFound = this.site.findIn(this.searchData.searchText, whereToLook, this.searchData.order, this.searchData.items_per_page, this.searchData.page);
		var artFoundStr = "";
		if(articlesFound == null || articlesFound == []) {
			console.log(this._printMessageNotFoundArticle())
			$(whereToShow).html(this._printMessageNotFoundArticle());
			return;
		}
		$.each(articlesFound, function(index, article) {//TODO
			artFoundStr = artFoundStr.concat(printFn(article));
		})

		$(whereToShow).html(artFoundStr);

		this.attachArticleButtons(whereToShow,articlesFound)
		new ArticleButton($(container + " " + ""), elem, callbackHandler.get($(elem).attr("base").trim().toLowerCase()));

		if((($("ul.bottomSearch")).length == 0) && articlesFound.length <= this.searchData.items_per_page && (kindOfIndex != null || kindOfIndex != undefined)) {
			$(whereToShow).after('<ul class="horizlist bottomSearch"></ul>')
			$("ul.bottomSearch").append('<li class="bottonSimb" ><a id="bottomSearchGoToFirst" class="link" base="' + kindOfIndex + '">|&lt;</a></li>');
			var index = this.searchData.page > 1 ? (this.searchData.page - 3) : 1;
			if(this.searchData.page != 1) {
				$("ul.bottomSearch").append('<li class="bottonSimb"><a id="bottomSearchGoToPrevious" class="link translateMe" base="' + kindOfIndex + '">Previous</a></li>');
			}
			while(index <= parseInt(this.searchData.page) + 3) {
				if(index >= 1) {
					$("ul.bottomSearch").append('<li class="bottomSimb"><span class="listDivisor"> </span></li><li class="bottomNumb"><a class="link" base="' + kindOfIndex + '">' + index + '</a></li>');
				}
				index++;
			}
			$("ul.bottomSearch").append('<li class="bottomSimb"><span class="listDivisor"> </span></li><li class="bottomNext"><a id="bottomSearchGoToNext" class="link translateMe">Next</li>');
		}
	}
}

View.prototype.attachArticleButtons = function(container,articles) {
	console.log(container)
	$(container + " " + "li.article").each(function(index, art) {
		console.log("llego")
		console.log(art)
		$(container + " " + "li.article" + " " + art + " " + "button.search").each(function(index, elem) {
			console.log(elem)
			new ArticleButton(articles[index], elem, callbackHandler.get($(elem).attr("base").trim().toLowerCase()));
		});

		$(container + " " + "li.article" + " " + art + " " + "div.resultImage").each(function(index, elem) {
			console.log(elem)
			new ArticleButton(articles[index], elem, callbackHandler.get($(elem).attr("base").trim().toLowerCase()));
		});

		$(art + " " + "button.cart").each(function(index, elem) {
			//new SearchButton(domEle, location.hash, callbackHandler.get($(domEle).attr("base").trim().toLowerCase()));
		});

		$(art + " " + "button.star").each(function(index, elem) {
			//new SearchButton(domEle, $(container + " " + "input#searchBarInput"), callbackHandler.get($(domEle).attr("base").trim().toLowerCase()));
		});

		$(art + " " + "button.trash").each(function(index, elem) {
			//new SearchButton(domEle, $(container + " " + "input#searchBarInput"), callbackHandler.get($(domEle).attr("base").trim().toLowerCase()));
		});

		$(art + " " + "button.pin-s").each(function(index, elem) {
			//new SearchButton(domEle, $(container + " " + "input#searchBarInput"), callbackHandler.get($(domEle).attr("base").trim().toLowerCase()));
		});
	});
}

View.prototype.search = function(toSearch, order, items_per_page, page) {
	this.searchData = new SearchData(toSearch, order, items_per_page, page);
	var aux = (location.hash).substr(0, getStackHashLength(location.hash));
	aux += this.searchData.toHash();
	location.hash = aux;
}

View.prototype.lookAt = function(type, data) {//TODO
	switch(type) {
		case "article":
			var article = this.site.getArticle(data.getId());
			if(article == null || article == undefined) {
				return;
				//TODO
			}
			view.displayLookedAt(article, view._printLookArticle, this.site.isInWishlist(article), $("div#article"));
			return;
		case "subcategory":
			var articles = this.site.getProductListBySubcategory(data.getId());
			if(articles == null || articles == undefined) {
				return;
				//TODO
			}
			view.displayLookedAt(articles, view._printLookSubCategory, $(""));
			//TODO
			return;
		case "address":
			/*var address=this.site.getAddress(data.getId());
			 if(articles==null||articles==undefined){
			 return;//TODO
			 }
			 view.displayLookedAt(articles, view._printLookSubCategory,$(""));//TODO*/
			return;
	}
	return;
	//TODO
}

View.prototype.displayLookedAt = function(elem, printFn, extraParameters, whereToPrint) {
	//		$(whereToShow).html(this._printNotFoundArticle());<--no olvidar
	return;
	//TODO
}

View.prototype.getLanguageList = function() {
	return this.site.getLanguageList();
}
View.prototype.translateSubsiteToBase = function(toTranslate, changeSiteState) {
	$(toTranslate + " " + ".translateMe").each(function(index, domEle) {
		var aux = $(domEle).text();
		if(!(aux == null || aux == undefined || aux == "")) {
			$(domEle).text($(domEle).attr("base").trim());
		}

	});
	$(toTranslate + " " + "input.translateMe").each(function(index, domEle) {
		$(domEle).attr("value", $(domEle).attr("title").trim());
	});
	/*
	 $(toTranslate + " " + "button.translateMe").each(function(index, domEle) {
	 $(domEle).attr("value", $(domEle).attr("title").trim());
	 });*/
	$(toTranslate + " " + "div#accordion .translateMe").each(function(index, domEle) {
		$(domEle).text($(domEle).attr("who").concat(" ").concat($(domEle).attr("base").trim()));
	});
	$(toTranslate + " " + "title").text(($("title").attr("base") + "-" + firstToUpperCase(this.site.stackLast())));
	$(toTranslate + " " + ".greeting").each(function(index, domEle) {
		$(domEle).text($(domEle).attr("base") + " " + user.getUsername() + $(domEle).attr("end"));
	});
	if(changeSiteState) {
		this.site.getDictionary().setCurrentLanguage(this.site.getBaseLanguage());
	}
}
View.prototype.translateSubsite = function(languageCode, dictionary, toTranslate, changeSiteState) {
	if(languageCode != dictionary.baseLanguage.code) {
		$(toTranslate + " " + ".translateMe").each(function(index, domEle) {
			var aux = $(domEle).attr("base");
			if(aux == null || aux == undefined || aux == "") {
				$(domEle).text(dictionary.translate(languageCode, $(domEle).attr("base").trim()));
			}
		});
		$(toTranslate + " " + "input.translateMe").each(function(index, domEle) {
			$(domEle).attr("value", dictionary.translate(languageCode, $(domEle).attr("title").trim()));
		});
		/*
		 $(toTranslate + " " + "button.translateMe").each(function(index, domEle) {
		 $(domEle).attr("value", dictionary.translate(languageCode, $(domEle).attr("title").trim()));
		 });*/
		$(toTranslate + " " + "div#accordion .translateMe").each(function(index, domEle) {
			$(domEle).text($(domEle).attr("who").concat(" ").concat(this.getDictionary().translate(languageCode, $(domEle).attr("base").trim())));
		});
		$(toTranslate + " " + "title").text(($("title").attr("base") + "-" + this.getDictionary().translate(languageCode, firstToUpperCase(this.site.stackLast()))));
		$(toTranslate + " " + "title").text(($("title").attr("base") + "-" + firstToUpperCase(this.site.stackLast())));
		$(toTranslate + " " + ".greeting").each(function(index, domEle) {
			$(domEle).text($(domEle).text() + " " + user.getUsername() + $(domEle).attr("end"));
		});
		if(changeSiteState) {
			this.site.getDictionary().setCurrentLanguage(this.site.getDictionary().getLanguage(languageCode));
		}
	} else {
		this.translateSubsiteToBase(toTranslate, changeSiteState);
	}
}
View.prototype.translateSubsiteToCurrent = function(toTranslate, changeSiteState) {
	this.translateSubsite(this.site.getCurrentLanguage().getCode(), this.site.getDictionary(), toTranslate, changeSiteState);
}
View.prototype.register = function(name, username, password, birthDate) {
	if(this.site.register(name, username, password, birthDate)) {
		$("div#welcomePopUp").removeClass("hidden");
		$("div#welcomePopUp").dialog({
			closeOnEscape : true,
			title : 'Welcome to Koppe!',
			draggable : true,
			buttons : {
				"Enter" : function() {
					$("div#welcomePopUp").dialog("close");
					view.logIn();
					view.moveTo("home");
				}
			}
		});
	}
}
View.prototype.getDictionary = function() {
	return this.site.getDictionary();
}

View.prototype.displayCollection = function(collection, printFn, whereToShow) {
	var str = "";
	if(collection != null && collection != undefined && collection.length > 0) {
		$.each(collection, function(index, elem) {//TODO
			str = str.concat(printFn(elem, index));
		})
	} else {
		//TODO
	}
	$(whereToShow).html(str);
}

View.prototype._defaultSearchData = function() {
	return new SearchData("", "ASC", 5, 1);
}

View.prototype._printArticleFound = function(article) {
	var img = null;
	if(article.getImageURL() == null || article.getImageURL() == undefined) {
		img = "images/default.png";
	} else {
		img = article.getImageURL();
	}
	return '<li class="article"><div class="resultImage"><img src="' + img + '" alt="Visit this Article"/></div>' + '<ul class="imageListFound">' + '<button class="search translateMe" title="View article"></button>' + '<button class="cart" title="Add to cart"></button>' + '<button class="star" title="Add to wishlist"></button>' + '</ul>' + '<div class="resultDescription">' + '<ul class="briefDescription">' + '<li class="lineSearch">' + '<span class="nameProduct">' + article.getName() + '</span>' + '</li>' + '<li class="lineSearch">' + '<span class="translateMe">Price</span>: <span id="articlePrice"> $' + article.getPrice() + '</span>' + '</li>' + '<li class="lineSearch">' + '<span class="translateMe">Stock</span>: <span id="articleStock">' + article.getStock() + '</span>' + '</li>' + '<li class="lineSearch">' + '<span class="translateMe">Location</span>: <span id="location">' + article.getLocation() + '</span>' + '</li>' + '<li class="lineSearch">' + '<span class="translateMe">Description</span>: <span id="miniDescription">' + article.getBriefDescription() + '</span>' + '</li>' + '</ul>' + '</div>' + '</li>'
}

View.prototype._printArticleFoundInCart = function(article) {
	var img = null;
	if(article.getImageURL() == null || article.getImageURL() == undefined) {
		img = "images/default.png";
	} else {
		img = article.getImageURL();
	}
	return '<li class="article"><div class="resultImage"><img src="' + img + '"alt="Visit this Article"/></div><ul class="imageList"><button class="search translateMe" title="View article"></button><button class="trash translateMe">Delete article</button></ul><div class="resultDescription"><ul class="briefDescription"><li class="lineSearch"><span class="nameProduct">' + article.getName() + '</span></li><li class="lineSearch"><span class="translateMe">Price</span>: <span id="articlePrice"> $' + article.getPrice() + '</span></li><li class="lineSearch"><span class="translateMe">Quantity</span>: <span id="articleQuantity">' + article.getQuantity() + '</span></li><li class="lineSearch"><span class="translateMe">Location</span>: <span id="location">' + article.getLocation() + '</span></li><li class="lineSearch"><span class="translateMe">Description</span>: <span id="miniDescription">' + article.getBriefDescription() + '</span></li><li class="lineSearch"><span class="translateMe">Total Product</span>: <span id="totalProduct"><span class="n">' + article.getQuantity() + ' x </span> <span class="price"> $' + article.getPrice() + '</span><span class="totalProductPrice"> = $' + (article.getPrice() * article.getQuantity()) + '</span></span></li></ul></div></li>';
}

View.prototype._printArticleFoundInWishlist = function(article) {
	var img = null;
	if(article.getImageURL() == null || article.getImageURL() == undefined) {
		img = "images/default.png";
	} else {
		img = article.getImageURL();
	}
	return '<li class="article"><div class="resultImage"><img src="' + img + '"alt="Visit this Article"/></div><ul class="imageListWishlist"><button class="search translateMe">View article</button><button class="cart translateMe">Add to cart</button><button class="trash translateMe">Delete article</button></ul><div class="resultDescription"><ul class="briefDescription"><li class="lineSearch"><span class="nameProduct">' + article.getName() + '</span></li><li class="lineSearch"><span class="translateMe">Price</span>: <span id="articlePrice"> $' + article.getPrice() + '</span></li><li class="lineSearch"><span class="translateMe">Stock</span>: <span id="articleStock">' + article.getStock() + '</span></li><li class="lineSearch"><span class="translateMe">Location</span>: <span id="location">' + article.getLocation() + '</span></li><li class="lineSearch"><span class="translateMe">Description</span>: <span id="miniDescription">' + article.getBriefDescription() + '</span></li></ul></div></li>';
}

View.prototype._printArticleFoundInConfirmed = function(article) {
	var img = null;
	if(article.getImageURL() == null || article.getImageURL() == undefined) {
		img = "images/default.png";
	} else {
		img = article.getImageURL();
	}
	return '<li class="article"><div class="resultImage"><img src="' + img + '"alt="Visit this Article"/></div><ul class="imageList"><button class="search translateMe" title="View article"></button></ul><div class="resultDescription"><ul class="briefDescription"><li class="lineSearch"><span class="nameProduct">' + article.getName() + '</span></li><li class="lineSearch"><span class="translateMe">Price</span>: <span id="articlePrice"> $' + article.getPrice() + '</span></li><li class="lineSearch"><span class="translateMe">Quantity</span>: <span id="articleQuantity">' + article.getQuantity() + '</span></li><li class="lineSearch"><span class="translateMe">Location</span>: <span id="location">' + article.getLocation() + '</span></li><li class="lineSearch"><span class="translateMe">Description</span>: <span id="miniDescription">' + article.getBriefDescription() + '</span></li><li class="lineSearch"><span class="translateMe">Total Product</span>: <span id="totalProduct"><span class="n">' + article.getQuantity() + ' x </span> <span class="price"> $' + article.getPrice() + '</span><span class="totalProductPrice"> = $' + article.getPrice() * article.getQuantity() + '</span></span></li></ul></div></li>';
}

View.prototype._printArticleFoundInShipped = function(article) {
	var img = null;
	if(article.getImageURL() == null || article.getImageURL() == undefined) {
		img = "images/default.png";
	} else {
		img = article.getImageURL();
	}
	return '<li class="article"><div class="resultImage"><img src="' + img + '"alt="Visit this Article"/></div><ul class="imageList"><button class="search translateMe" title="View article"></button></ul><div class="resultDescription"><ul class="briefDescription"><li class="lineSearch"><span class="nameProduct">' + article.getName() + '</span></li><li class="lineSearch"><span class="translateMe">Price</span>: <span id="articlePrice"> $' + article.getPrice() + '</span></li><li class="lineSearch"><span class="translateMe">Quantity</span>: <span id="articleQuantity">' + article.getQuantity() + '</span></li><li class="lineSearch"><span class="translateMe">Location</span>: <span id="location">' + article.getLocation() + '</span></li><li class="lineSearch"><span class="translateMe">Description</span>: <span id="miniDescription">' + article.getBriefDescription() + '</span></li><li class="lineSearch"><span class="translateMe">Total Product</span>: <span id="totalProduct"><span class="n">' + article.getQuantity() + ' x </span> <span class="price"> $' + article.getPrice() + '</span><span class="totalProductPrice"> = $' + article.getPrice() * article.getQuantity() + '</span></span></li></ul></div></li>';
}

View.prototype._printArticleFoundInReceived = function(article) {
	var img = null;
	if(article.getImageURL() == null || article.getImageURL() == undefined) {
		img = "images/default.png";
	} else {
		img = article.getImageURL();
	}
	return '<li class="article"><div class="resultImage"><img src="' + img + '"alt="Visit this Article"/></div><ul class="imageList"><button class="search translateMe" title="View article"></button></ul><div class="resultDescription"><ul class="briefDescription"><li class="lineSearch"><span class="nameProduct">' + article.getName() + '</span></li><li class="lineSearch"><span class="translateMe">Price</span>: <span id="articlePrice"> $' + article.getPrice() + '</span></li><li class="lineSearch"><span class="translateMe">Quantity</span>: <span id="articleQuantity">' + article.getQuantity() + '</span></li><li class="lineSearch"><span class="translateMe">Location</span>: <span id="location">' + article.getLocation() + '</span></li><li class="lineSearch"><span class="translateMe">Description</span>: <span id="miniDescription">' + article.getBriefDescription() + '</span></li><li class="lineSearch"><span class="translateMe">Total Product</span>: <span id="totalProduct"><span class="n">' + article.getQuantity() + ' x </span> <span class="price"> $' + article.getPrice() + '</span><span class="totalProductPrice"> = $' + article.getPrice() * article.getQuantity() + '</span></span></li></ul></div></li>';
}
View.prototype._printOrderMyCart = function(order, i) {
	var name = order.getName();
	if(name == null) {
		name = "Order N°" + (i == null ? '?' : i);
	}
	return '<div class ="order">' + '<div class="orderNameCont">' + '<h2 class="orderName">' + name + '</h2>' + '<h3 class="totalOrder"> Total:</h3>' + '<h3 class="totalPrice"> $' + order.getTotal() + '</h3>' + '</div>' + '<ul class="articles fakewindowncontain">' + order.getItems().print(view._printArticleFoundInCart) + '</ul><div class="myOrdersButtons"><button id="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false"></button><span class="ui-button-text translateMe">Confirm Order</span><button id="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false"><span class="ui-button-text translateMe">Delete Order</span></button></div></div>';
}

View.prototype._printOrderConfirmed = function(order, i) {
	var name = order.getName();
	if(name == null) {
		name = "Order N°" + (i == null ? '?' : i);
	}
	return '<div class ="order"><div class="orderNameCont"><h2 class="orderName">' + name + '</h2><h3 class="totalOrder"> Total:</h3><h3 class="totalPrice"> $' + order.getPrice() + '</h3></div><ul class="articles fakewindowncontain">' + order.getItems().print(view._printArticleFoundInConfirmed) + '</ul></div>';

}

View.prototype._printOrderShipping = function(order, i) {
	var name = order.getName();
	if(name == null) {
		name = "Order N°" + (i == null ? '?' : i);
	}
	return '<div class ="order"><div class="orderNameCont"><h2 class="orderName">' + name + '</h2><h3 class="totalOrder"> Total:</h3><h3 class="totalPrice"> $' + order.getPrice() + '</h3></div><ul class="articles fakewindowncontain">' + order.getItems().print(view._printArticleFoundInShipping) + '</ul></div>';
}

View.prototype._printOrderReceived = function(order, i) {
	var name = order.getName();
	if(name == null) {
		name = "Order N°" + (i == null ? '?' : i);
	}
	return '<div class ="order"><div class="orderNameCont"><h2 class="orderName">' + name + '</h2><h3 class="totalOrder"> Total:</h3><h3 class="totalPrice"> $' + order.getPrice() + '</h3></div><ul class="articles fakewindowncontain">' + order.getItems().print(view._printArticleFoundInReceived) + '</ul></div>';
}

View.prototype._printAddress = function(address) {
	return '<li class="article"><div id="googleMap" class="resultImage">GoogleMaps</div><ul class="imageList imagesAddress"><li><button class="pin-s  translateMe">Mark as default address</button></li><li><button class="trash translateMe">Delete address</button></li></ul><ul class="briefDescription"><li class="lineSearchAd"><span id="addressNameLabel" class="labelDataAd translateMe">Address Name:</span><span class="lineInfoContainerAd"><span id="addressName" class="dataAccount" >' + address.getName() + '</span><a class="translateMe editButton">Edit</a></span></li><li  class="lineSearchAd"><span id="addressCountryLabel" class="labelDataAd translateMe">Country:</span><span class="lineInfoContainerAd"><span id="addressCountry" class="dataAccount">' + address.getCountry() + '</span><a class="translateMe editButton">Edit</a></span></li><li  class="lineSearchAd"><span id="addressStateLabel" class="labelDataAd translateMe">State:</span><span class="lineInfoContainerAd"><span id="addressState" class="dataAccount">' + address.getState() + '</span><a class="translateMe editButton">Edit</a></span></li><li  class="lineSearchAd"><span id="addressDataLabel" class="labelDataAd translateMe">Address:</span><span class="lineInfoContainerAd"><span id="addressData" class="dataAccount">' + getAddress() + '</span><a class="translateMe editButton">Edit</a></span></li><li  class="lineSearchAd"><span id="ZipCodeLabel" class="labelDataAd translateMe">Zip Code:</span><span class="lineInfoContainerAd"><span id="zipCode" class="dataAccount">' + address.getZipCode() + '</span><a class="translateMe editButton">Edit</a></span></li><li  class="lineSearchAd"><span id="phoneNumberLabel" class="labelDataAd translateMe">Phone Number:</span><span class="lineInfoContainerAd"><span id="phoneNumber" class="dataAccount">' + address.getPhoneNumber() + '</span><a class="translateMe editButton">Edit</a></span></li></ul></li>';
}
View.prototype._printMessageNotFoundArticle = function() {
	return '<div id="message"><div class="msg"><h3 class"translateMe">Sorry, we couldn\'t found anything that matches with your search</h3></div></div>';
}
View.prototype._printLookArticle = function(article, star) {
	var img = null;
	if(article.getImageURL() == null || article.getImageURL() == undefined) {
		img = "images/default.png";
	} else {
		img = article.getImageURL();
	}

	var ret = "";
	ret = '<div class="articleCont"><div class="articleNameCont"><h1 class="articleName">' + article.getName() + '</h1><h2 class="articlePrice">' + article.getPrice() + '</h2></div><div class="articleWrapper"><div class="photo"><img src="' + img + '/></div><div id="infoWraper"><ul class="imageListArt">';
	ret += '<button class="cart" title="Add to cart"></button>';

	if(star) {
		ret += '<button class="star" title="Add to wishlist"></button>';
	}

	return ret + '</ul><div id="article"><div id="description"><ul id="briefDescription"><li><span class="translateMe dataList">Price</span>: <span id="articlePrice">' + article.getPrice() + '</span></li><li><span class="translateMe dataList">Stock</span>: <span id="articleStock">' + article.getStock() + '</span></li><li><span class="translateMe dataList">Location</span>: <span id="location">' + article.getLocation() + '</span></li></ul></div></div></div><div class="articleDescript">' + article.getBriefDescription() + '</div></div></div>';
}
View.prototype._printCommentArea = function() {
	return '<div id="comments"><!-- here goes acordion --><div id="accordion"><div><h3><a href="#" class="translateMe">Bobby123</a></h3><div>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div></div><div><h3><a href="#" class="translateMe">JimmyWilson</a></h3><div>Phasellus mattis tincidunt nibh.</div></div><div><h3><a href="#" class="translateMe">L0VeB4G5</a></h3><div>Nam dui erat, auctor a, dignissim quis.</div></div></div></div>';
}

View.prototype._printArticleInCarousel = function(article) {
	return '<li><a href="javascript:view.moveTo("article",null,callbackHandler.get("article"),null)"><img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="300" height="300" alt="' + article.getName() + '" /></a></li>';
}
View.prototype._printException = function(){
	return '<link rel="stylesheet" type="text/css" href=" ../style/error.css"/><div class="errorCont"><strong class="errorText" class="translateMe"></strong></div>';
}
