$(function() {
	var hoverToggleFlag = false;
	var lockMenu = false;
	var t = null;

	function toggleF(identifier) {
		$(identifier).toggle({
			effect : "blind",
			speed : 200
		});
	}


	$("#searchButton").button({
		text : true,
		icons : {
			primary : "ui-icon-search"
		}
	});

	$("#advsearchButton").button({
		text : true
	});

	$("#menu").position({
		of : $("#ddownMenu"),
		my : "left top",
		at : "left bottom",
		collision : "flip fit"
	});

	$("#ddownMenuButton").button({
		text : false,
		icons : {
			primary : "ui-icon-triangle-1-s"
		}
	}).click(function() {
		if(hoverToggleFlag == false) {
			toggleF("#menu");
			$("#ddownMenuButton").button({
				icons : {
					primary : "ui-icon-triangle-1-s"
				}
			});
		} else {
			$("#ddownMenuButton").button({
				icons : {
					primary : "ui-icon-triangle-1-n"
				}
			});
		}
		hoverToggleFlag = false;
		lockMenu = !lockMenu;
	});

	$("#ddownMenuButton").mouseenter(function() {
		if(hoverToggleFlag == false && lockMenu == false) {
			hoverToggleFlag = true;
			toggleF("#menu");
		}
	});
	$("#topbar", "#searchbar", "#topArea").mouseenter(function() {
		if(hoverToggleFlag == true && lockMenu == false) {
			hoverToggleFlag = false;
			toggleF("#menu");
		}
	});
	$("#menu").mouseleave(function() {
		if(hoverToggleFlag == true && lockMenu == false) {
			hoverToggleFlag = false;
			toggleF("#menu");
		}
	})

	$('#innerMenu').menu_toggle_adder({
		animate : 'yes',
		highlight_selected_link : 'no',
		toggle : './images/toggle.png',
		toggled : './images/toggled.png'
	})

	$('#menu').width($('#innerMenu').width() + 10);
});
