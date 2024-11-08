tblobj.VERSION = 1.0;
tblobj.cur_row=1;
tblobj.cur_thu="thu2";
tblobj.sodong=9;
tblobj.num_trs=7;
tblobj.socot1=39;
tblobj.socot2=17;
tblobj.scrwidth=500;//500
tblobj.tablename=null;
/*****
*   writen by Truong Thai Son, thaisontruong@yahoo.com,
*****/
function tblobj(ten_bang,width) {
	tablename=ten_bang;
	this.scrwidth=width;
	if(this.scrwidth==800) {
		this.socot1=39;
		this.socot2=17;
	}
	else{
		this.socot1=69;
		this.socot2=20;
	}
    //this.make_tbl();
}

/*****
*   make_map
*****/
tblobj.prototype.make_tbl = function() {
	     

}
tblobj.prototype.get_cur_row =  function(varrow) {
	this.cur_row=varrow.getAttribute('rowIndex');
	var cur_row_id=varrow.getAttribute('id');
	this.cur_thu="thu"+cur_row_id.charAt(0);
}
tblobj.prototype.get_current_row =  function(element, evt) {
	this.cur_row=element.getAttribute('rowIndex');
	var cur_row_id=element.getAttribute('id');
	this.cur_thu="thu"+cur_row_id.charAt(0);
}
tblobj.prototype.SON =  function(tael,evt) {
    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode :
        ((evt.which) ? evt.which : evt.keyCode);
    t=tael;
    var noidung = t.value.split('\n');
	var sodongthem=0;
    for (i=0;i<noidung.length;i++){
    	dong=noidung[i];
    	sodongthem+=Math.floor(dong.length/t.cols);
    }
    sodongthem+=noidung.length;
    t.rows=sodongthem;
}
//--------------------------------------------------
tblobj.prototype.addEvent =  function(elementObject, eventName, functionObject) {
	if(document.addEventListener)
		elementObject.addEventListener(eventName,
			function (evt) {
				functionObject(elementObject, evt)
				}, false);
	else
		if(document.attachEvent)
			elementObject.attachEvent("on" + eventName,
			function () {
			functionObject(elementObject);
			}
			)

}
//----------------------------------------------------
tblobj.prototype.setSukien =  function(dongthu) {
	var rowCollection=tablename.getElementsByTagName("tr");
	this.addEvent(rowCollection[dongthu],"mousedown",this.get_current_row);
}
//----------------------------------------------------
tblobj.prototype.InsertRow =  function(where) {
	var thuCollection=tablename.getElementsByTagName("td");
	var num_td=thuCollection.length;
	var rowCollection=tablename.getElementsByTagName("tr");
	var i=0;
	var j=2;
	while(i<num_td){
		var temp=thuCollection[i].getAttribute('id');
		if (temp==this.cur_thu){
			j=i;
		}
		i++;
	}  


	sodongspan=thuCollection[j].getAttribute('rowSpan')+1;
	var dongmoi=this.cur_row+1;
	if(where=='b')  var vitrichen = this.cur_row;
	else  var vitrichen = this.cur_row+1;
	if(where=='b'){
		var temp=rowCollection[vitrichen].getElementsByTagName("td");
		if (temp[0].getAttribute('id')==this.cur_thu)
			var isfirstrow=1;
		else
			var isfirstrow=0;
		if(isfirstrow==1){
			var rownew = tablename.insertRow(vitrichen);
			this.sodong+=1;
			var rownewid=this.cur_thu.charAt(3)+"-"+this.sodong;
			rownew.setAttribute('id',rownewid);
			var cell0 = rownew.insertCell(0);
			cell0.setAttribute('rowSpan',sodongspan);
			cell0.setAttribute('id',this.cur_thu);
			strtext=rowCollection[this.cur_row+1].cells[0].getAttribute('innerText');
			cell0.setAttribute('innerText',strtext);
			cell0.setAttribute('align','center');
			cell0.setAttribute('className','clsthu');
			var cell1 = rownew.insertCell(1);
	   	    var varta1=document.createElement('textarea');
    	    varta1.setAttribute('value',' ');
			varta1.setAttribute('cols',this.socot1);
			varta1.setAttribute('className','SONtextarea');
			this.num_trs=this.num_trs+1;
			var tenta="var"+this.cur_thu.charAt(3)+"-1-"+this.num_trs;
			varta1.setAttribute('name',tenta);
			this.addEvent(varta1,"keyup",this.SON);  
			cell1.appendChild(varta1);
			varta1.focus();
			this.cur_row=vitrichen;
			cell1.setAttribute('className','tdinitrow');  
      		var cell2 = rownew.insertCell(2);
			var varta2=document.createElement('textarea');
			varta2.setAttribute('value',' ');
			varta2.setAttribute('cols',this.socot2);
			varta2.setAttribute('className','SONtextarea');
			var tenta="var"+this.cur_thu.charAt(3)+"-2-"+this.num_trs;
			varta2.setAttribute('name',tenta);
			this.addEvent(varta2,"keyup",this.SON);
			cell2.appendChild(varta2);
			cell2.setAttribute('className','tdinitrow');   
  			tablename.deleteRow(vitrichen+1);
			var row = tablename.insertRow(vitrichen+1);
			this.sodong+=1;
			rownewid=this.cur_thu.charAt(3)+"-"+this.sodong;
			row.setAttribute('id',rownewid);
			var cell1 = row.insertCell(0);
			var varta1=document.createElement('textarea');
			varta1.setAttribute('value',' ');
			varta1.setAttribute('cols',this.socot1);
			varta1.setAttribute('className','SONtextarea');
			this.num_trs=this.num_trs+1;
			var tenta="var"+this.cur_thu.charAt(3)+"-1-"+this.num_trs;
			varta1.setAttribute('name',tenta);
			this.addEvent(varta1,"keyup",this.SON);
			cell1.appendChild(varta1);
			cell1.setAttribute('className','tdnewrow');
  
			var cell2 = row.insertCell(1);
			var varta2=document.createElement('textarea');
			varta2.setAttribute('value',' ');
			varta2.setAttribute('cols',this.socot2); 
			varta2.setAttribute('className','SONtextarea');
			var tenta="var"+this.cur_thu.charAt(3)+"-2-"+this.num_trs;
			varta2.setAttribute('name',tenta);
			this.addEvent(varta2,"keyup",this.SON);
			cell2.appendChild(varta2);

			cell2.setAttribute('className','tdnewrow');  
			this.setSukien(vitrichen);
			this.setSukien(vitrichen+1);
		}
		else{
//-------------
			sodongspan=thuCollection[j].getAttribute('rowSpan')+1;
			thuCollection[j].setAttribute('rowSpan',sodongspan)
			//-------------
			var row = tablename.insertRow(vitrichen);
			this.sodong+=1;
			var rownewid=this.cur_thu.charAt(3)+"-"+this.sodong;
			row.setAttribute('id',rownewid);
			var cell1 = row.insertCell(0);
			var varta1=document.createElement('textarea');
			varta1.setAttribute('value',' ');
			varta1.setAttribute('cols',this.socot1);  
			varta1.setAttribute('className','SONtextarea');
			this.num_trs=this.num_trs+1;
			var tenta="var"+this.cur_thu.charAt(3)+"-1-"+this.num_trs;
			varta1.setAttribute('name',tenta);
			this.addEvent(varta1,"keyup",this.SON);
			cell1.appendChild(varta1);
			varta1.focus();
			this.cur_row=vitrichen;	
			cell1.setAttribute('className','tdnewrow');
	    	var cell2 = row.insertCell(1);
			var varta2=document.createElement('textarea');
			varta2.setAttribute('value',' ');
			varta2.setAttribute('cols',this.socot2);  
			varta2.setAttribute('className','SONtextarea');
			var tenta="var"+this.cur_thu.charAt(3)+"-2-"+this.num_trs;
			varta2.setAttribute('name',tenta);
			this.addEvent(varta2,"keyup",this.SON);
			cell2.appendChild(varta2);
			cell2.setAttribute('className','tdnewrow');  
			this.setSukien(vitrichen);
		}
		}// if chen b
		else {
			sodongspan=thuCollection[j].getAttribute('rowSpan')+1;
			thuCollection[j].setAttribute('rowSpan',sodongspan)
			//-------------
			var row = tablename.insertRow(vitrichen);
			this.sodong+=1;
			var rownewid=this.cur_thu.charAt(3)+"-"+this.sodong;
			row.setAttribute('id',rownewid);
			var cell1 = row.insertCell(0);
			var varta1=document.createElement('textarea');
			varta1.setAttribute('value',' ');
			varta1.setAttribute('cols',this.socot1);  
			varta1.setAttribute('className','SONtextarea');
			this.num_trs=this.num_trs+1;
			var tenta="var"+this.cur_thu.charAt(3)+"-1-"+this.num_trs;
			varta1.setAttribute('name',tenta);
			this.addEvent(varta1,"keyup",this.SON);
			cell1.appendChild(varta1);
			varta1.focus();
		    this.cur_row=vitrichen;	
			cell1.setAttribute('className','tdnewrow');
            var cell2 = row.insertCell(1);
			var varta2=document.createElement('textarea');
			varta2.setAttribute('value',' ');
			varta2.setAttribute('cols',this.socot2);  
			varta2.setAttribute('className','SONtextarea');
			var tenta="var"+this.cur_thu.charAt(3)+"-2-"+this.num_trs;
			varta2.setAttribute('name',tenta);
			this.addEvent(varta2,"keyup",this.SON);
			cell2.appendChild(varta2);
			cell2.setAttribute('className','tdnewrow');  
			
			//append by janhuufu
			var cell3 = row.insertCell(2);
			var varta3=document.createElement('textarea');
			varta3.setAttribute('value',' ');
			varta3.setAttribute('cols',this.socot2);  
			varta3.setAttribute('className','SONtextarea');
			var tenta="var"+this.cur_thu.charAt(3)+"-3-"+this.num_trs;
			varta3.setAttribute('name',tenta);
			this.addEvent(varta3,"keyup",this.SON);
			cell3.appendChild(varta3);
			cell3.setAttribute('className','tdnewrow');  
			
			var cell4 = row.insertCell(3);
			var varta4=document.createElement('textarea');
			varta4.setAttribute('value',' ');
			varta4.setAttribute('cols',(this.socot2+1));  
			varta4.setAttribute('className','SONtextarea');
			var tenta="var"+this.cur_thu.charAt(3)+"-4-"+this.num_trs;
			varta4.setAttribute('name',tenta);
			this.addEvent(varta4,"keyup",this.SON);
			cell4.appendChild(varta4);
			cell4.setAttribute('className','tdnewrow');  



			
			
			this.setSukien(vitrichen);
		}
	}
	//----------------------------------------------------
