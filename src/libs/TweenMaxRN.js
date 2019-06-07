/* TweenMax RN v.0.0.3
    Example:
        1. npm install gsap
        2. import TweenMaxRN.js in your file
            import {TimelineMax} from "gsap";
            require("src/libs/TweenMaxRN");

      TweenMax.fromTo(this.refs.view, 3, {style: {opacity: 0}, transform:{ translateY:200 } }, {style: {opacity: 1}, transform:{ translateY:0 }  } );
      <View ref="view" ... ></View>
*/
var __hasProp = {}.hasOwnProperty;
if (window._gsQueue == null) { window._gsQueue = []; }
window._gsQueue.push(function() {
    return window._gsDefine.plugin({
        propName: 'state',
        API: 2,
        version: '0.0.3',
        init: function(target, value, tween) {
            let end, p, start, _ref, _ref1, _ref2;
            if (typeof target.setState !== 'function') {
                return false;
            }
            if (target._tweenState == null) {
                target._tweenState = {};
            }
            this._tween = {};
            for (p in value) {
                if (!__hasProp.call(value, p)) continue;
                end = value[p];
                start = (_ref = (_ref1 = (_ref2 = target.state) != null ? _ref2[p] : void 0) != null ? _ref1 : target._tweenState[p]) != null ? _ref : end;
                this._tween[p] = start;
                this._addTween(this._tween, p, start, end, p);
            }
            this._target = target;
            return true;
        },
        set: function(ratio) {
            let k, v, _ref;
            this._super.setRatio.call(this, ratio);
            _ref = this._tween;
            for (k in _ref) {
                v = _ref[k];
                this._target._tweenState[k] = v;
            }
            return this._target.setState(this._tween);
        }
    });
});
if (window._gsDefine) { window._gsQueue.pop()(); }

window._gsQueue.push(function() {
    return window._gsDefine.plugin({
        propName: 'style',
        priority: 0,
        API: 2,
        version: '0.0.3',
        init: function(target, values, tween, index) {
            if(!target) return;
            this.target = target;
            if (target.tweenStyle == null){ target.tweenStyle = {}; }
            for (let prop in values) {
                target.tweenStyle[prop] = (target.tweenStyle[prop]) ? target.tweenStyle[prop] : 0;
                this._addTween(target.tweenStyle, prop, target.tweenStyle[prop], values[prop], prop);
            }
            return true;
        },
        set: function(ratio) {
            this._super.setRatio.call(this, ratio);
            let target = this.target;
            let data = [];
            for (let prop in target.tweenStyle) {
                let realProp = prop;
                let value = target.tweenStyle[prop];
                if(realProp == "alpha") realProp = "opacity";
                if(realProp == "position" && value[p] === 0) continue;
                if(realProp == "alignItems" && value[p] === 0) continue;
                if(realProp == "justifyContent" && value[p] === 0) continue;
                data.push( {[realProp]:value} );
            }
            target.setNativeProps({style:data});
        }
    });
});
if (window._gsDefine) { window._gsQueue.pop()(); }

window._gsQueue.push(function() {
    return window._gsDefine.plugin({
        propName: 'transform',
        priority: 0,
        API: 2,
        version: '0.0.3',
        init: function(target, values, tween, index) {
            if(!target) return;
            this.target = target;
            if (target.tweenTransform == null){ target.tweenTransform = {}; }
            for (let prop in values) {
                target.tweenTransform[prop] = (target.tweenTransform[prop]) ? target.tweenTransform[prop] : 0;
                this._addTween(target.tweenTransform, prop, target.tweenTransform[prop], values[prop], prop);
            }
            return true;
        },
        set: function(ratio) {
            this._super.setRatio.call(this, ratio);
            let target = this.target;
            let data = [];
            for (let prop in target.tweenTransform) {
                let realProp = prop;
                let value = target.tweenTransform[prop];
                if(realProp == "x") realProp = "translateX";
                if(realProp == "x") realProp = "translateY";
                if(realProp == "rotate" && value == 0) value = "0deg";
                if(realProp != "rotate") value = parseFloat(value);
                data.push( {[realProp]:value} );
            }
            target.setNativeProps({transform:data});
        }
    });
});
if (window._gsDefine) { window._gsQueue.pop()(); };

window._gsQueue.push(function() {
    return window._gsDefine.plugin({
        propName: 'attr',
        priority: 0,
        API: 2,
        version: '0.0.3',
        init: function(target, value, tween, index) {
            if(!target) return false;
            this._target = target;
            this._tween = {};
            for (let p in value) {
                let end = value[p];
                let realProp = p;
                if(realProp == "alpha") realProp = "opacity";
                let start = 0;
                if(this._target.gsProp) start = this._target.gsProp[p];
                this._tween[p] = start;
                this._addTween(this._tween, p, start, end, p);
            }
            return true;
        },
        set: function(ratio) {
            if(!this._target || !this._target.setNativeProps) return false;
            this._super.setRatio.call(this, ratio);
            let value = this._tween;
            for (let p in value) {
                let realProp = p;
                if(realProp == "alpha") realProp = "opacity";
                this._target.setNativeProps({[realProp]:value[p]});
            }
            this._target.gsProp[p] = value;
        }
    });
});
if (window._gsDefine) { window._gsQueue.pop()(); }