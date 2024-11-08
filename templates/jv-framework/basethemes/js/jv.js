/*
Script: 	
	JVLazyLoad - Lazy loading.

License:
	Proprietary - JoomlaVi Club members only

Copyright:
	Copyright (C) JoomlaVi. All rights reserved.
*/

var JVLazyLoad = new Class({
	
	options: {
		replacer: 'templates/jv-framework/themes/default/images/trans.gif',
		selectors: 'img',
		duration: 750
	},
	
    initialize: function(selectors, options){		
		this.setOptions(options);
		this.selectors = $$(selectors);
		if(!this.selectors.length){
			this.selectors = $$(this.options.selectors);
		}
        this.selectors.each(function(selector){
            selector.osrc = selector.src;
			selector.src = this.options.replacer;
        }.bind(this));
		
		window.addEvent('scroll', this.initLoad.bind(this));
		this.initLoad();
    },
	
	initLoad: function(){
		var that = this;
		this.selectors.each(function(selector){
			if(selector.getCoordinates().top < window.getHeight() + window.getScrollTop()){
				if(!selector.loaded){
					selector.loaded = true;
					
					new Asset.image(selector.osrc, {
						onload: function(){
							selector.src = selector.osrc;
							new Fx.Styles(selector, {duration: that.options.duration}).set({opacity: 0}).start({opacity: 1});
						}
					});
				}
			}
		});	
	}
});
JVLazyLoad.implement(new Options);
	

/*
Script: 	
	JVSmoothScroll - Scroll window effects.

License:
	Proprietary - JoomlaVi Club members only

Copyright:
	Copyright (C) JoomlaVi. All rights reserved.
*/

var JVSmoothScroll = function(links){
	new SmoothScroll({links: links});
};
	
/*
Script: 	
	JVEqualHeight - Equal elements height.

License:
	Proprietary - JoomlaVi Club members only

Copyright:
	Copyright (C) JoomlaVi. All rights reserved.
*/

var JVEqualHeight = function(selectors){
	var maxHeight = 0;
	$$(selectors).each(function(selector){
		maxHeight = Math.max(maxHeight, selector.getCoordinates().height);
	});
	$$(selectors).each(function(selector){
		selector.setStyle(window.ie6 ? 'height' : 'min-height', maxHeight);
	});
};


/*
Script: 	
	JVEffects - JV Effects such as background color.

License:
	Proprietary - JoomlaVi Club members only

Copyright:
	Copyright (C) JoomlaVi. All rights reserved.
*/

var JVEffects = new Class({
	
	options:{		
		fxDuration: 350,
		fxTransition: Fx.Transitions.linear,
		wait: false
	},
	
    initialize: function(selectors, fxPropertiesFrom, fxPropertiesTo, options){
        this.setOptions(options);        
        $$(selectors).each(function(selector, index){
            var selectorFx = new Fx.Styles(selector, this.options);            
			selector.addEvents({
				'mouseenter': function(){
					selectorFx.stop().start(fxPropertiesFrom);
				},
				'mouseleave': function(){
					selectorFx.stop().start(fxPropertiesTo);
				}
			});
        });
    }
});
JVEffects.implement(new Options);

/*
Script: 	
	ScrollWindow - Scroll any element with an overflow, including the window element/

License:
	MIT-style license.

Copyright:
	Copyright (C) JoomlaVi. All rights reserved.
*/