tblobj.prototype.deleteRow =  function(where) {
	var vitrixoa;
	if(where=='del'){
		vitrixoa=this.cur_row;
	}
	if(where=='backspace'){
		vitrixoa=this.cur_row;
	}
	//-------------
	thuCollection=tablename.getElementsByTagName("td");
	var num_td=thuCollection.length;
	var i=0;
	var j=2;
	while(i<num_td)	{
		var temp=thuCollection[i].getAttribute('id');
		if (temp==this.cur_thu){
			j=i;
		}
		i++;
	}  
	sodongtrongthu=thuCollection[j].getAttribute('rowSpan');
	var rowCollection=tablename.getElementsByTagName("tr");
	var tdCollection=rowCollection[vitrixoa].getElementsByTagName("td");
	var noidung=tdCollection[0].getAttribute('innerText');
	//------------	
	//if(sodongtrongthu>1 && noidung=="")
	if(sodongtrongthu > 1)
	{
	var rowCollection=tablename.getElementsByTagName("tr");	
	var temp=rowCollection[vitrixoa].getElementsByTagName("td");
	//alert(temp[0].getAttribute('id'));
	if (temp[0].getAttribute('id')==this.cur_thu)
	var isfirstrow=1;
	else
	var isfirstrow=0;
	if(isfirstrow==1)
	{
	alert("Chi xoa duoc tu dong thu 2 cua mot ngay trong tuan");
	}
	else
	{
	span=thuCollection[j].getAttribute('rowSpan')-1;
	thuCollection[j].setAttribute('rowSpan',span);
	tablename.deleteRow(vitrixoa);
	}
	} //if >1
}
//-------------------------------------------------------
tblobj.prototype.resizeta =  function() {
	var taCollect=tablename.getElementsByTagName('textarea');
	
	for(var i=0;i<taCollect.length;i++)	{
		sodong=0;
		var ta=taCollect[i];
		cotso=ta.name.charAt(5);
		if(cotso==1) ta.setAttribute('cols',this.socot1);
		if(cotso==2) ta.setAttribute('cols',this.socot2);
		var noidung = ta.value.split('\n');
		for(var j=0;j<noidung.length;j++){
			if (noidung[j].length > ta.cols) 
			sodong += Math.floor(noidung[j].length/ta.cols);
		}
		sodong+=noidung.length;
		ta.setAttribute('rows',sodong);

	}
}
/*
tblobj.prototype. =  function() {
}
tblobj.prototype. =  function() {
}
tblobj.prototype. =  function() {
}
*/
/*****
*
*   handleEvent
*
*****/
tblobj.prototype.handleEvent = function(e) {
	//var el=e.target;
	//alert(el.getAttribute("fill"));
    var type = e.type;
    if ( this[type] != null ) this[type](e);
    //this.zoomman(e);
};

tblobj.prototype.mouseup = function(e) {
  
};
tblobj.prototype.mousedown = function(e) {

};
tblobj.prototype.mousemove = function(e) {


};
tblobj.prototype.mouseout = function(e) {
	//alert("aa");

};

tblobj.prototype.zoomman = function(e) {


};
