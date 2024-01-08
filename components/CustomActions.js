import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useState } from 'react';

//import functionality from expo and react-native
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

//import image dependencies from firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {

    const actionSheet = useActionSheet();

    /*const states for images and locations
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    */

    //options available with press of action sheet menu button
    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                        default:
                }
            },
        );
    };


    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissions?.granted) {
            try{
                let result = await ImagePicker.launchImageLibraryAsync();
            
                if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
                else Alert.alert("Permissions haven't been granted");
                
            } catch (error) {
                console.error("Error picking image:", error);
                Alert.alert("Failed to pick image. Please try again or check permissions.");
            }
        };
    }


    const takePhoto = async () => {
        let permissions = await  ImagePicker.requestCameraPermissionsAsync();
    
        if (permissions?.granted) {
            try{            
                let result = await ImagePicker.launchCameraAsync();
                //process selected image..
    
                if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            } catch (error) {
                console.error("Error picking image:", error);
                Alert.alert("Permissions haven't been granted.");
            }    
        }
    }

    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
    
        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            }else Alert.alert("Error occured while fetching location");
        } else {
            Alert.alert("Permissions to read location aren't granted");
        }
    }

    const generateReference = (uri) => {
        // this will get the file name from the uri
        const imageName = uri.split("/")[uri.split("/").length - 1];
        const timeStamp = (new Date()).getTime();
        return `${userID}-${timeStamp}-${imageName}`;
    }

    const uploadAndSendImage = async (imageURI) => {
        try {
            const uniqueRefString = generateReference(imageURI);
            const newUploadRef = ref(storage, uniqueRefString);

            const response = await fetch(imageURI);
            const blob = await response.blob();

            await uploadBytes(newUploadRef, blob)
                .then(async (snapshot) => {
                const imageURL = await getDownloadURL(snapshot.ref)
                onSend({ image: imageURL })
            });
        } catch (error) {
            console.log(error, "Error during image upload:");
        }
    };

    return (
        <TouchableOpacity 
        style={styles.container} 
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Lets you choose to send an image or your geolocation."
        accessibilityRole="button"
        onPress={onActionPress}
        >
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#2F87D7',
        borderWidth: 2,
        flex: 1,
        marginBottom: 1.5,
    },
    iconText: {
        color: '#2F87D7',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
});

export default CustomActions;