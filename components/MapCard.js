import React, {useState, useEffect, useContext, } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import * as photo from '../costans/photo'
import Meni from '../costans/Meni';
import { UserContext } from './Contex';
import { Button } from '@ui-kitten/components';

const MapCard = () => {


    const { username, userImage,setUserImage } = useContext(UserContext);

    return (
        <View style={styles.container}>
            <View style={styles.gornjiDio}></View>
            <View style={styles.donjiDio}>
                <View style={styles.donjiView}>
                    <View style={styles.tekst}>
                        <Image source={{ uri: userImage }} style={styles.photo} />
                        <Text style={{marginLeft:10, color:"#FFFFFF", fontSize:16, fontWeight:"bold"}}>{username}</Text>
                        <View style={styles.ikoniceContainer}>
                            <Icon name="message1" size={20} color="#FFAD00" style={styles.ikonica} />
                            <Icon name="phone" size={20} color="#FFAD00" style={styles.ikonica} />
                        </View>
                        
                    </View>
                    <View style={styles.donjiViewDonjidio}>
                       <Button>The way to the nearest gym</Button>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 50,
    },
    gornjiDio: {
        flex: 1,
        borderRadius: 50,

    },
    donjiDio: {
        flex: 1,
        marginHorizontal: '10%',
        marginBottom: '30%',
        justifyContent: 'flex-end',
        borderRadius: 50,


    },
    donjiView: {
        height: 250,
        backgroundColor: '#2C2739',
        borderRadius: 20,
    },
    donjiViewDonjidio: {
        height: 200,
        backgroundColor: 'lightblue',
        borderRadius: 20,
        marginBottom: '10%',
    },
    photo: {
        height: 50,
        width: 50,
        borderRadius: 100,
        marginTop: '5%',
        marginLeft: '5%',
        marginBottom: '5%',
    },
    tekst: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ikoniceContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: '5%',

    },
    ikonica: {
        marginLeft: 10,
        marginRight: 10,
    },
});

export default MapCard;
