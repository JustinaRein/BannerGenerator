// developer: Justina Reingardtaite @ Sky Works

function createSpritesheetContentFrame() {
	
	//"show-logo"
	if ( currentFrame.hasOwnProperty("show-logo") ) {
		if ( currentFrame['show-logo'] === true ) {
			placeSkyLogo();
		}
		else { 
			removeSkyLogo();
		}
	}
	
	//"unique-background"
	var uniqueBackground = new createjs.Bitmap(queue.getResult("unique-background-"+frameIndex));
	uniqueBackground.alpha = 0;
	
	var backgroundHoldingContainer = new createjs.Container();
	backgroundHoldingContainer.setBounds(0,0,stageContent.getBounds().width,stageContent.getBounds().height);
	backgroundHoldingContainer.addChild(uniqueBackground);
	stageContent.addChild(backgroundHoldingContainer);
	
	var backgroundXPosition = stageContent.getBounds().width * 0.5;
	var backgroundYPosition = stageContent.getBounds().height * 0.5;
	
	var backgroundAnimationIn = currentFrame.hasOwnProperty("background-animation-in") ? currentFrame['background-animation-in'] : false;
	var backgroundAnimationOut = currentFrame.hasOwnProperty("background-animation-out") ? currentFrame['background-animation-out'] : false;
	
	if (backgroundAnimationIn && backgroundAnimationIn.delay && backgroundAnimationOut && backgroundAnimationOut.delay) {
		createjs.Tween.get(uniqueBackground)
			.wait(parseInt(backgroundAnimationIn.delay))
			.call(function(){animateMultipurposeContentIn( uniqueBackground, backgroundAnimationIn, backgroundXPosition, backgroundYPosition );})
			.wait(parseInt(backgroundAnimationOut.delay))
			.call(function(){animateMultipurposeContentOut( uniqueBackground, backgroundAnimationOut, backgroundXPosition, backgroundYPosition );});
	}
	
	
	//"spritesheet-image"
	var spriteSheetFramerate  = currentFrame.hasOwnProperty('spritesheet-setup') ? parseInt(currentFrame['spritesheet-setup'].framerate) : 1;
	var spriteSheetCount = currentFrame.hasOwnProperty('spritesheet-setup') ? parseInt(currentFrame['spritesheet-setup'].count) : 1;
	var spriteSheet = new createjs.SpriteSheet({
		framerate: spriteSheetFramerate,
		"images": [queue.getResult("spritesheet-image-"+frameIndex)],
		"frames": {
		  "height": stageContent.getBounds().height + 2,
		  "width": stageContent.getBounds().width + 2,
		  "count": spriteSheetCount
		},

		"animations": {
		  "start": [0, spriteSheetCount - 1,'stop'],
		  "stop": [spriteSheetCount - 1]
		}
	});
		  
	var spritesheetHolder = new createjs.Sprite(spriteSheet);
    spritesheetHolder.alpha = 0;
	spritesheetHolder.setBounds(0,0,stageContent.getBounds().width,stageContent.getBounds().height);
	var spritesheetHoldingContainer = new createjs.Container();
	spritesheetHoldingContainer.setBounds(0,0,stageContent.getBounds().width,stageContent.getBounds().height);
	spritesheetHoldingContainer.addChild(spritesheetHolder);
	stageContent.addChild(spritesheetHoldingContainer);
	
	var spritesheetXPosition = stageContent.getBounds().width * 0.5;
	var spritesheetYPosition = stageContent.getBounds().height * 0.5;
	
	var spritesheetAnimationIn = currentFrame.hasOwnProperty("spritesheet-animation-in") ? currentFrame['spritesheet-animation-in'] : false;
	var spritesheetAnimationOut = currentFrame.hasOwnProperty("spritesheet-animation-out") ? currentFrame['spritesheet-animation-out'] : false;
	
	if (spritesheetAnimationIn && spritesheetAnimationIn.delay && spritesheetAnimationOut && spritesheetAnimationOut.delay) {
		createjs.Tween.get(spritesheetHolder)
			.wait(parseInt(spritesheetAnimationIn.delay))
			.call(function(){animateMultipurposeContentIn( spritesheetHolder, spritesheetAnimationIn, spritesheetXPosition, spritesheetYPosition );})
			.call(function(){spritesheetHolder.gotoAndPlay("start");})
			.wait(parseInt(spritesheetAnimationOut.delay))
			.call(function(){animateMultipurposeContentOut( spritesheetHolder, spritesheetAnimationOut, spritesheetXPosition, spritesheetYPosition );});
	}
	
	//"content-image"
	var contentImage = new createjs.Bitmap(queue.getResult("content-image-"+frameIndex));
	contentImage.cache(0,0,contentImage.image.width,contentImage.image.height);
	
	var contentImageXPosition = currentFrame.hasOwnProperty("content-position") ? parseInt(currentFrame['content-position'].x) : stageContent.getBounds().width * 0.5;
	var contentImageYPosition = currentFrame.hasOwnProperty("content-position") ? parseInt(currentFrame['content-position'].y) : stageContent.getBounds().height * 0.5;
	
	var contentImageContainer = new createjs.Container();
	contentImageContainer.setBounds(0,0,contentImage.image.width,contentImage.image.height);
	contentImageContainer.addChild(contentImage);
	
	var contentImageSheen = null;
	if (currentFrame.hasOwnProperty("content-sheen") && currentFrame['content-sheen'].type && currentFrame['content-sheen'].type === "simple-sheen") {
		contentImageSheen = new createSimpleSheen( contentImage, currentFrame['content-sheen']);
		contentImageContainer.addChild(contentImageSheen);
	} else if (currentFrame.hasOwnProperty("content-sheen") && currentFrame['content-sheen'].type && currentFrame['content-sheen'].type === "soft-sheen") {
		contentImageSheen = new createSoftSheen( contentImage, currentFrame['content-sheen']);
		contentImageContainer.addChild(contentImageSheen);
	}
	contentImageContainer.alpha = 0;
	
	var contentHoldingContainer = new createjs.Container();
	contentHoldingContainer.setBounds(0,0,stageContent.getBounds().width,stageContent.getBounds().height);
	contentHoldingContainer.addChild(contentImageContainer);
	stageContent.addChild(contentHoldingContainer);
	
	var contentAnimationIn = currentFrame.hasOwnProperty("content-animation-in") ? currentFrame['content-animation-in'] : false;
	var contentAnimationOut = currentFrame.hasOwnProperty("content-animation-out") ? currentFrame['content-animation-out'] : false;
	
	if (contentAnimationIn && contentAnimationIn.delay && contentAnimationOut && contentAnimationOut.delay) {
		createjs.Tween.get(contentImageContainer)
			.wait(parseInt(contentAnimationIn.delay))
			.call(function(){animateMultipurposeContentIn( contentImageContainer, contentAnimationIn, contentImageXPosition, contentImageYPosition );})
			.wait(parseInt(contentAnimationOut.delay))
			.call(function(){animateMultipurposeContentOut( contentImageContainer, contentAnimationOut, contentImageXPosition, contentImageYPosition );});
	}
	
	//"headline-image"
	var headline = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
	headline.cache(0,0,headline.image.width,headline.image.height);
	
	var headlineBreaks = currentFrame.hasOwnProperty("headline-image") ? data[currentFrame['headline-image']].split("break-"+(stageContent.getBounds().width+2)+"x"+(stageContent.getBounds().height+2)) : " ";
	 
	var headlineParts = [];
	var headlinePartSize = Math.round(headline.image.height/headlineBreaks.length);
	for (var i = 0; i < headlineBreaks.length; i++) {
		var headlinePart = new createjs.Bitmap(imageCache["headline-image-"+frameIndex].image);
		headlinePart.cache(0, headlinePartSize * i + 1,headline.image.width, headlinePartSize);
		headlineParts.push(headlinePart);
	} 
	
	var headlineXPosition = currentFrame.hasOwnProperty("headline-position") ? parseInt(currentFrame['headline-position'].x) : stageContent.getBounds().width * 0.5;
	var headlineYPosition = currentFrame.hasOwnProperty("headline-position") ? parseInt(currentFrame['headline-position'].y) : stageContent.getBounds().height * 0.5;
	
	var headlineContainer = new createjs.Container();
	headlineContainer.setBounds(0,0,headline.getBounds().width,headline.getBounds().height);
	
	if (currentFrame.hasOwnProperty("headline-gradient")) {
		
		var headlineBounds = document.getElementById("headline"+frameIndex).getBoundingClientRect();
		var gradientSpans = document.getElementById("headline"+frameIndex).getElementsByClassName("f-gradient");
		
		for (var i = 0; i < headlineParts.length; i++) {
			var headlinePartWidth = headlineParts[i].image.width;
			var headlinePartHeight = headlineParts[i].image.height;
			for (var j = 0; j < gradientSpans.length; j++) {
				var gradientSpanBounds = gradientSpans[j].getBoundingClientRect();
				var gradientSpanX = Math.round(gradientSpanBounds.left - headlineBounds.left);
				var gradientSpanY = Math.round(gradientSpanBounds.top - headlineBounds.top);
				var gradientSpanWidth = Math.round(gradientSpanBounds.right - headlineBounds.left) - gradientSpanX;
				
				if ((gradientSpanY === headlinePartSize * i) || (gradientSpanY === headlinePartSize * i - 1) || (gradientSpanY === headlinePartSize * i + 1)) {
					headlineParts[i].setBounds(0,0, headlinePartWidth, headlinePartHeight);
					headlineParts[i] = new createSpritesheetGradientPartText( i, headlineParts[i], currentFrame['headline-gradient'], headlinePartSize, gradientSpanX, gradientSpanWidth );
					headlineParts[i].y = headlinePartSize * i;
				}
			}
		} 
	} 
	
	for (var i = 0; i < headlineParts.length; i++) {
		headlineContainer.addChild(headlineParts[i]);
	} 
	
	var headlineSheen = new createjs.Container();
	if (currentFrame.hasOwnProperty("headline-sheen") && currentFrame['headline-sheen'].show && currentFrame['headline-sheen'].show === "yes") {
		headlineSheen = new createSimpleSheen( headline, currentFrame['headline-sheen']);
	}
	
	headlineContainer.addChild(headlineSheen);
	
	headlineContainer.alpha = 0;
	var headlineHoldingContainer = new createjs.Container();
	headlineHoldingContainer.setBounds(0,0,stageContent.getBounds().width,stageContent.getBounds().height);
	
	// unique case for both mobile sizes and 728x90
	var headlineHoldingContainerMask = new createjs.Shape();
	if (stageContent.getBounds().height === 48) {
		headlineHoldingContainerMask.graphics.f("red").dr(0,0,stageContent.getBounds().width-62,stageContent.getBounds().height);
		headlineHoldingContainer.mask = headlineHoldingContainerMask;
	}
	
	if (stageContent.getBounds().height === 88) {
		headlineHoldingContainerMask.graphics.f("red").dr(0,0,stageContent.getBounds().width-115,stageContent.getBounds().height);
		headlineHoldingContainer.mask = headlineHoldingContainerMask;
	}
	//-----------------------------------------------
	
	headlineHoldingContainer.addChild(headlineContainer);
	stageContent.addChild(headlineHoldingContainer);
	
	var headlineAnimationIn = currentFrame.hasOwnProperty("headline-animation-in") ? currentFrame['headline-animation-in'] : false;
	var headlineAnimationOut = currentFrame.hasOwnProperty("headline-animation-out") ? currentFrame['headline-animation-out'] : false;
	
	if (headlineAnimationIn && headlineAnimationIn.delay && headlineAnimationOut && headlineAnimationOut.delay) {
		createjs.Tween.get(headlineContainer)
			.wait(parseInt(headlineAnimationIn.delay))
			.call(function(){animateMultipurposeContentIn( headlineContainer, headlineAnimationIn, headlineXPosition, headlineYPosition );})
			.wait(parseInt(headlineAnimationOut.delay))
			.call(function(){animateMultipurposeContentOut( headlineContainer, headlineAnimationOut, headlineXPosition, headlineYPosition );});
	}
	
	//"relational-image"
	var relational = new createjs.Bitmap(imageCache["relational-image-"+frameIndex].image);
	relational.cache(0,0,relational.image.width,relational.image.height);
	
	var relationalXPosition = currentFrame.hasOwnProperty("relational-position") ? parseInt(currentFrame['relational-position'].x) : stageContent.getBounds().width * 0.5;
	var relationalYPosition = currentFrame.hasOwnProperty("relational-position") ? parseInt(currentFrame['relational-position'].y) : stageContent.getBounds().height * 0.5;
	
	if (currentFrame.hasOwnProperty("relational-gradient")){
		
		var relationalBounds = document.getElementById("relational"+frameIndex).getBoundingClientRect();
		var relationalgradientSpans = document.getElementById("relational"+frameIndex).getElementsByClassName("f-gradient");
		
		if (relationalgradientSpans.length > 0) {
			relational = new createSpritesheetGradientText( relational, currentFrame['relational-gradient'] );
		}
	}
	
	var relationalContainer = new createjs.Container();
	relationalContainer.setBounds(0,0,relational.getBounds().width,relational.getBounds().height);
	relationalContainer.addChild(relational);
	
	if (currentFrame.hasOwnProperty("relational-sheen") && currentFrame['relational-sheen'].show && currentFrame['relational-sheen'].show === "yes") {
		var relationalSheen = new createSimpleSheen( relational, currentFrame['relational-sheen']);
		relationalContainer.addChild(relationalSheen);
	}
	
	relationalContainer.alpha = 0;
	var relationalHoldingContainer = new createjs.Container();
	relationalHoldingContainer.setBounds(0,0,stageContent.getBounds().width,stageContent.getBounds().height);
	
	// unique case for both mobile sizes and 728x90
	var relationalHoldingContainerMask = new createjs.Shape();
	if (stageContent.getBounds().height === 48) {
		relationalHoldingContainerMask.graphics.f("red").dr(0,0,stageContent.getBounds().width-62,stageContent.getBounds().height);
		relationalHoldingContainer.mask = relationalHoldingContainerMask;
	}
	
	if (stageContent.getBounds().height === 88) {
		relationalHoldingContainerMask.graphics.f("red").dr(0,0,stageContent.getBounds().width-115,stageContent.getBounds().height);
		relationalHoldingContainer.mask = relationalHoldingContainerMask;
	}
	//-----------------------------------------------
	
	relationalHoldingContainer.addChild(relationalContainer);
	stageContent.addChild(relationalHoldingContainer);
	
	var relationalAnimationIn = currentFrame.hasOwnProperty("relational-animation-in") ? currentFrame['relational-animation-in'] : false;
	var relationalAnimationOut = currentFrame.hasOwnProperty("relational-animation-out") ? currentFrame['relational-animation-out'] : false;
	
	if (relationalAnimationIn && relationalAnimationIn.delay && relationalAnimationOut && relationalAnimationOut.delay) {
		createjs.Tween.get(relationalContainer)
			.wait(parseInt(relationalAnimationIn.delay))
			.call(function(){animateMultipurposeContentIn( relationalContainer, relationalAnimationIn, relationalXPosition, relationalYPosition );})
			.wait(parseInt(relationalAnimationOut.delay))
			.call(function(){animateMultipurposeContentOut( relationalContainer, relationalAnimationOut, relationalXPosition, relationalYPosition );});
	}
	
	//"cta-image"
	var ctaImage = new createjs.Bitmap(queue.getResult("cta-image-"+frameIndex));
	ctaImage.cache(0,0, ctaImage.image.width, ctaImage.image.height);
	
	var ctaXPosition = currentFrame.hasOwnProperty("cta-position") ? parseInt(currentFrame['cta-position'].x) : stageContent.getBounds().width * 0.5;
	var ctaYPosition = currentFrame.hasOwnProperty("cta-position") ? parseInt(currentFrame['cta-position'].y) : stageContent.getBounds().height * 0.5;
	
	var ctaContainer = new createjs.Container();
	ctaContainer.setBounds(0,0,ctaImage.image.width,ctaImage.image.height);
	ctaContainer.addChild(ctaImage);
	
	var ctaSheen = null;
	if (currentFrame.hasOwnProperty("cta-sheen") && currentFrame['cta-sheen'].type && currentFrame['cta-sheen'].type === "3d-sheen") {
		ctaSheen = new create3DSheen( ctaImage, currentFrame['cta-sheen']);
		ctaContainer.addChild(ctaSheen);
	} else if (currentFrame.hasOwnProperty("cta-sheen") && currentFrame['cta-sheen'].type && currentFrame['cta-sheen'].type === "simple-sheen") {
		ctaSheen = new createSimpleSheen( ctaImage, currentFrame['cta-sheen']);
		ctaContainer.addChild(ctaSheen);
	} else if (currentFrame.hasOwnProperty("cta-sheen") && currentFrame['cta-sheen'].type && currentFrame['cta-sheen'].type === "soft-sheen") {
		ctaSheen = new createSoftSheen( ctaImage, currentFrame['cta-sheen']);
		ctaContainer.addChild(ctaSheen);
	}
	
	ctaContainer.alpha = 0;
	
	var ctaHoldingContainer = new createjs.Container();
	ctaHoldingContainer.setBounds(0,0,stageContent.getBounds().width,stageContent.getBounds().height);
	
	// unique case for both mobile sizes and 728x90
	var ctaHoldingContainerMask = new createjs.Shape();
	if (stageContent.getBounds().height === 48) {
		ctaHoldingContainerMask.graphics.f("red").dr(0,0,stageContent.getBounds().width-62,stageContent.getBounds().height);
		ctaHoldingContainer.mask = ctaHoldingContainerMask;
	}
	
	if (stageContent.getBounds().height === 88) {
		ctaHoldingContainerMask.graphics.f("red").dr(0,0,stageContent.getBounds().width-115,stageContent.getBounds().height);
		ctaHoldingContainer.mask = ctaHoldingContainerMask;
	}
	//-----------------------------------------------
	
	ctaHoldingContainer.addChild(ctaContainer);
	stageContent.addChild(ctaHoldingContainer);
	
	var ctaAnimationIn = currentFrame.hasOwnProperty("cta-animation-in") ? currentFrame['cta-animation-in'] : false;
	var ctaAnimationOut = currentFrame.hasOwnProperty("cta-animation-out") ? currentFrame['cta-animation-out'] : false;
	
	if (ctaAnimationIn && ctaAnimationIn.delay && ctaAnimationOut && ctaAnimationOut.delay) {
		createjs.Tween.get(ctaContainer)
			.wait(parseInt(ctaAnimationIn.delay))
			.call(function(){animateMultipurposeContentIn( ctaContainer, ctaAnimationIn, ctaXPosition, ctaYPosition );})
			.wait(parseInt(ctaAnimationOut.delay))
			.call(function(){animateMultipurposeContentOut( ctaContainer, ctaAnimationOut, ctaXPosition, ctaYPosition );});
	}
	
	//"logo-image"
	var logoImage = new createjs.Bitmap(queue.getResult("logo-image-"+frameIndex));
	logoImage.alpha = 0;
	
	var logoXPosition = currentFrame.hasOwnProperty("logo-position") ? parseInt(currentFrame['logo-position'].x) : stageContent.getBounds().width * 0.5;
	var logoYPosition = currentFrame.hasOwnProperty("logo-position") ? parseInt(currentFrame['logo-position'].y) : stageContent.getBounds().height * 0.5;
	
	var logoHoldingContainer = new createjs.Container();
	logoHoldingContainer.setBounds(0,0,stageContent.getBounds().width,stageContent.getBounds().height);
	logoHoldingContainer.addChild(logoImage);
	stageContent.addChild(logoHoldingContainer);
	
	var logoAnimationIn = currentFrame.hasOwnProperty("logo-animation-in") ? currentFrame['logo-animation-in'] : false;
	var logoAnimationOut = currentFrame.hasOwnProperty("logo-animation-out") ? currentFrame['logo-animation-out'] : false;
	
	if (logoAnimationIn && logoAnimationIn.delay && logoAnimationOut && logoAnimationOut.delay) {
		createjs.Tween.get(logoImage)
			.wait(parseInt(logoAnimationIn.delay))
			.call(function(){animateMultipurposeContentIn( logoImage, logoAnimationIn, logoXPosition, logoYPosition );})
			.wait(parseInt(logoAnimationOut.delay))
			.call(function(){animateMultipurposeContentOut( logoImage, logoAnimationOut, logoXPosition, logoYPosition );});
	}
	
	
	var delayUntilNextFrame = currentFrame.hasOwnProperty("frame-animation-duration") ?  parseInt(currentFrame['frame-animation-duration']) : 3000;

	setTimeout(function() {
		if ( frameIndex < content.frames.length - 1) {
		   determineWhichFrameShouldBeDrawn();
		} else if (evaluateLoopingOfBanner()) {
		   stageContent.removeAllChildren();
		   determineWhichFrameShouldBeDrawn();
		}
	},delayUntilNextFrame);
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



// --------------------
function createSpritesheetGradientText( object, objectGradient ) {
	
	var gradientText = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([objectGradient.colour_1 ? objectGradient.colour_1 : 'rgba(247,145,2,1)',objectGradient.colour_2 ? objectGradient.colour_2 : 'rgba(239,45,45,1)',objectGradient.colour_3 ? objectGradient.colour_3 : 'rgba(24,88,226,1)'],[0,0.5,1],0,0,object.image.width,0).drawRect(0,0,object.image.width,object.image.height));
	gradientText.filters = [ new createjs.AlphaMaskFilter(object.cacheCanvas) ];
	gradientText.cache(0,0,object.image.width,object.image.height);
	
	return gradientText;
}

