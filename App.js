import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    // Initialize firebase analytics
    const analytics = getAnalytics(app);

    return (
        <NavigationContainer>
            
            <Stack.Navigator
            initialRouteName="Start" >
                <Stack.Screen
                name="Start"
                component={Start}
                />
                <Stack.Screen
                name="Chat"
                component={Chat}
                >
                {props => <Chat db={db} {...props} />}
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
  },
});

export default App;
