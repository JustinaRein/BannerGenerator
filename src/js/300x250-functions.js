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
	legalButton.style.left = (content.hasOwnProperty("legal-label-position") ? content['legal-label-position'].left : 120) + "px";
	legalButton.style.top = (content.hasOwnProperty("legal-label-position") ? content['legal-label-position'].top : 233) + "px";
	legalButton.addEventListener('click',legalButtonClickHandler,false);

	if ( copy.clientHeight < 248 ) {
		legalContainer.style.backgroundPositionX = "280px";
		legalContainer.style.overflowY = "hidden";
		copy.style.width = "270px";
	}
}

function legalButtonClickHandler(e) {
	document.getElementById('legal-button').style.zIndex = 2;
	var offset = 248 - document.getElementById('legal-copy-container').clientHeight - 1;
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
	TweenLite.to(document.getElementById('legal-copy-container'), 0.5, {top:250,onComplete:legalCopyContainerTweenOutCompleteHandler});
	removeKeyDownListener();
}

function createSkyLogo() {
	var skyLogo = new createjs.Bitmap(queue.getResult("logo"));
	skyLogo.name = "skyLogo";
	skyLogo.regX = Math.floor(skyLogo.image.width * 0.5);
	skyLogo.regY = Math.floor(skyLogo.image.height * 0.5);
	skyLogo.x = content.hasOwnProperty("logo-position") ? content['logo-position'].x : 246;
	skyLogo.y = content.hasOwnProperty("logo-position") ? content['logo-position'].y : 210;
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

function createTextIntroductionFrame() {
	if ( currentFrame.hasOwnProperty("show-logo") ) {
		if ( currentFrame['show-logo'] === true ) {
			placeSkyLogo();
		}
		else { 
			removeSkyLogo();
		}
	}
	
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["image-"+frameIndex].image);
	headline.regX = Math.floor(headline.image.width * 0.5);
	headline.regY = Math.floor(headline.image.height * 0.5);
	headline.x = currentFrame.hasOwnProperty('image-x-position') ? currentFrame['image-x-position'] : 150;
	headline.y = currentFrame.hasOwnProperty('image-y-position') ? currentFrame['image-y-position'] : 125;
	headline.alpha = 0;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("image-sheen") && currentFrame["image-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
		var gradient1 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient1.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient1.cache(0,0,headline.image.width,headline.image.height);
		gradient1.regX = headline.regX;
		gradient1.regY = headline.regY;
		gradient1.x = headline.x;
		gradient1.y = headline.y;

		animateStraplineIn(gradient1, currentFrame['image-animation-in'], currentFrame['image-animation-out'], currentFrame['image-animation-duration']);

		var clone1 = new createjs.Bitmap(headline.cacheCanvas);
		clone1.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone1.cache(0,0,clone1.image.width,clone1.image.height);
		clone1.regX = gradient1.regX;
		clone1.regY = gradient1.regY;
		clone1.x = gradient1.x;
		clone1.y = gradient1.y;
		stageContent.addChild(clone1);

		var mask1 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient1.getBounds().height*2));
		mask1.rotation = 15;
		mask1.y = clone1.y - gradient1.getBounds().height * 0.5;
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['image-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("image-sheen") && currentFrame["image-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
		animateStraplineIn(headline, currentFrame['image-animation-in'], currentFrame['image-animation-out'], currentFrame['image-animation-duration']);

		var clone2 = new createjs.Bitmap(headline.cacheCanvas);
		clone2.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone2.cache(0,0,headline.image.width,headline.image.height);
		clone2.regX = headline.regX;
		clone2.regY = headline.regY;
		clone2.x = headline.x;
		clone2.y = headline.y;
		stageContent.addChild(clone2);

		var mask2 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,headline.image.height*2));
		mask2.rotation = 15;
		mask2.y = clone2.y - headline.image.height * 0.5;
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['image-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("image-sheen") && currentFrame["image-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "no" ) {
		animateStraplineIn(headline, currentFrame['image-animation-in'], currentFrame['image-animation-out'], currentFrame['image-animation-duration']);
	}
	else if ( currentFrame.hasOwnProperty("image-sheen") && currentFrame["image-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
		var gradient2 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient2.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient2.cache(0,0,headline.image.width,headline.image.height);
		gradient2.regX = headline.regX;
		gradient2.regY = headline.regY;
		gradient2.x = headline.x;
		gradient2.y = headline.y;

		animateStraplineIn(gradient2, currentFrame['image-animation-in'], currentFrame['image-animation-out'], currentFrame['image-animation-duration']);
	}

	var delayUntilNextFrame = parseInt(currentFrame['frame-animation-duration']);

	setTimeout(function() {
		if ( stageContent.contains(headline) ) {
			stageContent.removeChild(headline);
		}
		if ( currentFrame.hasOwnProperty("image-sheen") && currentFrame["image-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
			stageContent.removeChild(gradient1);
			stageContent.removeChild(clone1);
		}
		else if ( currentFrame.hasOwnProperty("image-sheen") && currentFrame["image-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
			stageContent.removeChild(headline);
		}
		else if ( currentFrame.hasOwnProperty("image-sheen") && currentFrame["image-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
			stageContent.removeChild(gradient2);
		}
		determineWhichFrameShouldBeDrawn();
	},delayUntilNextFrame);
}

function createOfferFrameTypeOne() {
	if ( currentFrame.hasOwnProperty("show-logo") ) {
		if ( currentFrame['show-logo'] === true ) {
			placeSkyLogo();
		}
		else { 
			removeSkyLogo();
		}
	}
	
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regX = Math.floor(headline.image.width * 0.5);
	headline.regY = 0;
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 150;
	headline.y = currentFrame.hasOwnProperty("headline-y-position") ? currentFrame['headline-y-position'] : 15;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient1 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient1.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient1.cache(0,0,headline.image.width,headline.image.height);
		gradient1.regX = headline.regX;
		gradient1.regY = headline.regY;
		gradient1.x = headline.x;
		gradient1.y = headline.y;

		animateStraplineIn(gradient1, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);

		var clone1 = new createjs.Bitmap(headline.cacheCanvas);
		clone1.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone1.cache(0,0,clone1.image.width,clone1.image.height);
		clone1.regX = gradient1.regX;
		clone1.regY = gradient1.regY;
		clone1.x = gradient1.x;
		clone1.y = gradient1.y;
		stageContent.addChild(clone1);

		var mask1 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient1.getBounds().height*2));
		mask1.rotation = 15;
		mask1.y = clone1.y;
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);

		var clone2 = new createjs.Bitmap(headline.cacheCanvas);
		clone2.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone2.cache(0,0,headline.image.width,headline.image.height);
		clone2.regX = headline.regX;
		clone2.regY = headline.regY;
		clone2.x = headline.x;
		clone2.y = headline.y;
		stageContent.addChild(clone2);

		var mask2 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,headline.image.height*2));
		mask2.rotation = 15;
		mask2.y = clone2.y;
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient2 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient2.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient2.cache(0,0,headline.image.width,headline.image.height);
		gradient2.regX = headline.regX;
		gradient2.regY = headline.regY;
		gradient2.x = headline.x;
		gradient2.y = headline.y;

		animateStraplineIn(gradient2, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}
	else {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}

	var image = new createjs.Bitmap(queue.getResult("image-"+frameIndex));
	animateIn(image, currentFrame['image-animation-in'], currentFrame['image-animation-out'], currentFrame['image-animation-duration']);

	if ( currentFrame.hasOwnProperty("relational-image") ) {
		var relational = new createjs.Bitmap(imageCache["relational-image-"+frameIndex].image);
		relational.regX = Math.floor(relational.image.width * 0.5);
		relational.regY = 0;
		relational.x = currentFrame.hasOwnProperty('relational-x-position') ? currentFrame['relational-x-position'] : 150;
		relational.y = currentFrame.hasOwnProperty('relational-y-position') ? currentFrame['relational-y-position'] : 190;
		relational.cache(0,0,relational.image.width,relational.image.height);

		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient3 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient3.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient3.cache(0,0,relational.image.width,relational.image.height);
			gradient3.regX = relational.regX;
			gradient3.regY = relational.regY;
			gradient3.x = relational.x;
			gradient3.y = relational.y;
	
			animateStraplineIn(gradient3, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
	
			var clone3 = new createjs.Bitmap(relational.cacheCanvas);
			clone3.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone3.cache(0,0,clone3.image.width,clone3.image.height);
			clone3.regX = gradient3.regX;
			clone3.regY = gradient3.regY;
			clone3.x = gradient3.x;
			clone3.y = gradient3.y;
			stageContent.addChild(clone3);
	
			var mask3 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient3.getBounds().height*2));
			mask3.y = clone3.y;
			mask3.rotation = 15;
			clone3.mask = mask3;
			createjs.Tween.get(mask3).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
	
			var clone4 = new createjs.Bitmap(relational.cacheCanvas);
			clone4.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone4.cache(0,0,relational.image.width,relational.image.height);
			clone4.regX = relational.regX;
			clone4.regY = relational.regY;
			clone4.x = relational.x;
			clone4.y = relational.y;
			stageContent.addChild(clone4);
	
			var mask4 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,relational.image.height*2));
			mask4.y = clone4.y;
			mask4.rotation = 15;
			clone4.mask = mask4;
			createjs.Tween.get(mask4).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient4 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient4.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient4.cache(0,0,relational.image.width,relational.image.height);
			gradient4.regX = relational.regX;
			gradient4.regY = relational.regY;
			gradient4.x = relational.x;
			gradient4.y = relational.y;
	
			animateStraplineIn(gradient4, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
		}
		else {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
		}
	}

	var delayUntilNextFrame = parseInt(currentFrame['frame-animation-duration']);

	setTimeout(function() {
		if ( stageContent.contains(headline) ) {
			stageContent.removeChild(headline);
		}
		if ( stageContent.contains(image) ) {
			//stageContent.removeChild(image);
		}
		if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
			stageContent.removeChild(gradient1);
			stageContent.removeChild(clone1);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
			stageContent.removeChild(headline);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes" ) {
			stageContent.removeChild(gradient2);
		}
		if ( stageContent.contains(relational) ) {
			stageContent.removeChild(relational);
		}
		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			stageContent.removeChild(gradient3);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			stageContent.removeChild(clone4);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes" ) {
			stageContent.removeChild(gradient4);
		}
		determineWhichFrameShouldBeDrawn();
	},delayUntilNextFrame);
}

