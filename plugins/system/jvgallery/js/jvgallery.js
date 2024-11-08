/**
 * @class: JVTabs
 * @description: Display contents in tabs 
 * @version: 1.0 
 */
var JVTabs = new Class({

	options: {
		width: '100%',
		tabsHandler: 'jv-tabs-handler',
		tabsContainer: 'jv-tabs-container',		
		currentTabsHandlerClass: 'jv-tabs-handler-selected',		
		currentTabsContentClass: 'jv-tabs-content-selected',		
		currentIndex: 0,				
		autoRun: 0,	
		ajax: 0,
		ajaxMethod: 'get',
		ajaxUrl: '',
		direction: 1,
		forceWaiting: 0,
		fx: 'showHide',
		transition: Fx.Transitions.Expo.easeInOut,				
		duration: 1000,		
		timer: null,
		tabTimer: 5000,
		container: null,
		handlers: null,
		contents: null		
	},
	
	initialize: function(selector, options){
		this.setOptions(options);
		this.initTabs(selector);
	},
	
	initTabs: function(selector){
		var that = this;
		var selector = $(selector);
		if(!selector) return;
		selector.setStyles({
			'width': that.options.width
		});	
		that.options.handlers = selector.getElement('.' + that.options.tabsHandler).getChildren();	
		if(!that.options.handlers.length) return;
		that.options.currentIndex = Math.min(that.options.currentIndex, that.options.handlers.length - 1);
		that.options.container = selector.getElement('.' + that.options.tabsContainer);
		that.fx = new Fx.Styles(that.options.container, {
			duration: that.options.duration,
			transition: that.options.transition,
			link: 'ignore'
		});
		
		that.options.contents = that.options.container.getChildren();						
		if(that.options.fx == 'slideWidth'){
			that.options.contents.each(function(content, index){
				content.setStyle('position', 'absolute');
				content.setStyle('left', -1 * content.getSize().size.x);			
			});		
		}
		else if(that.options.fx == 'slideHeight'){
			that.options.contents.each(function(content, index){
				content.setStyle('position', 'absolute');
				content.setStyle('top', -1 * content.getSize().size.y);			
			});		
		}				
		else if(that.options.fx == 'fade'){
			that.options.contents.each(function(content, index){
				content.setStyles({
					'position': 'absolute',
					'top': 0,
					'opacity': 0
				});			
			});	
		}
		else{
			that.options.fx = 'showHide';
			that.options.contents.each(function(content, index){
				content.setStyles({
					'position': 'absolute',
					'top': 0,
					'display': 'none'
				});			
			});	
		}
		that.options.handlers.each(function(handler, index){
			if(handler.hasClass(that.options.currentTabsHandlerClass)){
				that.options.currentIndex = index;
			}			
			handler.removeEvents('click').addEvent('click', function(e){		
				if(e) new Event(e).stop();						
				if(!that.options.forceWaiting){					
					if(that.options.ajax == 1 && !this.ajaxcalled){
						if(this.req) this.req.cancel();
						this.req = new Ajax(that.options.ajaxUrl + this.getElement('a').className, {
							method: that.options.ajaxMethod,
							onRequest: function(){
								if(!handler.getElement('.loader')){
									new Element('img', {'class': 'loader', src: 'plugins/system/jvtabs/images/loader.gif'}).inject(handler.getElement('a'));								
								}
								handler.getElement('.loader').removeClass('hidden');
							},							
							onComplete: function(response){
								handler.getElement('.loader').addClass('hidden');
								that.options.contents[index].setHTML(response);
								handler.ajaxcalled = true;
								handler.fireEvent('click');
							}
						}).request();
						return;
					}	
					if(that.options.autoRun == 1){
						$clear(that.options.timer);
						that.options.timer = that[that.options.fx].periodical(that.options.tabTimer, that, null);
					}
					that[that.options.fx](index);		
				}
			});
		});
		if(that.options.ajax == 1){
			that.options.autoRun = 0;
			that.options.handlers[that.options.currentIndex].fireEvent('click');
		}
		else{
			that[that.options.fx](that.options.currentIndex);
		}
		if(that.options.autoRun == 1){
			that.options.timer = that[that.options.fx].periodical(that.options.tabTimer, that, null);
		}			
	},
	
	slideWidth: function(index){
		var that = this;		
		var currentContent = that.options.contents[that.options.currentIndex];		
		var currentHandler = that.options.handlers[that.options.currentIndex];
		if($defined(index)){
			if(that.options.currentIndex != index){
				if(that.options.currentIndex > index){
					that.options.direction = 0;				
				}
				else{
					that.options.direction = 1;
				}
				that.options.currentIndex = index;
			}
		}
		else{
			that.findTab();
		}
		var newContent = that.options.contents[that.options.currentIndex];
		if(that.options.direction == 0){
			var currentX = that.options.container.getSize().size.x;
			var newX = (-1 * newContent.getSize().size.x);
		}
		else{
			var currentX = (-1 * that.options.container.getSize().size.x);
			var newX = newContent.getSize().size.x;
		}
		var newHandler = that.options.handlers[that.options.currentIndex];
		newHandler.addClass(that.options.currentTabsHandlerClass);
		var contentShow = new Fx.Styles(newContent, {
			duration: that.options.duration,
			transition: that.options.transition,
			link: 'ignore',
			onStart: function(){
				that.options.forceWaiting = true;
			},
			onComplete: function(){
				that.options.forceWaiting = false;
			}
		});
		contentShow.start({
			'left': [0],
			'opacity': [0, 1]
		});
		that.fx.start({
			'height': [currentContent.getCoordinates().height, newContent.getCoordinates().height]
		});
		newContent.addClass(that.options.currentTabsContentClass);		
		if(currentContent != newContent){		
			var contentHide = new Fx.Styles(currentContent, {
				duration: that.options.duration,
				transition: that.options.transition,
				link: 'ignore'
			});
			currentHandler.removeClass(that.options.currentTabsHandlerClass);			
			contentHide.start({
				'left': [currentX],
				'opacity': [1, 0]
			});
			currentContent.removeClass(that.options.currentTabsContentClass);
		}
	},
	
	slideHeight: function(index){
		var that = this;		
		var currentContent = that.options.contents[that.options.currentIndex];		
		var currentHandler = that.options.handlers[that.options.currentIndex];
		if($defined(index)){
			if(that.options.currentIndex != index){
				if(that.options.currentIndex > index){
					that.options.direction = 0;				
				}
				else{
					that.options.direction = 1;
				}
				that.options.currentIndex = index;
			}
		}
		else{
			that.findTab();
		}
		var newContent = that.options.contents[that.options.currentIndex];
		if(that.options.direction == 0){
			var currentY = that.options.container.getSize().size.y;
			var newY = (-1 * newContent.getSize().size.y);
		}
		else{
			var currentY = (-1 * that.options.container.getSize().size.y);
			var newY = newContent.getSize().size.y;
		}
		var newHandler = that.options.handlers[that.options.currentIndex];
		newHandler.addClass(that.options.currentTabsHandlerClass);
		var contentShow = new Fx.Styles(newContent, {
			duration: that.options.duration,
			transition: that.options.transition,
			link: 'ignore',
			onStart: function(){
				that.options.forceWaiting = true;
			},
			onComplete: function(){
				that.options.forceWaiting = false;
			}
		});		
		contentShow.start({
			'top': [0],
			'opacity': [0, 1]
		});
		that.fx.start({
			'height': [currentContent.getCoordinates().height, newContent.getCoordinates().height]
		});
		newContent.addClass(that.options.currentTabsContentClass);		
		if(currentContent != newContent){		
			var contentHide = new Fx.Styles(currentContent, {
				duration: that.options.duration,
				transition: that.options.transition,
				link: 'ignore'
			});
			currentHandler.removeClass(that.options.currentTabsHandlerClass);			
			contentHide.start({
				'top': [0, -currentY],
				'opacity': [1, 0]
			});
			currentContent.removeClass(that.options.currentTabsContentClass);
		}
	},	
	
	fade: function(index){
		var that = this;		
		var currentContent = that.options.contents[that.options.currentIndex];		
		var currentHandler = that.options.handlers[that.options.currentIndex];
		if($defined(index)){
			if(that.options.currentIndex != index){				
				that.options.currentIndex = index;
			}
		}
		else{
			that.findTab();
		}
		var newContent = that.options.contents[that.options.currentIndex];		
		var newHandler = that.options.handlers[that.options.currentIndex];
		newHandler.addClass(that.options.currentTabsHandlerClass);
		var contentShow = new Fx.Styles(newContent, {
			duration: that.options.duration,
			transition: that.options.transition,
			link: 'ignore',
			onStart: function(){
				that.options.forceWaiting = true;
			},
			onComplete: function(){
				that.options.forceWaiting = false;
			}
		});		
		contentShow.start({
			'opacity': [0, 1]
		});
		that.fx.start({
			'height': [currentContent.getCoordinates().height, newContent.getCoordinates().height]
		});
		newContent.addClass(that.options.currentTabsContentClass);		
		if(currentContent != newContent){		
			var contentHide = new Fx.Styles(currentContent, {
				duration: that.options.duration,
				transition: that.options.transition,
				link: 'ignore'
			});
			currentHandler.removeClass(that.options.currentTabsHandlerClass);			
			contentHide.start({
				'opacity': [1, 0]
			});
			currentContent.removeClass(that.options.currentTabsContentClass);
		}
	},
	
	showHide: function(index){
		var that = this;		
		var currentContent = that.options.contents[that.options.currentIndex];		
		var currentHandler = that.options.handlers[that.options.currentIndex];
		if($defined(index)){
			if(that.options.currentIndex != index){				
				that.options.currentIndex = index;
			}
		}
		else{
			that.findTab();
		}
		var newContent = that.options.contents[that.options.currentIndex];		
		var newHandler = that.options.handlers[that.options.currentIndex];
		newHandler.addClass(that.options.currentTabsHandlerClass);
		newContent.setStyle('display', '');
		that.fx.start({
			'height': [currentContent.getCoordinates().height, newContent.getCoordinates().height]
		});
		newContent.addClass(that.options.currentTabsContentClass);				
		if(currentContent != newContent){	
			currentHandler.removeClass(that.options.currentTabsHandlerClass);			
			currentContent.setStyle('display', 'none');
			currentContent.removeClass(that.options.currentTabsContentClass);
		}
	},
	
	findTab: function(){
		var that = this; 
		var len = that.options.contents.length;
		if(that.options.direction == 1){
			if(that.options.currentIndex < len - 1){
				that.options.currentIndex++;
			}
			else{
				that.options.currentIndex = 0;
			}
		}
		else{
			if(that.options.currentIndex > 0){
				that.options.currentIndex--;
			}
			else{
				that.options.currentIndex = len - 1;
			}
		}
		
	}
});
JVTabs.implement(new Events, new Options);