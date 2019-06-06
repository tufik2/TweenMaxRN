import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import {log, cuppa} from "src/libs/cuppa";
import {TimelineMax} from "gsap";
require("src/libs/TweenMaxRN");


export class Test extends Component {
    static defaultProps = { }

    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        log("box", this.refs.box.toString());
        let tl = new TimelineMax();
            //tl.set(this.refs.box, {style:{left:0, top:0, alpha:0.2}});
            //tl.to(this.refs.box, 1, {style:{left:100}});
            //tl.to(this.refs.box, 1, {style:{top:100, left:200, alpha:1}});

            tl.set(this.refs.box, {transform:{scale:1, x:0, y:0}});
            tl.to(this.refs.box, 1, {transform:{x:100}});
            tl.to(this.refs.box, 1, {transform:{y:100}});
            tl.to(this.refs.box, 1, {transform:{scale:0.5, x:0, y:0}});
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View ref={"box"} style={{width:100, height:100, backgroundColor:"#F00"}}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({ })
