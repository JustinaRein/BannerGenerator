
// JavaScript Document
function getPreloadImagesManifest(content, basePath, liveTextReference) {
	var liveText = liveTextReference;
	var contentFrameIndice;
	var element;
	var manifest = [];
	var object = {id:"preloader", src:"assets/preloader.gif"};
	manifest.push(object);
	if ( content['serve-backup'].choice === "yes" ) {
		console.log(content['serve-backup'].image);
		object = {};
		object.id = "backup";
		object.src = basePath + content['serve-backup'].image;
		manifest.push(object);
	} else {
		if ( content.hasOwnProperty('background') ) {
			console.log(content.background);
			object = {};
			object.id = "background";
			object.src = basePath + content.background;
			manifest.push(object);
		} else {
			throw "ERROR: Background image is missing in JSONP file.";
		}
		if ( content.hasOwnProperty('logo') ) {
			console.log(content.logo);
			object = {};
			object.id = "logo";
			object.src = basePath + content.logo;
			manifest.push(object);
		} else {
			throw "ERROR: Sky logo image is missing in JSONP file.";
		}
		if ( content.frames === null ) {
			throw "ERROR: Your frames is not defined in the JSONP file.. Please check the JSONP file..";
		} else if ( content.frames.length < 1 ) {
			throw "ERROR: Please check that the number of frames in the JSONP file. is greater than one. You have no frame content.";
		} else {
			for(var i = 0; i < content.frames.length; i++) {
				console.log(content.frames[i].type, " ", i);
				var frameType = content.frames[i].type;
				var data = content.frames[i];

				switch(frameType) {

					case "MULTIPURPOSE-CONTENT-FRAME" :
						if ( data.hasOwnProperty('logo-image') ) {
							//console.log(data['logo-image']);
							object = {};
							object.id = "logo-image-"+i;
							object.src = basePath + data['logo-image'];
							manifest.push(object);
						} else {
							throw "ERROR: MULTIPURPOSE-CONTENT-FRAME logo-image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('unique-background') ) {
							//console.log(data['unique-background']);
							object = {};
							object.id = "unique-background-"+i;
							object.src = basePath + data['unique-background'];
							manifest.push(object);
						} else {
							console.log("INFO: MULTIPURPOSE-CONTENT-FRAME unique-background image is not used in JSONP file.");
						}
						if ( data.hasOwnProperty('spritesheet-image') ) {
							//console.log(data['spritesheet-image']);
							object = {};
							object.id = "spritesheet-image-"+i;
							object.src = basePath + data['spritesheet-image'];
							manifest.push(object);
						} else {
							throw "ERROR: MULTIPURPOSE-CONTENT-FRAME spritesheet-image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('content-image') ) {
							//console.log(data['content-image']);
							object = {};
							object.id = "content-image-"+i;
							object.src = basePath + data['content-image'];
							manifest.push(object);
						} else {
							throw "ERROR: MULTIPURPOSE-CONTENT-FRAME content-image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('cta-image') ) {
							//console.log(data['cta-image']);
							object = {};
							object.id = "cta-image-"+i;
							object.src = basePath + data['cta-image'];
							manifest.push(object);
						} else {
							throw "ERROR: MULTIPURPOSE-CONTENT-FRAME cta-image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('headline-image') ) {
							contentFrameIndice = i;
							//console.log(data['headline-image']);
							element = document.createElement('p');
							element.id = "headline"+i;
							element.innerHTML = liveText[data['headline-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "headline-image-");
						} else {
							throw "ERROR: MULTIPURPOSE-CONTENT-FRAME headline-image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('relational-image') ) {
							contentFrameIndice = i;
							//console.log(data['relational-image']);
							element = document.createElement('p');
							element.id = "relational"+i;
							element.innerHTML = liveText[data['relational-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "relational-image-");
						} else {
							throw "ERROR: MULTIPURPOSE-CONTENT-FRAME relational-image is missing in JSONP file.";
						}
						break;

					default :
						throw "ERROR: The frame type you have defined is incorrect. You can use: INTRO-FRAME, OFFER-FRAME-TYPE-1, OFFER-FRAME-TYPE-2, CONTENT-FRAME, ROUNDEL-FRAME, ROUNDEL-END-FRAME, or END-FRAME.";
				}
			}
		}
	}
	return manifest;
}

function createLiveText(element, ref, id) {
	console.log(element);
	if ( element.innerHTML === "undefined" ) {
		element.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	if( element.innerHTML.length === 0 ) {
		element.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;";
	}

	html2canvas(element, {
		onrendered: function(canvas) {
			//document.body.removeChild(element);
			var dataUrl = canvas.toDataURL();
			var image = new Image();
			image.src = dataUrl;
		
			var object = {};
			object.id = id+ref;
			object.image = image;
			imageCache[object.id] = object;
		}
	});
}

function getPreloadRoundelImagesManifest(basePath, id, creativeDimension) {
	if ( id === "none" ) return;
	
	var manifest = [];
	var roundel = {};

	switch(creativeDimension) {
		case "300x50" :
			roundel.id = "generic-roundel";
			roundel.src = basePath + id+"-300x50-generic.png";
			manifest.push(roundel);
			break;
		case "320x50":
			roundel.id = "generic-roundel";
			roundel.src = basePath + id+"-320x50-generic.png";
			manifest.push(roundel);
			break;
		default :
			throw "ERROR: The creative size you have specified does not exist";
	}

	return manifest;
}