function createOfferFrameTypeTwo() {
	if ( currentFrame.hasOwnProperty("show-logo") ) {
		if ( currentFrame['show-logo'] === true ) {
			placeSkyLogo();
		}
		else { 
			removeSkyLogo();
		}
	}
	
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regX = Math.floor(headline.image.width * 0.5);
	headline.regY = 0;
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 150;
	headline.y = currentFrame.hasOwnProperty("headline-y-position") ? currentFrame['headline-y-position'] : 15;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient1 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient1.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient1.cache(0,0,headline.image.width,headline.image.height);
		gradient1.regX = headline.regX;
		gradient1.regY = headline.regY;
		gradient1.x = headline.x;
		gradient1.y = headline.y;

		animateStraplineIn(gradient1, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);

		var clone1 = new createjs.Bitmap(headline.cacheCanvas);
		clone1.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone1.cache(0,0,clone1.image.width,clone1.image.height);
		clone1.regX = gradient1.regX;
		clone1.regY = gradient1.regY;
		clone1.x = gradient1.x;
		clone1.y = gradient1.y;
		stageContent.addChild(clone1);

		var mask1 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient1.getBounds().height*2));
		mask1.rotation = 15;
		mask1.y = clone1.y;
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);

		var clone2 = new createjs.Bitmap(headline.cacheCanvas);
		clone2.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone2.cache(0,0,headline.image.width,headline.image.height);
		clone2.regX = headline.regX;
		clone2.regY = headline.regY;
		clone2.x = headline.x;
		clone2.y = headline.y;
		stageContent.addChild(clone2);

		var mask2 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,headline.image.height*2));
		mask2.rotation = 15;
		mask2.y = clone2.y;
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient2 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient2.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient2.cache(0,0,headline.image.width,headline.image.height);
		gradient2.regX = headline.regX;
		gradient2.regY = headline.regY;
		gradient2.x = headline.x;
		gradient2.y = headline.y;

		animateStraplineIn(gradient2, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}
	else {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}

	if ( currentFrame.hasOwnProperty("relational-image") ) {
		var relational = new createjs.Bitmap(imageCache["relational-image-"+frameIndex].image);
		relational.regX = Math.floor(relational.image.width * 0.5);
		relational.regY = 0;
		relational.x = currentFrame.hasOwnProperty('relational-x-position') ? currentFrame['relational-x-position'] : 150;
		relational.y = currentFrame.hasOwnProperty('relational-y-position') ? currentFrame['relational-y-position'] : 190;
		relational.cache(0,0,relational.image.width,relational.image.height);

		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient3 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient3.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient3.cache(0,0,relational.image.width,relational.image.height);
			gradient3.regX = relational.regX;
			gradient3.regY = relational.regY;
			gradient3.x = relational.x;
			gradient3.y = relational.y;
	
			animateStraplineIn(gradient3, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
	
			var clone3 = new createjs.Bitmap(relational.cacheCanvas);
			clone3.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone3.cache(0,0,clone3.image.width,clone3.image.height);
			clone3.regX = gradient3.regX;
			clone3.regY = gradient3.regY;
			clone3.x = gradient3.x;
			clone3.y = gradient3.y;
			stageContent.addChild(clone3);
	
			var mask3 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient3.getBounds().height*2));
			mask3.y = clone3.y;
			mask3.rotation = 15;
			clone3.mask = mask3;
			createjs.Tween.get(mask3).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
	
			var clone4 = new createjs.Bitmap(relational.cacheCanvas);
			clone4.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone4.cache(0,0,relational.image.width,relational.image.height);
			clone4.regX = relational.regX;
			clone4.regY = relational.regY;
			clone4.x = relational.x;
			clone4.y = relational.y;
			stageContent.addChild(clone4);
	
			var mask4 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,relational.image.height*2));
			mask4.y = clone4.y;
			mask4.rotation = 15;
			clone4.mask = mask4;
			createjs.Tween.get(mask4).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient4 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient4.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient4.cache(0,0,relational.image.width,relational.image.height);
			gradient4.regX = relational.regX;
			gradient4.regY = relational.regY;
			gradient4.x = relational.x;
			gradient4.y = relational.y;
	
			animateStraplineIn(gradient4, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
		}
		else {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
		}
	}

	var delayUntilNextFrame = parseInt(currentFrame['frame-animation-duration']);

	setTimeout(function() {
		if ( stageContent.contains(headline) ) {
			stageContent.removeChild(headline);
		}
		if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
			stageContent.removeChild(gradient1);
			stageContent.removeChild(clone1);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
			stageContent.removeChild(headline);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes" ) {
			stageContent.removeChild(gradient2);
		}
		if ( stageContent.contains(relational) ) {
			stageContent.removeChild(relational);
		}
		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			stageContent.removeChild(gradient3);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			stageContent.removeChild(clone4);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes" ) {
			stageContent.removeChild(gradient4);
		}
		determineWhichFrameShouldBeDrawn();
	},delayUntilNextFrame);
}

