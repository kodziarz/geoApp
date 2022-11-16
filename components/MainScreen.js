import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Font from "expo-font";

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFontLoaded: false
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'crazy': require('../assets/font.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({ isFontLoaded: true });
    };

    render() {
        return (
            this.state.isFontLoaded
                ?
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => { this.props.navigation.navigate("locationsList"); }}>
                    <View style={{ flex: 1, backgroundColor: "blue" }} >
                        <View style={{ flex: 1, flexDirection: "column-reverse", alignItems: "center" }}>
                            <Text style={styles.title}> GeoApp </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={styles.subTitle}>find and save your position</Text>
                            <Text style={styles.subTitle}>use google maps</Text>
                        </View>
                    </View >
                </TouchableOpacity>
                :
                null
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "crazy",
        fontSize: 48
    },
    subTitle: {
        fontSize: 24
    }
});
