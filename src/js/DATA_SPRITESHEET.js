//	JavaScript - OSM DCO JSONP file

//	Overview: MULTIPURPOSE-CONTENT-FRAME can be repeated multiple times and be used to atchieve any frame look.
 
//  Requirements: MULTIPURPOSE-CONTENT-FRAME JSONP structure MUST MUST MUST have the folowing fields assigned: "unique-background", "spritesheet-image", "content-image", "headline-image", "relational-image",  "cta-image", "logo-image" (also it is the order of how elements are added to the canvas). The other fields, if missed, will not break the template, the elements simply will not be added to the canvas and will not be seen during banner animation.





//  "unique-background": the image has to be the size of the banner. If the element is not needed - assign "1x1-blank.png".

//  "spritesheet-image": the spritesheet images have to be the size of the banner. If the element is not needed - assign "1x1-blank.png". "framerate" controls spritesheet animation speed, "count" - how many frames are played and on which frame the spritesheet animation stops.

//  "content-image": the image can be any size. If it is not needed - assign "1x1-blank.png". Use "content-position" to position the content - the coordinates are for the center point. Use "content-sheen" to run the sheen. The sheen "delay" is not connected to content-animation-in delay value, so it has to be something between content-animation-in delay value and content-animation-out delay value in order to be able to see the sheen running accross the content image. The sheen "type" value can be "none","simple-sheen" or "soft-sheen".

//  "headline-image": the image is made by caching live text pulled from GoogleDoc. Then the cached image is devided into equal parts based on how many <br class='break-???x???'> are in the live text. This step is needed to be able to animate each line of text separetely, if "slide-with-fade" animation is chosen. If the element is not needed - assign "". Use "headline-position" to position the headline - the coordinates are for the center point. Use "headline-gradient" to apply a colour or a gradient (yes, you can do both!) - this will be applied if a holding <span> has class "f-gradient" assigned. Use "headline-sheen" to run the sheen. The sheen "delay" is not connected to headline-animation-in delay value, so it has to be something between headline-animation-in delay value and headline-animation-out delay value in order to be able to see the sheen running accross the headline.

//  "relational-image": the image is made by caching live text pulled from GoogleDoc. If the element is not needed - assign "". Use "relational-position" to position the relational text - the coordinates are for the center point. Use "relational-gradient" to apply a colour or a gradient (yes, you can do both!) - this will be applied if a holding <span> has class "f-gradient" assigned. Use "relational-sheen" to run the sheen. The sheen "delay" is not connected to relational-animation-in delay value, so it has to be something between relational-animation-in delay value and relational-animation-out delay value in order to be able to see the sheen running accross the relational text.

//  "cta-image": the image has to be the size of the cta. If the element is not needed - assign "1x1-blank.png". Use "cta-position" to position the cta - the coordinates are for the center point. Use "cta-sheen" to run the sheen. The sheen "delay" is not connected to cta-animation-in delay value, so it has to be something between cta-animation-in delay value and cta-animation-out delay value in order to be able to see the sheen running accross the cta image. The sheen "type" value can be "none" , "simple-sheen","3d-sheen" or "soft-sheen".

//  "logo-image": the image has to be the size of the logo. If the element is not needed - assign "1x1-blank.png". Use "logo-position" to position the logo - the coordinates are for the center point.





//  ???-animation-in and ???-animation-out: all elements are calling the same animation-in and animation-out functions, so no hidden surprises in behaviours ;). Also, there is a condition in the code - to use ???-animation-in you need to specify ???-animation-out too, even an element is not needed to be animated out.
//  ???-animation-in "type": "none" - nothing happens, an element is not added to the canvas.
//  ???-animation-in "type": "fade" - an element fades in "duration" time after "delay" time.
//  ???-animation-in "type": "scale" - an element scales to 1 in x and y directions in "duration" time after "delay" time.
//  ???-animation-in "type": "flip" - an element scales to 1 in x direction in "duration" time after "delay" time.
//  ???-animation-in "type": "slide" - an element slides in "duration" time from "origin", which can be "left", "right", "top", "bottom" and "none", after "delay" time. The "origin" value is OUTSIDE canvas borders.
//  ???-animation-in "type": "slide-with-fade" - an element slides with fade in "duration" time from "origin", which can be "left", "right", "top", "bottom" and "none", after "delay" time. The "origin" value is INSIDE canvas borders. If elements is an array of elements (like "headline-image"), each next array element (starting from the second) slides with fade in "duration" time from "origin" after "duration"-"duration"*0.8 time. 

