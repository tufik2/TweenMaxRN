/* INSTRUCTIONS
npm install gsap
npm install --save react-native-status-bar-height
npm install yarn
*/
import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback, ScrollView, Dimensions, Platform, Picker, StatusBar, Modal, AsyncStorage, BackHandler } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
require("gsap");
require("TweenMaxRN");

export var log = function(values){ try{ let args = arguments; for(let i = 0; i < args.length; i++){ console.log(args[i]); } }catch(err){ }; };
export var cuppa = { };

/* Unique value */
    cuppa.unique = function(add_to_init){
        var value = Math.round(Math.random()*9999) + new Date().valueOf();
        if(add_to_init) value = add_to_init + value;
        return value;
    };

/* sDim, scale Dimention acording to the device screeen
    // specify the layout dimentions of your design
        global.layoutWidth = 320; global.layoutHeight = 569;
    // Use
        cuppa.sDim(200, 40)   // return the new dimention according the device screen
*/
    global.layoutWidth = 320; global.layoutHeight = 569;
    cuppa.sDim = function(width, height, force){
        if(force == undefined) force = "w";
        var dimWindow = Dimensions.get('window');
        var percent = 1;
        if(force == "w" || force == "width") percent = dimWindow.width/global.layoutWidth;
        else if(force == "h" || force == "height") percent = dimWindow.height/global.layoutHeight;
        var dim = {width:width*percent, height:height*percent, percent:percent};
        return dim;
    }
/* Button
    Example
        <Button text="Gallery" textStyle={{textAlign:"left"}} />
        <Button onPress={ ()=>{ }} background={"#FFF"} backgroundPress={"#DDD"} style={{height:"100%", width:"50%"}} >
            <Image source={require("src/media/images/icon-photo.png")} style={{height:15}} resizeMode={"contain"} />
            <Text style={{fontSize:11}} >Graphic Note</Text>
        </Button>
*/
export class Button extends Component {
    static defaultProps = {
        background: "#eee",
        backgroundPress: "#ddd",
        disabled: false,
        onPress: null,
        text: null,
        textStyle: {},
        selected:false,
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.childrens = props.children;
        if (!Array.isArray(this.childrens)) this.childrens = [props.children];
    }

    componentDidMount() {
        if(this.props.selected) this.onPressIn();
    }

    componentWillUnmount() {
        TweenMax.killTweensOf(this.refs.view);
    }

    onPressIn = function (e) {
        TweenMax.fromTo(this.refs.view, 0.3, {style: {"backgroundColor": this.props.background}}, {style: {"backgroundColor": this.props.backgroundPress}});
    }.bind(this)

    onPressOut = function (e) {
        TweenMax.to(this.refs.view, 0.3, {style: {"backgroundColor": this.props.background}});
    }.bind(this)

    selected(value = true){
        if(value) this.onPressIn();
        else this.onPressOut();
    }

