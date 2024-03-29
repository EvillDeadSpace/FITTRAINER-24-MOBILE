import {StyleSheet, View, TextInput, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import {
    Layout,
    Text,
    Button,
    ApplicationProvider,
} from "@ui-kitten/components";
import { useNavigation } from '@react-navigation/native';
import * as images from '.././costans/photo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from './Contex';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const { setUsername } = useContext(UserContext);
    const handleSignUpPress = () => {
        navigation.navigate('Signup');
    };


    const handleLogin = async () => {

        const url = "http://192.168.0.104:3000/api/login";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            console.log(result)
            const username = result.user.username;

            const picture = result.user.image;

            if (result.success) {
                setUsername(result.user.username);

                console.log(picture);

                const user =result.user.username;

                const receivedUser=user && user.username ? user.username : "NEMA";


                console.log(username);
                navigation.navigate('BottomTabNavigator');
                console.log('Uspesna prijava:', result.message);
            } else {
                console.error('Neuspesna prijava:', result.message);
            }
        } catch (error) {
            console.error('Došlo je do neočekivane greške:', error);
        }
    };

    return (
        <View style={{backgroundColor: '#FFFFFF', flex:1}}>
            <Image
                source={images.logoPhoto}
                style={{
                    marginTop: 40,
                    marginBottom: 20,
                    width: 280,
                    height: 225,
                    borderRadius: 20,
                    alignSelf: 'center',
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
                    marginLeft:20,
                    marginRight:20,
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
                    marginBottom: 20,
                    height: 55,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 20,
                    marginLeft:20,
                    marginRight:20,
                    borderRadius: 40,
                    fontSize: 14,
                    paddingHorizontal: 30, }}
            />

            {/*
            dodati forget password funkciju da radi
           */}
            <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 16, color: 'black', marginRight:25, marginTop: -10, paddingBottom:10, }}>
                Forget Password?
            </Text>
            <Button
                style={{
                    backgroundColor: '#9037CD',
                    width: '90%',
                    height: 55,
                    borderRadius: 22,
                    marginTop: 20,
                    alignSelf: 'center',
                }}
            onPress={()=>{
                handleLogin();
            }}
            >Login </Button>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: '5%', marginTop:30 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <Text style={{ width: 50, textAlign: 'center' }}>OR</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
            <Button
                style={{
                    backgroundColor: 'white',
                    height: 55,
                    width: '90%',
                    borderRadius: 22,
                    marginTop: 25,
                    alignSelf: 'center',
                    flexDirection: 'row', // Postavljamo flexDirection na 'row' kako bismo dodali ikonicu pored teksta
                    alignItems: 'center', // Centriramo elemente po vertikali
                }}
                accessoryLeft={() => (
                    <>
                        <Icon name="google" size={20} color="black" style={{ marginRight: 25 }} />
                        <Text style={{ color: 'black', marginBottom:5, }}>Login with Google</Text>
                    </>
                )}
            />
            <TouchableOpacity onPress={handleSignUpPress} style={{ marginTop: 10, alignSelf: 'center' }}>
                <Text>
                    Don't have an account? <Text style={{ fontWeight: 'bold', color: 'blue' }}>Sign up</Text>
                </Text>
            </TouchableOpacity>

        </View>
    )
}
export default Login
