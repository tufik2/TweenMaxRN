import React, {Component} from 'react';
import {View} from "react-native";
import {StatusBarComp} from "src/libs/cuppa"
import {Menu} from "src/components/Menu";
import {Circle} from "src/components/Circle";
import {Test} from "./components/Test";

export default class Main extends Component {
    static defaultProps = { }

    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{backgroundColor:"#9743F8", flex:1}}>
                <StatusBarComp color={"light-content"} />
                {/*
                <Circle/>
                <Menu/>
                */}
                <Test />
            </View>
        );
    }
}
