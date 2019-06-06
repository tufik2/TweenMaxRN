import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from "react-native";
import {log, StatusBarComp} from "src/libs/cuppa"


export class Template extends Component {
    static defaultProps = { }

    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){ }
    componentWillUnmount(){ }
    componentWillUpdate(nextProps, nextState) { }
    componentDidUpdate(prevProps, prevState) { }

    render() {
        return (
            <View>
                <StatusBarComp />
                <Text>Hello There!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({ })