function createSpritesheetGradientPartText( lineNumber, object, objectGradient, objectHeight, start, length) {
	
	var gradientText = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill([objectGradient.colour_1 ? objectGradient.colour_1 : 'rgba(247,145,2,1)',objectGradient.colour_2 ? objectGradient.colour_2 : 'rgba(239,45,45,1)',objectGradient.colour_3 ? objectGradient.colour_3 : 'rgba(24,88,226,1)'],[0,0.5,1],start,0,start+length,0).drawRect(start,1,length,objectHeight));
	gradientText.filters = [ new createjs.AlphaMaskFilter(object.cacheCanvas) ];
	gradientText.cache(0,1,object.getBounds().width,objectHeight);
	gradientText.y = 1;
	
	object.y = 0 - lineNumber * objectHeight;
	
	var leftSideOfObject = new createjs.Container();
	leftSideOfObject.setBounds(0,0,object.getBounds().width,objectHeight);
	var leftSideWidth = start;
	if (leftSideWidth > 0) {
		leftSideOfObject.addChild(object);
		leftSideOfObject.cache(0,0,leftSideWidth,objectHeight);
	}
	
	var rightSideOfObject = new createjs.Container();
	var rightSideWidth = object.getBounds().width - start - length;
	if (rightSideWidth > 0) {
		rightSideOfObject.addChild(object);
		rightSideOfObject.cache(start + length,0,rightSideWidth,objectHeight);
	}
	
	var mergedContainer = new createjs.Container();
	mergedContainer.addChild(leftSideOfObject, gradientText, rightSideOfObject);
	mergedContainer.cache(0,0,object.getBounds().width,objectHeight);
	
	return mergedContainer;
}