function createOfferFrameTypeThree() {
	if ( currentFrame.hasOwnProperty("show-logo") ) {
		if ( currentFrame['show-logo'] === true ) {
			placeSkyLogo();
		}
		else { 
			removeSkyLogo();
		}
	}
	
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regX = Math.floor(headline.image.width * 0.5);
	headline.regY = 0;
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 150;
	headline.y = currentFrame.hasOwnProperty("headline-y-position") ? currentFrame['headline-y-position'] : 15;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient1 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient1.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient1.cache(0,0,headline.image.width,headline.image.height);
		gradient1.regX = headline.regX;
		gradient1.regY = headline.regY;
		gradient1.x = headline.x;
		gradient1.y = headline.y;

		animateStraplineIn(gradient1, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);

		var clone1 = new createjs.Bitmap(headline.cacheCanvas);
		clone1.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone1.cache(0,0,clone1.image.width,clone1.image.height);
		clone1.regX = gradient1.regX;
		clone1.regY = gradient1.regY;
		clone1.x = gradient1.x;
		clone1.y = gradient1.y;
		stageContent.addChild(clone1);

		var mask1 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient1.getBounds().height*2));
		mask1.rotation = 15;
		mask1.y = clone1.y;
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);

		var clone2 = new createjs.Bitmap(headline.cacheCanvas);
		clone2.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone2.cache(0,0,headline.image.width,headline.image.height);
		clone2.regX = headline.regX;
		clone2.regY = headline.regY;
		clone2.x = headline.x;
		clone2.y = headline.y;
		stageContent.addChild(clone2);

		var mask2 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,headline.image.height*2));
		mask2.rotation = 15;
		mask2.y = clone2.y;
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient2 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient2.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient2.cache(0,0,headline.image.width,headline.image.height);
		gradient2.regX = headline.regX;
		gradient2.regY = headline.regY;
		gradient2.x = headline.x;
		gradient2.y = headline.y;

		animateStraplineIn(gradient2, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}
	else {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}

	var image = new createjs.Bitmap(queue.getResult("image-"+frameIndex));
	image.name = 'image-1';
	animateIn(image, currentFrame['image-animation-in'], currentFrame['image-animation-out'], currentFrame['image-animation-duration']);

	if ( currentFrame.hasOwnProperty("relational-image") ) {
		var relational = new createjs.Bitmap(imageCache["relational-image-"+frameIndex].image);
		relational.regX = Math.floor(relational.image.width * 0.5);
		relational.regY = 0;
		relational.x = currentFrame.hasOwnProperty('relational-x-position') ? currentFrame['relational-x-position'] : 150;
		relational.y = currentFrame.hasOwnProperty('relational-y-position') ? currentFrame['relational-y-position'] : 190;
		relational.cache(0,0,relational.image.width,relational.image.height);

		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient3 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient3.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient3.cache(0,0,relational.image.width,relational.image.height);
			gradient3.regX = relational.regX;
			gradient3.regY = relational.regY;
			gradient3.x = relational.x;
			gradient3.y = relational.y;
	
			animateStraplineIn(gradient3, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
	
			var clone3 = new createjs.Bitmap(relational.cacheCanvas);
			clone3.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone3.cache(0,0,clone3.image.width,clone3.image.height);
			clone3.regX = gradient3.regX;
			clone3.regY = gradient3.regY;
			clone3.x = gradient3.x;
			clone3.y = gradient3.y;
			stageContent.addChild(clone3);
	
			var mask3 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient3.getBounds().height*2));
			mask3.y = clone3.y;
			mask3.rotation = 15;
			clone3.mask = mask3;
			createjs.Tween.get(mask3).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
	
			var clone4 = new createjs.Bitmap(relational.cacheCanvas);
			clone4.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone4.cache(0,0,relational.image.width,relational.image.height);
			clone4.regX = relational.regX;
			clone4.regY = relational.regY;
			clone4.x = relational.x;
			clone4.y = relational.y;
			stageContent.addChild(clone4);
	
			var mask4 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,relational.image.height*2));
			mask4.y = clone4.y;
			mask4.rotation = 15;
			clone4.mask = mask4;
			createjs.Tween.get(mask4).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient4 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient4.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient4.cache(0,0,relational.image.width,relational.image.height);
			gradient4.regX = relational.regX;
			gradient4.regY = relational.regY;
			gradient4.x = relational.x;
			gradient4.y = relational.y;
	
			animateStraplineIn(gradient4, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
		}
		else {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
		}
	}

	var delayUntilNextFrame = parseInt(currentFrame['frame-animation-duration']);

	setTimeout(function() {
		if ( stageContent.contains(headline) ) {
			stageContent.removeChild(headline);
		}
		if ( stageContent.contains(image) ) {
			//stageContent.removeChild(image);
		}
		if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
			stageContent.removeChild(gradient1);
			stageContent.removeChild(clone1);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
			stageContent.removeChild(headline);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes" ) {
			stageContent.removeChild(gradient2);
		}
		if ( stageContent.contains(relational) ) {
			stageContent.removeChild(relational);
		}
		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			stageContent.removeChild(gradient3);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			stageContent.removeChild(clone4);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes" ) {
			stageContent.removeChild(gradient4);
		}
		determineWhichFrameShouldBeDrawn();
	},delayUntilNextFrame);
}

function createContentFrame() {
	if ( currentFrame.hasOwnProperty("show-logo") ) {
		if ( currentFrame['show-logo'] === true ) {
			placeSkyLogo();
		}
		else { 
			removeSkyLogo();
		}
	}
	
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regX = Math.floor(headline.image.width * 0.5);
	headline.regY = 0;
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 150;
	headline.y = currentFrame.hasOwnProperty("headline-y-position") ? currentFrame['headline-y-position'] : 15;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient1 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient1.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient1.cache(0,0,headline.image.width,headline.image.height);
		gradient1.regX = headline.regX;
		gradient1.regY = headline.regY;
		gradient1.x = headline.x;
		gradient1.y = headline.y;

		animateStraplineIn(gradient1, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);

		var clone1 = new createjs.Bitmap(headline.cacheCanvas);
		clone1.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone1.cache(0,0,clone1.image.width,clone1.image.height);
		clone1.regX = gradient1.regX;
		clone1.regY = gradient1.regY;
		clone1.x = gradient1.x;
		clone1.y = gradient1.y;
		stageContent.addChild(clone1);

		var mask1 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient1.getBounds().height*2));
		mask1.rotation = 15;
		mask1.y = clone1.y;
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);

		var clone2 = new createjs.Bitmap(headline.cacheCanvas);
		clone2.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone2.cache(0,0,headline.image.width,headline.image.height);
		clone2.regX = headline.regX;
		clone2.regY = headline.regY;
		clone2.x = headline.x;
		clone2.y = headline.y;
		stageContent.addChild(clone2);

		var mask2 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,headline.image.height*2));
		mask2.rotation = 15;
		mask2.y = clone2.y;
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient2 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient2.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient2.cache(0,0,headline.image.width,headline.image.height);
		gradient2.regX = headline.regX;
		gradient2.regY = headline.regY;
		gradient2.x = headline.x;
		gradient2.y = headline.y;

		animateStraplineIn(gradient2, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}
	else {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}

	var image = new createjs.Bitmap(queue.getResult("image-"+frameIndex));
	animateIn(image, currentFrame['image-animation-in'], currentFrame['image-animation-out'], currentFrame['image-animation-duration']);

	if ( currentFrame.hasOwnProperty("relational-image") ) {
		var relational = new createjs.Bitmap(imageCache["relational-image-"+frameIndex].image);
		relational.regX = Math.floor(relational.image.width * 0.5);
		relational.regY = 0;
		relational.x = currentFrame.hasOwnProperty('relational-x-position') ? currentFrame['relational-x-position'] : 150;
		relational.y = currentFrame.hasOwnProperty('relational-y-position') ? currentFrame['relational-y-position'] : 220;
		relational.cache(0,0,relational.image.width,relational.image.height);

		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient3 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient3.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient3.cache(0,0,relational.image.width,relational.image.height);
			gradient3.regX = relational.regX;
			gradient3.regY = relational.regY;
			gradient3.x = relational.x;
			gradient3.y = relational.y;
	
			animateStraplineIn(gradient3, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
	
			var clone3 = new createjs.Bitmap(relational.cacheCanvas);
			clone3.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone3.cache(0,0,clone3.image.width,clone3.image.height);
			clone3.regX = gradient3.regX;
			clone3.regY = gradient3.regY;
			clone3.x = gradient3.x;
			clone3.y = gradient3.y;
			stageContent.addChild(clone3);
	
			var mask3 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient3.getBounds().height*2));
			mask3.y = clone3.y;
			mask3.rotation = 15;
			clone3.mask = mask3;
			createjs.Tween.get(mask3).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
	
			var clone4 = new createjs.Bitmap(relational.cacheCanvas);
			clone4.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone4.cache(0,0,relational.image.width,relational.image.height);
			clone4.regX = relational.regX;
			clone4.regY = relational.regY;
			clone4.x = relational.x;
			clone4.y = relational.y;
			stageContent.addChild(clone4);
	
			var mask4 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,relational.image.height*2));
			mask4.y = clone4.y;
			mask4.rotation = 15;
			clone4.mask = mask4;
			createjs.Tween.get(mask4).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient4 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient4.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient4.cache(0,0,relational.image.width,relational.image.height);
			gradient4.regX = relational.regX;
			gradient4.regY = relational.regY;
			gradient4.x = relational.x;
			gradient4.y = relational.y;
	
			animateStraplineIn(gradient4, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
		}
		else {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
		}
	}

	var delayUntilNextFrame = parseInt(currentFrame['frame-animation-duration']);

	setTimeout(function() {
		if ( stageContent.contains(headline) ) {
			stageContent.removeChild(headline);
		}
		if ( stageContent.contains(image) ) {
			stageContent.removeChild(image);
		}
		if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
			stageContent.removeChild(gradient1);
			stageContent.removeChild(clone1);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
			stageContent.removeChild(headline);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes" ) {
			stageContent.removeChild(gradient2);
		}
		if ( stageContent.contains(relational) ) {
			stageContent.removeChild(relational);
		}
		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			stageContent.removeChild(gradient3);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			stageContent.removeChild(clone4);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes" ) {
			stageContent.removeChild(gradient4);
		}
		determineWhichFrameShouldBeDrawn();
	},delayUntilNextFrame);
}

