# TweenMaxRN

Special tanks to @hzdg to create the first pluging using state.

- This repo open TweenMax to work with Direct Manipulation, reaching a good performance in complex animations.
- With this library is possible animate Styles and Transform properties.

# How use

- Include src/libs/TweenMaxRN.js in your project library folder
- Import both libraries in your React Component
 	- require("gsap");
	- require("src/libs/TweenMaxRN");
	
```javascript
require("gsap");
require("src/libs/TweenMaxRN");

TweenMax.fromTo(this.refs.view, 3, {style: {opacity: 0}, transform:{ translateY:200 } }, {style: {opacity: 1}, transform:{ translateY:0 }});

<View ref="view" ></View>
```

# COMPILE APK DEMO
1. Clone this repository
2. Connect device with USB debuggin enabled Or Open Android Virtual Device
3. Open Console
	- yarn install
	- npm run android-clean
	- npm start
	
Download APK: https://www.dropbox.com/s/8o8n1bsgxw489gf/app-release.apk?dl=0

![animation](http://int-server-one.info/cloudbit/tweenmaxRN.gif)
