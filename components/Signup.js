import React, { useEffect, useState, useCallback, Picker } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Button } from "@ui-kitten/components";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as images from '.././costans/photo';
import { useNavigation } from '@react-navigation/native';
import base64 from 'react-native-base64'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import RNPickerSelect from 'react-native-picker-select';



const Signup = () => {



    const navigation = useNavigation();

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [selectedRole, setSelectedRole] = useState('user');


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });
        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    
    const handleSignup = async () => {

        try {
            console.log(selectedRole)
            const img_str = base64.encode(image);
            const response = await fetch('http://192.168.0.104:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, username, password, repeatPassword, image: img_str, role: selectedRole})
            });


            const result = await response.json();
            console.log('Odgovor servera:', result);

            if (result.success) {
                navigation.navigate('Login');
                console.log('Uspesno ste se registrovali:', result.message);
            } else {
                console.error('Neuspesna registracija:', result.message);
            }
        } catch (error) {
            console.error('Došlo je do neočekivane greške:', error);
        }
    };




    return (
        <View style={{ backgroundColor: '#FFFFFF', flex: 1, marginTop: 30, }}>
            <Image
                source={images.admin}
                style={{
                    marginTop: 40,
                    marginBottom: 20,
                    width: 280,
                    height: 225,
                    borderRadius: 30,
                    alignSelf: 'center',
                }}
            />
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={{
                    height: 55,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    borderRadius: 40,
                    fontSize: 14,
                    paddingHorizontal: 30,
                }}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                    height: 55,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    borderRadius: 40,
                    fontSize: 14,
                    paddingHorizontal: 30,
                }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                    height: 55,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    borderRadius: 40,
                    fontSize: 14,
                    paddingHorizontal: 30,
                }}
            />
            <TextInput
                placeholder="Repeat Password"
                value={repeatPassword}
                onChangeText={(text) => setRepeatPassword(text)}
                secureTextEntry={true}
                style={{
                    height: 55,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    borderRadius: 40,
                    fontSize: 14,
                    paddingHorizontal: 30,
                }}
            />
            <View style={{ marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20, }}>
                
                <RNPickerSelect
                    style={{ backgroundColor: '#E0E0E0', borderRadius: 40 }}
                    placeholder={{ label: 'Odaberite ulogu', value: null }}
                    onValueChange={(value) => setSelectedRole(value)}
                    items={[
                        { label: 'Trener', value: 'coach' },
                        { label: 'Korisnik', value: 'user' },
                    ]}
                />
            </View>
            <View style={styles.container}>
                <View style={styles.imageTextContainer}>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={pickImage}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.image} />
                            ) : (
                                <Icon name="user" size={30} color="#9037CD" />
                            )}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text}>Add Photo</Text>
                </View>
            </View>

            <Button
                onPress={handleSignup}
                style={{
                    backgroundColor: '#9037CD',
                    width: '90%',
                    height: 55,
                    borderRadius: 22,
                    marginTop: 10,
                    alignSelf: 'center',
                }}
            >
                Sign Up
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 80, alignSelf: 'center' }}>
                <View >
                    <Text style={{ marginBottom: 30 }}>
                        Already have an account? <Text style={{ fontWeight: 'bold', color: 'blue' }}>Login</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    imageTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    text: {
        fontSize: 20,
        color: '#9037CD',
        marginLeft: 20,  // Added marginLeft for spacing between image and text
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Signup;