function createPriceFrame() {
	if ( currentFrame.hasOwnProperty("show-logo") ) {
		if ( currentFrame['show-logo'] === true ) {
			placeSkyLogo();
		}
		else { 
			removeSkyLogo();
		}
	}
	
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regX = Math.floor(headline.image.width * 0.5);
	headline.regY = 0;
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 150;
	headline.y = currentFrame.hasOwnProperty("headline-y-position") ? currentFrame['headline-y-position'] : 15;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient1 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient1.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient1.cache(0,0,headline.image.width,headline.image.height);
		gradient1.regX = headline.regX;
		gradient1.regY = headline.regY;
		gradient1.x = headline.x;
		gradient1.y = headline.y;

		animateStraplineIn(gradient1, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);

		var clone1 = new createjs.Bitmap(headline.cacheCanvas);
		clone1.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone1.cache(0,0,clone1.image.width,clone1.image.height);
		clone1.regX = gradient1.regX;
		clone1.regY = gradient1.regY;
		clone1.x = gradient1.x;
		clone1.y = gradient1.y;
		stageContent.addChild(clone1);

		var mask1 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient1.getBounds().height*2));
		mask1.rotation = 15;
		mask1.y = clone1.y;
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);

		var clone2 = new createjs.Bitmap(headline.cacheCanvas);
		clone2.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone2.cache(0,0,headline.image.width,headline.image.height);
		clone2.regX = headline.regX;
		clone2.regY = headline.regY;
		clone2.x = headline.x;
		clone2.y = headline.y;
		stageContent.addChild(clone2);

		var mask2 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,headline.image.height*2));
		mask2.rotation = 15;
		mask2.y = clone2.y;
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient2 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient2.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient2.cache(0,0,headline.image.width,headline.image.height);
		gradient2.regX = headline.regX;
		gradient2.regY = headline.regY;
		gradient2.x = headline.x;
		gradient2.y = headline.y;

		animateStraplineIn(gradient2, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}
	else {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}

	if ( currentFrame.hasOwnProperty("relational-image") ) {
		var relational = new createjs.Bitmap(imageCache["relational-image-"+frameIndex].image);
		relational.regX = Math.floor(relational.image.width * 0.5);
		relational.regY = 0;
		relational.x = currentFrame.hasOwnProperty('relational-x-position') ? currentFrame['relational-x-position'] : 150;
		relational.y = currentFrame.hasOwnProperty('relational-y-position') ? currentFrame['relational-y-position'] : 190;
		relational.cache(0,0,relational.image.width,relational.image.height);

		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient3 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient3.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient3.cache(0,0,relational.image.width,relational.image.height);
			gradient3.regX = relational.regX;
			gradient3.regY = relational.regY;
			gradient3.x = relational.x;
			gradient3.y = relational.y;
	
			animateStraplineIn(gradient3, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
	
			var clone3 = new createjs.Bitmap(relational.cacheCanvas);
			clone3.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone3.cache(0,0,clone3.image.width,clone3.image.height);
			clone3.regX = gradient3.regX;
			clone3.regY = gradient3.regY;
			clone3.x = gradient3.x;
			clone3.y = gradient3.y;
			stageContent.addChild(clone3);
	
			var mask3 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient3.getBounds().height*2));
			mask3.y = clone3.y;
			mask3.rotation = 15;
			clone3.mask = mask3;
			createjs.Tween.get(mask3).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
	
			var clone4 = new createjs.Bitmap(relational.cacheCanvas);
			clone4.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone4.cache(0,0,relational.image.width,relational.image.height);
			clone4.regX = relational.regX;
			clone4.regY = relational.regY;
			clone4.x = relational.x;
			clone4.y = relational.y;
			stageContent.addChild(clone4);
	
			var mask4 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,relational.image.height*2));
			mask4.y = clone4.y;
			mask4.rotation = 15;
			clone4.mask = mask4;
			createjs.Tween.get(mask4).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient4 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient4.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient4.cache(0,0,relational.image.width,relational.image.height);
			gradient4.regX = relational.regX;
			gradient4.regY = relational.regY;
			gradient4.x = relational.x;
			gradient4.y = relational.y;
	
			animateStraplineIn(gradient4, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
		}
		else {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
		}
	}

	var delayUntilNextFrame = parseInt(currentFrame['frame-animation-duration']);

	setTimeout(function() {
		if ( stageContent.contains(headline) ) {
			stageContent.removeChild(headline);
		}
		if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
			stageContent.removeChild(gradient1);
			stageContent.removeChild(clone1);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
			stageContent.removeChild(headline);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes" ) {
			stageContent.removeChild(gradient2);
		}
		if ( stageContent.contains(relational) ) {
			stageContent.removeChild(relational);
		}
		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			stageContent.removeChild(gradient3);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			stageContent.removeChild(clone4);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes" ) {
			stageContent.removeChild(gradient4);
		}
		determineWhichFrameShouldBeDrawn();
	},delayUntilNextFrame);
}

