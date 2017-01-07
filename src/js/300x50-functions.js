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
	label.innerHTML = data.Legal_button_label_mobile_size;

	var legalButton = document.getElementById('legal-button');
	legalButton.style.left = (content.hasOwnProperty("legal-label-position") ? content['legal-label-position'].left : 238) + "px";
	legalButton.style.top = (content.hasOwnProperty("legal-label-position") ? content['legal-label-position'].top : 38) + "px";
	legalButton.addEventListener('click',legalButtonClickHandler,false);

	if ( copy.clientHeight < 48 ) {
		legalContainer.style.backgroundPositionX = "284px";
		legalContainer.style.overflowY = "hidden";
		copy.style.width = "270px";
	}
}

function legalButtonClickHandler(e) {
	document.getElementById('legal-button').style.zIndex = 2;
	var offset = 48 - document.getElementById('legal-copy-container').clientHeight;
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
	TweenLite.to(document.getElementById('legal-copy-container'), 0.5, {top:50,onComplete:legalCopyContainerTweenOutCompleteHandler});
	removeKeyDownListener();
}

function createSkyLogo() {
	var skyLogo = new createjs.Bitmap(queue.getResult("logo"));
	skyLogo.regX = Math.floor(skyLogo.image.width * 0.5);
	skyLogo.regY = Math.floor(skyLogo.image.height * 0.5);
	skyLogo.x = 267;
	skyLogo.y = 20;
	skyLogo.alpha = 0;
	brandContent.addChild(skyLogo);
	createjs.Tween.get(skyLogo).to({alpha:1},500);
}

function createIntroductionFrame() {
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["image-"+frameIndex].image);
	headline.regY = Math.floor(headline.image.height * 0.5);
	headline.x = currentFrame.hasOwnProperty('image-x-position') ? currentFrame['image-x-position']: 10;
	headline.y = currentFrame.hasOwnProperty('image-y-position') ? currentFrame['image-y-position']: 25;
	headline.alpha = 0;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("image-sheen") && currentFrame["image-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
		var gradient1 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient1.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient1.cache(0,0,300,50);
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
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['image-animation-in'].duration)).to({x:300},1000);


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
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['image-animation-in'].duration)).to({x:300},1000);
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
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regY = Math.floor(headline.image.height * 0.5);
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 80;
	headline.y = currentFrame.hasOwnProperty('headline-y-position') ? currentFrame['headline-y-position'] : 25;
	headline.alpha = 0;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
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
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:300},1000);


	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
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
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['image-animation-in'].duration)).to({x:300},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "no" ) {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
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

	var image = new createjs.Bitmap(queue.getResult("image-"+frameIndex));
	image.y = 0;
	animateIn(image, currentFrame['image-animation-in'], currentFrame['image-animation-out'], currentFrame['image-animation-duration']);

	var delayUntilNextFrame = parseInt(currentFrame['frame-animation-duration']);

	setTimeout(function() {
		if ( stageContent.contains(headline) ) {
			stageContent.removeChild(headline);
		}
		if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
			stageContent.removeChild(gradient1);
			stageContent.removeChild(clone1);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
			stageContent.removeChild(headline);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
			stageContent.removeChild(gradient2);
		}
		if ( stageContent.contains(image) ) {
			stageContent.removeChild(image);
		}
		determineWhichFrameShouldBeDrawn();
	},delayUntilNextFrame);
}

function createContentFrame() {
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regY = Math.floor(headline.image.height * 0.5);
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 80;
	headline.y = currentFrame.hasOwnProperty('headline-y-position') ? currentFrame['headline-y-position'] : 25;
	headline.alpha = 0;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
		var gradient1 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient1.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient1.cache(0,0,300,50);
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
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:300},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
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
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['image-animation-in'].duration)).to({x:300},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "no" ) {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
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

	var image = new createjs.Bitmap(queue.getResult("image-"+frameIndex));
	image.y = 0;
	animateIn(image, currentFrame['image-animation-in'], currentFrame['image-animation-out'], currentFrame['image-animation-duration']);

	var delayUntilNextFrame = parseInt(currentFrame['frame-animation-duration']);

	setTimeout(function() {
		if ( stageContent.contains(headline) ) {
			stageContent.removeChild(headline);
		}
		if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
			stageContent.removeChild(gradient1);
			stageContent.removeChild(clone1);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
			stageContent.removeChild(headline);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
			stageContent.removeChild(gradient2);
		}
		if ( stageContent.contains(image) ) {
			stageContent.removeChild(image);
		}
		determineWhichFrameShouldBeDrawn();
	},delayUntilNextFrame);
}

