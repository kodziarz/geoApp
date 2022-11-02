// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './components/MainScreen';
import AdminPage from './components/AdminPage';
import UserDetailPage from './components/UserDetailPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='main' component={MainScreen} />
        <Stack.Screen name='admin' component={AdminPage} />
        <Stack.Screen name='userDetail' component={UserDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