function createRoundelFrame() {
	if ( currentFrame.hasOwnProperty("show-logo") ) {
		if ( currentFrame['show-logo'] === true ) {
			placeSkyLogo();
		}
		else { 
			removeSkyLogo();
		}
	}
	
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regX = Math.floor(headline.image.width * 0.5);
	headline.regY = 0;
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 150;
	headline.y = currentFrame.hasOwnProperty("headline-y-position") ? currentFrame['headline-y-position'] : 15;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient1 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient1.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient1.cache(0,0,headline.image.width,headline.image.height);
		gradient1.regX = headline.regX;
		gradient1.regY = headline.regY;
		gradient1.x = headline.x;
		gradient1.y = headline.y;

		animateStraplineIn(gradient1, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);

		var clone1 = new createjs.Bitmap(headline.cacheCanvas);
		clone1.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone1.cache(0,0,clone1.image.width,clone1.image.height);
		clone1.regX = gradient1.regX;
		clone1.regY = gradient1.regY;
		clone1.x = gradient1.x;
		clone1.y = gradient1.y;
		stageContent.addChild(clone1);

		var mask1 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient1.getBounds().height*2));
		mask1.rotation = 15;
		mask1.y = clone1.y;
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);

		var clone2 = new createjs.Bitmap(headline.cacheCanvas);
		clone2.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone2.cache(0,0,headline.image.width,headline.image.height);
		clone2.regX = headline.regX;
		clone2.regY = headline.regY;
		clone2.x = headline.x;
		clone2.y = headline.y;
		stageContent.addChild(clone2);

		var mask2 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,headline.image.height*2));
		mask2.rotation = 15;
		mask2.y = clone2.y;
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient2 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient2.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient2.cache(0,0,headline.image.width,headline.image.height);
		gradient2.regX = headline.regX;
		gradient2.regY = headline.regY;
		gradient2.x = headline.x;
		gradient2.y = headline.y;

		animateStraplineIn(gradient2, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}
	else {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}

	var roundel = new createjs.Bitmap(queue.getResult("large-roundel"));
	roundel.regX = Math.floor(roundel.image.width * 0.5);
	roundel.regY = Math.floor(roundel.image.height * 0.5);
	roundel.x = 150;
	roundel.y = 125;
	animateRoundelIn(roundel, currentFrame['roundel-image-animation-in'], currentFrame['roundel-image-animation-out'], currentFrame['roundel-image-animation-duration']);

	if ( currentFrame.hasOwnProperty("roundel-sheen") ) {
		if ( currentFrame['roundel-sheen'] === "yes"  ) {
			var roundelSheenMask = new createjs.Shape(new createjs.Graphics().beginFill('red').drawCircle(0, 0, roundel.image.width* 0.5));
			roundelSheenMask.x = 150;
			roundelSheenMask.y = 125;

			var roundelSheen = new createjs.Shape();
			roundelSheen.graphics.beginLinearGradientFill(['rgba(255,255,255,0.5)','rgba(255,255,255,.8)','rgba(255,255,255,0.5)'], [0,0.5,1], 0, 0 , 30, 0).drawRect(0,0,20,200);
			roundelSheen.rotation = 20;
			roundelSheen.alpha = 0.7;
			roundelSheen.y = 50;
			roundelSheen.x = 70;

			var sheenBlurFilter = new createjs.BlurFilter(10,2,0);
			roundelSheen.filters = [sheenBlurFilter];
			roundelSheen.cache(0, 0, 100, 200);

			stageContent.addChild(roundelSheen);
			roundelSheen.mask = roundelSheenMask;

			createjs.Tween.get(roundelSheen).wait(1000).to({x:350},500).call(function(){
				stageContent.removeChild(roundelSheen);
			});
		}
	}

	if ( currentFrame.hasOwnProperty("relational-image") ) {
		var relational = new createjs.Bitmap(imageCache["relational-image-"+frameIndex].image);
		relational.regX = Math.floor(relational.image.width * 0.5);
		relational.regY = 0;
		relational.x = currentFrame.hasOwnProperty('relational-x-position') ? currentFrame['relational-x-position'] : 150;
		relational.y = currentFrame.hasOwnProperty('relational-y-position') ? currentFrame['relational-y-position'] : 190;
		relational.cache(0,0,relational.image.width,relational.image.height);

		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient3 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient3.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient3.cache(0,0,relational.image.width,relational.image.height);
			gradient3.regX = relational.regX;
			gradient3.regY = relational.regY;
			gradient3.x = relational.x;
			gradient3.y = relational.y;
	
			animateStraplineIn(gradient3, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
	
			var clone3 = new createjs.Bitmap(relational.cacheCanvas);
			clone3.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone3.cache(0,0,clone3.image.width,clone3.image.height);
			clone3.regX = gradient3.regX;
			clone3.regY = gradient3.regY;
			clone3.x = gradient3.x;
			clone3.y = gradient3.y;
			stageContent.addChild(clone3);
	
			var mask3 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient3.getBounds().height*2));
			mask3.y = clone3.y;
			mask3.rotation = 15;
			clone3.mask = mask3;
			createjs.Tween.get(mask3).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
	
			var clone4 = new createjs.Bitmap(relational.cacheCanvas);
			clone4.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone4.cache(0,0,relational.image.width,relational.image.height);
			clone4.regX = relational.regX;
			clone4.regY = relational.regY;
			clone4.x = relational.x;
			clone4.y = relational.y;
			stageContent.addChild(clone4);
	
			var mask4 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,relational.image.height*2));
			mask4.y = clone4.y;
			mask4.rotation = 15;
			clone4.mask = mask4;
			createjs.Tween.get(mask4).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient4 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient4.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient4.cache(0,0,relational.image.width,relational.image.height);
			gradient4.regX = relational.regX;
			gradient4.regY = relational.regY;
			gradient4.x = relational.x;
			gradient4.y = relational.y;
	
			animateStraplineIn(gradient4, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
		}
		else {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], currentFrame['relational-image-animation-out'], currentFrame['relational-image-animation-duration']);
		}
	}

	var delayUntilNextFrame = parseInt(currentFrame['frame-animation-duration']);

	setTimeout(function() {
		if ( stageContent.contains(roundel) ) {
			stageContent.removeChild(roundel);
		}
		if ( stageContent.contains(headline) ) {
			stageContent.removeChild(headline);
		}
		if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
			stageContent.removeChild(gradient1);
			stageContent.removeChild(clone1);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
			stageContent.removeChild(headline);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes" ) {
			stageContent.removeChild(gradient2);
		}
		if ( stageContent.contains(relational) ) {
			stageContent.removeChild(relational);
		}
		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			stageContent.removeChild(gradient3);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			stageContent.removeChild(clone4);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes" ) {
			stageContent.removeChild(gradient4);
		}
		determineWhichFrameShouldBeDrawn();
	},delayUntilNextFrame);
}

