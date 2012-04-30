var subscriber = {};
var user = null;
var languageList = null;
var view = null;
var categories = null;
var errorHandler = null;
var callbackHandler = null;
var persistence=null;

$(document).ready(function() {
	subscriber.on = true;
	$(document).click(function() {
		subscriber.on = true;
	})

	persistence=new Persistence()
	var dict = new Dictionary();
	user=persistence.load("user",new User());
	console.log(user)

	callbackHandler = new CallbackHandler();
	callbackHandler.init();
	view = new View(new Server("http://eiffel.itba.edu.ar/hci/service/"), dict);
	errorHandler = new ErrorHandler();
	languageList = view.getLanguageList();

	view.init();
	
});
