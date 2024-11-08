/*
Script: 	
	JVMenu - Multi-level Horizontal Menu.

License:
	Proprietary - JoomlaVi Club members only

Copyright:
	Copyright (C) JoomlaVi. All rights reserved.
*/

var JVMenu = new Class({

	options:{
		menuType: 'css',
		fxDuration: 350,
		fxTransition: Fx.Transitions.linear,
		fxMode: '',
		fxShowDelay: 250,
		fxHideDelay: 250,
		clickToOpen: true,
		marginLeft: 20
	},
	
	initialize: function(selectors, options){
		this.setOptions(options);
		var selectors = $$(selectors);
		if(!selectors.length) return;
		selectors.each(function(selector){			
			this.setup(selector);		
		}.bind(this));
	},	
	
	setup: function(selector){
		var that = this;
		var fxDefault = {};
		var fxTimer = null;
		var mnTimer = null;
		switch(that.options.fxMode){
			case 'none': 					
				that.options.fxDuration = 0;
				break;
			case 'width':
				fxDefault = {
					'width': 0				
				};
				break;			
			case 'height': 
				fxDefault = {
					'height': 0					
				};
				break;
			case 'opacity': 
				fxDefault = {
					'opacity': 0
				};	
				break;
			case 'widthopacity':
				fxDefault = {
					'width': 0,
					'opacity': 0
				};
				break;
			case 'heightopacity': 
				fxDefault = {
					'height': 0,
					'opacity': 0
				};
				break;				
			case 'widthheightopacity': 
				fxDefault = {
					'width': 0,
					'height': 0,
					'opacity': 0
				};	
				break;			
		}		
		switch(that.options.menuType){
			case 'css':				
				return;						
			case 'fade':				
				var liParentTags = selector.getElements('li.parent');				
				liParentTags.each(function(liParentTag){							
					var ulTag = liParentTag.getElement('ul');			
					if(ulTag){				
						var fxProperties = ulTag.getStyles('width', 'height', 'opacity');
						var fx = new Fx.Styles(ulTag, {					
							duration: that.options.fxDuration,
							transition: that.options.fxTransition,
							wait: false,
							onComplete: function(elm){
								if(elm.getStyle('height') == '0px' || elm.getStyle('width') == '0px' || elm.getStyle('opacity') == '0'){
									liParentTag.removeClass('hover');
								}
							}			
						}).set(fxDefault);
						fx.element.setStyle('overflow', 'hidden');						
						liParentTag.getFirst().addEvent(that.options.clickToOpen ? 'click': 'mouseenter', function(e){
							if(that.options.clickToOpen) new Event(e).stop();							
							fxTimer = setTimeout(function(){									
								if(this.getParent().getParent().getStyle('overflow') == 'hidden'){
									this.getParent().getParent().setStyle('overflow', 'visible');	
								}
								
								var elCoord = that.quickCoord(fx.element);
								if(elCoord.right + that.options.marginLeft > window.getWidth()){
									fx.element.setStyle('marginLeft', -elCoord.width + that.options.marginLeft);
								}
								
								fx.element.setStyle('overflow', 'hidden');
								this.getParent().addClass('hover');
								fx.stop().start(fxProperties);	
							}.bind(this), that.options.fxShowDelay);	
						});
						liParentTag.addEvent('mouseleave', function(){								
							fxTimer = setTimeout(function(){
								fx.element.setStyle('overflow', 'hidden');
								fx.stop().start(fxDefault).chain(function(){
									this.removeClass('hover');
								}.bind(this));								
							}.bind(this), that.options.fxHideDelay);
						});					
					}
				});
				var liTags = selector.getElements('li');
				var liChildTags = liTags.filter(function(item){return !item.hasClass('parent');});
				liChildTags.each(function(liChildTag){	
					liChildTag.addEvents({
						'mouseenter': function(){
							this.addClass('hover');
						},
						'mouseleave': function(){
							this.removeClass('hover');
						}
					});
				});					
				break;
			case 'fadedown':
				var liTags = selector.getChildren('li');
				liTags.each(function(liTag){							
					var ulTag = liTag.getElement('ul');			
					if(ulTag){						
						var fxDown = {
							'height': 0,
							'opacity': 0
						};
						var fxProperties = ulTag.getStyles('width', 'height', 'opacity');
						var fx = new Fx.Styles(ulTag, {					
							duration: that.options.fxDuration,
							transition: that.options.fxTransition,
							wait: false,
							onComplete: function(elm){
								if(elm.getStyle('height') == '0px' || elm.getStyle('width') == '0px' || elm.getStyle('opacity') == '0'){
									liTag.removeClass('hover');
								}
							}							
						}).set(fxDown);
						fx.element.setStyle('overflow', 'hidden');						
						liTag.getFirst().addEvent(that.options.clickToOpen ? 'click': 'mouseenter', function(e){
							if(that.options.clickToOpen) new Event(e).stop();
							fxTimer = setTimeout(function(){									
								if(this.getParent().getParent().getStyle('overflow') == 'hidden'){
									this.getParent().getParent().setStyle('overflow', 'visible');	
								}
								fx.element.setStyle('overflow', 'hidden');
								
								var elCoord = fx.element.getCoordinates();
								if(elCoord.right + that.options.marginLeft > window.getWidth()){
									fx.element.setStyle('marginLeft', -elCoord.width + that.options.marginLeft);
								}
								
								this.getParent().addClass('hover');
								fx.stop().start(fxProperties);	
							}.bind(this), that.options.fxShowDelay);	
						});					
						liTag.addEvent('mouseleave', function(){
							fxTimer = setTimeout(function(){
								fx.element.setStyle('overflow', 'hidden');
								fx.stop().start(fxDown);					
							}.bind(this), that.options.fxHideDelay);
						});					
					}
				});	
				liTags = selector.getElements('li li.parent');
				liTags.each(function(liTag){							
					var ulTag = liTag.getElement('ul');			
					if(ulTag){				
						var fxProperties = ulTag.getStyles('width', 'height', 'opacity');
						var fx = new Fx.Styles(ulTag, {					
							duration: that.options.fxDuration,
							transition: that.options.fxTransition,
							wait: false,
							onComplete: function(elm){
								if(elm.getStyle('height') == '0px' || elm.getStyle('width') == '0px' || elm.getStyle('opacity') == '0'){
									liTag.removeClass('hover');
								}
							}				
						}).set(fxDefault);
						fx.element.setStyle('overflow', 'hidden');						
						liTag.getFirst().addEvent(that.options.clickToOpen ? 'click': 'mouseenter', function(e){
							if(that.options.clickToOpen) new Event(e).stop();							
							fxTimer = setTimeout(function(){									
								if(this.getParent().getParent().getStyle('overflow') == 'hidden'){
									this.getParent().getParent().setStyle('overflow', 'visible');	
								}
								
								var elCoord = fx.element.getCoordinates();
								if(elCoord.right + that.options.marginLeft > window.getWidth()){
									fx.element.setStyle('marginLeft', -elCoord.width + that.options.marginLeft);
								}
								
								fx.element.setStyle('overflow', 'hidden');
								this.getParent().addClass('hover');
								fx.stop().start(fxProperties);	
							}.bind(this), that.options.fxShowDelay);	
						});
						liTag.addEvent('mouseleave', function(){								
							fxTimer = setTimeout(function(){
								fx.element.setStyle('overflow', 'hidden');
								fx.stop().start(fxDefault);				
							}.bind(this), that.options.fxHideDelay);
						});					
					}
				});
				liTags = selector.getElements('li li');
				var liChildTags = liTags.filter(function(item){return !item.hasClass('parent');});				
				liChildTags.each(function(liChildTag){	
					liChildTag.addEvents({
						'mouseenter': function(){
							this.addClass('hover');
						},
						'mouseleave': function(){
							this.removeClass('hover');
						}
					});
				});	
				break;	
			case 'dropline':					
				var liTags = selector.getChildren('li');
				var liTagActive = null;
				liTags.each(function(liTag){							
					if(liTag.hasClass('active')){
						liTagActive = liTag;
					}
					var ulTag = liTag.getElement('ul');			
					if(ulTag){	
						liTag.getFirst().addEvent(that.options.clickToOpen ? 'click': 'mouseenter', function(e){
							if(that.options.clickToOpen) new Event(e).stop();
							liTagActive.removeClass('active');	
							liTag.addClass('active');
						});					
						liTag.addEvent('mouseleave', function(){
							if(liTagActive && liTagActive == liTag){
								return;
							}
							liTag.removeClass('active');
							liTagActive.addClass('active');
						});					
					}
					else{
						liTag.getFirst().addEvent(that.options.clickToOpen ? 'click': 'mouseenter', function(e){
							liTagActive.removeClass('active');	
							liTag.addClass('active');
						});					
						liTag.addEvent('mouseleave', function(){
							liTag.removeClass('active');
							liTagActive.addClass('active');
						});	
					}
				});
				liTags = selector.getElements('li li.parent');
				liTags.each(function(liTag){							
					var ulTag = liTag.getElement('ul');			
					if(ulTag){				
						var fxProperties = ulTag.getStyles('width', 'height', 'opacity');
						var fx = new Fx.Styles(ulTag, {					
							duration: that.options.fxDuration,
							transition: that.options.fxTransition,
							wait: false,
							onComplete: function(elm){
								if(elm.getStyle('height') == '0px' || elm.getStyle('width') == '0px' || elm.getStyle('opacity') == '0'){
									liTag.removeClass('hover');
								}
							}					
						}).set(fxDefault);
						fx.element.setStyle('overflow', 'hidden');						
						liTag.getFirst().addEvent(that.options.clickToOpen ? 'click': 'mouseenter', function(e){
							if(that.options.clickToOpen) new Event(e).stop();							
							fxTimer = setTimeout(function(){									
								if(this.getParent().getParent().getStyle('overflow') == 'hidden'){
									this.getParent().getParent().setStyle('overflow', 'visible');	
								}
								fx.element.setStyle('overflow', 'hidden');
								
								var elCoord = that.quickCoord(fx.element);
								if(elCoord.right + that.options.marginLeft > window.getWidth()){
									fx.element.setStyle('marginLeft', -elCoord.width + that.options.marginLeft);
								}
								
								this.getParent().addClass('hover');
								fx.stop().start(fxProperties);	
							}.bind(this), that.options.fxShowDelay);	
						});
						liTag.addEvent('mouseleave', function(){								
							fxTimer = setTimeout(function(){
								fx.element.setStyle('overflow', 'hidden');
								fx.stop().start(fxDefault);				
							}.bind(this), that.options.fxHideDelay);
						});					
					}
				});
				liTags = selector.getElements('li li');
				var liChildTags = liTags.filter(function(item){return !item.hasClass('parent');});				
				liChildTags.each(function(liChildTag){	
					liChildTag.addEvents({
						'mouseenter': function(){
							this.addClass('hover');
						},
						'mouseleave': function(){
							this.removeClass('hover');
						}
					});
				});					
				break;					
			case 'dropdown':
				var liTags = selector.getChildren('li');				
				liTags.each(function(liTag){					
					var ulTag = liTag.getElement('ul');
					if(ulTag){
						liTag.addClass('dparent');
						
						var dd = new Element('div', {
							'class': 'dd'
						}).adopt(ulTag).injectInside(liTag);
						
						dd.getFirst().setStyles({
							'position': 'static',
							'top': 'auto',
							'left': 'auto'
						});	
						
						var fxProperties = dd.getStyles('width', 'height', 'opacity');
						
						var ddfx = new Fx.Styles(dd, {
							duration: that.options.fxDuration,
							transition: that.options.fxTransition,
							wait: false,
							onStart: function(elm){
								elm.setStyle('overflow', 'hidden');
							},
							onComplete: function(elm){
								elm.setStyle('overflow', 'visible');
								if(elm.getStyle('height') == '0px'){
									elm.getParent().removeClass('hover');
								}
							}
						}).set({
							'height': 0
						});
						
						dd.setStyle('overflow', 'hidden');
						
						var ulfx = new Fx.Styles(dd.getFirst(), {
							duration: that.options.fxDuration,
							transition: that.options.fxTransition,
							wait: false	
						}).set({
							'margin-top': -fxProperties.height.toInt()
						});
						
						liTag.isShow = false;
						liTag.mnTimer = null;
						
						liTag.getFirst().addEvent(that.options.clickToOpen ? 'click': 'mouseenter', function(e){
							if(that.options.clickToOpen) new Event(e).stop();
							
							if(liTag.isShow) return;
							$clear(liTag.mnTimer);
							
							liTag.mnTimer = setTimeout(function(){
								this.getParent().addClass('hover');
								
								ddfx.stop().start(fxProperties);
								ulfx.set({
									'opacity': 0,
									'margin-top': -fxProperties.height.toInt()
								});
								ulfx.stop().start({
									'opacity': 1,
									'margin-top': 0
								});
								
								liTag.isShow = true;
							}.bind(this), that.options.fxShowDelay);
						});
						liTag.addEvent('mouseleave', function(){
							$clear(liTag.mnTimer);
							liTag.mnTimer = setTimeout(function(){
								ulfx.stop().start({
									'opacity': 0,
									'margin-top': -fxProperties.height.toInt()
								});
								ddfx.stop().start({
									'height': 0
								});
								
								liTag.isShow = false;
							}.bind(this), that.options.fxHideDelay);									
						});																			
					}
				});				
				var liTagSubs = selector.getElements('li li.parent');				
				liTagSubs.each(function(liTag){
					var ulTag = liTag.getElement('ul');			
					if(ulTag){				
						var fxProperties = ulTag.getStyles('width', 'height', 'opacity');
						var fx = new Fx.Styles(ulTag, {					
							duration: that.options.fxDuration,
							transition: that.options.fxTransition,
							wait: false,
							onComplete: function(elm){
								if(elm.getStyle('height') == '0px' || elm.getStyle('width') == '0px' || elm.getStyle('opacity') == '0'){
									liTag.removeClass('hover');
								}
							}
						}).set(fxDefault);
						fx.element.setStyle('overflow', 'hidden');
						
						liTag.fxTimer = null;
						liTag.getFirst().addEvent(that.options.clickToOpen ? 'click': 'mouseenter', function(e){
							if(that.options.clickToOpen) new Event(e).stop();
							
							$clear(liTag.fxTimer);
								
							liTag.fxTimer = setTimeout(function(){
								
								if(this.getParent().getParent().getStyle('overflow') == 'hidden'){
									this.getParent().getParent().setStyle('overflow', 'visible');
								}
								
								fx.element.setStyle('overflow', 'hidden');
								
								var elCoord = that.quickCoord(fx.element);
								if(elCoord.right + that.options.marginLeft > window.getWidth()){
									fx.element.setStyle('marginLeft', -elCoord.width + that.options.marginLeft);
								}
								
								this.getParent().addClass('hover');
								fx.stop().start(fxProperties);
							}.bind(this), that.options.fxShowDelay);	
						});
						liTag.addEvent('mouseleave', function(){
						
							$clear(liTag.fxTimer);
							
							liTag.fxTimer = setTimeout(function(){
								fx.element.setStyle('overflow', 'hidden');
								fx.stop().start(fxDefault);				
							}.bind(this), that.options.fxHideDelay);
						});					
					}
				});
				liTags = selector.getElements('li li');
				var liChildTags = liTags.filter(function(item){return !item.hasClass('parent');});				
				liChildTags.each(function(liChildTag){	
					liChildTag.addEvents({
						'mouseenter': function(){
							this.addClass('hover');
						},
						'mouseleave': function(){
							this.removeClass('hover');
						}
					});
				});			
				break;					
		}		
	},
	quickCoord: function(elem){
		var old = {};
		var open = {'overflow': 'hidden', 'position': 'absolute', 'visibility': 'hidden', 'display': 'block', 'width': '', 'height': ''};
		
		for(var name in open){
			old[name] = elem.style[name];
			elem.style[name] = open[name];
		}

		var result = elem.getCoordinates();

		for (name in open) {
			elem.style[name] = old[name];
		}
		
		return result;
	}
});
JVMenu.implement(new Options);
JVMenu.implement(new Chain);