function createPriceFrame() {
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regY = Math.floor(headline.image.height * 0.5);
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 10;
	headline.y = currentFrame.hasOwnProperty('headline-y-position') ? currentFrame['headline-y-position'] : 25;
	headline.alpha = 0;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
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
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:300},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
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
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['image-animation-in'].duration)).to({x:300},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "no" ) {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
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

	var delayUntilNextFrame = parseInt(currentFrame['frame-animation-duration']);

	setTimeout(function() {
		if ( stageContent.contains(headline) ) {
			stageContent.removeChild(headline);
		}
		if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
			stageContent.removeChild(gradient1);
			stageContent.removeChild(clone1);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
			stageContent.removeChild(headline);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
			stageContent.removeChild(gradient2);
		}
		determineWhichFrameShouldBeDrawn();
	},delayUntilNextFrame);
}

function createLeftRoundelFrame() {
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regY = Math.floor(headline.image.height * 0.5);
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 70;
	headline.y = currentFrame.hasOwnProperty('headline-y-position') ? currentFrame['headline-y-position'] : 25;
	headline.alpha = 0;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
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
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:300},1000);


	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
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
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['image-animation-in'].duration)).to({x:300},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "no" ) {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
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

	var roundel = new createjs.Bitmap(queue.getResult("generic-roundel"));
	roundel.regX = roundel.image.width * 0.5;
	roundel.regY = roundel.image.height * 0.5;
	roundel.x = 29;
	roundel.y = 25;
	animateRoundelIn(roundel, currentFrame['roundel-image-animation-in'], currentFrame['roundel-image-animation-out'], currentFrame['roundel-image-animation-duration']);

	if ( currentFrame.hasOwnProperty("roundel-sheen") ) {
		if ( currentFrame['roundel-sheen'] === "yes" ) {
			var roundelSheenMask = new createjs.Shape(new createjs.Graphics().beginFill('red').drawCircle(0, 0, roundel.image.width*0.5));
			roundelSheenMask.x = 29;
			roundelSheenMask.y = 25;

			var roundelSheen = new createjs.Shape();
			roundelSheen.graphics.beginLinearGradientFill(['rgba(255,255,255,0.5)','rgba(255,255,255,0.8)','rgba(255,255,255,0.5)'], [0,0.5,1], 0, 0 , 30, 0).drawRect(0,0,20,200);
			roundelSheen.rotation = 20;
			roundelSheen.alpha = 0.7;
			roundelSheen.y = 0;
			roundelSheen.x = 0;

			var sheenBlurFilter = new createjs.BlurFilter(10,2,0);
			roundelSheen.filters = [sheenBlurFilter];
			roundelSheen.cache(0, 0, 100, 200);

			stageContent.addChild(roundelSheen);
			roundelSheen.mask = roundelSheenMask;

			createjs.Tween.get(roundelSheen).wait(500).to({x:300},500).call(function(){
				stageContent.removeChild(roundelSheen);
			});
		}
	}

	var delayUntilNextFrame = parseInt(currentFrame['frame-animation-duration']);

	setTimeout(function() {
		if ( stageContent.contains(headline) ) {
			stageContent.removeChild(headline);
		}
		if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
			stageContent.removeChild(gradient1);
			stageContent.removeChild(clone1);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
			stageContent.removeChild(headline);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
			stageContent.removeChild(gradient2);
		}
		if ( stageContent.contains(roundel) ) {
			stageContent.removeChild(roundel);
		}
		determineWhichFrameShouldBeDrawn();
	},delayUntilNextFrame);
}

