import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { Text, Button } from "@ui-kitten/components";
import Icon from 'react-native-vector-icons/FontAwesome';

import * as images from '.././costans/photo';
import { useNavigation } from '@react-navigation/native';


const Signup = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);

    const navigation = useNavigation();



    const handleSignup = async () => {
        try {
            const response = await fetch('http://192.168.0.102:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, username, password, repeatPassword })
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
        <View style={{ backgroundColor: '#FFFFFF', flex: 1, marginTop:30, }}>
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
                    marginLeft:20,
                    marginRight:20,
                    borderRadius: 40,
                    placeholderTextColor: 'lightgray',
                    fontSize: 14,
                    paddingHorizontal: 30, }}
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
                    marginLeft:20,
                    marginRight:20,
                    borderRadius: 40,
                    placeholderTextColor: 'lightgray',
                    fontSize: 14,
                    paddingHorizontal: 30, }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{  height: 55,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 20,
                    marginLeft:20,
                    marginRight:20,
                    borderRadius: 40,
                    placeholderTextColor: 'lightgray',
                    fontSize: 14,
                    paddingHorizontal: 30, }}
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
                    marginLeft:20,
                    marginRight:20,
                    borderRadius: 40,
                    placeholderTextColor: 'lightgray',
                    fontSize: 14,
                    paddingHorizontal: 30,  }}
            />

            <Button
                onPress={handleSignup}
                style={{
                    backgroundColor: '#9037CD',
                    width: '90%',
                    height: 55,
                    borderRadius: 22,
                    marginTop: 35,
                    alignSelf: 'center',
                }}
            >
                Sign Up
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 15, alignSelf: 'center' }}>
                <Text>
                    Already have an account? <Text style={{ fontWeight: 'bold', color: 'blue' }}>Login</Text>
                </Text>
            </TouchableOpacity>

        </View>
    );
};

export default Signup;
