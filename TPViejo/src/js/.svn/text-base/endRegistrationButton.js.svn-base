function EndRegistrationButton(base, element) {
	this.base = base;
	$(element).click(function() {
		var username = $(this.base + "input#username").val();
		var password = $(this.base + "input#password").val();
		if(password == $(this.base + "input#passwordConfirmation").val()) {
			view.register($(this.base + "input#name").val(), username, password, $(this.base + "input#birthDate").val());
		}
	});
}