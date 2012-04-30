function LogInButton(element) {
	$(element).click(function() {
		$("div#loginPopUp").removeClass("hidden");
		//view.hide();
		$("div#loginPopUp").dialog({
			closeOnEscape : true,
			title : 'Log in',
			draggable : true,
			buttons : {
				"Login" : function() {
					view.logIn($("input#username").val(), $("input#password").val());
				},
				"Cancel" : function() {
					$("div#loginPopUp").dialog("close");
				}
			}
		});
	});
}