function createRightRoundelFrame() {
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regY = Math.floor(headline.image.height * 0.5);
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position'] : 10;
	headline.y = currentFrame.hasOwnProperty('headline-y-position') ? currentFrame['headline-y-position'] : 25;
	headline.alpha = 0;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
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
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:300},1000);


	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
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
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['image-animation-in'].duration)).to({x:300},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "no" ) {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], currentFrame['headline-animation-out'], currentFrame['headline-animation-duration']);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
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

	var roundel = new createjs.Bitmap(queue.getResult("generic-roundel"));
	roundel.regX = roundel.image.width * 0.5;
	roundel.regY = roundel.image.height * 0.5;
	roundel.x = 203;
	roundel.y = 25;
	animateRoundelIn(roundel, currentFrame['roundel-image-animation-in'], currentFrame['roundel-image-animation-out'], currentFrame['roundel-image-animation-duration']);

	if ( currentFrame.hasOwnProperty("roundel-sheen") ) {
		if ( currentFrame['roundel-sheen'] === "yes" ) {
			var roundelSheenMask = new createjs.Shape(new createjs.Graphics().beginFill('red').drawCircle(0, 0, roundel.image.width*0.5));
			roundelSheenMask.x = 203;
			roundelSheenMask.y = 25;

			var roundelSheen = new createjs.Shape();
			roundelSheen.graphics.beginLinearGradientFill(['rgba(255,255,255,0.5)','rgba(255,255,255,0.8)','rgba(255,255,255,0.5)'], [0,0.5,1], 0, 0 , 30, 0).drawRect(0,0,20,200);
			roundelSheen.rotation = 20;
			roundelSheen.alpha = 0.7;
			roundelSheen.y = 0;
			roundelSheen.x = 150;

			var sheenBlurFilter = new createjs.BlurFilter(10,2,0);
			roundelSheen.filters = [sheenBlurFilter];
			roundelSheen.cache(0, 0, 100, 200);

			stageContent.addChild(roundelSheen);
			roundelSheen.mask = roundelSheenMask;

			createjs.Tween.get(roundelSheen).wait(1000).to({x:300},500).call(function(){
				stageContent.removeChild(roundelSheen);
			});
		}
	}

	var delayUntilNextFrame = parseInt(currentFrame['frame-animation-duration']);

	setTimeout(function() {
		if ( stageContent.contains(headline) ) {
			stageContent.removeChild(headline);
		}
		if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
			stageContent.removeChild(gradient1);
			stageContent.removeChild(clone1);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
			stageContent.removeChild(headline);
		}
		else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
			stageContent.removeChild(gradient2);
		}
		if ( stageContent.contains(roundel) ) {
			stageContent.removeChild(roundel);
		}
		determineWhichFrameShouldBeDrawn();
	},delayUntilNextFrame);
}

function createEndFrameTypeOne() {
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regX = Math.floor(headline.image.width * 0.5);
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position']: 150;
	headline.y = currentFrame.hasOwnProperty('headline-y-position') ? currentFrame['headline-y-position']: 6;
	headline.alpha = 0;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
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
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:300},1000);


	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
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
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['image-animation-in'].duration)).to({x:300},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "no" ) {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], null);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
		var gradient2 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('headline-gradient-colour-1') ? currentFrame['headline-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('headline-gradient-colour-2') ? currentFrame['headline-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('headline-gradient-colour-3') ? currentFrame['headline-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,headline.image.width,0).drawRect(0,0,headline.image.width,headline.image.height));
		gradient2.filters = [
			new createjs.AlphaMaskFilter(headline.cacheCanvas)
		];
		gradient2.cache(0,0,300,50);
		gradient2.regX = headline.regX;
		gradient2.regY = headline.regY;
		gradient2.x = headline.x;
		gradient2.y = headline.y;

		animateStraplineIn(gradient2, currentFrame['headline-animation-in'], null, null);
	}

	var image = new createjs.Bitmap(queue.getResult("image-"+frameIndex));
	image.y = 0;
	animateIn(image, currentFrame['image-animation-in'], null, null);

	var callToAction = new createjs.Bitmap(queue.getResult("cta-image-"+frameIndex));
	callToAction.regX = callToAction.image.width * 0.5;
	callToAction.regY = callToAction.image.height * 0.5;
	callToAction.x = currentFrame.hasOwnProperty('cta-position') ? currentFrame['cta-position'].x : 151;
	callToAction.y = currentFrame.hasOwnProperty('cta-position') ? currentFrame['cta-position'].y : 34;
	callToAction.cache(0, 0, callToAction.image.width, callToAction.image.height);
	callToAction.alpha = 0;
	stageContent.addChild(callToAction);
	createjs.Tween.get(callToAction).to({alpha:1},500);

	if ( currentFrame['cta-sheen'] === "yes" ) {
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
		callToActionSheen.graphics.beginLinearGradientFill(['rgba(255,255,255,0.5)','rgba(255,255,255,0.8)','rgba(255,255,255,0.5)'], [0,0.5,1], 0, 0 , 30, 0).drawRect(0,0,30,100);
		callToActionSheen.rotation = 30;
		callToActionSheen.y = 0;
		callToActionSheen.x = callToAction.x - callToAction.image.width;

		var callToAcitonBlurFilter = new createjs.BlurFilter(10,2,0);
		callToActionSheen.filters = [callToAcitonBlurFilter];
		callToActionSheen.cache(-20,-20,50,110);
		callToActionSheen.mask = callToActionMask;
		stageContent.addChild(callToActionSheen);

		createjs.Tween.get(callToActionSheen).wait(1500).to({x:300},500).call(function(){
			stageContent.removeChild(callToActionSheen);
		});
	}

	setTimeout(function(){
		if ( evaluateLoopingOfBanner() ) {	
			if ( stageContent.contains(headline) ) {
				stageContent.removeChild(headline);
			}
			if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
				stageContent.removeChild(gradient1);
				stageContent.removeChild(clone1);
			}
			else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
				stageContent.removeChild(headline);
			}
			else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
				stageContent.removeChild(gradient2);
			}
			if ( stageContent.contains(callToAction) ) {
				stageContent.removeChild(callToAction);
			}
			if ( stageContent.contains(image) ) {
				stageContent.removeChild(image);
			}
			determineWhichFrameShouldBeDrawn();
		}
	},3000);
}

