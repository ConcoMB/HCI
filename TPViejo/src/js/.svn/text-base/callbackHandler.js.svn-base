function CallbackHandler() {
	this.callbacks = new Map();
}

CallbackHandler.prototype.init = function() {
	this.callbacks.put("home", function(arguments) {
		callbackHandler._search()
		var searchHashIndex = getStackHashLength(location.hash);
		var stackHash;
		location.hash = getLastFromHash(location.hash);	
		
		var jcCount = 1;
		jQuery('#carousel').jcarousel({
			auto : 5,
			scroll : 1,
			wrap : 'circular',
			visible : 1,
			itemFallbackDimension : 300,
			buttonNextHTML : null,
			buttonPrevHTML : null
		});

		var jc = $('#carousel').data('jcarousel');
		var anim = true;

		$('#jcItemView').button({
			text : false,
			icons : {
				primary : 'ui-icon-search'
			}
		}).click(function() {
		});
		$('#jcItemWishlist').button({
			text : false,
			icons : {
				primary : 'ui-icon-star'
			}
		});
		$('#jcItemCart').button({
			text : false,
			icons : {
				primary : 'ui-icon-cart'
			}
		});
		$('#jcFirst').button({
			text : false,
			icons : {
				primary : 'ui-icon-seek-start'
			}
		}).click(function() {
			if(subscriber.on) {
				jc.scroll(1, true);
				subscriber.on = false;
			}
		});
		$('#jcPrev').button({
			text : false,
			icons : {
				primary : 'ui-icon-seek-prev'
			}
		}).click(function() {
			if(subscriber.on) {
				jc.prev();
				subscriber.on = false;
			}

		});
		$('#jcPlayPause').button({
			text : false,
			icons : {
				primary : 'ui-icon-pause'
			}
		}).click(function() {
			if(anim) {
				jc.pauseAuto();
				options = {
					icons : {
						primary : 'ui-icon-play'
					}
				}
			} else {
				jc.startAuto();
				options = {
					icons : {
						primary : 'ui-icon-pause'
					}
				}
			}
			anim != anim;
		});
		$('#jcNext').button({
			text : false,
			icons : {
				primary : 'ui-icon-seek-next'
			}
		}).click(function() {
			if(subscriber.on) {
				jc.next();
				subscriber.on = false;
			}

		});
		$('#jcLast').button({
			text : false,
			icons : {
				primary : 'ui-icon-seek-end'
			}
		}).click(function() {
			if(subscriber.on) {
				jc.scroll(jc.size(), true);
				subscriber.on = false
			}

		});
	});

	this.callbacks.put("search", function() {
		console.log("estoy en search");
		callbackHandler._search()
		view.searchData = view._defaultSearchData().parseHash(location.hash);
		callbackHandler._setPath();
		callbackHandler._setTabs();
		//console.log(view.searchData);
		view.displaySearch(null, view._printArticleFound, "ul#articlesList", "articleSearchIndex");
		view.displaySearch(view.site.getCart(), view._printArticleFoundInCart, "ul#inMyCart");
		view.displaySearch(view.site.getWishlist(), view._printArticleFoundInWishlist, "ul#inMyWishlist");

		callbackHandler._setListButtons();

		if(user != null) {
			$(".orderTabs").tabs("add", "site/inConfirmed.html", "Confirmed");
			$(".orderTabs").tabs("add", "site/inShipping.html", "Shipping");
			$(".orderTabs").tabs("add", "site/inReceived.html", "Received");
			view.displaySearch(view.site.getConfirmed(), view._printArticleFoundInConfirmed, "ul#inMyConfirmed");
			view.displaySearch(view.site.getShipped(), view._printArticleFoundInShipped, "ul#inMyShipped");
			view.displaySearch(view.site.getReceived(), view._printArticleFoundInReceived, "ul#inMyReceived");
		}
		/*view.searchData = view._defaultSearchData().parseHash(location.hash);
		 callbackHandler._setPath();
		 callbackHandler._setTabs();
		 //console.log(view.searchData);
		 view.displaySearch(null, view._printArticleFound, "ul#articlesList", "articleSearchIndex");
		 view.displaySearch(view.site.getCart(), view._printArticleFoundInCart, "ul#inMyCart");
		 view.displaySearch(view.site.getWishlist(), view._printArticleFoundInWishlist, "ul#inMyWishlist");

		 callbackHandler._setListButtons();

		 if(user != null) {
		 $(".orderTabs").tabs("add", "site/inConfirmed.html", "Confirmed");
		 $(".orderTabs").tabs("add", "site/inShipping.html", "Shipping");
		 $(".orderTabs").tabs("add", "site/inReceived.html", "Received");
		 view.displaySearch(view.site.getConfirmed(), view._printArticleFoundInConfirmed, "ul#inMyConfirmed");
		 view.displaySearch(view.site.getShipped(), view._printArticleFoundInShipped, "ul#inMyShipped");
		 view.displaySearch(view.site.getReceived(), view._printArticleFoundInReceived, "ul#inMyReceived");
		 }
		 /*		callbackHandler._setTabs();
		 callbackHandler._setListButtons();*/
	});

	this.callbacks.put("categories", function(arguments) {
		console.log("estoy en categories");
		callbackHandler._setPath();
		callbackHandler._setTabs();
		var catString = "";

		$(view.site.getCategories()).each(function(index, category) {
			catString = catString.concat('<li class="categoryCont"> <h2 class="catLine category">' + category.getDataObj().getName() + '</h2><ul>');
			$(view.site.getSubcategories(category.getDataObj())).each(function(index, subcategory) {
				if(subcategory.getDataObj().isSubcategory()){
				console.log(subcategory)
				catString = catString.concat('<li class="catLine subcategory">' + subcategory.getDataObj().getName() + '</li>');
			}});
			catString = catString.concat('</ul></li>');
		});
		$("ul.categories").html(catString);

	});

	this.callbacks.put("advanced search", function(arguments) {
		console.log("estoy en advanced search");
		callbackHandler._setPath();
		callbackHandler._setTabs();

		var catString = "";

		$(view.site.getCategories()).each(function(index, category) {
			catString = catString.concat('<div id="cat" class="lineAd"> <input type="checkbox" class="catCheck" title=""> ' + category.getDataObj().getName() + '</input></div>');
			$(view.site.getSubcategories(category.getDataObj())).each(function(index, subcategory) {
				catString = catString.concat('<div class="lineAd subCatList"> <input type="checkbox" class="subCatCheck" title="">' + subcategory.getDataObj().getName() + '</input></div>');
			});
		});

		$("div.catPanel").html(catString);
	});

	this.callbacks.put("my account", function(arguments) {
		console.log("estoy en my account");
		callbackHandler._setPath();
		callbackHandler._setTabs();
		callbackHandler._setListButtons();
		
		$('span#username').text(user.username);
		$('span#email').text(user.email);
		$('span#bday').text(user.birth_day);
		$('span#password').text("*******");
		
		$('div.alertaCont').css({display: 'none'});
		
		$('a.editButton').button({
			text: true,
			icons: {
				primary: 'ui-icon-pencil'
			}
		}).click(function(){
			$(this).siblings('a.okButton').show('highlight');
			$(this).siblings('a.cancelButton').show('highlight');
			$(this).parent().prepend('<input class="editInput" type="text" value="'+$(this).siblings('span.dataAccount').text()+'">');
			$(this).siblings('span.dataAccount').hide();
			$(this).hide();
		});
		
		$('a.cancelButton').button({
			text: true,
			icons: {
				primary: 'ui-icon-cancel'
			}
		}).click(function(){
			$(this).siblings('a.editButton').show('highlight');
			$(this).siblings('span.dataAccount').show();
			$(this).siblings('a.okButton').hide();
			$(this).siblings('.editInput').remove();
			$(this).siblings('.editInput').hide();
			$(this).hide();
		}).css({display: 'none'});
		
		$('a.okButton').button({
			text: true,
			icons: {
				primary: 'ui-icon-check'
			}
		}).click(function(){
			var exception;
			if((exception = errorHandler.map.get(view.site.server.updateAccount(user.username, user.authentication_token, '<account><name>'+(($('span#name').siblings('.editInput').length != 0)? $('span#name').siblings('.editInput').val():$('span#name').text())+'</name><email>'+(($('span#email').siblings('.editInput').length != 0)? $('span#email').siblings('.editInput').val():$('span#email').text())+'</email><birth_date>'+(($('span#bday').siblings('.editInput').length != 0)? $('span#bday').siblings('.editInput').val():$('span#bday').text())+'</birth_date></account>'))) == undefined){
				$(this).siblings('a.editButton').show('highlight');
				$(this).siblings('span.dataAccount').show();
				$(this).siblings('a.cancelButton').hide();
				$(this).siblings('.editInput').remove();
				$(this).siblings('.editInput').hide();
				$(this).hide();
				alert('<account><name>'+(($('span#name').siblings('.editInput').length != 0)? $('span#name').siblings('.editInput').val():$('span#name').text())+'</name><email>'+(($('span#email').siblings('.editInput').length != 0)? $('span#email').siblings('.editInput').val():$('span#email').text())+'</email><birth_date>'+(($('span#bday').siblings('.editInput').length != 0)? $('span#bday').siblings('.editInput').val():$('span#bday').text())+'</birth_date></account>');
			} else {
				$(this).siblings('span.alertText').text(exception.string);
				$(this).siblings('span.alertText').show('highlight');
				var aux = this;
				var t = setTimeout(function(){$(aux).siblings('span.alertText').hide()}, 5000);
			}
		}).css({display: 'none'});
		
		$('a.passEditButton').button({
			text: true,
			icons: {
				primary: 'ui-icon-pencil'
			}
		}).click(function(){
			$(this).hide();
			$(this).siblings('span.dataAccount').hide();
			$(this).siblings('a.passOkButton').show('highlight');
			$(this).siblings('a.passCancelButton').show('highlight');
			$(this).parent().prepend('<input id="newPassInput" class="editInput" type="password">');
			$(this).parents('ul#formAccount').append('<li id="confirmPasswordEditableLine" class="editableLine"><span id="confirmPasswordLabel" class="labelData translateMe">Confirm password</span>: <span class="lineInfoContainer"><input id="confrimPassInput" class="editInput" type="password"></input></span></li>');
		});
		
		$('a.passOkButton').button({
			text : true,
			icons : {
				primary : 'ui-icon-check'
			}
		}).click(function() {
			if($('#confirmPassInput').val() == $('#newPassInput').val()) {
				var exception;
				if(( exception = errorHandler.map.get(view.site.server.changePassword(user.username, user.password, $('#confirmPassInput').val()))) != undefined) {
					//TODO: algo salió mal.
				} else {
					$(this).hide();
					$(this).siblings('a.passOkButton').hide();
					$(this).siblings('span#password').show();
					$('#confirmPasswordEditableLine').remove();
					$('#newPassInput').remove();
					$(this).siblings('a.passEditButton').show('highlight');
				}
			} else {
				alert("Your passwords don't match.");
			}
		}).css({
			display : 'none'
		});
		
		$('a.passCancelButton').button({
			text: true,
			icons: {
				primary: 'ui-icon-check'
			}
		}).click(function(){
			$(this).hide();
			$(this).siblings('a.passOkButton').hide();
			$(this).siblings('span#password').show();
			$('#confirmPasswordEditableLine').remove();
			$('#newPassInput').remove();
			$(this).siblings('a.passEditButton').show('highlight');
		}).css({display:'none'});
	});

	this.callbacks.put("my addresses", function(arguments) {
		if(user == null) {
			//TODO
			return;
		}
		console.log("estoy en my addresses");
		view.displayCollection(view.site.getAddresses(), view._printAddress, "ul#inMyConfirmed");
		callbackHandler._setPath();
		callbackHandler._setTabs();
		callbackHandler._setListButtons();
	});

	this.callbacks.put("register", function(arguments) {
		console.log("estoy en register");
		callbackHandler._setPath();
		callbackHandler._setTabs();

	});

	this.callbacks.put("my wishlist", function(arguments) {
		onsole.log("estoy en my orders");
		view.displayCollection(view.site.getCart(), view._printOrderMyCart, $("div#myCart"));
		view.displayCollection(view.site.getWishlist(), view._printArticleFoundInWishlist, $("div#myWishlist"));

		callbackHandler._setPath();
		callbackHandler._setTabs();
		if(user != null) {
			$(".orderTabs").tabs("add", "site/confirmed.html", "Confirmed");
			$(".orderTabs").tabs("add", "site/shipping.html", "Shipping");
			$(".orderTabs").tabs("add", "site/received.html", "Received");
			view.displayCollection(view.site.getConfirmed(), view._printOrderConfirmed, $("div#confirmed"));
			view.displayCollection(view.site.getShipping(), view._printOrderShipping, $("div#shipping"));
			view.displayCollection(view.site.getReceived(), view._printOrderReceived, $("div#received"));

			console.log("me llaman");
		}
		callbackHandler._setListButtons();
		$("#tabs").tabs({
			selected : 1
		});
	});

	this.callbacks.put("my orders", function(arguments) {
		console.log("estoy en my orders");

		view.displayCollection(view.site.getCart(), view._printOrderMyCart, $("div#myCart"));
		view.displayCollection(view.site.getWishlist(), view._printArticleFoundInWishlist, $("div#myWishlist"));

		callbackHandler._setPath();
		callbackHandler._setTabs();
		if(user != null) {
			$(".orderTabs").tabs("add", "site/confirmed.html", "Confirmed");
			$(".orderTabs").tabs("add", "site/shipping.html", "Shipping");
			$(".orderTabs").tabs("add", "site/received.html", "Received");
			view.displayCollection(view.site.getConfirmed(), view._printOrderConfirmed, $("div#confirmed"));
			view.displayCollection(view.site.getShipping(), view._printOrderShipping, $("div#shipping"));
			view.displayCollection(view.site.getReceived(), view._printOrderReceived, $("div#received"));

			console.log("me llaman");
		}
		callbackHandler._setListButtons();
	});

	this.callbacks.put("help", function(arguments) {
		console.log("estoy en help");
		callbackHandler._setPath();
		callbackHandler._setTabs();
	});

	this.callbacks.put("about us", function(arguments) {
		console.log("estoy en about us");
		callbackHandler._setPath();
		callbackHandler._setTabs();
	});

	this.callbacks.put("article", function() {
		console.log("estoy en article");
		callbackHandler._setPath();
		callbackHandler._setTabs();
		callbackHandler._setListButtons();

		view.searchData = view._defaultSearchData().parseHash(location.hash);
		view.lookAt("article", view.searchData.getObjectToSearch());
		$("commentWrapper").html(view._printCommentArea());
		callbackHandler._setAccordion();
		callbackHandler._setListButtons();
	});

	this.callbacks.put("articleSearchIndex", function(arguments) {
		console.log("estoy en search... llamado desde un índice");
		callbackHandler._setPath();
		view.searchData = new SearchData(view.searchData.searchText, view.searchData.order, view.searchData.items_per_page, arguments.indexPage);
		console.log(view.searchData);
		view.displaySearch(null, view._printArticleFound, "ul#articlesList", "articleSearchIndex");
		view.displaySearch(view.site.getCart(), view._printArticleFoundInCart, "ul#inMyCart");
		view.displaySearch(view.site.getWishlist(), view._printArticleFoundInWishlist, "ul#inMyWishlist");
		if(user != null) {
			view.displaySearch(view.site.getConfirmed(), view._printArticleFoundInConfirmed, "ul#inMyConfirmed");
			view.displaySearch(view.site.getShipped(), view._printArticleFoundInShipped, "ul#inMyShipped");
			view.displaySearch(view.site.getReceived(), view._printArticleFoundInReceived, "ul#inMyReceived");
		}
		callbackHandler._setTabs();
		callbackHandler._setListButtons();
	});
}