/*
Script: 	
	JVVMenu - Multi-level Vertical Menu.

License:
	Proprietary - JoomlaVi Club members only

Copyright:
	Copyright (C) JoomlaVi. All rights reserved.
*/

var JVVMenu = new Class({

	options:{
		menuType: 'css',
		fxDuration: 350,
		fxTransition: Fx.Transitions.linear,
		fxMode: '',
		fxShowDelay: 250,
		fxHideDelay: 250,
		clickToOpen: true,
		marginLeft: 20
	},
	
	initialize: function(selectors, options){
		this.setOptions(options);
		var selectors = $$(selectors);
		if(!selectors.length) return;
		selectors.each(function(selector){			
			this.setup(selector);		
		}.bind(this));
	},	
	
	setup: function(selector){
		var that = this;
		var fxTimer = null;
		var fxDefault = {};
		switch(that.options.fxMode){
			case 'none': 					
				that.options.fxDuration = 0;
				break;
			case 'width':
				fxDefault = {
					'width': 0				
				};
				break;			
			case 'height': 
				fxDefault = {
					'height': 0					
				};
				break;
			case 'opacity': 
				fxDefault = {
					'opacity': 0
				};	
				break;
			case 'widthopacity':
				fxDefault = {
					'width': 0,
					'opacity': 0
				};
				break;
			case 'heightopacity': 
				fxDefault = {
					'height': 0,
					'opacity': 0
				};
				break;				
			case 'widthheightopacity': 
				fxDefault = {
					'width': 0,
					'height': 0,
					'opacity': 0
				};	
				break;			
		}
		switch(that.options.menuType){
			case 'css':				
				return;						
			case 'fade':
				var liParentTags = selector.getElements('li.parent');				
				liParentTags.each(function(liParentTag){							
					var ulTag = liParentTag.getElement('ul');			
					if(ulTag){				
						var fxProperties = ulTag.getStyles('width', 'height', 'opacity');
						var fx = new Fx.Styles(ulTag, {					
							duration: that.options.fxDuration,
							transition: that.options.fxTransition,
							wait: false					
						}).set(fxDefault);
						fx.element.setStyle('overflow', 'hidden');						
						liParentTag.getFirst().addEvent(that.options.clickToOpen ? 'click': 'mouseenter', function(e){
							if(that.options.clickToOpen) new Event(e).stop();							
							fxTimer = setTimeout(function(){									
								if(this.getParent().getParent().getStyle('overflow') == 'hidden'){
									this.getParent().getParent().setStyle('overflow', 'visible');	
								}
								fx.element.setStyle('overflow', 'hidden');
								
								var elCoord = fx.element.getCoordinates();
								if(elCoord.right + that.options.marginLeft > window.getWidth()){
									fx.element.setStyle('marginLeft', -elCoord.width + that.options.marginLeft);
								}
								
								this.getParent().addClass('hover');
								fx.stop().start(fxProperties);	
							}.bind(this), that.options.fxShowDelay);	
						});
						liParentTag.addEvent('mouseleave', function(){								
							fxTimer = setTimeout(function(){
								fx.element.setStyle('overflow', 'hidden');
								fx.stop().start(fxDefault).chain(function(){
									this.removeClass('hover');
								}.bind(this));								
							}.bind(this), that.options.fxHideDelay);
						});					
					}
				});
				var liTags = selector.getElements('li');
				var liChildTags = liTags.filter(function(item){return !item.hasClass('parent');});				
				liChildTags.each(function(liChildTag){	
					liChildTag.addEvents({
						'mouseenter': function(){
							this.addClass('hover');
						},
						'mouseleave': function(){
							this.removeClass('hover');
						}
					});
				});	
				break;
			case 'faderight':
				var liTags = selector.getChildren('li');
				liTags.each(function(liTag){							
					var ulTag = liTag.getElement('ul');			
					if(ulTag){						
						var fxRight = {
							'width': 0,
							'opacity': 0
						};
						var fxProperties = ulTag.getStyles('width', 'height', 'opacity');
						var fx = new Fx.Styles(ulTag, {					
							duration: that.options.fxDuration,
							transition: that.options.fxTransition,
							wait: false							
						}).set(fxRight);
						fx.element.setStyle('overflow', 'hidden');						
						liTag.getFirst().addEvent(that.options.clickToOpen ? 'click': 'mouseenter', function(e){
							if(that.options.clickToOpen) new Event(e).stop();							
							fxTimer = setTimeout(function(){									
								if(this.getParent().getParent().getStyle('overflow') == 'hidden'){
									this.getParent().getParent().setStyle('overflow', 'visible');	
								}
								fx.element.setStyle('overflow', 'hidden');
								
								var elCoord = that.quickCoord(fx.element);
								if(elCoord.right + that.options.marginLeft > window.getWidth()){
									fx.element.setStyle('marginLeft', -elCoord.width + that.options.marginLeft);
								}
								
								this.getParent().addClass('hover');
								
								fx.stop().start(fxProperties);	
							}.bind(this), that.options.fxShowDelay);	
						});
						liTag.addEvent('mouseleave', function(){								
							fxTimer = setTimeout(function(){
								fx.element.setStyle('overflow', 'hidden');
								fx.stop().start(fxRight).chain(function(){
									this.removeClass('hover');
								}.bind(this));								
							}.bind(this), that.options.fxHideDelay);
						});					
					}
				});	
				liTags = selector.getElements('li li.parent');
				liTags.each(function(liTag){							
					var ulTag = liTag.getElement('ul');			
					if(ulTag){				
						var fxProperties = ulTag.getStyles('width', 'height', 'opacity');
						var fx = new Fx.Styles(ulTag, {					
							duration: that.options.fxDuration,
							transition: that.options.fxTransition,
							wait: false,
							onComplete: function(elm){
								if(elm.getStyle('width') == '0px'){
									elm.setStyle('marginLeft', '');
								}
							}
						}).set(fxDefault);
						fx.element.setStyle('overflow', 'hidden');						
						liTag.getFirst().addEvent(that.options.clickToOpen ? 'click': 'mouseenter', function(e){
							if(that.options.clickToOpen) new Event(e).stop();							
							fxTimer = setTimeout(function(){
								
								if(this.getParent().getParent().getStyle('overflow') == 'hidden'){
									this.getParent().getParent().setStyle('overflow', 'visible');	
								}
								fx.element.setStyle('overflow', 'hidden');

								var elCoord = that.quickCoord(fx.element);
								if(elCoord.right + that.options.marginLeft > window.getWidth()){
									fx.element.setStyle('marginLeft', -elCoord.width + that.options.marginLeft);
								}
								
								this.getParent().addClass('hover');
								fx.stop().start(fxProperties);
								
							}.bind(this), that.options.fxShowDelay);	
						});
						liTag.addEvent('mouseleave', function(){						
							fxTimer = setTimeout(function(){
								fx.element.setStyle('overflow', 'hidden');
								fx.stop().start(fxDefault).chain(function(){
									this.removeClass('hover');
								}.bind(this));								
							}.bind(this), that.options.fxHideDelay);
						});					
					}
				});
				liTags = selector.getElements('li li');
				var liChildTags = liTags.filter(function(item){return !item.hasClass('parent');});				
				liChildTags.each(function(liChildTag){	
					liChildTag.addEvents({
						'mouseenter': function(){
							this.addClass('hover');
						},
						'mouseleave': function(){
							this.removeClass('hover');
						}
					});
				});		
				break;	
		}		
	},
	quickCoord: function(elem){
		var old = {};
		var open = {'overflow': 'hidden', 'position': 'absolute', 'visibility': 'hidden', 'display': 'block', 'width': '', 'height': ''};
		
		for(var name in open){
			old[name] = elem.style[name];
			elem.style[name] = open[name];
		}

		var result = elem.getCoordinates();

		for (name in open) {
			elem.style[name] = old[name];
		}
		
		return result;
	}
});
JVVMenu.implement(new Options);
JVVMenu.implement(new Chain);


