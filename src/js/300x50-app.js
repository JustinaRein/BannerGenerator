var stage;
var queue;
var data;
var content;
var legals;
var loop;
var legalLabelPosition;
var frameIndex = -1;
var currentFrame;
var stageContent;
var brandContent;
var imageCache = [];

// Dynamic Content variables and sample values
/* jshint ignore:start */
if(true){
"jscrambler ignore_transformations_@ foo";
Enabler.setProfileId(1098415);
}
/* jshint ignore:end */
var devDynamicContent = {};

devDynamicContent.Application= [{}];
devDynamicContent.Application[0]._id = 0;
devDynamicContent.Application[0].Click_Tag = {};
devDynamicContent.Application[0].Click_Tag.Url = "https://www.sky.com";
devDynamicContent.Application[0].Roundel = "None";
devDynamicContent.Application[0].Roundel_ID = "none";
devDynamicContent.Application[0].JSONP_File = "DATA_SPRITESHEET.js";
devDynamicContent.Application[0].JSONP_Folder =  "https://s0.2mdn.net/ads/richmedia/studio/46644413/";
devDynamicContent.Application[0].Assets_120x600 = "https://s0.2mdn.net/ads/richmedia/studio/46643193/";
devDynamicContent.Application[0].Assets_160x600 = "https://s0.2mdn.net/ads/richmedia/studio/46644409/";
devDynamicContent.Application[0].Assets_300x250 = "https://s0.2mdn.net/ads/richmedia/studio/46602866/";
devDynamicContent.Application[0].Assets_728x90 = "https://s0.2mdn.net/ads/richmedia/studio/46644410/";
devDynamicContent.Application[0].Assets_300x50 = "https://s0.2mdn.net/ads/richmedia/studio/46644412/";
devDynamicContent.Application[0].Assets_320x50 = "https://s0.2mdn.net/ads/richmedia/studio/46643198/";
devDynamicContent.Application[0].Assets_Roundel = "";
devDynamicContent.Application[0].Frame_1_Headline_standard_size = "";
devDynamicContent.Application[0].Frame_1_Relational_standard_size = "";
devDynamicContent.Application[0].Frame_2_Headline_standard_size = "";
devDynamicContent.Application[0].Frame_2_Relational_standard_size = "";
devDynamicContent.Application[0].Frame_3_Headline_standard_size = "";
devDynamicContent.Application[0].Frame_3_Relational_standard_size = "";
devDynamicContent.Application[0].Frame_4_Headline_standard_size = "";
devDynamicContent.Application[0].Frame_4_Relational_standard_size = "";
devDynamicContent.Application[0].Frame_5_Headline_standard_size = "";
devDynamicContent.Application[0].Frame_5_Relational_standard_size = "";
devDynamicContent.Application[0].Frame_6_Headline_standard_size = "";
devDynamicContent.Application[0].Frame_6_Relational_standard_size = "";
devDynamicContent.Application[0].Frame_7_Headline_standard_size = "";
devDynamicContent.Application[0].Frame_7_Relational_standard_size = "";
devDynamicContent.Application[0].Frame_8_Headline_standard_size = "";
devDynamicContent.Application[0].Frame_8_Relational_standard_size = "";
devDynamicContent.Application[0].Frame_1_Headline_mobile_size = "<span class='regular fs-320x50-16px fs-300x50-16px' style='line-height: 19px;'>Welcome to the<br class='break-320x50 break-300x50'>smart network</span>";
devDynamicContent.Application[0].Frame_1_Relational_mobile_size = "";
devDynamicContent.Application[0].Frame_2_Headline_mobile_size = "<span class='regular fs-320x50-16px fs-300x50-16px' style='line-height: 19px;'>Your phone,<br class='break-320x50 break-300x50'>your way</span>";
devDynamicContent.Application[0].Frame_2_Relational_mobile_size = "";
devDynamicContent.Application[0].Frame_3_Headline_mobile_size = "<span class='regular fs-320x50-16px fs-300x50-16px' style='line-height: 19px;'>Designed for you</span>";
devDynamicContent.Application[0].Frame_3_Relational_mobile_size = "";
devDynamicContent.Application[0].Frame_4_Headline_mobile_size = "";
devDynamicContent.Application[0].Frame_4_Relational_mobile_size = "";
devDynamicContent.Application[0].Frame_5_Headline_mobile_size = "";
devDynamicContent.Application[0].Frame_5_Relational_mobile_size = "";
devDynamicContent.Application[0].Frame_6_Headline_mobile_size = "";
devDynamicContent.Application[0].Frame_6_Relational_mobile_size = "";
devDynamicContent.Application[0].Frame_7_Headline_mobile_size = "";
devDynamicContent.Application[0].Frame_7_Relational_mobile_size = "";
devDynamicContent.Application[0].Frame_8_Headline_mobile_size = "";
devDynamicContent.Application[0].Frame_8_Relational_mobile_size = "";
devDynamicContent.Application[0].Legal_button_label_standard_size = "Click for legals";
devDynamicContent.Application[0].Legal_button_label_mobile_size = "<span style='font-size:8px;color:#333333'>Tap for legals</span>";
devDynamicContent.Application[0].Legal_copy = "New Sky Movies customers with Sky Sports only. Replaces existing offers. \u00A34.50 extra pm for 6 months, then standard price (currently \u00A39 extra pm). Requires compatible box and min 2Mbps broadband. Further terms & min contract apply. Tomorrowland: A World Beyond \u00A9 2015 Walt Disney Pictures. All Rights Reserved. Inside Out \u00A9 2014 Disney\/Pixar. All Rights Reserved. Jurassic World \u00A9 2015 NBC Universal All Rights Reserved. Harry Potter Pop up channel avaliable until 10\/04\/2016";
Enabler.setDevDynamicContent(devDynamicContent);

