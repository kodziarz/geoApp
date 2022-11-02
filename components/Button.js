import React, { Component } from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={{ backgroundColor: (this.props.color || "#00ff00") }}
                onPress={() => { if (this.props.onPress != undefined) this.props.onPress(this) }}>
                <Text> {this.props.text || "Button"} </Text>
            </TouchableOpacity>
        );
    }
}
