import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import { collection, onSnapshot, query, addDoc, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {

    const [messages, setMessages] = useState([]);

    const { name } = route.params;
    const { userID } = route.params;
    const { color } = route.params;

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
        Keyboard.dismiss();
    };

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

    return (
        <View style={[styles.outerView, {backgroundColor: color}]}>
            <GiftedChat 
            style={styles.container}
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
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
    },
    outerView: {
        flex: 1
    },
    InputToolbar: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#AAA',
        borderRadius: 23
    }
});

export default Chat;