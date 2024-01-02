import { GiftedChat, Bubble, InputToolbar, Send, CustomView } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
//import acion functionalities from react-native
import MapView from 'react-native-maps';

//import storage features from firestore and react-native
import { collection, onSnapshot, query, addDoc, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import CustomActions component
import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, storage, isConnected }) => {

    const [messages, setMessages] = useState([]);

    const { name } = route.params;
    const { userID } = route.params;
    const { color } = route.params;

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
        Keyboard.dismiss();
    };

    useEffect(() => {
        navigation.setOptions({title: name});
    }, []);

    let unsubMessages;
    useEffect(() => {
        if (isConnected === true) {

            // unregister current onSnapshot() listener to avoid registering multiple listeners when
            // useEffect code is re-executed.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;
        
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach(doc => {
                    newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();

        //clean-up code
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [`${messages}`, isConnected]);


    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }


    //customize GiftedChat objects
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
            right: {
              backgroundColor: "#000",
              padding: 5,
              marginBottom: 5
            },
            left: {
              backgroundColor: "#FFF",
              padding: 5,
              marginBottom: 5
            }
            }}
        />
    }

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} 
        containerStyle={styles.InputToolbar} />;
        else return null;
    }

    const renderSend = (props) => {
        if (isConnected) return <Send {...props}
          containerStyle={styles.sendButton} />
        else return null;
    }
    

    const renderCustomActions = (props) => {
        return <CustomActions storage={storage} {...props} />;
    };


    const renderCustomView = (props) => {
        const { currentMessage} = props;
        
        if (currentMessage.location) {
            return (
                <MapView
                style={styles.map}
                region={{
                    latitude: currentMessage.location.latitude,
                    longitude: currentMessage.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                />
            );
        }
    /*    if (currentMessage.image) {
            return (
               setMessages(
                {
                    _id: 1,
                    text: 'My message',
                    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
                    user: {
                      _id: 2,
                      name: 'React Native',
                      avatar: 'https://facebook.github.io/react-native/img/header_logo.png',
                    },
                    image: 'https://facebook.github.io/react-native/img/header_logo.png',
                })
            );
        }*/
        return null;
    };


    return (
        <View style={[styles.outerView, {backgroundColor: color}]}>
            <GiftedChat 
            style={styles.container}
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            renderSend={renderSend}
            renderActions={renderCustomActions}
            renderCustomView={renderCustomView}
            onSend={messages => onSend(messages)}
            user={{
                _id: userID,
                name: name,
                backgroundColor: color
            }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
        marginBottom: 5
    },
    outerView: {
        flex: 1
    },
    InputToolbar: {
        height: 42,
        paddingTop: 5,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        borderWidth: 2.5,
        borderColor: '#AAA',
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3
    },
    sendButton: {
        height: 42,
        width: 65,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'transparent',
    }
});

export default Chat;