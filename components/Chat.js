import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {

    const { name } = route.params;
    const { color } = route.params;

    useEffect(() => {
        navigation.setOptions({title: name});
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