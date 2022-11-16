import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from './Button';

import * as Location from "expo-location";
import LocationsListItem from './LocationsListItem';


export default class LocationsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            switchStatuses: [],
            mainSwitchValue: false
        };
        this.readLocations();
    }
    componentDidMount = async () => {
        await Location.requestForegroundPermissionsAsync();
    };

    readLocations = async () => {
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);
        let maps = stores.map((result, i, store) => {
            return JSON.parse(store[i][1]);
        });
        this.state.locations = maps;
        this.state.switchStatuses = maps.map(() => { return false; });
        this.adjustMainSwitch();
        this.setState({});
    };

    saveLocation = async () => {
        let pos = await Location.getCurrentPositionAsync({});
        AsyncStorage.setItem(pos.timestamp + "", JSON.stringify(pos));
        this.state.locations.push(pos);
        this.state.switchStatuses.push(true);
        this.adjustMainSwitch();
        this.setState({});
    };

    adjustMainSwitch() {
        if (this.state.switchStatuses.every((status) => { return status; })) this.state.mainSwitchValue = true;
        else this.state.mainSwitchValue = false;
    }

    removeLocations = async () => {
        try {
            await AsyncStorage.multiRemove(this.state.locations.map((v) => { return v.timestamp + ""; }));
            this.state.locations = [];
            this.state.switchStatuses = [];
            this.state.mainSwitchValue = false;
            this.setState({});
        } catch (e) {
            console.error("jakiś błąd przy usuwaniu danych.");
            console.log(e);
            this.readLocations();
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row" }}>
                    <Button text="Pobierz i zapisz pozycję"
                        positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                        onPress={this.saveLocation} />
                    <Button text="Usuń wszystkie dane"
                        positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                        onPress={() => { this.removeLocations(); }} />
                </View>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                        <Button text="Przejdź do mapy"
                            positionStyle={[styles.buttonPosition, { flex: 0, marginRight: 70 }]} textStyle={styles.buttonText}
                            onPress={() => { this.props.navigation.navigate("map", { data: this.state.locations.filter((data, index) => { return this.state.switchStatuses[index]; }) }); }} />
                        <Switch value={this.state.mainSwitchValue}
                            onChange={() => {
                                this.setState({
                                    mainSwitchValue: !this.state.mainSwitchValue,
                                    switchStatuses: this.state.switchStatuses.map(() => { return !this.state.mainSwitchValue; })
                                });
                            }} />
                    </View>
                    <FlatList data={this.state.locations}
                        renderItem={({ item }) => {
                            let index = this.state.locations.indexOf(item);
                            return <LocationsListItem id={index} data={item} value={this.state.switchStatuses[index]}
                                headerStyle={styles.locationHeaderText} coordinatesStyle={styles.locationInfoText}
                                onChange={(id, value) => {
                                    this.state.switchStatuses[id] = value;
                                    this.adjustMainSwitch();
                                    this.setState({});
                                }} />;
                        }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonPosition: {
        margin: 12,
        flex: 1,
        backgroundColor: "blue",
        borderRadius: 16,
        padding: 5,
    },
    buttonText: {
        fontSize: 22,
        color: "white",
        textAlign: "center"
    },
    locationHeaderText: {
        fontSize: 18,
        color: "blue",
        fontWeight: "bold"
    },
    locationInfoText: {
        fontSize: 16,
        color: "black"
    }
});
