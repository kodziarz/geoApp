import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput } from 'react-native';
import Button from './Button';
import { registerUser } from './Networking';

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: ""
        };
    }

    handleRegisterUser = async () => {

        let response = await registerUser(this.state.login, this.state.password)
        if (response.status == 400)
            return alert("Użytkownik już istnieje")
        else if (!response.ok)
            return alert("błąd")

        this.props.navigation.navigate("admin")
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text> MainScreen </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text>Welcome in app!</Text>
                    <TextInput
                        placeholder='enter login'
                        onChangeText={(newLogin) => { this.setState({ login: newLogin }) }} />
                    <TextInput
                        placeholder='enter password'
                        onChangeText={(newPassword) => { this.setState({ password: newPassword }) }} />
                    <Button text="Register" onPress={this.handleRegisterUser} />
                </View>
            </KeyboardAvoidingView>
        );
    }
}
