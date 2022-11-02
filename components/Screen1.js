import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class Screen1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Text> Screen1 </Text>
                <Button
                    title="go to screen2"
                    onPress={() => this.props.navigation.navigate("s2")}
                />
            </View>
        );
    }
}
