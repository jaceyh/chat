import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";
import Chat from './Chat';

const image = {uri: '../assets/BackgroundImage.png'}

const Start = ({ navigation }) => {

    const auth = getAuth();

    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("Chat", {
                    userID: result.user.uid,
                    name: name,
                    background: background });
                Alert.alert("Signed in Successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to sign in, try again later.");
            })
    }

    const [ name, setName ] = useState('');
    const [ background, setBackground ] = useState('white');
    const colors = [ '#090C08', '#474056', '#8A95A5', '#B9C6AE'];



    return (
        //background image full screen -- also parent componenet
        <ImageBackground 
        source={require("../assets/BackgroundImage.png")} 
        style={styles.container}>
            <Text style={styles.title}>Chat App</Text>
            <View style={styles.box}>
            <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            inlineImageLeft='../assets/icon.svg'
            placeholder='Type your username here.'
            />
            <Text style={styles.text}>Choose your background color:</Text>
            <View style={styles.colorList}>
                {colors.map((color, index) => (
                    <TouchableOpacity 
                    key={index}
                    style={[styles.circle, { backgroundColor: color }, background === color && styles.selectedColor,]} onPress={() => setBackground(color)} />
                ))}
            </View>  
            <TouchableOpacity
            style={styles.button}
            title="Enter Chat"
            onPress={() => navigation.navigate('Chat', {name: name, color: background})}>
            <Text
            style={styles.buttonText}>Enter Chat</Text>
            </TouchableOpacity>
            </View>
            {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        fontColor: '#fff',
        paddingBottom: 15
    },
    box: {
        display: 'block',        
        width: '88%',
        height: '44%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 2,
    },
    button: {
        width: '88%',
        margin: 15,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#757083',
        borderRadius: 2,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    circle: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 25,
    },
    colorList: {
        flexDirection: 'row',
    },
    selectedColor: {
        padding: 10,
        borderWidth: 3,
        borderColor: '#757083',
    },
    text: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083'
    },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 50,
        width: '88%',
        padding: 15,
        borderWidth: 1.3,
        borderColor: '#757083',
        borderRadius: 2,
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
        paddingTop: 50,
    },
});

export default Start;