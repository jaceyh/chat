import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { collection, getDocs } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {

    const [messages, setMessages] = useState([]);

    const { name } = route.params;
    const { color } = route.params;

    const fetchMessages = async () => {
        const messageDocs = await getDocs(collection(db, "messages"));
        let newMessages = [];
            messageDocs.forEach(docObject => {
                newMessages.push({ id: docObject.id, ...docObject.data() })
            });
            setMessages(newMessages);
    }

    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
        fetchMessages();
      }, [`${messages}`]);


    return (
        <View style={[styles.outerView, {backgroundColor: color}]}>
            <GiftedChat 
            style={styles.container}
            messages={messages}
            renderBubble={renderBubble}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1
            }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
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