function createSimpleSheen( object, objectSheen ) { 
	
	var sheenArea = new createjs.Shape();
	sheenArea.graphics.beginFill("#ffffff").drawRect(0,0,object.getBounds().width,object.getBounds().height);
	sheenArea.filters = [new createjs.AlphaMaskFilter(object.cacheCanvas)];
	sheenArea.cache(0,0,object.getBounds().width,object.getBounds().height);
	sheenArea.alpha = 0.5;
	
	var sheenLine = new createjs.Shape();	
	sheenLine.graphics.beginFill("red").drawRect(0,0,10,object.getBounds().height * 1.1);
	sheenLine.rotation = 15;
	sheenLine.regX = 5;
	sheenLine.regY = object.getBounds().height  * 1.1 * 0.5;
	sheenLine.x = 0 - object.getBounds().width * 0.5;
	sheenLine.y = object.getBounds().height * 0.5;
	sheenLine.alpha = 0;
	sheenArea.mask = sheenLine;
	
	createjs.Tween.get(sheenLine)
		.wait(parseInt(objectSheen.delay))
		.to({alpha: 1})
		.to({x: object.getBounds().width + object.getBounds().width * 0.5 },parseInt(objectSheen.duration),createjs.Ease.sineOut)
		.call(function(){sheenArea.parent.removeChild(sheenArea);});
	
	return sheenArea;
}

