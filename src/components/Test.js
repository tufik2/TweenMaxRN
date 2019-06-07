import React, {Component} from 'react';
import {StyleSheet, View, Text} from "react-native";
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
        let tl = new TimelineMax();
            tl.set(this.refs.box, {transform:{translateX:10, translateY:10, scale:1}, style:{backgroundColor:"#F00"} });
            tl.to(this.refs.box, 6, {transform:{translateY:300, scale:2}}, 0);
            tl.to(this.refs.box, 1, {transform:{translateX:200, rotate:"50deg"}}, 1);
            tl.to(this.refs.box, 1, {transform:{translateX:300}}, 2);
            tl.to(this.refs.box, 2, {transform:{scale:1}});
            tl.to(this.refs.box, 2, {transform:{rotate:"10deg"}, style:{backgroundColor:"#FFF"} });
            tl.fromTo(this.refs.box, 4, {transform:{translateX:0}}, {transform:{translateX:200}});
            tl.fromTo(this.refs.box, 4, {transform:{translateY:0}}, {transform:{translateY:200}}, "=-4");
            tl.to(this.refs.box, 2, {transform:{rotate:"0deg"}});

        let t2 = new TimelineMax();
            t2.set(this.refs.box2, {style:{left:0, top:0, backgroundColor:"#FF0", alpha:1}});
            t2.to(this.refs.box2, 4, {style:{top:400}}, 0);
            t2.to(this.refs.box2, 1, {style:{left:200, alpha:0.5}}, 1);
            t2.to(this.refs.box2, 1, {style:{left:100}}, 2);
            t2.to(this.refs.box2, 1, {style:{top:50, backgroundColor:"#0FF", alpha:1}});
            t2.fromTo(this.refs.box2, 4, {style:{left:0}}, {style:{left:100}, delay:1});
            t2.fromTo(this.refs.box2, 4, {style:{top:0}}, {style:{top:100}}, "=-4");
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View ref={"box"} style={{width:100, height:100, backgroundColor:"#F00", position:"absolute"}}>
                    <Text>Transform</Text>
                </View>

                <View ref={"box2"} style={{width:100, height:100, backgroundColor:"#FF0", position:"absolute"}}>
                    <Text>Style</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({ })
