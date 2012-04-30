function getAttr(xml, attr) {
	if(attr == null || attr == undefined || attr == null) {
		return null;
	}
	return $(xml).find(attr);
}

function getDOMParser(text) {
	if(window.DOMParser) {
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(text, "text/xml");
	} else {// Internet Explorer
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(text);
	}
	return xmlDoc;
}

function toAttributeXMLString(attribute_name, value) {
	return "<" + attribute_name + "," + value + ">";
}

function firstToUpperCase(s) {
	if(s == null) {
		return null;
	}
	return s.charAt(0).toUpperCase() + s.substr(1, s.length);
}

function clearSpaces(s) {
	return s.replace(" ", "");
}

function getLastFromHash(str) {
	var flag = false;
	var last = "";
	console.log(str)
	for(var i = str.length; i > 0; i--) {
		if(str.charAt(i) == '/') {
			if(!flag) {
				flag = true;
			} else {
				return reverse(last);
			}
		} else {
			if((str.charAt(i) == '#') && flag) {
				return reverse(last);
			} else {
				last = last.concat(str.charAt(i));
			}
		}
	}
	return reverse(last);
	//TODO return error?
}

function reverse(str) {
	var aux = "";
	for(var i = str.length - 1; i >= 0; i--) {
		aux += str[i];
	}
	return aux;
}

function getStackHashLength(hshStr) {
	if(hshStr == null || hshStr == undefined) {
		return -1;
	}
	var i = 0;
	while(i < hshStr.length && hshStr.charAt(i) != ':') {
		i++;
	}
	if(i >= hshStr.length) {
		return -1;
	}
	return i;
}