function createRoundelEndFrame() {
	if ( currentFrame.hasOwnProperty("show-logo") ) {
		if ( currentFrame['show-logo'] === true ) {
			placeSkyLogo();
			brandContent.getChildByName("skyLogo").x = currentFrame.hasOwnProperty('logo-position') ? currentFrame['logo-position'].x : 150;
			brandContent.getChildByName("skyLogo").y = currentFrame.hasOwnProperty('logo-position') ? currentFrame['logo-position'].y : 187;
		}
		else { 
			removeSkyLogo();
		}
	}
	
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regX = Math.floor(headline.image.width * 0.5);
	headline.regY = 0;
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 150;
	headline.y = currentFrame.hasOwnProperty("headline-y-position") ? currentFrame['headline-y-position'] : 15;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient1 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient1.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient1.cache(0,0,headline.image.width,headline.image.height);
		gradient1.regX = headline.regX;
		gradient1.regY = headline.regY;
		gradient1.x = headline.x;
		gradient1.y = headline.y;

		animateStraplineIn(gradient1, currentFrame['headline-animation-in'], null, null);

		var clone1 = new createjs.Bitmap(headline.cacheCanvas);
		clone1.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone1.cache(0,0,clone1.image.width,clone1.image.height);
		clone1.regX = gradient1.regX;
		clone1.regY = gradient1.regY;
		clone1.x = gradient1.x;
		clone1.y = gradient1.y;
		stageContent.addChild(clone1);

		var mask1 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient1.getBounds().height*2));
		mask1.rotation = 15;
		mask1.y = clone1.y;
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], null, null);

		var clone2 = new createjs.Bitmap(headline.cacheCanvas);
		clone2.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone2.cache(0,0,headline.image.width,headline.image.height);
		clone2.regX = headline.regX;
		clone2.regY = headline.regY;
		clone2.x = headline.x;
		clone2.y = headline.y;
		stageContent.addChild(clone2);

		var mask2 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,headline.image.height*2));
		mask2.rotation = 15;
		mask2.y = clone2.y;
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient2 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient2.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient2.cache(0,0,headline.image.width,headline.image.height);
		gradient2.regX = headline.regX;
		gradient2.regY = headline.regY;
		gradient2.x = headline.x;
		gradient2.y = headline.y;

		animateStraplineIn(gradient2, currentFrame['headline-animation-in'], null, null);
	}
	else {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], null, null);
	}

	if ( currentFrame.hasOwnProperty("relational-image") ) {
		var relational = new createjs.Bitmap(imageCache["relational-image-"+frameIndex].image);
		relational.regX = Math.floor(relational.image.width * 0.5);
		relational.regY = 0;
		relational.x = currentFrame.hasOwnProperty('relational-x-position') ? currentFrame['relational-x-position'] : 150;
		relational.y = currentFrame.hasOwnProperty('relational-y-position') ? currentFrame['relational-y-position'] : 50;
		relational.cache(0,0,relational.image.width,relational.image.height);

		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient3 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient3.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient3.cache(0,0,relational.image.width,relational.image.height);
			gradient3.regX = relational.regX;
			gradient3.regY = relational.regY;
			gradient3.x = relational.x;
			gradient3.y = relational.y;
	
			animateStraplineIn(gradient3, currentFrame['relational-image-animation-in'], null, null);
	
			var clone3 = new createjs.Bitmap(relational.cacheCanvas);
			clone3.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone3.cache(0,0,clone3.image.width,clone3.image.height);
			clone3.regX = gradient3.regX;
			clone3.regY = gradient3.regY;
			clone3.x = gradient3.x;
			clone3.y = gradient3.y;
			stageContent.addChild(clone3);
	
			var mask3 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient3.getBounds().height*2));
			mask3.y = clone3.y;
			mask3.rotation = 15;
			clone3.mask = mask3;
			createjs.Tween.get(mask3).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], null, null);
	
			var clone4 = new createjs.Bitmap(relational.cacheCanvas);
			clone4.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone4.cache(0,0,relational.image.width,relational.image.height);
			clone4.regX = relational.regX;
			clone4.regY = relational.regY;
			clone4.x = relational.x;
			clone4.y = relational.y;
			stageContent.addChild(clone4);
	
			var mask4 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,relational.image.height*2));
			mask4.y = clone4.y;
			mask4.rotation = 15;
			clone4.mask = mask4;
			createjs.Tween.get(mask4).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient4 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient4.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient4.cache(0,0,relational.image.width,relational.image.height);
			gradient4.regX = relational.regX;
			gradient4.regY = relational.regY;
			gradient4.x = relational.x;
			gradient4.y = relational.y;
	
			animateStraplineIn(gradient4, currentFrame['relational-image-animation-in'], null, null);
		}
		else {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], null, null);
		}
	}

	var callToAction = new createjs.Bitmap(queue.getResult("cta-image-"+frameIndex));
	callToAction.regX = Math.floor(callToAction.image.width * 0.5);
	callToAction.regY = Math.floor(callToAction.image.height * 0.5);
	callToAction.x = 150;
	callToAction.y = 122;
	callToAction.alpha = 0;
	stageContent.addChild(callToAction);
	createjs.Tween.get(callToAction).to({alpha:1},500);

	if ( currentFrame.hasOwnProperty("cta-sheen") && currentFrame['cta-sheen'] === "yes" ) {
		var callToActionMask = new createjs.Shape();
		callToActionMask.graphics.beginFill('red').drawRoundRect(0, 0, 148, 35, 8);
		callToActionMask.regX = 74;
		callToActionMask.regY = 17.5;
		callToActionMask.x = 150;
		callToActionMask.y = 122;
		
		var callToActionSheen = new createjs.Shape();
		callToActionSheen.alpha = 0.7;
		callToActionSheen.graphics.beginLinearGradientFill(['rgba(255,255,255,0.5)','rgba(255,255,255,0.8)','rgba(255,255,255,0.5)'], [0,0.5,1], 0, 0 , 30, 0).drawRect(0,0,30,100);
		callToActionSheen.rotation = 30;
		callToActionSheen.y = 70;
		callToActionSheen.x = 50;

		var callToAcitonBlurFilter = new createjs.BlurFilter(10,2,0);
		callToActionSheen.filters = [callToAcitonBlurFilter];
		callToActionSheen.cache(-20,-20,50,150);
		callToActionSheen.mask = callToActionMask;
		stageContent.addChild(callToActionSheen);

		createjs.Tween.get(callToActionSheen).wait(1500).to({x:300},500).call(function(){
			stageContent.removeChild(callToActionSheen);
		});
	}

	var roundel = new createjs.Bitmap(queue.getResult("small-roundel"));
	roundel.regX = Math.floor(roundel.image.width * 0.5);
	roundel.regY = Math.floor(roundel.image.height * 0.5);
	roundel.x = 256;
	roundel.y = 184;
	roundel.alpha = 0;
	stageContent.addChild(roundel);
	createjs.Tween.get(roundel).to({alpha:1},500);

	if ( currentFrame.hasOwnProperty("roundel-sheen") ) {
		if ( currentFrame['roundel-sheen'] === "yes" ) {
			var roundelSheenMask = new createjs.Shape(new createjs.Graphics().beginFill('red').drawCircle(0, 0, roundel.image.width*0.5));
			roundelSheenMask.x = 256;
			roundelSheenMask.y = 184;

			var roundelSheen = new createjs.Shape();
			roundelSheen.graphics.beginLinearGradientFill(['rgba(255,255,255,0.5)','rgba(255,255,255,0.8)','rgba(255,255,255,0.5)'], [0,0.5,1], 0, 0 , 30, 0).drawRect(0,0,20,150);
			roundelSheen.rotation = 20;
			roundelSheen.alpha = 0.7;
			roundelSheen.y = 150;
			roundelSheen.x = 200;

			var sheenBlurFilter = new createjs.BlurFilter(10,2,0);
			roundelSheen.filters = [sheenBlurFilter];
			roundelSheen.cache(0, 0, 100, 100);

			stageContent.addChild(roundelSheen);
			roundelSheen.mask = roundelSheenMask;

			createjs.Tween.get(roundelSheen).wait(2000).to({x:350},500).call(function(){
				stageContent.removeChild(roundelSheen);
			});
		}
	}
	setTimeout(function(){
		if ( evaluateLoopingOfBanner() ) {
			if ( stageContent.contains(callToAction) ) {
				stageContent.removeChild(callToAction);
			}
			if ( stageContent.contains(roundel) ) {
				stageContent.removeChild(roundel);
			}
			if ( stageContent.contains(headline) ) {
				stageContent.removeChild(headline);
			}
			if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
				stageContent.removeChild(gradient1);
				stageContent.removeChild(clone1);
			}
			else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
				stageContent.removeChild(headline);
			}
			else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes" ) {
				stageContent.removeChild(gradient2);
			}
			if ( stageContent.contains(relational) ) {
				stageContent.removeChild(relational);
			}
			if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
				stageContent.removeChild(gradient3);
			}
			else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
				stageContent.removeChild(clone4);
			}
			else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes" ) {
				stageContent.removeChild(gradient4);
			}
			determineWhichFrameShouldBeDrawn();
		}
	},3500);
}