window.onload = function() {
  if (Enabler.isInitialized()) {
	  init();
  } else {
	  Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
  }
};

function init() {
	if (Enabler.isPageLoaded()) {
		pageLoadedHandler();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
	}
}

function pageLoadedHandler() {
	if (Enabler.isVisible()) {
		adVisibilityHandler();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, adVisibilityHandler);
	}
}
function adVisibilityHandler() {
	setData();
	determineUseOfTrackingPixel();
	determineUseOfLocalJSONPFile();
}

function setData() {
	data = dynamicContent.Application[0];
}

function determineUseOfTrackingPixel() {
	if ( data.hasOwnProperty('Use_tracking_pixel') ) {
		if ( data.Use_tracking_pixel === true ) {
			var trackingPixel = new Image();
			trackingPixel.src = data.Tracking_pixel;
		}
	}
}

function determineUseOfLocalJSONPFile() {
	if ( window.location.hostname.search("local") != -1 ) {
		console.log("INFO: Loading local JSONP file. Make sure you upload your JSONP file after editing it.");
		loadLocalData();
	} else {
		loadData();
	}
}

function loadLocalData() {
	if ( data.hasOwnProperty("JSONP_File") ) {
		var elm = document.createElement("script");
		elm.setAttribute("type", "text/javascript");
		elm.src = "js/"+data.JSONP_File;
		elm.id = "data";
		document.body.appendChild(elm);
	} else {
		alert("Error: Locating data file, please check the campaign data file in the './js' folder and also that the file exists.");
	}
}

function loadData() {
	if ( data.hasOwnProperty("JSONP_File") && data.hasOwnProperty("JSONP_Folder")  ) {
		var url = null;
		url = data.JSONP_Folder + data.JSONP_File;
		var elm = document.createElement("script");
		elm.setAttribute("type", "text/javascript");
		elm.src = url;
		elm.id = "data";
		document.body.appendChild(elm);
	} else {
		alert("Error: Locating data file, please check the campaign data file in the Google Doc and also that the file exists.");
	}
}

function jsonCallback(json){
	document.body.removeChild(document.getElementById("data"));
	var success =  true;
	if( json.hasOwnProperty("Banner_300x50") ) {
		content = json.Banner_300x50;
	} else {
		success = false;
		alert("ERROR: Please check that the data file has a 'Banner_300x50' node. Refer to the documentation for guidance.");
	}
	if( content.hasOwnProperty("loop") ) {
		loop = content.loop;
	} else {
		success = false;
		alert("ERROR: Please check that the data file object 'Banner_300x50' has a 'loop' node. Refer to the documentation for guidance.");
	}
	if( content.hasOwnProperty("legal-label-position") ) {
		legalLabelPosition = content["legal-label-position"];
	} else {
		success = false;
		alert("ERROR: Please check that the data file object 'Banner_300x50' has a 'legal-label-position' node. Refer to the documentation for guidance.");
	}
	if( success ) {
		preloadImages();
	}
}

