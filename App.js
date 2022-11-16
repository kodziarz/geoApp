// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './components/MainScreen';
import LocationsList from './components/LocationsList';
import Map from './components/Map';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='main' component={MainScreen} />
        <Stack.Screen name='locationsList' component={LocationsList} />
        <Stack.Screen name='map' component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