function createEndFrame() {
	if ( currentFrame.hasOwnProperty("show-logo") ) {
		if ( currentFrame['show-logo'] === true ) {
			placeSkyLogo();
			brandContent.getChildByName("skyLogo").x = currentFrame.hasOwnProperty('logo-position') ? currentFrame['logo-position'].x : 150;
			brandContent.getChildByName("skyLogo").y = currentFrame.hasOwnProperty('logo-position') ? currentFrame['logo-position'].y : 187;
		}
		else { 
			removeSkyLogo();
		}
	}
	
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regX = Math.floor(headline.image.width * 0.5);
	headline.regY = 0;
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 150;
	headline.y = currentFrame.hasOwnProperty("headline-y-position") ? currentFrame['headline-y-position'] : 15;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient1 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient1.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient1.cache(0,0,headline.image.width,headline.image.height);
		gradient1.regX = headline.regX;
		gradient1.regY = headline.regY;
		gradient1.x = headline.x;
		gradient1.y = headline.y;

		animateStraplineIn(gradient1, currentFrame['headline-animation-in'], null, null);

		var clone1 = new createjs.Bitmap(headline.cacheCanvas);
		clone1.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone1.cache(0,0,clone1.image.width,clone1.image.height);
		clone1.regX = gradient1.regX;
		clone1.regY = gradient1.regY;
		clone1.x = gradient1.x;
		clone1.y = gradient1.y;
		stageContent.addChild(clone1);

		var mask1 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient1.getBounds().height*2));
		mask1.rotation = 15;
		mask1.y = clone1.y;
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], null, null);

		var clone2 = new createjs.Bitmap(headline.cacheCanvas);
		clone2.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone2.cache(0,0,headline.image.width,headline.image.height);
		clone2.regX = headline.regX;
		clone2.regY = headline.regY;
		clone2.x = headline.x;
		clone2.y = headline.y;
		stageContent.addChild(clone2);

		var mask2 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,headline.image.height*2));
		mask2.rotation = 15;
		mask2.y = clone2.y;
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient2 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient2.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient2.cache(0,0,headline.image.width,headline.image.height);
		gradient2.regX = headline.regX;
		gradient2.regY = headline.regY;
		gradient2.x = headline.x;
		gradient2.y = headline.y;

		animateStraplineIn(gradient2, currentFrame['headline-animation-in'], null, null);
	}
	else {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], null, null);
	}

	if ( currentFrame.hasOwnProperty("relational-image") ) {
		var relational = new createjs.Bitmap(imageCache["relational-image-"+frameIndex].image);
		relational.regX = Math.floor(relational.image.width * 0.5);
		relational.regY = 0;
		relational.x = currentFrame.hasOwnProperty('relational-x-position') ? currentFrame['relational-x-position'] : 150;
		relational.y = currentFrame.hasOwnProperty('relational-y-position') ? currentFrame['relational-y-position'] : 50;
		relational.cache(0,0,relational.image.width,relational.image.height);

		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient3 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient3.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient3.cache(0,0,relational.image.width,relational.image.height);
			gradient3.regX = relational.regX;
			gradient3.regY = relational.regY;
			gradient3.x = relational.x;
			gradient3.y = relational.y;
	
			animateStraplineIn(gradient3, currentFrame['relational-image-animation-in'], null, null);
	
			var clone3 = new createjs.Bitmap(relational.cacheCanvas);
			clone3.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone3.cache(0,0,clone3.image.width,clone3.image.height);
			clone3.regX = gradient3.regX;
			clone3.regY = gradient3.regY;
			clone3.x = gradient3.x;
			clone3.y = gradient3.y;
			stageContent.addChild(clone3);
	
			var mask3 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient3.getBounds().height*2));
			mask3.y = clone3.y;
			mask3.rotation = 15;
			clone3.mask = mask3;
			createjs.Tween.get(mask3).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], null, null);
	
			var clone4 = new createjs.Bitmap(relational.cacheCanvas);
			clone4.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone4.cache(0,0,relational.image.width,relational.image.height);
			clone4.regX = relational.regX;
			clone4.regY = relational.regY;
			clone4.x = relational.x;
			clone4.y = relational.y;
			stageContent.addChild(clone4);
	
			var mask4 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,relational.image.height*2));
			mask4.y = clone4.y;
			mask4.rotation = 15;
			clone4.mask = mask4;
			createjs.Tween.get(mask4).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient4 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient4.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient4.cache(0,0,relational.image.width,relational.image.height);
			gradient4.regX = relational.regX;
			gradient4.regY = relational.regY;
			gradient4.x = relational.x;
			gradient4.y = relational.y;
	
			animateStraplineIn(gradient4, currentFrame['relational-image-animation-in'], null, null);
		}
		else {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], null, null);
		}
	}

	var callToAction = new createjs.Bitmap(queue.getResult("cta-image-"+frameIndex));
	callToAction.regX = Math.floor(callToAction.image.width * 0.5);
	callToAction.regY = Math.floor(callToAction.image.height * 0.5);
	callToAction.x = 150;
	callToAction.y = 122;
	callToAction.alpha = 0;
	stageContent.addChild(callToAction);
	createjs.Tween.get(callToAction).to({alpha:1},500);

	if ( currentFrame.hasOwnProperty("cta-sheen") && currentFrame['cta-sheen'] === "yes" ) {
		var callToActionMask = new createjs.Shape();
		callToActionMask.graphics.beginFill('red').drawRoundRect(0, 0, 148, 35, 8);
		callToActionMask.regX = 74;
		callToActionMask.regY = 17.5;
		callToActionMask.x = 150;
		callToActionMask.y = 122;
		
		var callToActionSheen = new createjs.Shape();
		callToActionSheen.alpha = 0.7;
		callToActionSheen.graphics.beginLinearGradientFill(['rgba(255,255,255,0.5)','rgba(255,255,255,0.8)','rgba(255,255,255,0.5)'], [0,0.5,1], 0, 0 , 30, 0).drawRect(0,0,30,100);
		callToActionSheen.rotation = 30;
		callToActionSheen.y = 70;
		callToActionSheen.x = 50;

		var callToAcitonBlurFilter = new createjs.BlurFilter(10,2,0);
		callToActionSheen.filters = [callToAcitonBlurFilter];
		callToActionSheen.cache(-20,-20,50,150);
		callToActionSheen.mask = callToActionMask;
		stageContent.addChild(callToActionSheen);

		createjs.Tween.get(callToActionSheen).wait(1500).to({x:300},500).call(function(){
			stageContent.removeChild(callToActionSheen);
		});
	}

	setTimeout(function(){
		if ( evaluateLoopingOfBanner() ) {
			if ( stageContent.contains(callToAction) ) {
				stageContent.removeChild(callToAction);
			}
			if ( stageContent.contains(headline) ) {
				stageContent.removeChild(headline);
			}
			if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
				stageContent.removeChild(gradient1);
				stageContent.removeChild(clone1);
			}
			else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
				stageContent.removeChild(headline);
			}
			else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes" ) {
				stageContent.removeChild(gradient2);
			}
			if ( stageContent.contains(relational) ) {
				stageContent.removeChild(relational);
			}
			if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
				stageContent.removeChild(gradient3);
			}
			else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
				stageContent.removeChild(clone4);
			}
			else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes" ) {
				stageContent.removeChild(gradient4);
			}
			determineWhichFrameShouldBeDrawn();
		}
	},3500);
}

