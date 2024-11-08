function loadSWF(url, id, width, height){
         if (url !="") {
		 var flashvars = {};
	         var params = {allowfullscreen:"true",wmode:"transparent"};
	         var attributes = {};  
	           swfobject.embedSWF(url, id+"-youtubevideo", width , height , "6", false, flashvars, params, attributes);
	         }
}
 
function loadSWFX(url, id, width, height, autostart){
		autostart = typeof(autostart) != 'undefined' ? autostart : false;
    jwplayer(id+'-youtubevideo').setup({
    'flashplayer': mod_youtubeplaylist,
    'file': url,
    'autostart': autostart ,	
    'controlbar': 'bottom',
    'width': width,
    'height': height
	});
}
 
function loadSWFXHD(url, id, width, height, autostart){
		autostart = typeof(autostart) != 'undefined' ? autostart : false;
    jwplayer(id+'-youtubevideo').setup({
    'flashplayer': mod_youtubeplaylist,
    'file': url,
    'autostart': autostart ,	
    'controlbar': 'bottom',
    'width': width,
    'height': height,
	'plugins': {
	   'hd-1': {}
		}	
	});
}