CallbackHandler.prototype.get = function(keyPage) {
	if(keyPage == null || keyPage == undefined) {
		return null;
	}
	return this.callbacks.get(keyPage.toLowerCase().trim());
}

CallbackHandler.prototype._setTabs = function() {
	$("#tabs").tabs({
		ajaxOptions : {
			error : function(xhr, status, index, anchor) {
				$(anchor.hash).html("Couldn't load this tab.");
			},
			data : {},
			success : function(data, textStatus) {
			},
		}
	});
}

CallbackHandler.prototype._setAccordion = function() {
	// Accordion
	$("#accordion").accordion({
		header : "h3"
	});
}

CallbackHandler.prototype._setListButtons = function() {
	$('.trash').button({
		text : false,
		icons : {
			primary : 'ui-icon-trash'
		}
	});
	$('.star').button({
		text : false,
		icons : {
			primary : 'ui-icon-star'
		}
	});
	$('.cart').button({
		text : false,
		icons : {
			primary : 'ui-icon-cart'
		}
	});
	$('.search').button({
		text : false,
		icons : {
			primary : 'ui-icon-search'
		}
	});
	$('.pin-s').button({
		text : false,
		icons : {
			primary : 'ui-icon-pin-s'
		}
	});
}

CallbackHandler.prototype._setPath = function() {
	var pathWrapper = $("div#pathWrapper");
	if(pathWrapper.length == 1) {

		$(pathWrapper).empty();

		var path = view.getTree().getStack().iterator();
		var node = null;

		$(pathWrapper).append('<div id="path"></div>');

		while(( node = path.next()) != null) {

			if(node.isCategory != undefined) {
				if(node.isCategory()) {
					$($("div#path").get(0)).append(makeCategories());
					var string = '<div><a title="' + firstToUpperCase(node.getValue()) + '" class="translateMe pathLink">' + firstToUpperCase(node.getValue()) + '</a>';
					$("div#path").prepend(string + view.makeSubcategories(node) + '</div>');
				} else if(node.isSubcategory()) {
					$("div#path").prepend('<div><a title="' + firstToUpperCase(node.getValue()) + '" class="translateMe pathLink">' + firstToUpperCase(node.getValue()) + '</a></div>');
				} else if(node.isArticle()) {
					$("div#path").prepend('<div><a title="' + firstToUpperCase(node.getValue()) + '" class="translateMe pathLink">' + firstToUpperCase(node.getValue()) + '</a></div>');
				}
			} else {
				$("div#path").prepend('<div><a title="' + firstToUpperCase(node.getValue()) + '" class="translateMe pathLink">' + firstToUpperCase(node.getValue()) + '</a></div>');
			}
		}
		$("div#path").path_menu();
	}
}

CallbackHandler.prototype._search = function() {
	view.searchData = view._defaultSearchData().parseHash(location.hash);
	callbackHandler._setPath();
	callbackHandler._setTabs();
	//console.log(view.searchData);
	view.displaySearch(null, view._printArticleFound, "ul#articlesList", "articleSearchIndex");
	view.displaySearch(view.site.getCart(), view._printArticleFoundInCart, "ul#inMyCart");
	view.displaySearch(view.site.getWishlist(), view._printArticleFoundInWishlist, "ul#inMyWishlist");

	callbackHandler._setListButtons();

	if(user != null) {
		$(".orderTabs").tabs("add", "site/inConfirmed.html", "Confirmed");
		$(".orderTabs").tabs("add", "site/inShipping.html", "Shipping");
		$(".orderTabs").tabs("add", "site/inReceived.html", "Received");
		view.displaySearch(view.site.getConfirmed(), view._printArticleFoundInConfirmed, "ul#inMyConfirmed");
		view.displaySearch(view.site.getShipped(), view._printArticleFoundInShipped, "ul#inMyShipped");
		view.displaySearch(view.site.getReceived(), view._printArticleFoundInReceived, "ul#inMyReceived");
	}
}