    render() {
        return (
            <TouchableWithoutFeedback disabled={this.props.disabled} onPressIn={this.onPressIn} onPressOut={this.onPressOut} onPress={this.props.onPress}>
                <View ref="view" style={[{backgroundColor: this.props.background, height: 43, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10}, this.props.style]}>
                    {
                        this.childrens.map((element, key) => {
                            return (element)
                        })
                    }
                    {(this.props.text) ? <Text style={[{fontSize: 14, color: "#444", width:"100%", textAlign:"center"}, this.props.textStyle]}>{this.props.text}</Text> : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

/* CheckBox
    Example
    <CheckBox imageChecked={require("src/media/images/checkbox-checked.png")} imageUnchecked={require("src/media/images/checkbox-unchecked.png")} />
*/
export class CheckBox extends Component {
    static defaultProps = { style:{}, checked:false, disabled:false, onPress: null, imageChecked:null, imageUnchecked:null }

    constructor(props) {
        super(props);
        this.state = {checked:false};
    }

    componentDidMount(){
        this.checked(this.props.checked, 0);
    }

    checked = function(value, duration = 0.3){
        if(value == undefined) value = !this.state.checked;
        this.setState({checked:value});

        if(value)
            TweenMax.to(this.refs.imgChecked, duration, {style: {alpha: 1} } );
        else
            TweenMax.to(this.refs.imgChecked, duration, {style: {alpha: 0} } );

        if(this.props.onPress) this.props.onPress(this.state.checked);
    }.bind(this)

    render() {
        return (
            <TouchableWithoutFeedback disabled={this.props.disabled} onPress={()=>{ this.checked(); }} >
                <View style={[{width:21, height:21},this.props.style]}>
                    <Image ref={"imgUncheck"} source={this.props.imageUnchecked} style={[CStyles.cover, {height:"100%", width:"100%", opacity:1}] } resizeMode={"contain"} />
                    <Image ref={"imgChecked"} source={this.props.imageChecked} style={[CStyles.cover, {height:"100%", width:"100%", opacity:0}] } resizeMode={"contain"} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

/* DropDown
    <DropDown visible={false} ref={"dropdown"} style={{right:5, top:5}}>
        <Button onPress={ (e)=>this.refs.dropdown.close() } text="Add Item" />
        <Button onPress={ (e)=>this.refs.dropdown.close() } text="Remove Item" />
    </DropDown>
*/

export class DropDown extends Component{
    static defaultProps = {style:{}, visible:true, onOpen:null, onClose:null}

    constructor(props) {
        super(props);
        this.state = {modalVisible: true,}
        this.childrens = props.children;
        if (!Array.isArray(this.childrens)) this.childrens = [props.children];
    }

    componentDidMount(){
        if(this.props.visible === false) this.close(0);
    }

    open = function(duration = 0.4){
        if(this.tl) this.tl.kill();
        this.tl = new TimelineMax();
        this.tl.set(this.refs.root, {style:{top:0}});
        this.tl.fromTo(this.refs.dropdown, duration, { style:{opacity:0} }, { style:{opacity:1}, ease:Cubic.easeOut });
        if(this.props.onOpen) this.props.onOpen();
    }.bind(this)

    close = function(duration = 0.3){
        if(this.tl) this.tl.kill();
        this.tl = new TimelineMax();
        this.tl.fromTo(this.refs.dropdown, duration, { style:{opacity:1} }, { style:{opacity:0}, ease:Power2.easeIn });
        this.tl.set(this.refs.root, {style:{top:9999}});
        if(this.props.onClose) this.props.onClose();
    }.bind(this)

    render(){
        return (
            <View ref={"root"} style={[CStyles.blockade,{ backgroundColor:"rgba(0,0,0,0)" }]}>
                <TouchableWithoutFeedback onPress={()=>{ this.close(); }} >
                    <View style={[CStyles.blockade, {backgroundColor:"rgba(0,0,0,0)"}]}></View>
                </TouchableWithoutFeedback>
                <View ref={"dropdown"} style={[{position:"absolute", backgroundColor:"#FFF", overflow: "hidden", opacity:1, elevation:4}, this.props.style]}>
                    {
                        this.childrens.map((element, key) => {
                            return (element)
                        })
                    }
                </View>
            </View>
        )
    }
}

/* PickList
    <PickList ref={"pickList"}>
        <Button onPress={this.onPress.bind(this)} text="Camera" textStyle={{textAlign:"left"}} />
        <Button text="Gallery" textStyle={{textAlign:"left"}} />
    </PickList>
 */
export class PickList extends Component {
    static defaultProps = {height:300, maxHeight:300, style:{}}

    constructor(props) {
        super(props);
        this.state = {}
        this.childrens = props.children;
        if (!Array.isArray(this.childrens)) this.childrens = [props.children];
    }

    componentDidMount(){
        this.open();
    }

    open(){
        if(this.tl) this.tl.kill();
        this.tl = new TimelineMax();
        //this.tl.set(this.refs.pickList,{style:{height:"100%"}});
        this.tl.fromTo(this.refs.blockade, 0.4, {style:{opacity:0}}, {style:{opacity: 1}, ease: Cubic.easeOut});
        this.tl.fromTo(this.refs.menu, 0.4, { style:{bottom:-this.getHeight(), opacity:0} }, { style:{bottom:0, opacity:1}, ease:Expo.easeOut }, 0);
    }

    close(){
        if(this.tl) this.tl.kill();
        this.tl = new TimelineMax();
        this.tl.fromTo(this.refs.blockade, 0.3, {opacity:1}, { style:{opacity:0}, ease:Linear.easeNone } );
        this.tl.fromTo(this.refs.menu, 0.3, {style:{opacity:1, bottom:0}}, { style:{bottom:-this.getHeight(), opacity:0}, ease:Expo.easeIn }, 0);
        //this.tl.set(this.refs.pickList, {style:{height:0}} )
        this.tl.add(()=>{
            this.tl = null;
            if(this.props.onClose) this.props.onClose();

        });
    }

    getHeight(){
        let value = this.props.maxHeight;
        if(this.props.height < value) value = this.props.height;
        return value;
    }

    render() {
        return (
            <View ref="pickList" style={[{position: "absolute", top: 0, left: 0, right: 0, elevation: 2, bottom: 0, height:"100%", overflow: "hidden"}, this.props.style]}>
                <TouchableWithoutFeedback onPress={this.close.bind(this)} >
                    <View ref="blockade" style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity:0, backgroundColor: "rgba(0,0,0,0.5)"}}></View>
                </TouchableWithoutFeedback>
                <View ref="menu" style={[CStyles.pickListMenu, {bottom: -this.getHeight()}]}>
                    <ScrollView contentContainerStyle={{padding: 0}}>
                        {
                            this.childrens.map((element, key) => {
                                return (
                                    <View key={key}>
                                        {element}
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}

/* PickerNative (IN DEVELOPMENT)
    <PickerNative mode="dialog" style={{alignItems:"center", justifyContent:"center"}} items={[{value:"1", label:"Option1"}]} onChange={(value, index)=>{ } } >
        <Text>Picker</Text>
    </PickerNative>
 */

export class PickerNative extends Component {
    static defaultProps = {onChange:null, style:{}, mode:"dropdown", items:[]}

    constructor(props) {
        super(props);
        this.state = {value:null}
        this.childrens = props.children;
        if (!Array.isArray(this.childrens)) this.childrens = [props.children];
    }

    render() {
        return (
            <TouchableWithoutFeedback>
                <View style={[{flex:1}, this.props.style]}>
                    {
                        this.childrens.map((element, key) => {
                            return (<View key={key}>{element}</View>)
                        })
                    }
                    <Picker selectedValue={-1} style={[CStyles.cover, {opacity:0}]} mode={this.props.mode} onValueChange={ this.props.onChange }>
                        {
                            this.props.items.map((item, index)=>{
                                let label = (item.label) ? item.label : item.value;
                                return( <Picker.Item key={index} value={item.value} label={label} /> )
                            })
                        }
                    </Picker>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

/* StatusBarComp
    Example: <StatusBarGap background={"rgba(0,0,0,0.2)"} color={"light-content"} />
*/
export class StatusBarComp extends Component {
    static defaultProps = { background:"rgba(0,0,0,0.2)", color:'dark-content' }
    constructor(props) {
        super(props);
        this.height = StatusBarComp.height();
        StatusBar.setBarStyle(props.color);
        if (Platform.OS == "android" && Platform.Version >= 21){
            StatusBar.setBackgroundColor('rgba(0,0,0,0)');
            StatusBar.setTranslucent(true);
        }
    }

    static height(){
        let value = 0;
        if(Platform.OS == "ios") {
            value = getStatusBarHeight();
        }else{
            if(Platform.Version >= 21){
                value = StatusBar.currentHeight;
            }
        }
        return value;
    }

    static barStyle(style = "light-content"){
        StatusBar.setBarStyle(style);
    }

    render() {
        return (
            <View style={{height:this.height, width:"100%", backgroundColor:this.props.background}}></View>
        );
    }
}

/* ModalAlert
    <Button onPress={ ()=>{ this.refs.roomModal.open(); }} text="Open ModalAlert" />
    <ModalAlert ref={"roomModal"} >
        <Button onPress={ ()=>{ this.refs.roomModal.close(); }} text="Option1" />
        <Button onPress={ ()=>{ this.refs.roomModal.close(); }} text="Option2" />
    </ModalAlert>
 */

export class ModalAlert extends Component{
    static defaultProps = { visible:false, styleBlockade:{} }
    constructor(props) {
        super(props);
        this.state = {visible:props.visible};
        this.childrens = props.children;
        if(!Array.isArray(this.childrens)) this.childrens = [props.children];
    }

    componentDidMount(){
        this.open();
    }

    open = function(){
        if(this.tl) this.tl.kill();
        this.tl = new TimelineMax();
        this.tl.set(this.refs.blockade, {style:{opacity:0}});
        this.tl.set(this.refs.menu, { transform:{scale:0.8}, style:{opacity:0 } });
        this.tl.to(this.refs.blockade, 0.3, {style:{opacity: 1}, ease: Cubic.easeOut});
        this.tl.to(this.refs.menu, 0.3, { transform:{scale:1}, style:{opacity:1}, ease:Expo.easeOut }, 0.1 );
    }.bind(this);

    close = function(){
        if(this.tl) this.tl.kill();
        this.tl = new TimelineMax();
        this.tl.to(this.refs.menu, 0.3, { style:{opacity:0}, transform:{scale:0.8}, ease:Expo.easeIn } );
        this.tl.to(this.refs.blockade, 0.3, { style:{opacity:0}, ease:Linear.easeNone } );
        this.tl.add(()=>{
            this.setState({visible:false});
            this.tl = null; if(this.props.onClose) this.props.onClose();
        });
    }.bind(this);

    render(){
        return(
            <View style={{position:"absolute", top:0, left:0, right:0, bottom:0, flex:1, elevation:20, justifyContent:"center"}} >
                <TouchableWithoutFeedback onPress={this.close} >
                    <View ref="blockade" style={[CStyles.blockade, this.props.styleBlockade]} />
                </TouchableWithoutFeedback>
                <View ref="menu" style={[{backgroundColor:"#FFF", opacity:0, borderRadius:3, maxHeight:Dimensions.get('window').height, margin:20}, this.props.style]}>
                    <ScrollView style={{width:"100%"}} contentContainerStyle={{padding:0}}>
                        <ScrollView contentContainerStyle={{padding:0}}>
                            {
                                this.childrens.map((element, key)=>{
                                    return(<View key={key} >{element}</View>)
                                })
                            }
                        </ScrollView>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
/* ModalManager
    <ModalManager ref={ ref => Globals.mainModal = ref } />

    Globals.mainModal.add(<Text>Hello</Text>, 'myElement');
    Globals.mainModal.remove('myElement');

    Globals.mainModal.add(<Text ref={ref=>{ Globals.mainModal.addRef('myElement', ref) } } >Hello</Text>, 'myElement');
    Globals.mainModal.get('myElement');
    Globals.mainModal.getRef('myElement');

*/
export class ModalManager extends Component{
    static defaultProps = { }

    constructor(props) {
        super(props);
        this.state = {elements:{}, references:{} };
    }

    add(name, element){
        if(!name) name = "modal";
        let elements = this.state.elements;
            elements[name] = element;
        this.setState({elements:elements});
    }

    remove(name){
        if(!name) name = "modal";
        let elements = this.state.elements;
        let ref = this.state.references[name];
        delete elements[name];
        this.setState({elements:elements});
        delete this.state.references[name];
    }

    get(name){
        if(!name) name = "modal";
        return this.state.elements[name];
    }

    addRef(name, ref){
        if(!name) name = "modal";
        this.state.references[name] = ref;
    }

    getRef(name){
        if(!name) name = "modal";
        return this.state.references[name];
    }

    removeAll(){
        this.setState({references:{}});
        this.setState({elements:{}});
    }

    render(){
        let elements = [];
        for (let name in this.state.elements) {
            elements.push(this.state.elements[name]);
        }
        return elements;
    }
}

/* BackComponet
    <BackComponet />
*/
export class BackComponet extends Component{
    static defaultProps = {closeApp:false, callback:null}

    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onHandler);
    }

    onHandler = function(){
        if(this.props.callback) this.props.callback();
        if(!this.props.closeApp) return true;
        else return false;
    }.bind(this);

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onHandler);
    }

    render(){
       return null
    }
}

/* mergeObjects, create a new obj with the values of objs in Array.
    If create_new_object = true, create a new Oject an Add all element to it, else join to the first object all elements
    create_new_object = false
*/
    cuppa.mergeObjects = function(array_objs, create_new_object){
        if(!create_new_object){
            var obj1 = array_objs.shift();
            for(var i = 0; i < array_objs.length; i++){
                var obj = array_objs[i];
                if(obj){ for (var attrname in obj) { obj1[attrname] =  obj[attrname]; } }
            };
            return obj1;
        }else{
            var tmp_obj = {};
            for(var i = 0; i < array_objs.length; i++){
                var obj = array_objs[i];
                if(obj){ for (var attrname in obj) { tmp_obj[attrname] = obj[attrname]; } }
            };
            return tmp_obj;
        };
    };

// mergeArray, create a new array with the values all array passed.
    cuppa.mergeArrays = function(arrays){
        let result = [];
        for(var i = 0; i < arrays.length; i++){
            if(arrays[i]){
                result = result.concat(arrays[i]);
            };
        };
        return result;
    };

/*  dataCenter
    add and remove data in one place
    Examples:
    cuppa.setData('NEW_CLIENT', {data:{name:"Tufik", age":18}})
    cuppa.getData('NEW_CLIENT', {callback:listener});
*/
    cuppa.dataDefault = {};
    cuppa.data = {};

    cuppa.setData = async function(name, opts){
        opts = cuppa.mergeObjects([{storage:'', silence:false, data:null, "default":null}, opts]);
        if(opts["default"]){
            cuppa.dataDefault[name] = opts["default"];
            opts["default"] = null;
            var current = cuppa.getData(name, opts);
            if(!current) current = cuppa.dataDefault[name];
            opts.data = current;
            cuppa.setData(name, opts);
            return;
        }

        cuppa.data[name] = opts.data;
        if(opts.storage === "local"){
            try { await AsyncStorage.setItem(name, JSON.stringify(data)); } catch (error) { }
        };

        if(!opts.silence) cuppa.executeListener(name, opts.data);
    };

    cuppa.getData = async function(name, opts){
        opts = cuppa.mergeObjects([{storage:'', callback:null, "default":false}, opts]);
        if(opts["default"]){ return cuppa.dataDefault[name]; }

        var data = cuppa.data[name];
        if(opts.storage === "local"){
            data = JSON.parse(await AsyncStorage.getItem(name));
        }

        if(data && opts.callback){
            opts.callback(data);
        }
        if(opts.callback){
            cuppa.addListener(name, opts.callback);
        };
        return data;
    };


    cuppa.getDataSync = function(name, opts){
        opts = cuppa.mergeObjects([{default:false}, opts]);
        var data = cuppa.data[name];
        if(opts["default"]) data = cuppa.dataDefault[name];
        return data;
    };


    cuppa.deleteData = function(name, opts){
        if(!opts) opts = {};
        cuppa.data[name] = null;
        if(opts.storage === "local"){
            AsyncStorage.removeItem(name);
        };
    };

// add / remove / execute global listeners
    cuppa.listeners = {};
    cuppa.addListener = function(name, callback){
        if(!cuppa.listeners[name]) cuppa.listeners[name] = [];
        cuppa.listeners[name].push(callback);
    };

    cuppa.removeListener = function(name, callback, toString){
        if(!cuppa.listeners[name]) cuppa.listeners[name] = [];
        var array =  cuppa.listeners[name];
        for(var i = 0 ; i < array.length; i++ ){
            if(toString){
                if(array[i].toString() === callback.toString()){
                    array.splice(i, 1);
                };
            }else{
                if(array[i] === callback){
                    array.splice(i, 1);
                };
            }
        };
    };

    cuppa.removeListenerGroup = function(name){
        delete cuppa.listeners[name];
    };

    cuppa.executeListener = function(name, data){
        if(!cuppa.listeners[name]) cuppa.listeners[name] = [];
        var array =  cuppa.listeners[name];
        for(var i = 0 ; i < array.length; i++ ){
            array[i](data);
        };
    };

/* Clone object */
    cuppa.cloneObject = function(object, useJSON){
        if(useJSON == undefined) useJSON = true;
        var object2;
        if(useJSON) object2 = JSON.parse(JSON.stringify(object));
        else object2 = Object.assign({}, object);
        return object2;
    };
// ObjectToURL
    cuppa.objectToURL = function(object){
        var str = "";
        for(var key in object) {
            if(str != "") { str += "&"; }
            if(object[key]) str += key + "=" + (object[key]);
            else str += key;
        };
        return str;
    };
// object Length
    cuppa.objectLength = function(object){
        return Object.keys(object).length;
    };
// clone Array
    cuppa.cloneArray = function(array){
        return array.slice(0);
    };
// clone Array
    cuppa.capitalize = function(value){
        value = String(value) || "";
        return value && value[0].toUpperCase() + value.slice(1);
    }

export var CuppaStyles = StyleSheet.create({
    pickListMenu: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#FFF", width: "100%", maxHeight: 300, elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.2,},
    pickListMenuButton:{ height:50, paddingLeft:20, },
    cover:{ position:"absolute", top:0, left:0, right:0, bottom:0, },
    wire:{borderWidth: 2, borderColor:"#000", borderStyle:"dotted", borderRadius: 0.001,},
    wire_white:{borderWidth: 2, borderColor:"#fff", borderStyle:"dotted", borderRadius: 0.001,},
    blockade:{position:"absolute", top:0, left:0, right:0, bottom:0, backgroundColor:"rgba(0,0,0,0.7)"},
});