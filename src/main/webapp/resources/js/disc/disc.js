//// reference: http://jsfiddle.net/jE26S/5/
//// useful reference: http://jsfiddle.net/SalixAlba/7mAAS/
//// beautiful control:  http://tympanus.net/codrops/2013/08/09/building-a-circular-navigation-with-css-transforms/
//
//$(function () {
//	discModule.init();
//	
//});
//
//
//var discModule = (function(){
//	var discViewModelList;
//	var discViewModelString;
//	
//	
//	var num = 50;
//	var denom = 150;
//	var maxPoint = 50;
//	
//	var discRadius;
//	var discHeight;
//	var discWidth;
//	var discBorderRadius;
//	
//	
//	// --------- private method ---------- //
//	function scaleDisc(nbOfPoints){
//		return nbOfPoints;
//	}
//	
//	function drawPoints(nbOfPoints, radius,jqElt, addToX, addToY){
//		if(!nbOfPoints || !radius) return;
//		nbOfPoints = scaleDisc(nbOfPoints);
//		addToX = addToX?addToX:0; 
//		addToY = addToY?addToY:0; 
//		for(var i = 0; i < nbOfPoints; i++) {
//		    var x = 144 + radius * Math.cos(2 * Math.PI * i / nbOfPoints) + addToX;
//		    var y = 144 + radius * Math.sin(2 * Math.PI * i / nbOfPoints) + addToY;   
//		    jqElt.append("<div class='point' data-count="+ nbOfPoints + " style='left:"+ x +"px;top:"+ y +"px'></div>");    
//		}
//	}
//	
//	function drawText(txt, nbOfPoints, radius, jqElt, addToX, addToY){
//		if(!txt || !radius) return;
//		nbOfPoints = scaleDisc(nbOfPoints);
//		addToX = addToX?addToX:0; 
//		addToY = addToY?addToY:0; 
//		var coef = (3/4) * nbOfPoints ;
//		var x = 200 + 144 + radius * Math.cos(2 * Math.PI * coef / nbOfPoints) + addToX + 12;
//	    var y = 144 + radius * Math.sin(2 * Math.PI * coef / nbOfPoints) + addToY + 15;
//	    jqElt.append("<div class='text' data-count="+ nbOfPoints + " style='left:"+ x +"px;top:"+ y +"px'>" + txt + "</div>");
//	}
//	// --------- End private method ---------- //
//	
//	
//	
//	// ------------ getters and setters --------- //
//	function setDiscViewModelList(discViewModelList){
//		this.discViewModelList = discViewModelList;
//	}
//	
//	function getDiscViewModelList(){
//		return this.discViewModelList;
//	}
//	
//	function setDiscViewModelString(discViewModelString){
//		this.discViewModelString = discViewModelString;
//		this.discViewModelList = JSON.parse(discViewModelString);
//	}
//	function getDiscViewModelString(){
//		return this.discViewModelString;
//	}
//	// ------------ End getters and setters --------- //
//	
//	
//	
//	// --------- public method ----------- //
//	function init(){
//		setOnCercleClickListener();
//		setOnDiscDeleteClick();
//		setOnDiscUpdateClick();
//	}
//	
//	
//	function calcRadius(nbOfPoints){
//		var x = nbOfPoints / num;
//		return x*denom;
//	}
//	
//	
//	function drawCercle(nbOfPoints, jqElt){
//		var radius = calcRadius(nbOfPoints);
//		drawPoints(nbOfPoints, radius, jqElt);
//		drawText(nbOfPoints, nbOfPoints, radius, jqElt, 0, -20);
////		$(".text[data-count=10]")
//		$(".cercle").each(function(){
//		     var cercleElt = $(this);
//		     var dataCountAttr = "[data-count=" + nbOfPoints + "]";
//		     cercleElt.find("div" + dataCountAttr).hover(function(e) {
//		     cercleElt.find(".point" + dataCountAttr).css("background-color",e.type === "mouseenter"?"red":"black")
//		     cercleElt.find(".text" + dataCountAttr).css("background-color",e.type === "mouseenter"?"red":"transparent")
//		  });
//		});
//	}
//	
//	function drawDisc(index){
//		var discViewModelList = discModule.getDiscViewModelList();
//		if(!discViewModelList || i> discViewModelList.length) return;
//		var discDetailList = discViewModelList[index].discDetailList;
//		for(var i=0; i< discDetailList.length; i++){
//			var jqElt = $("#cercle-" + index);
//			if(jqElt.length)
//				discModule.drawCercle(discDetailList[i].wholesCount, jqElt);
//		}
//	}
//	
//	function setOnDiscDeleteClick(){
//		$("button[data-widget='remove']").off('click').click(function(){
//			var id = $(this).attr("data-id");
//			$("#delDiscId").val(id);
//			$("#frmDeleteDisc\\:btnDelDisc").click();
//		});
//	}
//	
//	function setOnDiscUpdateClick(){
//		$("button[data-widget='update']").off('click').click(function(){
//			var id = $(this).attr("data-id");
//			$("#createUpdateDisc\\:currentDiscId").val(id);
//			$("#createUpdateDisc\\:btnEditDiscInfo").click();
//		});
//	}
//	
//	function setOnCercleClickListener(){
//		$(".cercle").off("click");
//		$(".cercle").click(function(){
//			var currentCercleId = $(this).attr("data-id");
//			$("#createUpdateDisc\\:currentDiscId").val(currentCercleId);
//			$("#createUpdateDisc\\:btnEditDiscInfo").click();
//		});
//	}
//	
//	function resetCurrentDiscId(){
//		$("#createUpdateDisc\\:currentDiscId").val(-1);
//		$("#createUpdateDisc\\:btnEditDiscInfo").click();
//	}
//	
//	// --------- End public method ----------- //
//	
//	return {
//		init:init,
//		
//		drawCercle: drawCercle,
//		drawDisc: drawDisc,
//		drawText: drawText,
//		calcRadius: calcRadius,
//		
//		getDiscViewModelList: getDiscViewModelList,
//		setDiscViewModelList: setDiscViewModelList,
//		setDiscViewModelString: setDiscViewModelString,
//		
//		resetCurrentDiscId: resetCurrentDiscId,
//	}
//})();