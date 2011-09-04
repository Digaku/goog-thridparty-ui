


goog.provide('goog.ui.FullscreenLoading');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('goog.ui.Component');



goog.ui.FullscreenLoading = function(opt_domHelpers){
	goog.ui.Component.call(this, opt_domHelpers);
};
goog.inherits(goog.ui.FullscreenLoading, goog.ui.Component);

goog.ui.FullscreenLoading.render = function(){
	goog.ui.FullscreenLoading.superClass_.render(goog.dom.getElement('body'));
	
	this.bgElm_ = goog.dom.createElement('div');
	
	var doc = this.getDomHelper().getDocument();
	var win = goog.dom.getWindow(doc) || window;
	var css = {
		'position': 'absolute',
		'left': '0px',
		'top': '0px'
	};

	// Take the max of scroll height and view height for cases in which document
	// does not fill screen.
	var viewSize = goog.dom.getViewportSize(win);
	var w = Math.max(doc.body.scrollWidth, viewSize.width);
	var h = Math.max(doc.body.scrollHeight, viewSize.height);
	
	goog.style.showElement(this.bgElm_, true);
	goog.style.setOpacity(this.bgElm_, 0.50);
	goog.style.setSize(this.bgElm_, w, h);
	goog.style.setStyle(this.bgElm_, css);
};






