import {Button, Layout, Text} from "@ui-kitten/components";
import {Image, View} from "react-native";
import React from "react";
import * as images from '.././costans/photo';
import { useNavigation } from '@react-navigation/native';
const HelloPanel = () => {
    const navigation = useNavigation();

    return(
        <Layout style={{  marginTop:150,justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F3F3', }}>
            <Image style={{rounded:100}} source={images.homePagePhoto}
            style={{width:265, height:265, borderRadius: 20,}}/>
        <View style={{ marginTop: 15 }}>
            <Text category="h1" style={{ fontSize: 24, marginTop: 5, }}>
                Welcome to FitTreiner-24
            </Text>
            <Text
                category="s1"
                style={{
                    fontSize: 16,
                    marginTop: 8,
                    textAlign: 'center',

                }}
            >
                Everything you need in one place
            </Text>
        </View>
        <Button
            onPress={() => {
                navigation.navigate('Signup');
            }}
            style={{
                backgroundColor: '#9037CD',
                width: '90%',
                height: 55,
                borderRadius: 22,
                marginTop: 40,
            }}
            contentStyle={{ paddingHorizontal: 10 }}
        >
            Create Account
        </Button>
        <Button
            onPress={() => {
                navigation.navigate('Login');
            }
        }
            style={{
                backgroundColor: 'white',
                height: 55,
                width: '90%',
                borderRadius: 22,
                marginTop: 25,
            }}
            accessoryLeft={() => <Text style={{ color: 'black' }}>Login</Text>}
        />
        <Text style={{ textAlign: 'center', marginLeft: 25, marginRight: 25, marginTop: 30 }}>
            By{' '}
            <Text style={{ fontWeight: 'bold', color: 'black' }}>Registering</Text>
            {' or '}
            <Text style={{ fontWeight: 'bold', color: 'black' }}>Login</Text>
            {' you have agreed to these '}
            <Text style={{ fontWeight: 'bold', color: 'black' }}>Terms and Conditions</Text>
        </Text>
    </Layout>)
};

export default HelloPanel;
