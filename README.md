# TweenMaxRN

THIS LIBRARY IS DEPRECATED, INSTEAD USE THE GSAP 3 COMPATIBILITY LIBRARY: https://github.com/cloudbit-interactive/GSAP-RN

Special tanks to @hzdg to create the first pluging using state.
- Support for gsap: 2.1.3, we tried to give support to the new gsap 3, but look like it have many issues if a html document don't exist.
- This repo open TweenMax to work with Direct Manipulation, reaching a good performance in complex animations.
- With this library is possible animate Styles and Transform properties.
- Is important to note that for reactNative you need always specify the initial params before animate its.
- The performance using Direct Manipulation is really good, specially when we compile our app in release version.

# How use

- Include src/libs/TweenMaxRN.js in your project library folder
- Install gsap
	- npm install gsap
- Import both libraries in your React Component
 	- import {TimelineMax} from "gsap";
	- require("src/libs/TweenMaxRN");
	
```javascript
import {TimelineMax} from "gsap";
require("src/libs/TweenMaxRN");

TweenMax.fromTo(this.refs.view, 3, {style: {opacity: 0}, transform:{ translateY:200 } }, {style: {opacity: 1}, transform:{ translateY:0 }});

<View ref="view" ></View>

## Using TimelineMax

let timeline = new TimelineMax();
timeline.add("init");
timeline.set(this.refs.view1, {style:{backgroundColor: "#F0F"}, transform:{translateY:400});
timeline.to(this.refs.view1, 0.6, {transform:{translateY:0}, ease:Power2.easeIn});
timeline.to(this.refs.view1, 0.6, {style:{backgroundColor: "#F00"}, ease:Power2.easeIn});
timeline.add("end");
```

# COMPILE APK DEMO
1. Clone this repository
2. Connect device with USB debuggin enabled Or Open Android Virtual Device
3. Open Console
	- yarn install
	- npm run android-clean
	- npm start
	
Download APK: https://www.dropbox.com/s/8o8n1bsgxw489gf/app-release.apk?dl=0

Video: https://www.dropbox.com/s/ioghw2t7ua5agpn/video.mp4?dl=0

![animation](http://int-server-one.info/cloudbit/tweenmaxRN.gif)
