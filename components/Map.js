import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 50.111,
                    longitude: 20.111,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                {this.props.route.params.data.map((data, index) => {
                    return <Marker key={index}
                        coordinate={{
                            latitude: data.coords.latitude,
                            longitude: data.coords.longitude,
                        }}
                        title={"pos"}
                        description={"opis"}
                    />;
                })}
            </MapView>
        );
    }
}
