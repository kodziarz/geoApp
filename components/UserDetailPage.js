import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class UserDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.route.params.user
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ flex: 6 }}>Obrazek</Text>
                <Text style={{ flex: 1 }}> login: </Text>
                <Text style={{ flex: 1 }}> {this.props.route.params.login} </Text>
                <Text style={{ flex: 1 }}> password: </Text>
                <Text style={{ flex: 1 }}> {this.props.route.params.password} </Text>
                <Text style={{ flex: 1 }}> registered: </Text>
                <Text style={{ flex: 1 }}>
                    {(() => {
                        let date = new Date(this.props.route.params.registerDate)
                        let result = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
                            date.getDate().toString().padStart(2, "0") + " " + date.getHours().toString().padStart(2, "0") + ":"
                            + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds().toString().padStart(2, "0")
                        return result
                    })()} </Text>
            </View>
        );
    }
}