/*
Script: 	
	JVAMenu - Accordion Menu.

License:
	Proprietary - JoomlaVi Club members only

Copyright:
	Copyright (C) JoomlaVi. All rights reserved.
*/

var JVAMenu = new Class({

	options:{		
		fxDuration: 350,
		fxTransition: Fx.Transitions.linear,
		fxMode: 'accordion',
		togglers: 'li.parent',
		elements: 'ul',	
		alwaysHide: false,
		clickToOpen: true
	},
	
	initialize: function(selectors, options){
		this.setOptions(options);
		var selectors = $$(selectors);
		if(!selectors.length) return;
		selectors.each(function(selector){			
			this.setup(selector);		
		}.bind(this));
	},	
	
	setup: function(selector){
		var that = this;
		switch(that.options.fxMode){			
			case 'slide':
				selector.getElements(that.options.togglers).each(function(toggler, index){
					var ulTag = toggler.getElement(that.options.elements);
					var fx = new Fx.Slide(ulTag, {
						transition: that.options.fxTransition,
						duration: that.options.fxDuration
					});
					if(!toggler.hasClass('active')){
						fx.hide();
					}					
					toggler.addEvent(that.options.clickToOpen ? 'click' : 'mouseenter', function(){
						fx.toggle().chain(function(){
							this.open ? toggler.addClass('active') : toggler.removeClass('active');
						});
					});
				});	
				break;	
			case 'accordion':		
			default:								
				$extend(this.options, {
					onActive: function(t, e){
						t.addClass('active');
					},
					onBackground: function(t, e){
						t.removeClass('active');
					}
				});
				new Fx.Accordion(selector.getElements(that.options.togglers), selector.getElements(that.options.elements), that.options);
		}	
	}
});
JVAMenu.implement(new Options);