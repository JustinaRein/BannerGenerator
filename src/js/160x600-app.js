var stage;
var queue;
var data;
var content;
var legals;
var loop;
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
devDynamicContent.Application[0].Frame_1_Headline_standard_size = "<span class='regular fs-120x600-20px fs-160x600-20px fs-300x250-20px fs-728x90-20px' style='line-height: 23px;'>Welcome<br class='break-120x600 break-160x600'> to the <br class='break-120x600'>smart<br class='break-120x600 break-160x600'> network </span>";
devDynamicContent.Application[0].Frame_1_Relational_standard_size = "";
devDynamicContent.Application[0].Frame_2_Headline_standard_size = "<span class='regular fs-120x600-20px fs-160x600-20px fs-300x250-20px fs-728x90-20px' style='line-height: 23px;'>Your phone,<br class='break-120x600 break-160x600'> your way </span>";
devDynamicContent.Application[0].Frame_2_Relational_standard_size = "";
devDynamicContent.Application[0].Frame_3_Headline_standard_size = "<span class='regular fs-120x600-20px fs-160x600-20px fs-300x250-20px fs-728x90-20px' style='line-height: 23px;'>Designed<br class='break-120x600 break-160x600'> for you </span>";
devDynamicContent.Application[0].Frame_3_Relational_standard_size = "<span class='regular fs-120x600-20px fs-160x600-20px fs-300x250-20px fs-728x90-20px' style='line-height: 23px;'>Sky Mobile</span>";
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
devDynamicContent.Application[0].Frame_1_Headline_mobile_size = "";
devDynamicContent.Application[0].Frame_1_Relational_mobile_size = "";
devDynamicContent.Application[0].Frame_2_Headline_mobile_size = "";
devDynamicContent.Application[0].Frame_2_Relational_mobile_size = "";
devDynamicContent.Application[0].Frame_3_Headline_mobile_size = "";
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
devDynamicContent.Application[0].Legal_button_label_mobile_size = "Tap for legals";
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
	if( json.hasOwnProperty("Banner_160x600") ) {
		content = json.Banner_160x600;
	} else {
		success = false;
		alert("ERROR: Please check that the data file has a 'Banner_160x600' node. Refer to the documentation for guidance.");
	}
	if( content.hasOwnProperty("loop") ) {
		loop = content.loop;
	} else {
		success = false;
		alert("ERROR: Please check that the data file object 'Banner_160x600' has a 'loop' node. Refer to the documentation for guidance.");
	}
	if( success ) {
		preloadImages();
	}
}

function preloadImages() {
	queue = new createjs.LoadQueue(false);
	queue.on("complete", queueCompleteHandler, this);
	queue.loadManifest(getPreloadImagesManifest(content, data.Assets_160x600, data));
	queue.loadManifest(getPreloadRoundelImagesManifest(data.Assets_Roundel, data.Roundel_ID, "160x600"));
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

function createBannerLegals() {
	var legalContainer = document.getElementById('legal-copy-container');
	legalContainer.style.visibility = 'visible';
	legalContainer.addEventListener('click',legalExitButtonHandler,false);

	var copy = document.getElementById('legal-copy');
	copy.innerHTML = data.Legal_copy;
	TweenLite.to(copy, 0, {alpha:0});
	TweenLite.to(copy, 1, {alpha:1});

	var label = document.getElementById('legal-button-label');
	TweenLite.to(label, 0, {alpha:0});
	TweenLite.to(label, 1, {alpha:1});
	label.innerHTML = data.Legal_button_label_standard_size;

	var legalButton = document.getElementById('legal-button');
	legalButton.style.left = (content.hasOwnProperty("legal-label-position") ? content['legal-label-position'].left : 51) + "px";
	legalButton.style.top = (content.hasOwnProperty("legal-label-position") ? content['legal-label-position'].top : 584) + "px";
	legalButton.addEventListener('click',legalButtonClickHandler,false);

	if ( copy.clientHeight < 598 ) {
		legalContainer.style.backgroundPositionX = "142px";
		legalContainer.style.overflowY = "hidden";
	}
}

function legalButtonClickHandler(e) {
	document.getElementById('legal-button').style.zIndex = 2;
	var offset = 598 - document.getElementById('legal-copy-container').clientHeight;
	TweenLite.to(document.getElementById('legal-copy-container'), 0.5, {top:offset,onComplete:legalCopyContainerTweenInCompleteHandler});
}

function legalCopyContainerTweenInCompleteHandler() {
	document.getElementById('legal-copy-container').style.zIndex = 5;
	evaluateUseOfKeyDownListener();
}

function legalCopyContainerTweenOutCompleteHandler() {
	document.getElementById('legal-button').style.zIndex = 5;
}

function legalExitButtonHandler() {
	document.getElementById('legal-copy-container').style.zIndex = 3;
	TweenLite.to(document.getElementById('legal-copy-container'), 0.5, {top:601,onComplete:legalCopyContainerTweenOutCompleteHandler});
	removeKeyDownListener();
}

function createSkyLogo() {
	var skyLogo = new createjs.Bitmap(queue.getResult("logo"));
	skyLogo.name = "skyLogo";
	skyLogo.regX = Math.floor(skyLogo.image.width * 0.5);
	skyLogo.regY = Math.floor(skyLogo.image.height * 0.5);
	skyLogo.x = 79;
	skyLogo.y = 544;
	skyLogo.alpha = 0;
	brandContent.addChild(skyLogo);
	createjs.Tween.get(skyLogo).to({alpha:1},500);
}

function removeSkyLogo() {
	if ( brandContent.contains(brandContent.getChildByName("skyLogo")) ) {
		brandContent.removeChild(brandContent.getChildByName("skyLogo"));
	}
}

function placeSkyLogo() {
	if ( !brandContent.contains(brandContent.getChildByName("skyLogo")) ) {
		createSkyLogo();
	}
}

function determineWhichFrameShouldBeDrawn() {
	currentFrame = content.frames[++frameIndex];

	if ( currentFrame !== null ) {
		var frameType = currentFrame.type;
		switch ( frameType ) {		
			case "MULTIPURPOSE-CONTENT-FRAME" :
				createSpritesheetContentFrame();
				break;
		}
	}

}

function createBannerBackground() {
	var background = new createjs.Bitmap(queue.getResult("background"));
	background.alpha = 0;
	stage.addChild(background);
	createjs.Tween.get(background).to({alpha:1},500);
}

function createBannerContainers() {
	stageContent = new createjs.Container();
	stageContent.setBounds(0, 0, stage.canvas.width, stage.canvas.height);
	stage.addChild(stageContent);
	brandContent = new createjs.Container();
	brandContent.setBounds(0, 0, stage.canvas.width, stage.canvas.height);
	stage.addChild(brandContent);
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
