function User(id, name, username, password, authentication_token, birth_date, last_login_date, persisting) {
	console.log("instanciando")
	this.username = username;
	this.password = password;
	this.authentication_token = authentication_token;
	this.name = name;
	this.id = id;
	this.birth_date = birth_date;
	this.last_login_date = last_login_date;

	if(persisting != null) {
		persistence.persist("user", this);
	}
}

User.prototype.toUserXML = function() {
	return getDOMParser(toAttributeXMLString("username", this.username), toAttributeXMLString("name", this.name), toAttributeXMLString("password", this.password), toAttributeXMLString("email", this.email), toAttributeXMLString("birth_date", this.birth_date));
}

User.prototype.getUsername = function() {
	return this.username;
}