function createSoftSheen( object, objectSheen ) { 
	
	var sheenArea = new createjs.Shape();
	sheenArea.graphics.beginFill("#ffffff").drawRect(0,0,object.getBounds().width,object.getBounds().height * 2);
	var sheenLine = new createjs.Shape();	
	sheenLine.graphics.beginLinearGradientFill(['transparent','#ffffff','transparent'],[0,0.5,1],0,0,object.getBounds().width,0).drawRect(0,0,object.getBounds().width,object.getBounds().height * 2);
	
	
	sheenLine.cache(0, 0, object.getBounds().width, object.getBounds().height * 2);
	sheenArea.filters = [new createjs.AlphaMaskFilter(sheenLine.cacheCanvas)];
	sheenArea.cache(0,0,object.getBounds().width,object.getBounds().height * 2);
	
	sheenArea.regX = object.getBounds().width * 0.5;
	sheenArea.regY = object.getBounds().height;
	sheenArea.rotation = 15;
	sheenArea.alpha = 0;
	sheenArea.x = 0 - object.getBounds().width * 0.5 - 30;
	sheenArea.y = object.getBounds().height * 0.5;
	
	var sheenContainer = new createjs.Container();
	sheenContainer.setBounds(0,0,object.getBounds().width,object.getBounds().height);
	sheenContainer.addChild(sheenArea);
	
	sheenContainer.addEventListener('tick', cacheContainer);
	sheenContainer.filters = [new createjs.AlphaMaskFilter(object.cacheCanvas)];
	function cacheContainer() {
            sheenContainer.cache(0,0,object.getBounds().width,object.getBounds().height);
        }
	
	createjs.Tween.get(sheenArea)
		.wait(parseInt(objectSheen.delay))
		.to({alpha: 1})
		.to({x: object.getBounds().width + object.getBounds().width * 0.5 + 30 },parseInt(objectSheen.duration),createjs.Ease.sineOut)
		.call(function(){
			sheenContainer.removeEventListener('tick', cacheContainer, false);
			sheenContainer.parent.removeChild(sheenContainer);
			});
	
	return sheenContainer;
}

