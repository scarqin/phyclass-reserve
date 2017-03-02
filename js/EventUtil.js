// JavaScript Document
var EventUtil = new Object;
//增加事件处理函数
EventUtil.addHandler=function(element, type, handler){
	if (element.addEventListener){
		element.addEventListener(type, handler, false);
	}
	else if (element.attachEvent){
		element.attachEvent("on" + type, handler);
		}
		else {
			element["on" + type] = handler;
		}
};
EventUtil.removeHandler=function(element, type, handler){
	if (element.removeEventListener){
		element.removeEventListener(type, handler, false);
		}
		else if (element.detachEvent){
			element.detachEvent("on" + type, handler);
		}
		else {
			element["on" + type] = null;
		}
}
//格式化事件处理函数
EventUtil.formatEvent = function (oEvent) {
    if (isIE && isWin) {
        oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
        oEvent.eventPhase = 2;
        oEvent.isChar = (oEvent.charCode > 0);
        oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
        oEvent.pageY = oEvent.clientY + document.body.scrolltop;
        oEvent.preventDefault = function () {
            this.returnValue = false;
        };

        if (oEvent.type == "mouseout") {
            oEvent.relatedTarget = oEvent.toElement;
        } else if (oEvent.type == "mouseover") {
            oEvent.relatedTarget = oEvent.fromElement;
        }

        oEvent.stopPropagation = function () {
            this.cancelBubble = true;
        };

        oEvent.target = oEvent.srcElement;
        oEvent.time = (new Date).getTime();
    }
    return oEvent;
};
//得到事件处理函数
EventUtil.getEvent=function(event){
	return event ? event : window.event;
};
EventUtil.getTarget=function(event){
	return event.target || event.srcElement;
};
EventUtil.preventDefault=function(event){
	if (event.preventDefault){
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
};
EventUtil.stopPropagation=function(event){
	if (event.stopPropagation){
		event.stopPropagation();
	} 
	else {
		event.cancelBubble = true;
	}
};
