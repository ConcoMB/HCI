function EditButton(pathCont, bigContainer) {
	var self = this;
	self.bigContainer=bigContainer;
	self.containerEle = bigContainer.find("span.lineInfoContainer");
	self.pathCont = pathCont;
	var prev = self.containerEle.html();

	$(bigContainer).find("a.editButton").click(function() {
		if(subscriber.on) {
			var id = $(self.containerEle).find("span").attr("id");
			var cancel = "<a class='translateMe cancelButton'>Cancel</a>";
			var ok = "<a class='translateMe okButton'>Ok</a>";
			$(self.containerEle).attr("prev", prev);
			if(id == "password") {
				$(self.containerEle).html('<input class="editInput" type="password"></input>' +  "<a id='passwordConfirmCancelButton' class='translateMe cancelButton'>Cancel</a>" +ok );
				$(self.bigContainer).after("<li id='confirmPasswordEditableLine' class='editableLine'><span id='confirmPasswordLabel' class='labelData translateMe'>Confirm password</span>: <span class='lineInfoContainer'><input class='editInput' type='password'></input></span></li>");
			} else if(id == "bday") {
				//$(self.containerEle).html('<input class="editInput" type="date"></input>');TODO
			} else {
				$(self.containerEle).html('<input class="editInput" type="text"></input>' + cancel  + ok);
			}
			view.refresh(self.pathCont);
			subscriber.on = false;
		}
	});
}