ScrollWindow = Fx.Base.extend({

	options: {
		overflown: [],
		offset: {'x': 0, 'y': 0},
		wheelStops: true
	},

	initialize: function(element, options){
		this.now = [];
		this.element = $(element);
		this.bound = {'stop': this.stop.bind(this, false)};
		this.parent(options);
		if (this.options.wheelStops){
			this.addEvent('onStart', function(){
				document.addEvent('mousewheel', this.bound.stop);
			}.bind(this));
			this.addEvent('onComplete', function(){
				document.removeEvent('mousewheel', this.bound.stop);
			}.bind(this));
		}
	},

	setNow: function(){
		for (var i = 0; i < 2; i++) this.now[i] = this.compute(this.from[i], this.to[i]);
	},

	/*
	Property: scrollTo
		Scrolls the chosen element to the x/y coordinates.

	Arguments:
		x - the x coordinate to scroll the element to
		y - the y coordinate to scroll the element to
	*/

	scrollTo: function(x, y){
		if (this.timer && this.options.wait) return this;
		var el = this.element.getSize();
		var values = {'x': x, 'y': y};
		for (var z in el.size){
			var max = el.scrollSize[z] - el.size[z];
			if ($chk(values[z])) values[z] = ($type(values[z]) == 'number') ? values[z].limit(0, max) : max;
			else values[z] = el.scroll[z];
			values[z] += this.options.offset[z];
		}
		return this.start([el.scroll.x, el.scroll.y], [values.x, values.y]);
	},

	/*
	Property: toTop
		Scrolls the chosen element to its maximum top.
	*/

	toTop: function(){
		return this.scrollTo(false, 0);
	},

	/*
	Property: toBottom
		Scrolls the chosen element to its maximum bottom.
	*/

	toBottom: function(){
		return this.scrollTo(false, 'full');
	},

	/*
	Property: toLeft
		Scrolls the chosen element to its maximum left.
	*/

	toLeft: function(){
		return this.scrollTo(0, false);
	},

	/*
	Property: toRight
		Scrolls the chosen element to its maximum right.
	*/

	toRight: function(){
		return this.scrollTo('full', false);
	},

	/*
	Property: toElement
		Scrolls the specified element to the position the passed in element is found.

	Arguments:
		el - the $(element) to scroll the window to
	*/

	toElement: function(el){
		var parent = this.element.getPosition(this.options.overflown);
		var target = $(el).getPosition(this.options.overflown);
		return this.scrollTo(target.x - parent.x, target.y - parent.y);
	},

	increase: function(){
		this.element.scrollTo(this.now[0], this.now[1]);
	}

});
//ScrollWindow.implement(new Options);

/*
Script: 	
	JVTop - Scroll to top effect.

License:
	Proprietary - JoomlaVi Club members only

Copyright:
	Copyright (C) JoomlaVi. All rights reserved.
*/

var JVTop = new Class({
	
	options:{		
		fxDuration: 350,
		fxTransition: Fx.Transitions.linear,
		wait: false
	},
	
    initialize: function(options){
        this.setOptions(options);        
        var topElement = new Element('div', {
			'id': 'toTop'
		}).setHTML('').inject(document.body);
        topElement.addEvent('click', function(){
            new ScrollWindow(window).toTop();
        });
		var topFx = new Fx.Styles(topElement, this.options).set({'opacity': 0});
		window.addEvent('scroll', function(){
			if(window.getScrollTop() != 0){
				topFx.start({'opacity': 1});
			}
			else{
				topFx.start({'opacity': 0});
			}
		});
    }
});
JVTop.implement(new Options);

/*
Script: 	
	JVUserTools - User Tools.

License:
	Proprietary - JoomlaVi Club members only

Copyright:
	Copyright (C) JoomlaVi. All rights reserved.
*/

var JVUserTools = new Class({

    initialize: function(options){
		var userPanel = $('userpanel');
        var userPanels = $('userpanels');
		if(!userPanel) return;
		var userPanelFx = new Fx.Slide(userPanel).hide();    
		$('toggle').addEvent('click', function(e){
			e = new Event(e);
			userPanelFx.toggle();
			e.stop();
		});	
        userPanels.setStyles({'top':'0'});
		userPanel.setStyles({
			'position': 'fixed',
			'top': 0
		});
       
	    var elm      = userPanel.getElements('input');    
		var resetBtn = userPanel.getElement('input[type=reset]');
        var applyBtn = userPanel.getElement('input[type=submit]');
        
		if(resetBtn){
          	resetBtn.addEvent('click', function(){
                for (var i=0 ; i<elm.length ;i++) {
                    if(elm[i].checked == true){
                        Cookie.remove(elm[i].name,elm[i].value);
                    }
                }   
                window.location = window.location;        
          	});
		}
                        
        if(applyBtn){
       	    applyBtn.addEvent('click', function(){
           	     for (var i=0 ; i<elm.length ;i++) {
                    if(elm[i].checked == true){
                        Cookie.set(elm[i].name,elm[i].value);
                    }
                 }
                window.location = window.location;    
          	});
		} 
    },    
    
    changeVersion: function(theme,version){
        Cookie.set(theme+'_version',version);
        window.location = window.location;   
    },
    
    showSearch: function(itemid){
        var search  = $('mobileSearch');
        var display = search.getStyle('display');
        search.setStyle('display', display == 'block' ? 'none' : 'block');            
    } 
});

var JVUserTools;
		
window.addEvent('domready',function(){	
	JVUserTools = new JVUserTools();
	new JVSmoothScroll();
});

function gotourl(url){  
  window.location.href= url;   
}  