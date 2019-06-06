import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import {StatusBarComp, cuppa, CuppaStyles} from "src/libs/cuppa"
import {TimelineMax} from "gsap";
require("src/libs/TweenMaxRN");

const   data = [{name:"naranja", color:"#F67826"},
                {name:"mango", color:"#D38025"},
                {name:"papaya", color:"#AFCD6C"},
                {name:"fresa", color:"#E82441"},
                {name:"sandia", color:"#1CA937"},
                {name:"guayaba", color:"#A5CB3E"},
                {name:"pera", color:"#C9D849"},
                {name:"banano", color:"#F7D74C"},
                {name:"coco", color:"#613719"},
                {name:"kiwi", color:"#81B03B"},
                ];

export class Menu extends Component {
    static defaultProps = { style:{} };
    timeline;

    constructor(props){
        super(props);
        this.state = {data:data};
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.toogle = this.toogle.bind(this);
        cuppa.setData("FRUIT", {data:this.state.data[0]});

    }

    componentDidMount(){ this.animation(); }

    toogle(value) {
        if(value) cuppa.setData("FRUIT", {data:value});
        if (this.timeline.time() === 0) this.open();
        else this.close();
    }

    open(){ this.timeline.tweenFromTo(this.timeline.time(), this.timeline.getLabelTime("end")); }

    close(){ this.timeline.tweenFromTo(this.timeline.time(), this.timeline.getLabelTime("init")); }

    animation(){
        this.timeline = new TimelineMax();
        this.timeline.set(this.refs.menu, {style:{backgroundColor: "transparent"}});
        this.timeline.add("init");
        this.timeline.set(this.refs.ballBack, {style:{width:60, height:60, backgroundColor:"#fff", position:"absolute", top:StatusBarComp.height() + 20, right:20, borderRadius:50}, transform:{scaleY:1, scaleX:1}});
        this.timeline.set(this.refs.mainButton, {style:{width:60, height:60, backgroundColor:"#fff", position: "absolute", top:StatusBarComp.height() + 20, right:20, borderRadius:50, alignItems: "center", justifyContent:"center"} });
        this.timeline.set(this.refs.buttons, {style:{ position:"absolute", left:0, right:0, bottom:0, top:StatusBarComp.height() + 0}, transform:{translateY:-Dimensions.get('window').height} });
        this.timeline.set(this.refs.plusIcon, {transform:{rotate:"0deg"}, style:{tintColor: "#333"}});
        this.timeline.to(this.refs.ballBack, 0.6, {transform:{scaleY:100, scaleX:100}, ease:Power2.easeIn});
        this.timeline.to(this.refs.menu, 0.3, {style:{backgroundColor: "#FFF"}},0.3);
        this.timeline.to(this.refs.plusIcon, 0.7, {transform:{rotate:"-45deg"}, style:{tintColor: "#9743F8"}, ease:Back.easeOut}, 0);
        this.timeline.to(this.refs.buttons, 0.7, {transform:{translateY:0}, ease:Back.easeOut }, "=-0.2" );
        this.timeline.add(()=>{ StatusBarComp.barStyle("light-content") }, 0.2);
        this.timeline.add(()=>{ StatusBarComp.barStyle("dark-content") }, 0.3);
        this.timeline.add("end");
        this.timeline.stop();
        this.timeline.tweenFromTo(0.01, 0);
    }

    render() {
        return (
            <View ref={"menu"} style={[CuppaStyles.cover]}>
                <View ref={"ballBack"} ></View>
                <View ref={"buttons"} >
                    <ScrollView centerContent={true}>
                        {
                            this.state.data.map((item, index) =>{
                                return(
                                    <TouchableOpacity key={index} onPress={ e => { this.toogle(item) } } >
                                        <Text style={styles.menuText} >{ cuppa.capitalize(item.name) }</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <TouchableWithoutFeedback onPress={ e=>{ this.toogle() }}>
                    <View ref={"mainButton"} >
                        <Image ref={"plusIcon"} source={require('src/media/images/plus.png')} style={{width:20, height:20}} accessible={false} ></Image>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuText:{fontSize:40, textAlign: "center", color:"#444", paddingTop:20, paddingBottom: 20}
});
