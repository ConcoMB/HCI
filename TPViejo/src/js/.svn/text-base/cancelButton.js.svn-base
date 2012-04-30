function CancelButton(pathCont, bigContainer, toRemove) {
	var self = this;
	self.pathCont = pathCont;
	self.bigContainer = bigContainer;
	self.containerEle = bigContainer.find("span.lineInfoContainer");
	self.toRemove = toRemove;
	$(self.containerEle).find("a.cancelButton").click(function() {
		if(subscriber.on) {
			if($(self.bigContainer).find(".cancelButton").attr("id") == "passwordConfirmCancelButton"/*self.toRemove != null && self.toRemove != undefined*/) {
				$("li#confirmPasswordEditableLine").remove();
			}
			$(self.containerEle).html(self.containerEle.attr("prev"));
			view.refresh(self.pathCont);
			subscriber.on = false;
		}
	});
}