Element.prototype.addEvent = function(event, func) {
    if(this.addEventListener) {
        this.addEventListener(event, func);
    }else if(this.attachEvent) {
        this.attachEvent('on'+event, function() {
            func.call(this);
        });
    }else {
        this['on' + event] = func;
    }
}
Element.prototype.stopPropagation = function(e){
    e = e || window.event;
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}
Element.prototype.getTarget = function(e){
    e = e || window.event;
    return (e.target || e.srcElement);//获得被点击的元素
}

function animation(element, leftEnd, duration, interval){
	var leftStart = element.offsetLeft;
	var stepTmp = (leftEnd - leftStart)/(duration/interval);
	var step = Math.floor(stepTmp);
	if(step === 0){
		step = stepTmp > 0 ? 1 : -1;
	}
	element.timer && clearInterval(element.timer);
	
	element.timer = setInterval(function(){
		if(Math.abs(leftEnd - element.offsetLeft) <= Math.abs(step)){
			element.style.left = leftEnd + 'px';
			clearInterval(element.timer);
		}else{
			element.style.left = (element.offsetLeft + step) + 'px';
		}
	}, interval);
}