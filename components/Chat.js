import { GiftedChat } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {

    const [messages, setMessages] = useState([]);

    const { name } = route.params;
    const { color } = route.params;

    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    };

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
        ]);
      }, []);


    return (
        <GiftedChat 
        style={[styles.container, {backgroundColor: color}]}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Chat;