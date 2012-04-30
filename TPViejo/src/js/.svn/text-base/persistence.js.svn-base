function Persistence() {
}

Persistence.prototype.persist = function(name, object) {
	var value = "<" + name.toLowerCase() + ">";
	for(var v in object) {
		if( typeof object[v] == 'function') {
		} else {
			value = value.concat("<" + v + ">" + object[v] + "</" + v + ">");
		}
	}
	value = value.concat("</" + name + ">");

	this._createCookie(name.toLowerCase(), value);
}
Persistence.prototype.load = function(name, nakedInstance) {
	var persistedInstance = this._readCookie(name.toLowerCase());
	if(persistedInstance == null) {
		return null;
	}
	//var num = 1000+3;
	//console.log(num.toString(8));
	var xml = getDOMParser(persistedInstance);
	console.log(xml)
	var its = null;
	for(var v in nakedInstance) {
		if( typeof nakedInstance[v] == 'function') {
		} else {
			its = getAttr(xml, v);
			if(its != undefined && its != null) {
				nakedInstance[v] = its.text();
			}
		}
	}
	return nakedInstance;
}
Persistence.prototype.remove = function(name) {
	return this._eraseCookie(name.toLowerCase());
}

Persistence.prototype._createCookie = function(name, value, minutes) {
	if(minutes) {
		var date = new Date();
		date.setTime(date.getTime() + (minutes * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else {
		var expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}
Persistence.prototype._readCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while(c.charAt(0) == ' ')
		c = c.substring(1, c.length);
		if(c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}

Persistence.prototype._eraseCookie = function(name) {
	return this._createCookie(name, "", -1);
}

Persistence.prototype.recursivePersist=function(name,object){
	var value = "<" + name.toLowerCase() + ">";
	for(var v in object) {
		if( typeof object[v] == 'function') {
		} else {
			value = value.concat("<" + v + ">" + object[v] + "</" + v + ">");
		}
	}
	value = value.concat("</" + name + ">");

	this._createCookie(name.toLowerCase(), value);
}

Persistence.prototype.persistArray=function(name,array){
	for(i in array){
		this.persist(name+"id:"+i,array[i]);
	}
}
