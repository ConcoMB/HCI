function MyLink(element, linkName, callback, callbackArguments) {
	var self = this;
	self.linkName = linkName;
	$(element).click(function() {
		if(subscriber.on) {
			var aux;
			if(self.linkName == undefined || self.linkName == null) {
				console.log(element);
				aux = $(this).attr("base").trim().toLowerCase();
			} else {
				aux = linkName;
			}
			console.log("en myLink");
			console.log(aux)
			view.moveTo(aux, null, callback, callbackArguments);
			subscriber.on = false;
		}
	});
}