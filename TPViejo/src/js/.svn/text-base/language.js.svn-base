Language = function(code, name, lang_id) {
	this.map = new Map();
	this.name = name;
	this.code = code;
	this.lang_id = lang_id;
}
Language.prototype.addWord = function(baseWord, word) {
	this.map.put(baseWord, word);
}
Language.prototype.translate = function(baseWord) {
	return this.map.get(baseWord);
}
Language.prototype.getName = function() {
	return this.name;
}
Language.prototype.getCode = function() {
	return this.code;
}
Language.prototype.getId = function() {
	return this.lang_id;
}
Language.prototype.setId = function(new_id) {
	this.lang_id = new_id;
}