import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useEffect } from 'react';

/*
Tried to hide API key
const fs = require('fs');
require('dotenv').config();
*/

//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
//import Storage
import { getStorage } from "firebase/storage";

//import useNetInfo to determine user's connectivity status
import { useNetInfo } from "@react-native-community/netinfo";

// import screens
import Start from './components/Start';
import Chat from './components/Chat';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {

    //my Chat web app's firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyB0hjw9ZeYU9Xfz91VBD0qUhrTf3SiP0aY",
        authDomain: "chat-app-dbadd.firebaseapp.com",
        projectId: "chat-app-dbadd",
        storageBucket: "chat-app-dbadd.appspot.com",
        messagingSenderId: "730864191918",
        appId: "1:730864191918:web:3dd311ab78199587cc603f",
        measurementId: "G-XSB2HKQY5Y"
      };

    // Initialize firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the db service
    const db = getFirestore(app);

    //Initialize Firebase Storage Cloud
    const storage = getStorage(app);

    // define a new state the represents connectivity status
    const connectionStatus = useNetInfo();

    // display an alert and disable attempts to reconnect to Firestore if connection is lost
    useEffect(() => {
        if (connectionStatus.isConnected === false) {
            Alert.alert("Connection lost!");
            disableNetwork(db);
        }else if (connectionStatus.isConnected === true) {
            enableNetwork(db);
        }
    }, [connectionStatus.isConnected]);


    return (
        <NavigationContainer>
            
            <Stack.Navigator
            initialRouteName="Start">
                <Stack.Screen
                name="Start"
                component={Start}
                />
                <Stack.Screen
                name="Chat"
                >
                {props => <Chat db={db} isConnected={connectionStatus.isConnected} storage={storage} {...props} />}
                </Stack.Screen>
            </Stack.Navigator>

        </NavigationContainer>
   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15
  },
});

export default App;
