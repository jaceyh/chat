import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';

const Chat = ({ route, navigation }) => {

    const [messages, setMessages] = useState([]);

    const { name } = route.params;
    const { color } = route.params;

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
        setMessages([
          {
            _id: 1,
            text: "Hello developer",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any",
            },
          },
          {
            _id: 2,
            text: 'This is a system message',
            createdAt: new Date(),
            system: true,
          },
        ]);
      }, []);


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