import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { collection, onSnapshot, query, addDoc, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {

    const [messages, setMessages] = useState([]);

    const { name } = route.params;
    const { userID } = route.params;
    const { color } = route.params;

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    };

    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
            right: {
              backgroundColor: "#000"
            },
            left: {
              backgroundColor: "#FFF"
            }
            }}
        />
        }

    useEffect(() => {
        navigation.setOptions({title: name});
    }, []);

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
                documentsSnapshot.forEach(doc => {
                    newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
                });
                setMessages(newMessages);
        });

        //clean-up code
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [`${messages}`]);


    return (
        <View style={[styles.outerView, {backgroundColor: color}]}>
            <GiftedChat 
            style={styles.container}
            messages={messages}
            renderBubble={renderBubble}
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
        alignItems: 'center'
    },
    outerView: {
        flex: 1
    }
});

export default Chat;