function create3DSheen( object, objectSheen ) { 

	object.cache(0,0,object.getBounds().width,object.getBounds().height);
	
	var topSheenArea = new createjs.Shape();
	topSheenArea.graphics.beginFill("red").drawRect(0,0, object.getBounds().width, 5);
	topSheenArea.filters = [new createjs.AlphaMaskFilter(object.cacheCanvas)];
	topSheenArea.cache(0,0,object.getBounds().width,object.getBounds().height);
	
	var bottomSheenArea = new createjs.Shape();
	bottomSheenArea.graphics.beginFill("red").drawRect(0,0, 5, object.getBounds().height);
	bottomSheenArea.filters = [new createjs.AlphaMaskFilter(object.cacheCanvas)];
	bottomSheenArea.cache(0,0,object.getBounds().width,object.getBounds().height);
	
	var sheenAreaContainer = new createjs.Container();
	sheenAreaContainer.setBounds(0,0,object.getBounds().width,object.getBounds().height);
	sheenAreaContainer.addChild(topSheenArea, bottomSheenArea);
	sheenAreaContainer.cache(0,0,object.getBounds().width,object.getBounds().height);
	
	var sheenAreaShape = new createjs.Shape();
	sheenAreaShape.graphics.beginRadialGradientFill(['#ffffff','transparent'], [0, 1], 0, 0, 0, 0, 0, object.getBounds().height).drawRect(0, 0, object.getBounds().width, object.getBounds().height);
	sheenAreaShape.filters = [new createjs.AlphaMaskFilter(sheenAreaContainer.cacheCanvas)];
	sheenAreaShape.cache(0,0,object.getBounds().width,object.getBounds().height);
	
	var sheenArea = new createjs.Shape();
	sheenArea.graphics.beginFill("#ffffff").drawRect(0,0,object.getBounds().width,object.getBounds().height);
	sheenArea.filters = [new createjs.AlphaMaskFilter(sheenAreaShape.cacheCanvas)];
	sheenArea.cache(0,0,object.getBounds().width,object.getBounds().height);
	
	var starShape = new createjs.Shape();
	starShape.graphics.beginRadialGradientFill(['red','transparent'], [0, 1], 60, 0, 10, 60, 0, 60).drawCircle(60, 0, 120);
	var star = new createjs.Shape();
	starShape.cache(0,-60,120,120);
	star.graphics.beginFill("#ffffff").drawRect(0,0,120,120);
	star.filters = [new createjs.AlphaMaskFilter(starShape.cacheCanvas)];
	star.cache(0,0,120,120);
	star.y = -3;
	star.x = -15;
	star.scaleY = 0.09;
	
	var starBackgroundShape = new createjs.Shape();
	starBackgroundShape.graphics.beginRadialGradientFill(['red','transparent'], [0, 1],60, 0, 0, 60, 0, 60).drawCircle(60, 0, 120);
	var starBackground = new createjs.Shape();
	starBackgroundShape.cache(0,-60,120,120);
	starBackground.graphics.beginFill("#ffffff").drawRect(0,0,120,120);
	starBackground.filters = [new createjs.AlphaMaskFilter(starBackgroundShape.cacheCanvas)];
	starBackground.cache(0,0,120,120);
	starBackground.scaleX = 0.5;
	starBackground.rotation = -15;
	starBackground.regY = 60;
	starBackground.y = -5;
	starBackground.x = 20;
	starBackground.alpha = 0.6;
	
	var starContainer = new createjs.Container();
	starContainer.addChild(starBackground, star);
	starContainer.alpha = 0;
	starContainer.x = -120;
	
	var sheenLine = new createjs.Shape();	
	sheenLine.graphics.beginFill("red").drawRect(0,0,30,object.getBounds().height + 10);
	sheenLine.rotation = 0;
	sheenLine.x = 0 - object.getBounds().width * 0.5;
	sheenLine.y = -5;
	sheenLine.alpha = 0;
	sheenArea.mask = sheenLine;
	
	var sheenContainer = new createjs.Container();
	sheenContainer.setBounds(0,0,object.getBounds().width,object.getBounds().height);
	sheenContainer.addChild(sheenArea, starContainer);
	
	sheenContainer.addEventListener('tick', cacheContainer);
	sheenContainer.filters = [new createjs.AlphaMaskFilter(object.cacheCanvas)];
	function cacheContainer() {
            sheenContainer.cache(0,0,object.getBounds().width,object.getBounds().height);
        }
	
	createjs.Tween.get(sheenLine)
		.wait(parseInt(objectSheen.delay))
		.to({alpha: 0.7})
		.to({x: object.getBounds().width + object.getBounds().width * 0.5 },parseInt(objectSheen.duration),createjs.Ease.quintIn);
	
	createjs.Tween.get(starContainer)
		.wait(parseInt(objectSheen.delay))
		.to({alpha: 1})
		.to({x: object.getBounds().width + object.getBounds().width * 0.5 },parseInt(objectSheen.duration),createjs.Ease.quintIn)
		.call(function(){
			sheenContainer.removeEventListener('tick', cacheContainer, false);
			sheenContainer.parent.removeChild(sheenContainer);
		});
	
	return sheenContainer;
}

