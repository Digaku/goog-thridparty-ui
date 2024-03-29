

goog.provide('goog.ui.Loading');


goog.require('goog.dom');
goog.require('goog.ui.Component');

/**
 * @constructor
 */
goog.ui.Loading = function(elm_id, opt_base_url, opt_place_inner, opt_domHelpers){
	goog.ui.Component.call(this, opt_domHelpers);
	
	var elm;
	
	if(typeof elm_id == 'string'){
		elm = goog.dom.getElement(elm_id);
	}
	else{
		elm = elm_id;
	}
	
	this.orig_elm = elm;
	this.base_url_ = opt_base_url;
	this.opt_place_inner_ = opt_place_inner || false;
	
	//this.setElementInternal(goog.dom.getElement(elm_id));
	this.decorateInternal(this.orig_elm);
	
};

goog.inherits(goog.ui.Loading, goog.ui.Component);



goog.ui.Loading.prototype.decorateInternal = function(element){
	goog.ui.Loading.superClass_.decorateInternal.call(this, element);
	
	var elem = this.getElement(),
		wrapper = this.dom_.createElement('span'),
		anim = this.dom_.createElement('span');
	
	if(this.opt_place_inner_){
		this.orig_innerHTML = this.orig_elm.innerHTML;
		this.orig_elm.innerHTML = '';
		this.orig_elm.appendChild(wrapper);
	}
	else{
		goog.dom.insertSiblingBefore(wrapper, this.orig_elm);
		this.orig_elm.style.display = 'none';
	}
	
	if(this.base_url_){
		anim.innerHTML = '<img src="'+ this.base_url_ + goog.ui.Loading.gif_file_ + '"/>';
	}else{
		anim.innerHTML = '<img src="'+ this.gif_file_ +'" />';
	}
	
	wrapper.appendChild(anim);
	
	this.wrapper_ = wrapper;
	
};


goog.ui.Loading.prototype.restoreAll_ = function(){
	this.orig_elm.style.removeProperty('display');
	goog.dom.removeNode( this.wrapper_ );
	if(this.opt_place_inner_){
		this.orig_elm.innerHTML = this.orig_innerHTML;
	}
};

goog.ui.Loading.gif_file_ = '/img/loading-bar.gif';

goog.ui.Loading.prototype.restore = goog.ui.Loading.prototype.restoreAll_;

goog.ui.Loading.prototype.disposeInternal = function(){
	goog.ui.Loading.superClass_.disposeInternal.call(this);
	this.restoreAll_();
};


goog.exportSymbol('goog.ui.Loading', goog.ui.Loading);


