Dictionary = function() {
	this.map = new Map();
};
Dictionary.prototype.addLanguage = function(code, language) {
	this.map.put(code, language);
	this._initLanguage(code);
};
Dictionary.prototype.getLanguage = function(code) {
	return this.map.get(code);
};
Dictionary.prototype.translate = function(languageCode, word) {
	//console.log("translating " + word);
	if(this.getLanguage(languageCode).translate(word) == null || this.getLanguage(languageCode).translate(word) == undefined) {
		console.log("Falta traducir: " + word);
	}
	return this.getLanguage(languageCode).translate(word);
};
Dictionary.prototype.init = function() {
	this.baseLanguage = new Language("en", "English", null);
	this.currentLanguage = this.baseLanguage;

	var es = new Language("es", "Español", null);
	es.addWord("Home", "Inicio");
	es.addWord("Register", "Registrarse");
	es.addWord("Log in", "Iniciar sesión");
	es.addWord("About us", "Sobre nosotros");
	es.addWord("Help", "Ayuda");
	es.addWord("Categories", "Categorías");
	es.addWord("My Profile", "Mi perfil");
	es.addWord("Control Panel", "Panel de control");
	es.addWord("Search", "Buscar");
	es.addWord("Advanced Search", "Búsqueda avanzada");
	es.addWord("says...", "dice...");
	es.addWord("Books", "Libros");
	es.addWord("Comments", "Comentarios");
	es.addWord("Brief Description:", "Descripción breve:");
	es.addWord("My article", "Tu artículo");
	es.addWord("Koppe", "Koppe");
	es.addWord("Username:", "Nombre de usuario:");
	es.addWord("Name:", "Nombre:");
	es.addWord("Password:", "Contraseña:");
	es.addWord("Confirm Password:", "Confirmar contraseña:");
	es.addWord("e-mail:", "Correo electrónico:");
	es.addWord("Birth date:", "Fecha de nacimiento:");
	es.addWord("End registration", "Finalizar registración");
	es.addWord("My products", "Tus productos");
	es.addWord("My account", "Tu cuenta");
	es.addWord("Log out", "Salir");
	es.addWord("Hi,", "¡Hola,");
	es.addWord("Next &gt;", "Más >");
	es.addWord("All Categories", "Todas las Categorias");
	es.addWord("DVD", "DVD");
	es.addWord("My Account", "Mi Cuenta");
	es.addWord("My Wishlist", "Mis Favoritos");
	es.addWord("My Cart", "Mi Carrito");
	es.addWord("My Orders", "Mis Ordenes");
	es.addWord("What's new?", "¿Qué hay de nuevo?");
	es.addWord("Price", "Precio");
	es.addWord("Stock", "Stock");
	es.addWord("Location", "Ubicacion");
	es.addWord("Description", "Descripción");
	es.addWord("Confirm Order", "Confirmar Orden");
	es.addWord("Delete Order", "Eliminar Orden");
	es.addWord("Next >", "Siguiente >");
	es.addWord("Account Data", "Datos de Cuenta");
	es.addWord("Addresses", "Direcciones");
	es.addWord("Username", "Nombre de usuario");
	es.addWord("Edit", "Editar");
	es.addWord("Name", "Nombre");
	es.addWord("E-mail", "E-mail");
	es.addWord("Birthday Date", "Fecha de nacimiento");
	es.addWord("Password", "Contraseña");
	es.addWord("Address Name:", "Nombre de dirección:");
	es.addWord("Country:", "Pais:");
	es.addWord("State:", "Estado:");
	es.addWord("Address:", "Dirección:");
	es.addWord("Zip Code:", "Codigo Postal:");
	es.addWord("Phone Number:", "Numero de Teléfono:");
	es.addWord("Cancel", "Cancelar");
	es.addWord("Ok", "Aceptar");
	es.addWord("My orders", "Mis Ordenes");
	es.addWord("Confirmed", "Confirmadas");
	es.addWord("Shipping", "En Transito");
	es.addWord("Received", "Recibidas");
	es.addWord("View article", "Ver artículo");
	es.addWord("Delete article", "Eliminar artículo");
	es.addWord("Add to cart", "Agregar al carrito");
	es.addWord("Add to wishlist", "Agregar a mis favoritos");
	es.addWord("Product", "Producto");
	es.addWord("Total", "Total");
	es.addWord("My wishlist", "Mis Favoritos");
	es.addWord("Delete address", "Eliminar dirección");
	es.addWord("Mark as default address", "Marcar como dirección principal");
	es.addWord("Articles Found", "Articulos Encontrados");
	es.addWord("In my Cart", "En mi Carrito");
	es.addWord("In my Wishlist", "En mis Favoritos");
	es.addWord("Alert:", "Alerta:");
	es.addWord("Day", "Dia");
	es.addWord("Month", "Mes");
	es.addWord("Year", "Año");
	es.addWord(":", ":");
	es.addWord("Sorry, we couldn't found anything that matches with your search", "Perdón, no hemos encontrado nada que coincida con tu busqueda");

	this.addLanguage("es", es);
	var de = new Language("de", "Deutsch", null);
	de.addWord("Home", "Startseite");
	de.addWord("Register", "Registration");
	de.addWord("Log in", "Anmelden");
	de.addWord("About us", "Über uns");
	de.addWord("Help", "Hilfe");
	de.addWord("Books", "Bücher");
	de.addWord("Categories", "Kategorien");
	de.addWord("My Profile", "Mein Profil");
	de.addWord("Control Panel", "Kontoeinstellungen");
	de.addWord("Search", "Suchen");
	de.addWord("Advanced Search", "Erweiterte Suche");
	de.addWord("says...", "sagt...");
	de.addWord("Comments", "Kommentar");
	de.addWord("Brief Description:", "Kurzes Beschreibung:");
	de.addWord("My article", "Ihr Artikel");
	de.addWord("Koppe", "Koppe");
	this.addLanguage("de", de);

	var it = new Language("it", "Italiano", null);
	it.addWord("Home", "Inicio");
	it.addWord("Register", "Registrazione");
	//TODO
	it.addWord("Log in", "Accedi");
	it.addWord("About us", "Chi siamo");
	it.addWord("Help", "Aiuta");
	it.addWord("Books", "Libri");
	it.addWord("Categories", "Categorías");
	it.addWord("My Profile", "Mio profilo");
	it.addWord("Control Panel", "Impostazioni account");
	it.addWord("Search", "Cercare");
	it.addWord("Advanced Search", "Ricerca avanzata");
	it.addWord("says...", "sagt...");
	it.addWord("Comments", "Comentarios");
	//TODO
	it.addWord("Brief Description:", "Descriptione breve:");
	//TODO
	it.addWord("My article", "Il suo articolo");
	it.addWord("Koppe", "Koppe");
	this.addLanguage("it", it);
}

Dictionary.prototype._initLanguage = function(language_code) {
	$(languageList).each(function(index, domEle) {
		if(domEle.getName() == language_code) {
			site.getDictionary().getLanguage(language_code).setId(domEle.getId());
			return;
		}
	});
}

Dictionary.prototype.getCurrentLanguage = function() {
	return this.currentLanguage;
}
Dictionary.prototype.getBaseLanguage = function() {
	return this.baseLanguage;
}
Dictionary.prototype.setCurrentLanguage = function(language) {
	return this.currentLanguage = language;
}