function animateMultipurposeContentIn( object, inAnimation, xPosition, yPosition ) {
	
	object.regX = Math.round(object.getBounds().width * 0.5);
	object.regY = Math.round(object.getBounds().height * 0.5);
	
	switch (inAnimation.type) {
		case "fade" :
			createjs.Tween.get(object)
				.to({x: xPosition, y: yPosition})
				.to({alpha:1},parseInt(inAnimation.duration),createjs.Ease.sineOut);
			break;
		case "scale" :
			createjs.Tween.get(object)
				.to({x: xPosition, y: yPosition, alpha:1, scaleX: 0, scaleY: 0})
				.to({scaleX: 1, scaleY: 1},parseInt(inAnimation.duration),createjs.Ease.sineOut);
			break;
		case "flip" :
			createjs.Tween.get(object)
				.to({x: xPosition, y: yPosition, alpha:1, scaleX: 0})
				.to({scaleX: 1},parseInt(inAnimation.duration),createjs.Ease.sineOut);
			break;
		case "slide" :
			if (inAnimation.origin === "left"){
				createjs.Tween.get(object)
					.to({alpha:1, x: 0 - stageContent.getBounds().width * 0.5, y: yPosition})
					.to({x: xPosition},parseInt(inAnimation.duration),createjs.Ease.sineOut);
			} else if (inAnimation.origin === "right"){
				createjs.Tween.get(object)
					.to({alpha:1, x: stageContent.getBounds().width + stageContent.getBounds().width * 0.5, y: yPosition})
					.to({x: xPosition},parseInt(inAnimation.duration),createjs.Ease.sineOut);
			} else if (inAnimation.origin === "top"){
				createjs.Tween.get(object)
					.to({alpha:1, x: xPosition, y: 0 - stageContent.getBounds().height * 0.5})
					.to({y: yPosition},parseInt(inAnimation.duration),createjs.Ease.sineOut);
			} else if (inAnimation.origin === "bottom"){
				createjs.Tween.get(object)
					.to({alpha:1, x: xPosition, y: stageContent.getBounds().height + stageContent.getBounds().height * 0.5})
					.to({y: yPosition},parseInt(inAnimation.duration),createjs.Ease.sineOut);
			} else {
				createjs.Tween.get(object)
					.to({alpha:1, x: xPosition, y: yPosition});
			}
			break;
		case "slide-with-fade" :
			if (object.children && object.children.length > 2) {
				for (var i = 0; i < object.children.length - 1; i++) {
					object.children[i].alpha = 0;
				}
				createjs.Tween.get(object)
					.to({alpha:1, x: xPosition, y: yPosition})
					.call(function(){
						if (inAnimation.origin === "left"){
							for (var i = 0; i < object.children.length - 1; i++) {
								createjs.Tween.get(object.children[i])
									.to({x: 0 - object.getBounds().width * 0.3})
									.wait((parseInt(inAnimation.duration) - parseInt(inAnimation.duration) * 0.8) * i)
									.to({alpha:1, x: 0},parseInt(inAnimation.duration),createjs.Ease.circOut);
							}
						} else if (inAnimation.origin === "right"){
							for (var i = 0; i < object.children.length - 1; i++) {
								createjs.Tween.get(object.children[i])
									.to({x: object.getBounds().width - object.getBounds().width * 0.3})
									.wait((parseInt(inAnimation.duration) - parseInt(inAnimation.duration) * 0.8) * i)
									.to({alpha:1, x: 0},parseInt(inAnimation.duration),createjs.Ease.circOut);
							}
						} else if (inAnimation.origin === "top"){
							for (var i = 0; i < object.children.length - 1; i++) {
								createjs.Tween.get(object.children[i])
									.to({y: 0 - object.children[i].y})
									.wait((parseInt(inAnimation.duration) - parseInt(inAnimation.duration) * 0.8) * i)
									.to({alpha:1, y: object.children[i].y},parseInt(inAnimation.duration),createjs.Ease.circOut);
							}
						} else if (inAnimation.origin === "bottom"){
							for (var i = 0; i < object.children.length - 1; i++) {
								createjs.Tween.get(object.children[i])
									.to({y: object.getBounds().height})
									.wait((parseInt(inAnimation.duration) - parseInt(inAnimation.duration) * 0.8) * i)
									.to({alpha:1, y: object.children[i].y},parseInt(inAnimation.duration),createjs.Ease.circOut);
							}
						} else {
							for (var i = 0; i < object.children.length - 1; i++) {
								createjs.Tween.get(object.children[i])
									.wait((parseInt(inAnimation.duration) - parseInt(inAnimation.duration) * 0.8) * i)
									.to({alpha:1},parseInt(inAnimation.duration),createjs.Ease.circOut);
							}
						}
					});
			} else {
				if (inAnimation.origin === "left"){
					createjs.Tween.get(object)
						.to({x: xPosition - object.getBounds().width * 0.3, y: yPosition})
						.to({alpha:1, x: xPosition},parseInt(inAnimation.duration),createjs.Ease.circOut);
				} else if (inAnimation.origin === "right"){
					createjs.Tween.get(object)
						.to({x: xPosition + object.getBounds().width * 0.3, y: yPosition})
						.to({alpha:1, x: xPosition},parseInt(inAnimation.duration),createjs.Ease.circOut);
				} else if (inAnimation.origin === "top"){
					createjs.Tween.get(object)
						.to({x: xPosition, y: yPosition - object.getBounds().height * 0.3})
						.to({alpha:1, y: yPosition},parseInt(inAnimation.duration),createjs.Ease.circOut);
				} else if (inAnimation.origin === "bottom"){
					createjs.Tween.get(object)
						.to({x: xPosition, y: yPosition + object.getBounds().height * 0.3})
						.to({alpha:1, y: yPosition},parseInt(inAnimation.duration),createjs.Ease.circOut);
				} else {
					createjs.Tween.get(object)
						.to({alpha:1, x: xPosition, y: yPosition},parseInt(inAnimation.duration),createjs.Ease.circOut);
				}
			}
			break;
		case "none" :
			break;
		default :
			break;
	}
}

