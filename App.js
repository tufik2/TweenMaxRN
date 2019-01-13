import React, {Component} from 'react';
import Main from "src/Main";

export default class App extends Component {
    static defaultProps = { }

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Main/>
        );
    }
}
