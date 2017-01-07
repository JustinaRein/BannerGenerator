// JavaScript Document
function evaluateUseOfKeyDownListener() {
	var obj = document.getElementById('legal-copy');
	var reference = document.getElementById('ad');
	if(obj.clientHeight > reference.clientHeight) {
		addKeyDownListener();
	}
}
function addKeyDownListener() {
	document.addEventListener('keydown', handleKeyDownEvent, false);
}
function removeKeyDownListener() {
	document.removeEventListener('keydown', handleKeyDownEvent, false);
}
function handleKeyDownEvent(e) {
	if( e.which === null ) {
		processKeyDownEvent(e.keyCode);
	} else {
		processKeyDownEvent(e.which);
	}
}
function processKeyDownEvent(value) {
	if( value === 38 ) {
		var obj1 = document.getElementById('legal-copy-container');
		if( obj1.scrollTop > 0 ) {
			obj1.scrollTop -= 10;
		}
	} else if ( value === 40 ) {
		var obj2 = document.getElementById('legal-copy-container');
		var height = obj2.scrollHeight;
		if( obj2.scrollTop < height ) {
			obj2.scrollTop += 10;
		}		
	} else {
		return;
	}
}