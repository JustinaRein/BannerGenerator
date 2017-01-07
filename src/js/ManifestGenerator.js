/*jscrambler
{
    "ignore_transformations_@": {
        "foo": {
            "*": true
        }
    }
}
*/
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

					case "TEXT-INTRO-FRAME" :
						if ( data.hasOwnProperty('unique-background') ) {
							console.log(data['unique-background']);
							object = {};
							object.id = "background-"+i;
							object.src = basePath + data['unique-background'];
							manifest.push(object);
						} else {
							console.log("INFO: Intro frame background image is not used in JSONP file.");
						}
						if ( data.hasOwnProperty('image') ) {
							contentFrameIndice = i;
							console.log(data.image);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data.image];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "image-");
						} else {
							throw "ERROR: Intro frame image is missing in JSONP file.";
						}
						break;

					case "TEXT-OFFER-FRAME-TYPE-1" :
						if ( data.hasOwnProperty('unique-background') ) {
							console.log(data['unique-background']);
							object = {};
							object.id = "background-"+i;
							object.src = basePath + data['unique-background'];
							manifest.push(object);
						} else {
							console.log("INFO: TEXT-Offer frame type 1 background image is not used in JSONP file.");
						}
						if ( data.hasOwnProperty('headline-image') ) {
							contentFrameIndice = i;
							console.log(data['headline-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['headline-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "headline-image-");
						} else {
							throw "ERROR: TEXT-Offer frame type 1 headline image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('image') ) {
							console.log(data.image);
							object = {};
							object.id = "image-"+i;
							object.src = basePath + data.image;
							manifest.push(object);
						} else {
							throw "ERROR: TEXT-Offer frame type 1 frame image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('relational-image') ) {
							contentFrameIndice = i;
							console.log(data['relational-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['relational-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "relational-image-");
						} else {
							throw "ERROR: TEXT-Offer frame type 1 relational image is missing in JSONP file.";
						}
						break;

					case "TEXT-OFFER-FRAME-TYPE-2" :
						if ( data.hasOwnProperty('unique-background') ) {
							console.log(data['unique-background']);
							object = {};
							object.id = "background-"+i;
							object.src = basePath + data['unique-background'];
							manifest.push(object);
						} else {
							console.log("INFO: TEXT-Offer frame type 2 background image is not used in JSONP file.");
						}
						if ( data.hasOwnProperty('headline-image') ) {
							contentFrameIndice = i;
							console.log(data['headline-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['headline-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "headline-image-");
						} else {
							throw "ERROR: TEXT-Offer frame type 2 headline image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('relational-image') ) {
							contentFrameIndice = i;
							console.log(data['relational-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['relational-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "relational-image-");
						} else {
							throw "ERROR: TEXT-Offer frame type 2 relational image is missing in JSONP file.";
						}
						break;

					case "TEXT-OFFER-FRAME-TYPE-3" :
						if ( data.hasOwnProperty('unique-background') ) {
							console.log(data['unique-background']);
							object = {};
							object.id = "background-"+i;
							object.src = basePath + data['unique-background'];
							manifest.push(object);
						} else {
							console.log("INFO: TEXT-Offer frame type 1 background image is not used in JSONP file.");
						}
						if ( data.hasOwnProperty('headline-image') ) {
							contentFrameIndice = i;
							console.log(data['headline-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['headline-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "headline-image-");
						} else {
							throw "ERROR: TEXT-Offer frame type 1 headline image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('image') ) {
							console.log(data.image);
							object = {};
							object.id = "image-"+i;
							object.src = basePath + data.image;
							manifest.push(object);
						} else {
							throw "ERROR: TEXT-Offer frame type 1 frame image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('relational-image') ) {
							contentFrameIndice = i;
							console.log(data['relational-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['relational-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "relational-image-");
						} else {
							throw "ERROR: TEXT-Offer frame type 1 relational image is missing in JSONP file.";
						}
						break;


					case "TEXT-CONTENT-FRAME" :
						if ( data.hasOwnProperty('unique-background') ) {
							console.log(data['unique-background']);
							object = {};
							object.id = "background-"+i;
							object.src = basePath + data['unique-background'];
							manifest.push(object);
						} else {
							console.log("INFO: Intro frame background image is not used in JSONP file.");
						}
						if ( data.hasOwnProperty('image') ) {
							console.log(data.image);
							object = {};
							object.id = "image-"+i;
							object.src = basePath + data.image;
							manifest.push(object);
						} else {
							throw "ERROR: Content frame image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('headline-image') ) {
							contentFrameIndice = i;
							console.log(data['headline-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['headline-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "headline-image-");
						} else {
							throw "ERROR: Text-content frame headline image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('relational-image') ) {
							contentFrameIndice = i;
							console.log(data['relational-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['relational-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "relational-image-");
						} else {
							throw "ERROR: Text-content frame relational image is missing in JSONP file.";
						}
						break;
					
					case "TEXT-PRICE-FRAME" :
						if ( data.hasOwnProperty('unique-background') ) {
							console.log(data['unique-background']);
							object = {};
							object.id = "background-"+i;
							object.src = basePath + data['unique-background'];
							manifest.push(object);
						} else {
							console.log("INFO: Intro frame background image is not used in JSONP file.");
						}
						if ( data.hasOwnProperty('headline-image') ) {
							contentFrameIndice = i;
							console.log(data['headline-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['headline-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "headline-image-");
						} else {
							throw "ERROR: Price frame headline image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('relational-image') ) {
							contentFrameIndice = i;
							console.log(data['relational-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['relational-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "relational-image-");
						} else {
							throw "ERROR: Price frame relational image is missing in JSONP file.";
						}
						break;

					case "TEXT-ROUNDEL-FRAME" :
						if ( data.hasOwnProperty('unique-background') ) {
							console.log(data['unique-background']);
							object = {};
							object.id = "background-"+i;
							object.src = basePath + data['unique-background'];
							manifest.push(object);
						} else {
							console.log("INFO: Roundel frame background image is not used in JSONP file.");
						}
						if ( data.hasOwnProperty("headline-image") ) {
							contentFrameIndice = i;
							console.log(data['headline-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['headline-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "headline-image-");
						} else {
							throw "ERROR: Roundel frame headline-image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty("relational-image") ) {
							contentFrameIndice = i;
							console.log(data['relational-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['relational-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "relational-image-");
						} else {
							throw "ERROR: Roundel frame relational-image is missing in JSONP file.";
						}
						break;

					case "TEXT-ROUNDEL-END-FRAME" :
						if ( data.hasOwnProperty('unique-background') ) {
							console.log(data['unique-background']);
							object = {};
							object.id = "background-"+i;
							object.src = basePath + data['unique-background'];
							manifest.push(object);
						} else {
							console.log("INFO: Roundel end frame background image is not used in JSONP file.");
						}
						if ( data.hasOwnProperty("headline-image") ) {
							contentFrameIndice = i;
							console.log(data['headline-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['headline-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "headline-image-");
						} else {
							throw "ERROR: Roundel end frame headline-image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('relational-image') ) {
							contentFrameIndice = i;
							console.log(data['relational-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['relational-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "relational-image-");
						} else {
							throw "ERROR: Roundel end frame headline-image-sheen is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('cta-image') ) {
							console.log(data['cta-image']);
							object = {};
							object.id = "cta-image-"+i;
							object.src = basePath + data['cta-image'];
							manifest.push(object);
						} else {
							throw "ERROR: Roundel end frame cta-image is missing in JSONP file.";
						}
						break;

					case "TEXT-END-FRAME" :
						if ( data.hasOwnProperty('unique-background') ) {
							console.log(data['unique-background']);
							object = {};
							object.id = "background-"+i;
							object.src = basePath + data['unique-background'];
							manifest.push(object);
						} else {
							console.log("INFO: TEXT-End frame background image is not used in JSONP file.");
						}
						if ( data.hasOwnProperty("headline-image") ) {
							contentFrameIndice = i;
							console.log(data['headline-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['headline-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "headline-image-");
						} else {
							throw "ERROR: TEXT-End frame headline-image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('relational-image') ) {
							contentFrameIndice = i;
							console.log(data['relational-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['relational-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "relational-image-");
						} else {
							throw "ERROR: TEXT-End frame headline-image-sheen is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('cta-image') ) {
							console.log(data['cta-image']);
							object = {};
							object.id = "cta-image-"+i;
							object.src = basePath + data['cta-image'];
							manifest.push(object);
						} else {
							throw "ERROR: TEXT-End frame cta-image is missing in JSONP file.";
						}
						break;

					case "CUSTOM-END-FRAME" :
						if ( data.hasOwnProperty('unique-background') ) {
							console.log(data['unique-background']);
							object = {};
							object.id = "background-"+i;
							object.src = basePath + data['unique-background'];
							manifest.push(object);
						} else {
							console.log("INFO: Custom end frame background image is not used in JSONP file.");
						}
						if ( data.hasOwnProperty('headline-image') ) {
							contentFrameIndice = i;
							console.log(data['headline-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['headline-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "headline-image-");
						} else {
							console.log("INFO: Custom end frame content text is not used in JSONP file.");
						}

						if ( data.hasOwnProperty('relational-image') ) {
							contentFrameIndice = i;
							console.log(data['relational-image']);
							element = document.createElement('p');
							element.id = "text"+i;
							element.innerHTML = liveText[data['relational-image']];
							document.body.appendChild(element);
							createLiveText(element, contentFrameIndice, "relational-image-");
						} else {
							console.log("INFO: Custom end frame relational text is not used in JSONP file.");
						}
						if ( data.hasOwnProperty('image') ) {
							console.log(data.image);
							object = {};
							object.id = "image-"+i;
							object.src = basePath + data.image;
							manifest.push(object);
						} else {
							console.log("INFO: Custom end frame image is missing in JSONP file.");
						}
						if ( data.hasOwnProperty('cta-image') ) {
							console.log(data['cta-image']);
							object = {};
							object.id = "cta-image-"+i;
							object.src = basePath + data['cta-image'];
							manifest.push(object);
						} else {
							throw "ERROR: Custom end frame cta-image is missing in JSONP file.";
						}
						break;
						
					case "SPRITESHEET-CONTENT-FRAME" :
						if ( data.hasOwnProperty('logo-image') ) {
							//console.log(data['logo-image']);
							object = {};
							object.id = "logo-image-"+i;
							object.src = basePath + data['logo-image'];
							manifest.push(object);
						} else {
							throw "ERROR: SPRITESHEET-CONTENT-FRAME logo-image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('unique-background') ) {
							//console.log(data['unique-background']);
							object = {};
							object.id = "unique-background-"+i;
							object.src = basePath + data['unique-background'];
							manifest.push(object);
						} else {
							console.log("INFO: SPRITESHEET-CONTENT-FRAME unique-background image is not used in JSONP file.");
						}
						if ( data.hasOwnProperty('spritesheet-image') ) {
							//console.log(data['spritesheet-image']);
							object = {};
							object.id = "spritesheet-image-"+i;
							object.src = basePath + data['spritesheet-image'];
							manifest.push(object);
						} else {
							throw "ERROR: SPRITESHEET-CONTENT-FRAME spritesheet-image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('content-image') ) {
							//console.log(data['content-image']);
							object = {};
							object.id = "content-image-"+i;
							object.src = basePath + data['content-image'];
							manifest.push(object);
						} else {
							throw "ERROR: SPRITESHEET-CONTENT-FRAME content-image is missing in JSONP file.";
						}
						if ( data.hasOwnProperty('cta-image') ) {
							//console.log(data['cta-image']);
							object = {};
							object.id = "cta-image-"+i;
							object.src = basePath + data['cta-image'];
							manifest.push(object);
						} else {
							throw "ERROR: SPRITESHEET-CONTENT-FRAME cta-image is missing in JSONP file.";
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
							throw "ERROR: SPRITESHEET-CONTENT-FRAME headline-image is missing in JSONP file.";
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
							throw "ERROR: SPRITESHEET-CONTENT-FRAME relational-image is missing in JSONP file.";
						}
						break;
					
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
						throw "ERROR: The frame type you have defined is incorrect. You can use: INTRO-FRAME, OFFER-FRAME-TYPE-1, OFFER-FRAME-TYPE-2, OFFER-FRAME-TYPE-3, CONTENT-FRAME, ROUNDEL-FRAME, ROUNDEL-END-FRAME, END-FRAME, or CUSTOM-END-FRAME.";
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
			/*
			image.style['image-rendering'] = 'optimizeSpeed';
			image.style['image-rendering'] = '-moz-crisp-edges';
			image.style['image-rendering'] = '-o-crisp-edges';
			image.style['image-rendering'] = '-webkit-optimize-contrast';
			image.style['-ms-interpolation-mode'] = 'nearest-neighbor';
			*/
			var object = {};
			object.id = id+ref;
			object.image = image;
			imageCache[object.id] = object;
		}
	});
}

function getPreloadRoundelImagesManifest(basePath, id, creativeDimension) {
	var idRef = "";
	idRef = id;
	idRef.toLowerCase();
	if ( idRef === "none" ) {
		return;
	}

	var manifest = [];
	var bigRoundel = {};
	var smallRoundel = {};

	switch(creativeDimension) {
		case "120x600" :
			bigRoundel.id = "large-roundel";
			bigRoundel.src = basePath + id+"-120x600-big.png";
			manifest.push(bigRoundel);
			smallRoundel.id = "small-roundel";
			smallRoundel.src = basePath + id+"-120x600-small.png";
			manifest.push(smallRoundel);
			break;
		case "160x600":
			bigRoundel.id = "large-roundel";
			bigRoundel.src = basePath + id+"-160x600-big.png";
			manifest.push(bigRoundel);
			smallRoundel.id = "small-roundel";
			smallRoundel.src = basePath + id+"-160x600-small.png";
			manifest.push(smallRoundel);
			break;
		case "300x250":
			bigRoundel.id = "large-roundel";
			bigRoundel.src = basePath + id+"-300x250-big.png";
			manifest.push(bigRoundel);
			smallRoundel.id = "small-roundel";
			smallRoundel.src = basePath + id+"-300x250-small.png";
			manifest.push(smallRoundel);
			break;
		case "728x90":
			bigRoundel.id = "large-roundel";
			bigRoundel.src = basePath + id+"-728x90-big.png";
			manifest.push(bigRoundel);
			smallRoundel.id = "small-roundel";
			smallRoundel.src = basePath + id+"-728x90-small.png";
			manifest.push(smallRoundel);
			break;
		default :
			throw "ERROR: The creative size you have specified does not exist";
	}

	return manifest;
}