function preloadImages() {
	queue = new createjs.LoadQueue(false);
	queue.on("complete", queueCompleteHandler, this);
	queue.loadManifest(getPreloadImagesManifest(content, data.Assets_300x50, data));
	queue.loadManifest(getPreloadRoundelImagesManifest(data.Assets_Roundel, data.Roundel_ID, "300x50"));
}

function queueCompleteHandler() {
	setTimeout(prepareCreative, 1500);
}

function prepareCreative() {
	initStage();
	removePreloader();
	determineUseOfBackupImage();
}

function initStage() {
	stage = new createjs.Stage("canvas");
	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.setInterval(25);
	createjs.Ticker.setFPS(40);
}

function determineUseOfBackupImage() {
	if ( content['serve-backup'].choice === "yes" ) {
		var backup = new createjs.Bitmap( queue.getResult("backup") );
		stage.addChild( backup );
	} else {
		createBannerLegals();
		createBannerBackground();
		createBannerContainers();
		createSkyLogo();
		determineWhichFrameShouldBeDrawn();
	}
}

function determineWhichFrameShouldBeDrawn() {
	currentFrame = content.frames[++frameIndex];

	if ( currentFrame !== null ) {
		var frameType = currentFrame.type;
		switch ( frameType ) {
			case "TEXT-INTRO-FRAME" :
				createIntroductionFrame();
				break;

			case "TEXT-OFFER-FRAME-TYPE-1" :
				createOfferFrameTypeOne();
				break;

			case "TEXT-CONTENT-FRAME" :
				createContentFrame();
				break;

			case "TEXT-PRICE-FRAME" :
				createPriceFrame();
				break;

			case "TEXT-ROUNDEL-LEFT-FRAME" :
				createLeftRoundelFrame();
				break;

			case "TEXT-ROUNDEL-RIGHT-FRAME" :
				createRightRoundelFrame();
				break;

			case "TEXT-END-FRAME-TYPE-1" :
				createEndFrameTypeOne();
				break;

			case "TEXT-END-FRAME-TYPE-2" :
				createEndFrameTypeTwo();
				break;
			
			case "SPRITESHEET-CONTENT-FRAME" :
				createSpritesheetContentFrame();
				break;
				
			case "MULTIPURPOSE-CONTENT-FRAME" :
				createSpritesheetContentFrame();
				break;
		}
	}
}

function createBannerContainers() {
	stageContent = new createjs.Container();
	stageContent.setBounds(0, 0, stage.canvas.width, stage.canvas.height);
	stage.addChild(stageContent);
	brandContent = new createjs.Container();
	brandContent.setBounds(0, 0, stage.canvas.width, stage.canvas.height);
	stage.addChild(brandContent);
}

function createBannerBackground() {
	var background = new createjs.Bitmap(queue.getResult("background"));
	background.alpha = 0;
	stage.addChild(background);
	createjs.Tween.get(background).to({alpha:1},500);
}