function animateMultipurposeContentOut( object, outAnimation, xPosition, yPosition ) {
	
	switch (outAnimation.type) {
		case "fade" :
			createjs.Tween.get(object)
				.to({x: xPosition, y: yPosition})
				.to({alpha:0},parseInt(outAnimation.duration),createjs.Ease.sineOut)
				.call(function(){object.parent.removeChild(object);});
			break;
		case "scale" :
			createjs.Tween.get(object)
				.to({x: xPosition, y: yPosition})
				.to({scaleX: 0, scaleY: 0},parseInt(outAnimation.duration),createjs.Ease.sineOut)
				.call(function(){object.parent.removeChild(object);});
			break;
		case "flip" :
			createjs.Tween.get(object)
				.to({x: xPosition, y: yPosition})
				.to({scaleX: 0},parseInt(outAnimation.duration),createjs.Ease.sineOut)
				.call(function(){object.parent.removeChild(object);});
			break;
		case "slide" :
			if (outAnimation.destination === "left"){
				createjs.Tween.get(object)
					.to({x: xPosition, y: yPosition})
					.to({x: 0 - stageContent.getBounds().width * 0.5 },parseInt(outAnimation.duration),createjs.Ease.sineOut)
					.call(function(){object.parent.removeChild(object);});
			} else if (outAnimation.destination === "right"){
				createjs.Tween.get(object)
					.to({x: xPosition, y: yPosition})
					.to({x: stageContent.getBounds().width + stageContent.getBounds().width * 0.5},parseInt(outAnimation.duration),createjs.Ease.sineOut)
					.call(function(){object.parent.removeChild(object);});
			} else if (outAnimation.destination === "top"){
				createjs.Tween.get(object)
					.to({x: xPosition, y: yPosition})
					.to({y: 0 - stageContent.getBounds().height * 0.5},parseInt(outAnimation.duration),createjs.Ease.sineOut)
					.call(function(){object.parent.removeChild(object);});
			} else if (outAnimation.destination === "bottom"){
				createjs.Tween.get(object)
					.to({x: xPosition, y: yPosition})
					.to({y: stageContent.getBounds().height + stageContent.getBounds().height * 0.5},parseInt(outAnimation.duration),createjs.Ease.sineOut)
					.call(function(){object.parent.removeChild(object);});
			} else {
				createjs.Tween.get(object)
					.to({x: xPosition, y: yPosition})
					.call(function(){object.parent.removeChild(object);});
			}
			break;
		case "slide-with-fade" :
			if (object.children && object.children.length > 2) {
				createjs.Tween.get(object)
					.to({x: xPosition, y: yPosition})
					.call(function(){
						if (outAnimation.destination === "left"){
							for (var i = 0; i < object.children.length - 1; i++) {
								createjs.Tween.get(object.children[i])
									.to({x: 0})
									.wait((parseInt(outAnimation.duration) - parseInt(outAnimation.duration) * 0.8) * i)
									.to({alpha:0, x: 0 - object.getBounds().width * 0.3},parseInt(outAnimation.duration),createjs.Ease.circIn);
							}
						} else if (outAnimation.destination === "right"){
							for (var i = 0; i < object.children.length - 1; i++) {
								createjs.Tween.get(object.children[i])
									.to({x: 0})
									.wait((parseInt(outAnimation.duration) - parseInt(outAnimation.duration) * 0.8) * i)
									.to({alpha:0, x: object.getBounds().width - object.getBounds().width * 0.3},parseInt(outAnimation.duration),createjs.Ease.circIn);
							}
						} else if (outAnimation.destination === "top"){
							for (var i = 0; i < object.children.length - 1; i++) {
								createjs.Tween.get(object.children[i])
									.to({y: object.children[i].y})
									.wait((parseInt(outAnimation.duration) - parseInt(outAnimation.duration) * 0.8) * i)
									.to({alpha:0, y: 0 - object.children[i].y},parseInt(outAnimation.duration),createjs.Ease.circIn);
							}
						} else if (outAnimation.destination === "bottom"){
							for (var i = 0; i < object.children.length - 1; i++) {
								createjs.Tween.get(object.children[i])
									.to({y: object.children[i].y})
									.wait((parseInt(outAnimation.duration) - parseInt(outAnimation.duration) * 0.8) * i)
									.to({alpha:0, y: object.getBounds().height},parseInt(outAnimation.duration),createjs.Ease.circIn);
							}
						} else {
							for (var i = 0; i < object.children.length - 1; i++) {
								createjs.Tween.get(object.children[i])
									.wait((parseInt(outAnimation.duration) - parseInt(outAnimation.duration) * 0.8) * i)
									.to({alpha:0},parseInt(outAnimation.duration),createjs.Ease.circIn);
							}
						}
					})
					.wait((parseInt(outAnimation.duration) - 500) * (object.children.length - 2) + parseInt(outAnimation.duration))
					.call(function(){object.parent.removeChild(object);});
			} else {
				if (outAnimation.destination === "left"){
					createjs.Tween.get(object)
						.to({x: xPosition, y: yPosition})
						.to({alpha:0, x: xPosition - object.getBounds().width * 0.3},parseInt(outAnimation.duration),createjs.Ease.circIn)
						.call(function(){object.parent.removeChild(object);});
				} else if (outAnimation.destination === "right"){
					createjs.Tween.get(object)
						.to({x: xPosition, y: yPosition})
						.to({alpha:0, x: xPosition + object.getBounds().width * 0.3},parseInt(outAnimation.duration),createjs.Ease.circIn)
						.call(function(){object.parent.removeChild(object);});
				} else if (outAnimation.destination === "top"){
					createjs.Tween.get(object)
						.to({x: xPosition, y: yPosition})
						.to({alpha:0, y: yPosition - object.getBounds().height * 0.3},parseInt(outAnimation.duration),createjs.Ease.circIn)
						.call(function(){object.parent.removeChild(object);});
				} else if (outAnimation.destination === "bottom"){
					createjs.Tween.get(object)
						.to({x: xPosition, y: yPosition})
						.to({alpha:0, y: yPosition + object.getBounds().height * 0.3},parseInt(outAnimation.duration),createjs.Ease.circIn)
						.call(function(){object.parent.removeChild(object);});
				} else {
					createjs.Tween.get(object)
						.to({alpha:0, x: xPosition, y: yPosition},parseInt(outAnimation.duration),createjs.Ease.circIn)
						.call(function(){object.parent.removeChild(object);});
				}
			}
			break;
		case "none" :
			break;
		default :
			break;
	}
}
	