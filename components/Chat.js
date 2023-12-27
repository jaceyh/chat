import { GiftedChat } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {

    const [messages, setMessages] = useState([]);

    const { name } = route.params;
    const { color } = route.params;

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
        <View style={[styles.container, {backgroundColor: color}]}>
            <Text>Welcome to your Chat!</Text>
        </View>

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