function animateIn(object, inAnimation, outAnimation, delayBetweenAnimations) {
	switch (inAnimation.type) {
		case "fade" :
			object.regX = Math.floor(object.image.width * 0.5);
			object.regY = Math.floor(object.image.height * 0.5);
			object.y = 28;
			object.x = 36;
			object.alpha = 0;
			stageContent.addChild(object);
			if ( delayBetweenAnimations !== null ) {
				createjs.Tween.get(object).to({alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut).wait(parseInt(delayBetweenAnimations)).call(function() {
					animateOut(object, outAnimation);
				});
			} else {
				createjs.Tween.get(object).to({alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut);
			}
			break;
		case "slide" :
			if ( inAnimation.hasOwnProperty("origin") ) {
				var finalOffset = 0;
				if ( inAnimation.origin === "right" ) {
					object.regX = Math.floor(object.image.width * 0.5);
					object.regY = Math.floor(object.image.height * 0.5);
					object.y = 28;
					object.x = 46;
					object.alpha = 0;
					stageContent.addChild(object);
					createjs.Tween.get(object).to({x:36,alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut).wait(parseInt(delayBetweenAnimations)).call(function() {
						animateOut(object, outAnimation);
					});
				} else if ( inAnimation.origin === "left" ) {
					object.regX = Math.floor(object.image.width * 0.5);
					object.regY = Math.floor(object.image.height * 0.5);
					object.y = 28;
					object.x = 26;
					object.alpha = 0;
					stageContent.addChild(object);
					createjs.Tween.get(object).to({x:36,alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut).wait(parseInt(delayBetweenAnimations)).call(function() {
						animateOut(object, outAnimation);
					});
				} else if ( inAnimation.origin === "top" ) {
					object.regX = Math.floor(object.image.width * 0.5);
					object.regY = Math.floor(object.image.height * 0.5);
					object.x = 36;
					object.y = 0 - Math.floor(object.image.height * 0.5);
					object.alpha = 0;
					finalOffset = 28;
					stageContent.addChild(object);
					createjs.Tween.get(object).to({y:finalOffset,alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut).wait(parseInt(delayBetweenAnimations)).call(function() {
						animateOut(object, outAnimation);
					});
				} else if ( inAnimation.origin === "bottom" ) {
					object.regX = Math.floor(object.image.width * 0.5);
					object.regY = Math.floor(object.image.height * 0.5);
					object.x = 36;
					object.y = 50 + Math.floor(object.image.height * 0.5);
					object.alpha = 0;
					finalOffset = 28;
					stageContent.addChild(object);
					createjs.Tween.get(object).to({y:finalOffset,alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut).wait(parseInt(delayBetweenAnimations)).call(function() {
						animateOut(object, outAnimation);
					});
				} else {
					throw "ERROR: You have provided an origin which does not match any of the animation settings. Please check that you have spelt the attribute correctly: 'origin'. And that the value is set to 'top', 'right', 'bottom', or 'left'.";
				}
			} else {
				throw "ERROR: Please check that you have defined the object attribute: origin. This is a slide animation setting.";
			}


			break;
		case "scale" :
			object.regX = Math.floor(object.image.width * 0.5);
			object.regY = Math.floor(object.image.height * 0.5);
			object.x = 36;
			object.y = 28;
			object.scaleX = 2;
			object.scaleY = 2;
			object.alpha = 0;
			stageContent.addChild(object);
			createjs.Tween.get(object).to({scaleX:1,scaleY:1,alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut).wait(parseInt(delayBetweenAnimations)).call(function() {
				animateOut(object, outAnimation);
			});
			break;
		case "flip" :
			object.regX = Math.floor(object.image.width * 0.5);
			object.regY = Math.floor(object.image.height * 0.5);
			object.x = 36;
			object.y = 28;
			object.alpha = 0;
			object.scaleX = 0;
			stageContent.addChild(object);
			createjs.Tween.get(object).to({scaleX:1,alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut).wait(parseInt(delayBetweenAnimations)).call(function(){
				animateOut(object, outAnimation);
			});
			break;
	}
}

function animateOut(object, outAnimation) {
	if ( outAnimation === null ) return;
	switch (outAnimation.type) {
		case "fade" :
			createjs.Tween.get(object).to({alpha:0},parseInt(outAnimation.duration),createjs.Ease.sineOut).call(function() {
				stageContent.removeChild(object);
			});
			break;
		case "slide" :
			if ( outAnimation.hasOwnProperty("destination") ) {
				var finalOffset = 0;
				if ( outAnimation.destination === "left" ) {
					createjs.Tween.get(object).to({x:26,alpha:0},parseInt(outAnimation.duration),createjs.Ease.sineOut).call(function() {
						stageContent.removeChild(object);
					});
				} else if ( outAnimation.destination === "right" ) {
					createjs.Tween.get(object).to({x:46,alpha:0},parseInt(outAnimation.duration),createjs.Ease.sineOut).call(function() {
						stageContent.removeChild(object);
					});
				} else if ( outAnimation.destination === "bottom" ) {
					finalOffset = 50 + Math.floor(object.image.height * 0.5);
					createjs.Tween.get(object).to({y:finalOffset,alpha:0},parseInt(outAnimation.duration),createjs.Ease.sineOut).call(function() {
						stageContent.removeChild(object);
					});
				} else if ( outAnimation.destination === "top" ) {
					finalOffset = 0 - Math.floor(object.image.height * 0.5);
					createjs.Tween.get(object).to({y:finalOffset,alpha:0},parseInt(outAnimation.duration),createjs.Ease.sineOut).call(function() {
						stageContent.removeChild(object);
					});
				} else {
					throw "ERROR: You have provided a destination which does not match any of the animation settings. Please check that you have spelt the attribute correctly: 'destination'. And that the value is set to 'top', 'right', 'bottom', or 'left'.";
				}
			} else {
				throw "ERROR: Please check that you have defined the object attribute: destination. This is a slide animation setting.";
			}
			break;
		case "scale" :
			object.regX = Math.floor(object.image.width * 0.5);
			object.regY = Math.floor(object.image.height * 0.5);
			createjs.Tween.get(object).to({scaleX:2,scaleY:2,alpha:0},parseInt(outAnimation.duration),createjs.Ease.sineOut).call(function() {
				stageContent.removeChild(object);
			});
			break;
		case "flip" :
			createjs.Tween.get(object).to({scaleX:0,alpha:0},parseInt(outAnimation.duration),createjs.Ease.sineOut).call(function() {
				stageContent.removeChild(object);
			});
			break;
	}
}

function animateStraplineIn(object, inAnimation, outAnimation, delayBetweenAnimations) {
	switch (inAnimation.type) {
		case "fade" :
			object.alpha = 0;
			stageContent.addChild(object);
			if ( outAnimation !== null ) {
				createjs.Tween.get(object).to({alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut).wait(parseInt(delayBetweenAnimations)).call(function() {
					animateStraplineOut(object, outAnimation);
				});
			} else {
				createjs.Tween.get(object).to({alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut);
			}
			break;
		default :
			throw "ERROR: The type of animation you have selected is not available. You can only use: 'fade'.";
	}
}

function animateStraplineOut(object, outAnimation) {
	switch (outAnimation.type) {
		case "fade" :
			createjs.Tween.get(object).to({alpha:0},parseInt(outAnimation.duration),createjs.Ease.sineOut).call(function() {
				stageContent.removeChild(object);
			});
			break;
		default :
			throw "ERROR: The type of animation you have selected is not available. You can only use: 'fade'.";
	}
}

function animateRoundelIn(object, inAnimation, outAnimation, delayBetweenAnimations) {
	switch (inAnimation.type) {
		case "fade" :
			object.alpha = 0;
			stageContent.addChild(object);
			if ( delayBetweenAnimations !== null ) {
				createjs.Tween.get(object).to({alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut).wait(parseInt(delayBetweenAnimations)).call(function() {
					animateOut(object, outAnimation);
				});
			} else {
				createjs.Tween.get(object).to({alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut);
			}
			break;
		case "scale" :
			object.regX = Math.floor(object.image.width * 0.5);
			object.regY = Math.floor(object.image.height * 0.5);
			object.scaleX = 2;
			object.scaleY = 2;
			object.alpha = 0;
			stageContent.addChild(object);
			createjs.Tween.get(object).to({scaleX:1,scaleY:1,alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut).wait(parseInt(delayBetweenAnimations)).call(function() {
				animateOut(object, outAnimation);
			});
			break;
		case "flip" :
			object.alpha = 0;
			object.scaleX = 0;
			stageContent.addChild(object);
			createjs.Tween.get(object).to({scaleX:1,alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut).wait(parseInt(delayBetweenAnimations)).call(function(){
				animateOut(object, outAnimation);
			});
			break;
		default :
			throw "ERROR: The type of animation you have selected is not available. You may only use: 'fade', 'scale', or 'flip'.";
	}
}

function animateRoundelOut(object, outAnimation) {
	switch (outAnimation.type) {
		case "fade" :
			createjs.Tween.get(object).to({alpha:0},parseInt(outAnimation.duration),createjs.Ease.sineOut).call(function() {
				stageContent.removeChild(object);
			});
			break;
		case "scale" :
			object.regX = Math.floor(object.image.width * 0.5);
			object.regY = Math.floor(object.image.height * 0.5);
			createjs.Tween.get(object).to({scaleX:2,scaleY:2,alpha:0},parseInt(outAnimation.duration),createjs.Ease.sineOut).call(function() {
				stageContent.removeChild(object);
			});
			break;
		case "flip" :
			createjs.Tween.get(object).to({scaleX:0,alpha:0},parseInt(outAnimation.duration),createjs.Ease.sineOut).call(function() {
				stageContent.removeChild(object);
			});
			break;
		default :
			throw "ERROR: The type of animation you have selected is not available. You may only use: 'fade', 'scale', or 'flip'.";
	}
}

function removePreloader() {
	document.getElementById("canvas").style.background = "none";
	document.getElementById("canvas").style.backgroundColor = "#fff";
}

function exitHandler() {
	if(data) {
		/* jshint ignore:start */
		if(true){
			"jscrambler ignore_transformations_@ foo";
			var customUrl = data.Click_Tag.Url;
			Enabler.exitOverride('exit', customUrl);
		}
		/* jshint ignore:end */
	}
}