//  ???-animation-out "type": "none" - nothing happens, an element stays visible on the canvas (even through other frames),
//  ???-animation-out "type": "fade" - an element fades out in "duration" time after (???-animation-in "delay")+(???-animation-in "duration")+(???-animation-out "delay") time.
//  ???-animation-out "type": "scale" - an element scales to zero in x and y directions in "duration" time after (???-animation-in "delay")+(???-animation-in "duration")+(???-animation-out "delay") time.
//  ???-animation-out "type": "flip" - an element scales to zero in x direction in "duration" time after (???-animation-in "delay")+(???-animation-in "duration")+(???-animation-out "delay") time.
//  ???-animation-out "type": "slide" - an element slides in "duration" time to "destination", which can be "left", "right", "top", "bottom" and "none", after (???-animation-in "delay")+(???-animation-in "duration")+(???-animation-out "delay") time. The "destination" value is OUTSIDE canvas borders.
//  ???-animation-out "type": "slide-with-fade" - an element slides with fade in "duration" time to "destination", which can be "left", "right", "top", "bottom" and "none", after (???-animation-in "delay")+(???-animation-in "duration")+(???-animation-out "delay") time. The "destination" value is INSIDE canvas borders. If elements is an array of elements (like "headline-image"), each next array element (starting from the second) slides with fade in "duration" time to "destination" after "duration"-"duration"*0.8 time.
jsonCallback({
	"Name":"DCO - Build test",
	"Banner_120x600": {
		"serve-backup":{
			"choice":"no",
			"image":"1x1-blank.png"
		},
		"background":"mobile_background.png",
		"logo":"1x1-blank.png",
		"loop": 0,
		"legal-label-position":{"left":31,"top":584},
		"frames":[
			{
				"type":"MULTIPURPOSE-CONTENT-FRAME",
				
				"show-logo":false,
				
				"unique-background":"1x1-blank.png",
				"background-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"background-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"spritesheet-image":"1x1-blank.png",
				"spritesheet-setup":{"framerate":25, "count": 1},
				"spritesheet-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"spritesheet-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"content-image":"1x1-blank.png",
				"content-position":{"x":0,"y":0},
				"content-sheen":{"type":"none", "duration":0, "delay":0},
				"content-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"content-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"headline-image":"Frame_1_Headline_standard_size",
				"headline-position":{"x":0,"y":0},
				"headline-gradient":{"colour_1":'rgba(247,145,2,1)',"colour_2":'rgba(239,45,45,1)',"colour_3":'rgba(24,88,226,1)'},
				"headline-sheen":{"show":"no", "duration":0, "delay":0},
				"headline-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"headline-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"relational-image":"Frame_1_Headline_standard_size",
				"relational-position":{"x":0,"y":0},
				"relational-gradient":{"colour_1":'rgba(247,145,2,1)',"colour_2":'rgba(239,45,45,1)',"colour_3":'rgba(24,88,226,1)'},
				"relational-sheen":{"show":"no", "duration":0, "delay":0},
				"relational-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"relational-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"cta-image":"1x1-blank.png",
				"cta-position":{"x":0,"y":0},
				"cta-sheen":{"type":"none", "duration":0, "delay":0},
				"cta-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"cta-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"logo-image":"1x1-blank.png",
				"logo-position":{"x":0,"y":0},
				"logo-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"logo-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},

				"frame-animation-duration":6000,
			}
		]
	},
	"Banner_160x600": {
		"serve-backup":{
			"choice":"no",
			"image":"1x1-blank.png"
		},
		"background":"mobile_background.png",
		"logo":"1x1-blank.png",
		"loop": 0,
		"legal-label-position":{"left":51,"top":584},
		"frames":[
			{
				"type":"MULTIPURPOSE-CONTENT-FRAME",
				
				"show-logo":false,
				
				"unique-background":"1x1-blank.png",
				"background-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"background-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"spritesheet-image":"1x1-blank.png",
				"spritesheet-setup":{"framerate":25, "count": 1},
				"spritesheet-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"spritesheet-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"content-image":"1x1-blank.png",
				"content-position":{"x":0,"y":0},
				"content-sheen":{"type":"none", "duration":0, "delay":0},
				"content-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"content-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"headline-image":"Frame_1_Headline_standard_size",
				"headline-position":{"x":0,"y":0},
				"headline-gradient":{"colour_1":'rgba(247,145,2,1)',"colour_2":'rgba(239,45,45,1)',"colour_3":'rgba(24,88,226,1)'},
				"headline-sheen":{"show":"no", "duration":0, "delay":0},
				"headline-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"headline-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"relational-image":"Frame_1_Headline_standard_size",
				"relational-position":{"x":0,"y":0},
				"relational-gradient":{"colour_1":'rgba(247,145,2,1)',"colour_2":'rgba(239,45,45,1)',"colour_3":'rgba(24,88,226,1)'},
				"relational-sheen":{"show":"no", "duration":0, "delay":0},
				"relational-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"relational-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"cta-image":"1x1-blank.png",
				"cta-position":{"x":0,"y":0},
				"cta-sheen":{"type":"none", "duration":0, "delay":0},
				"cta-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"cta-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"logo-image":"1x1-blank.png",
				"logo-position":{"x":0,"y":0},
				"logo-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"logo-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},

				"frame-animation-duration":6000,
			}
		]
	},
	"Banner_300x250": {
		"serve-backup":{
			"choice":"no",
			"image":"1x1-blank.png"
		},
		"background":"mobile_background.png",
		"logo":"1x1-blank.png",
		"logo-position":{"x":0,"y":0},
		"loop": 0,
		"legal-label-position":{"left":120,"top":233},
		"frames":[
			{
				"type":"MULTIPURPOSE-CONTENT-FRAME",
				
				"show-logo":false,
				
				"unique-background":"1x1-blank.png",
				"background-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"background-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"spritesheet-image":"1x1-blank.png",
				"spritesheet-setup":{"framerate":25, "count": 1},
				"spritesheet-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"spritesheet-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"content-image":"1x1-blank.png",
				"content-position":{"x":0,"y":0},
				"content-sheen":{"type":"none", "duration":0, "delay":0},
				"content-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"content-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"headline-image":"Frame_1_Headline_standard_size",
				"headline-position":{"x":0,"y":0},
				"headline-gradient":{"colour_1":'rgba(247,145,2,1)',"colour_2":'rgba(239,45,45,1)',"colour_3":'rgba(24,88,226,1)'},
				"headline-sheen":{"show":"no", "duration":0, "delay":0},
				"headline-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"headline-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"relational-image":"Frame_1_Headline_standard_size",
				"relational-position":{"x":0,"y":0},
				"relational-gradient":{"colour_1":'rgba(247,145,2,1)',"colour_2":'rgba(239,45,45,1)',"colour_3":'rgba(24,88,226,1)'},
				"relational-sheen":{"show":"no", "duration":0, "delay":0},
				"relational-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"relational-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"cta-image":"1x1-blank.png",
				"cta-position":{"x":0,"y":0},
				"cta-sheen":{"type":"none", "duration":0, "delay":0},
				"cta-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"cta-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"logo-image":"1x1-blank.png",
				"logo-position":{"x":0,"y":0},
				"logo-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"logo-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},

				"frame-animation-duration":6000,
			}
		]
	},
	"Banner_728x90": {
		"serve-backup":{
			"choice":"no",
			"image":"1x1-blank.png"
		},
		"background":"mobile_background.png",
		"logo":"1x1-blank.png",
		"loop": 0,
		"legal-label-position":{"left":628,"top":77},
		"frames":[
			{
				"type":"MULTIPURPOSE-CONTENT-FRAME",
				
				"show-logo":false,
				
				"unique-background":"1x1-blank.png",
				"background-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"background-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"spritesheet-image":"1x1-blank.png",
				"spritesheet-setup":{"framerate":25, "count": 1},
				"spritesheet-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"spritesheet-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"content-image":"1x1-blank.png",
				"content-position":{"x":0,"y":0},
				"content-sheen":{"type":"none", "duration":0, "delay":0},
				"content-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"content-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"headline-image":"Frame_1_Headline_standard_size",
				"headline-position":{"x":0,"y":0},
				"headline-gradient":{"colour_1":'rgba(247,145,2,1)',"colour_2":'rgba(239,45,45,1)',"colour_3":'rgba(24,88,226,1)'},
				"headline-sheen":{"show":"no", "duration":0, "delay":0},
				"headline-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"headline-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"relational-image":"Frame_1_Headline_standard_size",
				"relational-position":{"x":0,"y":0},
				"relational-gradient":{"colour_1":'rgba(247,145,2,1)',"colour_2":'rgba(239,45,45,1)',"colour_3":'rgba(24,88,226,1)'},
				"relational-sheen":{"show":"no", "duration":0, "delay":0},
				"relational-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"relational-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"cta-image":"1x1-blank.png",
				"cta-position":{"x":0,"y":0},
				"cta-sheen":{"type":"none", "duration":0, "delay":0},
				"cta-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"cta-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"logo-image":"1x1-blank.png",
				"logo-position":{"x":0,"y":0},
				"logo-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"logo-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},

				"frame-animation-duration":6000,
			}
		]
	},
	"Banner_300x50": {
		"serve-backup":{
			"choice":"no",
			"image":"1x1-blank.png"
		},
		"background":"mobile_background.png",
		"logo":"1x1-blank.png",
		"loop": 0,
		"legal-label-position":{"left":238,"top":38},
		"frames":[
			{
				"type":"MULTIPURPOSE-CONTENT-FRAME",
				
				"show-logo":false,
				
				"unique-background":"1x1-blank.png",
				"background-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"background-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"spritesheet-image":"1x1-blank.png",
				"spritesheet-setup":{"framerate":25, "count": 1},
				"spritesheet-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"spritesheet-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"content-image":"1x1-blank.png",
				"content-position":{"x":0,"y":0},
				"content-sheen":{"type":"none", "duration":0, "delay":0},
				"content-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"content-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"headline-image":"Frame_1_Headline_standard_size",
				"headline-position":{"x":0,"y":0},
				"headline-gradient":{"colour_1":'rgba(247,145,2,1)',"colour_2":'rgba(239,45,45,1)',"colour_3":'rgba(24,88,226,1)'},
				"headline-sheen":{"show":"no", "duration":0, "delay":0},
				"headline-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"headline-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"relational-image":"Frame_1_Headline_standard_size",
				"relational-position":{"x":0,"y":0},
				"relational-gradient":{"colour_1":'rgba(247,145,2,1)',"colour_2":'rgba(239,45,45,1)',"colour_3":'rgba(24,88,226,1)'},
				"relational-sheen":{"show":"no", "duration":0, "delay":0},
				"relational-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"relational-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"cta-image":"1x1-blank.png",
				"cta-position":{"x":0,"y":0},
				"cta-sheen":{"type":"none", "duration":0, "delay":0},
				"cta-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"cta-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"logo-image":"1x1-blank.png",
				"logo-position":{"x":0,"y":0},
				"logo-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"logo-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},

				"frame-animation-duration":6000,
			}
		]
	},
	"Banner_320x50": {
		"serve-backup":{
			"choice":"no",
			"image":"1x1-blank.png"
		},
		"background":"mobile_background.png",
		"logo":"1x1-blank.png",
		"loop": 0,
		"legal-label-position":{"left":260,"top":38},
		"frames":[
			{
				"type":"MULTIPURPOSE-CONTENT-FRAME",
				
				"show-logo":false,
				
				"unique-background":"1x1-blank.png",
				"background-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"background-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"spritesheet-image":"1x1-blank.png",
				"spritesheet-setup":{"framerate":25, "count": 1},
				"spritesheet-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"spritesheet-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"content-image":"1x1-blank.png",
				"content-position":{"x":0,"y":0},
				"content-sheen":{"type":"none", "duration":0, "delay":0},
				"content-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"content-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"headline-image":"Frame_1_Headline_standard_size",
				"headline-position":{"x":0,"y":0},
				"headline-gradient":{"colour_1":'rgba(247,145,2,1)',"colour_2":'rgba(239,45,45,1)',"colour_3":'rgba(24,88,226,1)'},
				"headline-sheen":{"show":"no", "duration":0, "delay":0},
				"headline-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"headline-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"relational-image":"Frame_1_Headline_standard_size",
				"relational-position":{"x":0,"y":0},
				"relational-gradient":{"colour_1":'rgba(247,145,2,1)',"colour_2":'rgba(239,45,45,1)',"colour_3":'rgba(24,88,226,1)'},
				"relational-sheen":{"show":"no", "duration":0, "delay":0},
				"relational-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"relational-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"cta-image":"1x1-blank.png",
				"cta-position":{"x":0,"y":0},
				"cta-sheen":{"type":"none", "duration":0, "delay":0},
				"cta-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"cta-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},
				
				"logo-image":"1x1-blank.png",
				"logo-position":{"x":0,"y":0},
				"logo-animation-in":{"type":"none", "origin":"none", "duration":0, "delay":0},
				"logo-animation-out":{"type":"none", "destination":"none", "duration":0, "delay":0},

				"frame-animation-duration":6000,
			}
		]
	}
});