function createEndFrameTypeTwo() {
	if ( currentFrame.hasOwnProperty("unique-background") ) {
		var background = new createjs.Bitmap(queue.getResult("background-"+frameIndex));
		background.alpha = 0;
		stageContent.addChild(background);
		createjs.Tween.get(background).to({alpha:1},500);
	}

	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.regY = Math.floor(headline.image.height * 0.5);
	headline.x = currentFrame.hasOwnProperty('headline-x-position') ? currentFrame['headline-x-position']: 10;
	headline.y = currentFrame.hasOwnProperty('headline-y-position') ? currentFrame['headline-y-position']: 5;
	headline.alpha = 0;
	headline.cache(0,0,headline.image.width,headline.image.height);

	if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
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
		clone1.mask = mask1;
		createjs.Tween.get(mask1).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:300},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
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
		clone2.mask = mask2;
		createjs.Tween.get(mask2).wait(parseInt(currentFrame['headline-animation-in'].duration)).to({x:300},1000);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "no" ) {
		animateStraplineIn(headline, currentFrame['headline-animation-in'], null);
	}
	else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
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
	
	var relational = new createjs.Bitmap(imageCache["relational-image-"+frameIndex].image);
	relational.x = currentFrame.hasOwnProperty('relational-x-position') ? currentFrame['relational-x-position'] : 10;
	relational.y = currentFrame.hasOwnProperty('relational-y-position') ? currentFrame['relational-y-position'] : headline.y + headline.image.height;
	relational.alpha = 0;
	relational.cache(0,0,relational.image.width,relational.image.height);
	console.dir(relational);
	
	
	if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame["relational-gradient"] && currentFrame["relational-gradient"] === "yes") {
		var gradient3 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
		gradient3.filters = [
			new createjs.AlphaMaskFilter(relational.cacheCanvas)
		];
		gradient3.cache(0,0,relational.image.width,relational.image.height);
		gradient3.regX = relational.regX;
		gradient3.regY = relational.regY;
		gradient3.x = relational.x;
		gradient3.y = relational.y;

		animateStraplineIn(gradient3, currentFrame['relational-animation-in'], null, null);

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
		mask3.rotation = 15;
		clone3.mask = mask3;
		createjs.Tween.get(mask3).wait(parseInt(currentFrame['relational-animation-in'].duration)).to({x:300},1000);


	}
	else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame["relational-gradient"] && currentFrame["relational-gradient"] === "no") {
		animateStraplineIn(relational, currentFrame['relational-animation-in'], null, null);

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
		mask4.rotation = 15;
		clone4.mask = mask4;
		createjs.Tween.get(mask4).wait(parseInt(currentFrame['relational-animation-in'].duration)).to({x:300},1000);
	}
	else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame["relational-gradient"] && currentFrame["relational-gradient"] === "no" ) {
		animateStraplineIn(relational, currentFrame['relational-animation-in'], null, null);
	}
	else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame["relational-gradient"] && currentFrame["relational-gradient"] === "yes" ) {
		var gradient4 = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([currentFrame.hasOwnProperty('relational-gradient-colour-1') ? currentFrame['relational-gradient-colour-1'] : 'rgba(247,145,2,1)',currentFrame.hasOwnProperty('relational-gradient-colour-2') ? currentFrame['relational-gradient-colour-2'] : 'rgba(239,45,45,1)',currentFrame.hasOwnProperty('relational-gradient-colour-3') ? currentFrame['relational-gradient-colour-3'] : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,relational.image.width,0).drawRect(0,0,relational.image.width,relational.image.height));
		gradient4.filters = [
			new createjs.AlphaMaskFilter(relational.cacheCanvas)
		];
		gradient4.cache(0,0,relational.image.width,relational.image.height);
		gradient4.regX = relational.regX;
		gradient4.regY = relational.regY;
		gradient4.x = relational.x;
		gradient4.y = relational.y;

		animateStraplineIn(gradient4, currentFrame['relational-animation-in'], null, null);
	}

	var callToAction = new createjs.Bitmap(queue.getResult("cta-image-"+frameIndex));
	callToAction.regX = callToAction.image.width * 0.5;
	callToAction.regY = callToAction.image.height * 0.5;
	callToAction.x = currentFrame.hasOwnProperty('cta-position') ? currentFrame['cta-position'].x : 204;
	callToAction.y = currentFrame.hasOwnProperty('cta-position') ? currentFrame['cta-position'].y : 25;
	callToAction.cache(0, 0, callToAction.image.width, callToAction.image.height);
	callToAction.alpha = 0;
	stageContent.addChild(callToAction);
	createjs.Tween.get(callToAction).to({alpha:1},500);

	if ( currentFrame['cta-sheen'] === "yes" ) {
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
		callToActionSheen.graphics.beginLinearGradientFill(['rgba(255,255,255,0.5)','rgba(255,255,255,0.8)','rgba(255,255,255,0.5)'], [0,0.5,1], 0, 0 , 30, 0).drawRect(0,-10,30,200);
		callToActionSheen.rotation = 30;
		callToActionSheen.y = 0;
		callToActionSheen.x = callToAction.x - callToAction.image.width;

		var callToAcitonBlurFilter = new createjs.BlurFilter(10,2,0);
		callToActionSheen.filters = [callToAcitonBlurFilter];
		callToActionSheen.cache(-20,-20,50,200);
		callToActionSheen.mask = callToActionMask;
		stageContent.addChild(callToActionSheen);

		createjs.Tween.get(callToActionSheen).wait(1500).to({x:300},500).call(function(){
			stageContent.removeChild(callToActionSheen);
		});
	}

	setTimeout(function(){
		if ( evaluateLoopingOfBanner() ) {
			if ( stageContent.contains(headline) ) {
				stageContent.removeChild(headline);
			}
			if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "yes") {
				stageContent.removeChild(gradient1);
				stageContent.removeChild(clone1);
			}
			else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "yes" && currentFrame.gradient && currentFrame.gradient === "no") {
				stageContent.removeChild(headline);
			}
			else if ( currentFrame.hasOwnProperty("headline-sheen") && currentFrame["headline-sheen"] === "no" && currentFrame.gradient && currentFrame.gradient === "yes" ) {
				stageContent.removeChild(gradient2);
			}
			
			if ( stageContent.contains(relational) ) {
				stageContent.removeChild(relational);
			}
			if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame["relational-gradient"] && currentFrame["relational-gradient"] === "yes") {
				stageContent.removeChild(gradient3);
				stageContent.removeChild(clone3);
			}
			else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "yes" && currentFrame["relational-gradient"] && currentFrame["relational-gradient"] === "no") {
				stageContent.removeChild(relational);
				stageContent.removeChild(clone4);
			}
			else if ( currentFrame.hasOwnProperty("relational-sheen") && currentFrame["relational-sheen"] === "no" && currentFrame["relational-gradient"] && currentFrame["relational-gradient"] === "yes" ) {
				stageContent.removeChild(gradient4);
			}
			if ( stageContent.contains(callToAction) ) {
				stageContent.removeChild(callToAction);
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
