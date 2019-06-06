import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from "react-native";
import {cuppa, CuppaStyles} from "src/libs/cuppa";
import {TimelineMax} from "gsap";
require("src/libs/TweenMaxRN");

export class Circle extends Component {
    static defaultProps = { style:{} }

    constructor(props){
        super(props);
        this.state = {data:{}};
        this.animateSpin = this.animateSpin.bind(this);
        cuppa.getData("FRUIT", {callback:(data)=>{ this.setState({data:data}) }});
    }

    animateSpin(dimentions){
        let time = 5;
        let tl = new TimelineMax({repeat:-1, yoyo:true});
            tl.set(this.refs.ball,  { style:this.getValues(dimentions.width, [0.5,0.6,0.6,0.6]) } );
            tl.to(this.refs.ball, time, { style:this.getValues(dimentions.width, [0.4,0.6,0.4,0.6]), ease:Linear.easeInOut });
            tl.to(this.refs.ball, time, { style:this.getValues(dimentions.width, [0.6,0.6,0.7,0.7]), ease:Linear.easeInOut });
            tl.to(this.refs.ball, time, { style:this.getValues(dimentions.width, [0.5,0.7,0.4,0.4]), ease:Linear.easeInOut });

        TweenMax.set(this.refs.spin, {style:{position:"absolute"} });
        TweenMax.fromTo(this.refs.spin, 16, { transform:{rotate:"0deg"} }, { transform:{rotate:"360deg"}, repeat:-1, ease:Linear.easeInOut  } )
    }

    animateSpin2(dimentions){
        let time = 5;
        let tl = new TimelineMax({repeat:-1, yoyo:true});
            tl.set(this.refs.ball2,  { style:this.getValues(dimentions.width, [0.5,0.6,0.6,0.6]) } );
            tl.to(this.refs.ball2, time, { style:this.getValues(dimentions.width, [0.4,0.6,0.4,0.6]), ease:Linear.easeInOut });
            tl.to(this.refs.ball2, time, { style:this.getValues(dimentions.width, [0.6,0.6,0.7,0.7]), ease:Linear.easeInOut });
            tl.to(this.refs.ball2, time, { style:this.getValues(dimentions.width, [0.5,0.7,0.4,0.4]), ease:Linear.easeInOut });

        TweenMax.set(this.refs.spin2, {style:{position:"absolute"} });
        TweenMax.fromTo(this.refs.spin2, 16, { transform:{rotate:"0deg", scaleX:0.8, scaleY:0.8 } }, { transform:{rotate:"-360deg", scaleX:0.8, scaleY:0.8}, repeat:-1, ease:Linear.easeInOut  } )
    }

    getValues(width, percentages){
        let values = {};
            values.borderTopLeftRadius = width*percentages[0];
            values.borderTopRightRadius = width*percentages[1];
            values.borderBottomRightRadius = width*percentages[2];
            values.borderBottomLeftRadius = width*percentages[3];
        return values;
    }

    render() {
        return (
            <View style={[CuppaStyles.cover, {justifyContent:"center", alignItems: "center"}]}>
                <View ref={"spin"} >
                    <View ref={"ball"} style={[styles.ball, {backgroundColor: `${this.state.data.color}`, opacity: 0.4}]} onLayout={(e) => { this.animateSpin(e.nativeEvent.layout); }}></View>
                </View>
                <View ref={"spin2"} >
                    <View ref={"ball2"} style={[styles.ball, {backgroundColor:`${this.state.data.color}`}]} onLayout={(e) => { this.animateSpin2(e.nativeEvent.layout); }}></View>
                </View>
                <Text style={styles.text}>{String(this.state.data.name).toUpperCase()}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ball:{width:Dimensions.get('window').width*0.7, height:Dimensions.get('window').width*0.7, backgroundColor:"#f00", opacity:0.7, overflow: "hidden"},
    text:{fontSize:24, color:"#FFF"},
});