function createCustomEndFrame() {
	if ( currentFrame.hasOwnProperty("show-logo") ) {
		if ( currentFrame['show-logo'] === true ) {
			placeSkyLogo();
			brandContent.getChildByName("skyLogo").x = currentFrame.hasOwnProperty('logo-position') ? currentFrame['logo-position'].x : 246;
			brandContent.getChildByName("skyLogo").y = currentFrame.hasOwnProperty('logo-position') ? currentFrame['logo-position'].y : 210;
		}
		else { 
			removeSkyLogo();
		}
	}
	
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	
	headline.regX = Math.floor(headline.image.width * 0.5);
	headline.regY = 0;
	headline.x = currentFrame.hasOwnProperty("headline-x-position") ? currentFrame['headline-x-position'] : 150;
	headline.y = currentFrame.hasOwnProperty("headline-y-position") ? currentFrame['headline-y-position'] : 15;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient1 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient1.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient1.cache(0,0,headline.image.width,headline.image.height);
		gradient1.regX = headline.regX;
		gradient1.regY = headline.regY;
		gradient1.x = headline.x;
		gradient1.y = headline.y;

		animateStraplineIn(gradient1, currentFrame['headline-animation-in'], null, null);

		var clone1 = new createjs.Bitmap(headline.cacheCanvas);
		clone1.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone1.cache(0,0,clone1.image.width,clone1.image.height);
		clone1.regX = gradient1.regX;
		clone1.regY = gradient1.regY;
		clone1.x = gradient1.x;
		clone1.y = gradient1.y;
		stageContent.addChild(clone1);

		var mask1 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient1.getBounds().height*2));
		mask1.rotation = 15;
		mask1.y = clone1.y;
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], null, null);
		var clone2 = new createjs.Bitmap(headline.cacheCanvas);
		clone2.filters = [
			new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
		];
		clone2.cache(0,0,headline.image.width,headline.image.height);
		clone2.regX = headline.regX;
		clone2.regY = headline.regY;
		clone2.x = headline.x;
		clone2.y = headline.y;
		stageContent.addChild(clone2);

		var mask2 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,headline.image.height*2));
		mask2.rotation = 15;
		mask2.y = clone2.y;
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:400},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
		var gradient2 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient2.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient2.cache(0,0,headline.image.width,headline.image.height);
		gradient2.regX = headline.regX;
		gradient2.regY = headline.regY;
		gradient2.x = headline.x;
		gradient2.y = headline.y;

		animateStraplineIn(gradient2, currentFrame['headline-animation-in'], null, null);
	}
	else {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], null, null);
	}

	if ( currentFrame.hasOwnProperty("relational-image") ) {
		var relational = new createjs.Bitmap(imageCache["relational-image-"+frameIndex].image);
		relational.regX = Math.floor(relational.image.width * 0.5);
		relational.regY = 0;
		relational.x = currentFrame.hasOwnProperty('relational-x-position') ? currentFrame['relational-x-position'] : 15;
		relational.y = currentFrame.hasOwnProperty('relational-y-position') ? currentFrame['relational-y-position'] : headline.y + headline.image.height;
		relational.cache(0,0,relational.image.width,relational.image.height);

		if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient3 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient3.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient3.cache(0,0,relational.image.width,relational.image.height);
			gradient3.regX = relational.regX;
			gradient3.regY = relational.regY;
			gradient3.x = relational.x;
			gradient3.y = relational.y;
	
			animateStraplineIn(gradient3, currentFrame['relational-image-animation-in'], null, null);
	
			var clone3 = new createjs.Bitmap(relational.cacheCanvas);
			clone3.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone3.cache(0,0,clone3.image.width,clone3.image.height);
			clone3.regX = gradient3.regX;
			clone3.regY = gradient3.regY;
			clone3.x = gradient3.x;
			clone3.y = gradient3.y;
			stageContent.addChild(clone3);
	
			var mask3 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,gradient3.getBounds().height*2));
			mask3.y = clone3.y;
			mask3.rotation = 15;
			clone3.mask = mask3;
			createjs.Tween.get(mask3).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], null, null);
	
			var clone4 = new createjs.Bitmap(relational.cacheCanvas);
			clone4.filters = [
				new createjs.ColorFilter(0,0,0,0.5, 255,255,255,0)
			];
			clone4.cache(0,0,relational.image.width,relational.image.height);
			clone4.regX = relational.regX;
			clone4.regY = relational.regY;
			clone4.x = relational.x;
			clone4.y = relational.y;
			stageContent.addChild(clone4);
	
			var mask4 = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0,10,relational.image.height*2));
			mask4.y = clone4.y;
			mask4.rotation = 15;
			clone4.mask = mask4;
			createjs.Tween.get(mask4).wait(parseInt(currentFrame['relational-image-animation-in'].duration)).to({x:400},1000);
		}
		else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
			var gradient4 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
			gradient4.filters = [
				new createjs.AlphaMaskFilter(relational.cacheCanvas)
			];
			gradient4.cache(0,0,relational.image.width,relational.image.height);
			gradient4.regX = relational.regX;
			gradient4.regY = relational.regY;
			gradient4.x = relational.x;
			gradient4.y = relational.y;
	
			animateStraplineIn(gradient4, currentFrame['relational-image-animation-in'], null, null);
		}
		else {
			animateStraplineIn(relational, currentFrame['relational-image-animation-in'], null, null);
		}
	}

	var image = new createjs.Bitmap(queue.getResult("image-"+frameIndex));
	animateStraplineIn(image, currentFrame['image-animation-in'], null, null);

	var callToAction = new createjs.Bitmap(queue.getResult("cta-image-"+frameIndex));
	callToAction.regX = Math.floor(callToAction.image.width * 0.5);
	callToAction.regY = Math.floor(callToAction.image.height * 0.5);
	callToAction.x = currentFrame.hasOwnProperty('cta-position') ? currentFrame['cta-position'].x : 79;
	callToAction.y = currentFrame.hasOwnProperty('cta-position') ? currentFrame['cta-position'].y : 210;
	callToAction.cache(0, 0, callToAction.image.width, callToAction.image.height);
	callToAction.alpha = 0;
	stageContent.addChild(callToAction);
	createjs.Tween.get(callToAction).to({alpha:1},500);
	
	if ( currentFrame.hasOwnProperty("cta-sheen") && currentFrame['cta-sheen'] === "yes" ) {
		var callToActionMask = new createjs.Shape();
		callToActionMask.graphics.beginFill('red').drawRect(0, 0, callToAction.image.width, callToAction.image.height);
		callToActionMask.regX = callToAction.regX;
		callToActionMask.regY = callToAction.regY;
		callToActionMask.x = callToAction.x;
		callToActionMask.y = callToAction.y;
		callToActionMask.filters = [
			new createjs.AlphaMaskFilter(callToAction.cacheCanvas)
		];
		callToActionMask.cache(0, 0, callToAction.image.width, callToAction.image.height);

		var callToActionSheen = new createjs.Shape();
		callToActionSheen.alpha = 0.7;
		callToActionSheen.graphics.beginLinearGradientFill(['rgba(255,255,255,0.5)','rgba(255,255,255,0.8)','rgba(255,255,255,0.5)'], [0,0.5,1], 0, 0 , 30, 0).drawRect(0,0,30,130);
		callToActionSheen.rotation = 30;
		callToActionSheen.y = callToAction.y - 50;
		callToActionSheen.x = -20;

		var callToAcitonBlurFilter = new createjs.BlurFilter(10,2,0);
		callToActionSheen.filters = [callToAcitonBlurFilter];
		callToActionSheen.cache(-20,-20,50,150);
		callToActionSheen.mask = callToActionMask;
		stageContent.addChild(callToActionSheen);

		createjs.Tween.get(callToActionSheen).wait(1500).to({x:350},500).call(function(){
			stageContent.removeChild(callToActionSheen);
		});
	}

	setTimeout(function(){
		if ( evaluateLoopingOfBanner() ) {
			if ( stageContent.contains(image) ) {
				stageContent.removeChild(image);
			}
			if ( stageContent.contains(callToAction) ) {
				stageContent.removeChild(callToAction);
			}
			if ( stageContent.contains(headline) ) {
				stageContent.removeChild(headline);
			}
			if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes") {
				stageContent.removeChild(gradient1);
				stageContent.removeChild(clone1);
			}
			else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "no") {
				stageContent.removeChild(headline);
			}
			else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame['headline-gradient'] && currentFrame['headline-gradient'] === "yes" ) {
				stageContent.removeChild(gradient2);
			}
			if ( stageContent.contains(relational) ) {
				stageContent.removeChild(relational);
			}
			if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes") {
				stageContent.removeChild(gradient3);
			}
			else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "no") {
				stageContent.removeChild(clone4);
			}
			else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame['relational-gradient'] && currentFrame['relational-gradient'] === "yes" ) {
				stageContent.removeChild(gradient4);
			}
			determineWhichFrameShouldBeDrawn();
		}
	},3000);
}

function evaluateLoopingOfBanner() {
	if ( loop > 0 ) {
		--loop;
		frameIndex = -1;
		return true;
	} else {
		return false;
	}
}
