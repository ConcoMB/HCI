;(function($) {
//
// plugin definition
//
$.fn.path_menu = function(options) {
  // build common options before element iteration
  var common_opts = $.extend({}, $.fn.path_menu.defaults, options);
  // iterate and initialize each matched element
  return this.each(function() { ;(function($root) {
    // build root element specific options
    var root_opts = $.metadata ? $.extend({}, common_opts, $root.metadata()) : common_opts;
	// set classes
	path_set_classes($root, 0);
    // uinitialize menu
	$("div.PathElement div.PathPopup div.PathPopupElement > a", $root).addClass(
		"PathPopupElementLink").each(function(){
			var this_ = $(this);
			this_.html(this_.html() + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
		});
	// resize each popup to max height of 200px initially (on window load)
	$("div.PathElement div.PathPopup", $root).each(function(){
		var opts_ = path_get_options($(this), $root, root_opts);
		var overflow_ = (opts_.popup_max_height > 0 &&
			this.clientHeight > opts_.popup_max_height &&
			$("div.PathPopupElement", this).length == 0);
		this.style.height = (overflow_ ? opts_.popup_max_height : this.scrollHeight) + "px";
		this.style.width = (this.scrollWidth + (overflow_ ? 20 : 0)) + "px";
		if (overflow_)
		{
			this.style.overflow = "auto";
			$(this).data("overflow", true);
		}
		this.style.filter = "progid:DXImageTransform.Microsoft.dropshadow(OffX=" + opts_.shadow_offset_x +
			",OffY=" + opts_.shadow_offset_y + ",Color='#e0e0e0',Positive='true')";
	}).css("opacity", 0.95).css("display", "none");
	// set the path elements' z-index (on window resize or load)
	path_set_z_index(root_opts.z_index, $root);
	// set the hover event handlers
	$("div.PathElement", $root)[$.fn.hoverIntent && root_opts.hoverIntent ? 'hoverIntent' : 'hover'](
		function() { path_show_popup(this, $root, root_opts); },
		function() { path_hide_popup(this, $root, root_opts); });
	// set the hover event handlers
	$("div.PathPopupElement", $root)[$.fn.hoverIntent && root_opts.hoverIntent ? 'hoverIntent' : 'hover'](
		function() { path_show_popup(this, $root, root_opts); },
		function() { path_hide_popup(this, $root, root_opts); });
	// set the focus event handler
	$("a", $root).focus(function() {
		var this_ = $(this);
		$("div", $root).each(function() {
			if (this_.parents().index(this) < 0)
				path_hide_popup(this, $root, root_opts);
		});
		path_show_popup(this_.parent(), $root, root_opts);
	});
  })($(this)); });
};
// set path elements' z-index so that the upper elements (physically located higher in the window) overlayd the lower ones
var path_set_z_index = function(z_index_, $root)
  {
	$("div.PathElement", $root).each(function() { this.style.zIndex = z_index_--; });
  },
  path_set_classes = function($div, level)
  {
	var class_ = (level == 0 ? "PathMenuBar" :
		(level == 1 ? "PathElement" :
		(level % 2 == 0 ? "PathPopup" :
		"PathPopupElement")));
	if (!$div.hasClass(class_))
		$div.addClass(class_);
	$("> div", $div).each(function() { path_set_classes($(this), level + 1); });
  },
  path_get_options = function($div, $root, root_opts_)
  {
	if ($.metadata)
	{
		if ($div.get(0) == $root.get(0))
			return $.extend({}, root_opts_);
		else
			return $.extend(path_get_options($div.parent(), $root, root_opts_), $div.metadata());
	}
	else
	    return root_opts_;
  }
  path_show_popup = function(path_elem_, $root, root_opts_)
  {
	var path_ = $(path_elem_);
	if (path_.hasClass("PathElement"))
		path_.addClass("PathElementHover");
	else if (path_.hasClass("PathPopupElement"))
	{
		var parent_ = path_.parent();
		parent_.css("filter", "");
		if (parent_.data("overflow"))
			parent_.css("overflow", "");
	}
	else
		return;
	var opts_ = path_get_options(path_, $root, root_opts_);
	var popup_ = $("div.PathPopup", path_).eq(0);
	var win_w_ = $(window).width() - 20; // 20 is vertical scrollbar width
	var w_ = popup_.width();
	var la_ = path_.offset().left;
	var l_ = (path_.hasClass("PathPopupElement") ? path_.width() : 0);
	var ra_ = la_ + l_ + w_ + opts_.shadow_offset_x;
	if (ra_ > win_w_)
		l_ += win_w_ - ra_;
	if (la_ + l_ < 0)
	    l_ = -la_;
	var t_ = (path_.hasClass("PathPopupElement") ? path_.get(0).offsetTop : path_.get(0).offsetHeight - 1);
	popup_.css({
		left: l_.toString() + "px",
		top: t_.toString() + "px"
	}).show(opts_.animation_speed);
  },
  path_hide_popup = function(path_elem_, $root, root_opts_)
  {
	var path_ = $(path_elem_);
	var opts_ = path_get_options(path_, $root, root_opts_);
	if (path_.hasClass("PathElementHover"))
		path_.removeClass("PathElementHover");
	else if (path_.hasClass("PathPopupElement"))
	{
		var parent_ = path_.parent();
		parent_.css("filter", "progid:DXImageTransform.Microsoft.dropshadow(OffX=" + opts_.shadow_offset_x +
			",OffY=" + opts_.shadow_offset_y + ",Color='#e0e0e0',Positive='true')");
		if (parent_.data("overflow"))
			parent_.css("overflow", "auto");
	}
	else
		return;
	$("div.PathPopup", path_).eq(0).stop(true, true).hide(opts_.animation_speed);
  };
//
// plugin defaults
//
$.fn.path_menu.defaults = {
    popup_max_height: 200,
    shadow_offset_x: 3,
    shadow_offset_y: 2,
    animation_speed: "fast",
    z_index: 1000,      // root div element only (metadata)
    hoverIntent: false  // root div element only (metadata)
};
//
// end of closure
//
})(jQuery); 
