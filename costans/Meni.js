import React,{ useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Gymaps from "../components/Gymaps";
import Base64 from "react-native-base64";


import { UserContext } from '../components/Contex';


const Meni = ({ isOpen, onClose, onMenuItemPress }) => {

    const [userData, setUserData] = useState(null);

    const { username, userImage, setUserImage } = useContext(UserContext);

    const navigator = useNavigation();

    useEffect(() => {
        fetch(`http://192.168.0.104:3000/api/user/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
                const userImage = data.image;
                const finalImage = Base64.decode(userImage);
                console.log(finalImage);
                setUserData(finalImage);
                setUserImage(finalImage);

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);


    const handleMenuItemPress = (route) => {
        navigator.navigate(route);
        onMenuItemPress(route);
        onClose();
    };

    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.overlay} onPress={onClose} />
                <View style={styles.menu}>

                    {/* Gornji dio sa slikom avatara i imenom */}
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: userData }}
                            style={styles.avatar}
                        />
                        <Text style={styles.avatarName}>{username}</Text>
                    </View>

                    {/* Random 5 stavki ispod */}
                    <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('ViewProfile')}>
                        <View style={styles.menuItemContent}>
                            <Icon name="user" size={20} style={styles.icon} />
                            <Text style={styles.text}>View profile</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.menuItem}  onPress={Gymaps}>
                        <View style={styles.menuItemContent}>
                            <MaterialCommunityIcons size={25} style={styles.icon} name="progress-check" />
                             <Text style={styles.text}>Progress check</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.menuItem} >
                        <View style={styles.menuItemContent}>
                            <Feather size={20} style={styles.icon} name="check-square" />
                            <Text style={styles.text}>Orders</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.menuItem} >
                        <View style={styles.menuItemContent}>
                            <Feather size={20} style={styles.icon} name="help-circle" />
                            <Text style={styles.text}>Help Center</Text>
                        </View>
                    </TouchableOpacity>



                    <View style={styles.horizontalLine}></View>

                    <TouchableOpacity  style={styles.menuItem} onPress={
                        () => handleMenuItemPress('Settings')
                    }>
                        <View style={styles.menuItemContent}>
                            <Text style={styles.text}>Settings</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.menuItem} onPress={
                        () => handleMenuItemPress('Privacy')
                    }>
                        <View style={styles.menuItemContent}>
                            <Text style={styles.text}>Terms & Condition / Privacy</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.menuItem} onPress={
                        () => handleMenuItemPress('Login')
                    }>
                        <View style={styles.menuItemContent}>
                            <Text style={styles.text}>Log out</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'semibold',
    },
    horizontalLine: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        marginVertical: 10,
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between', // Change to 'space-between' to evenly distribute items
        alignItems: 'center', // Align items vertically in the center
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    menu: {
        width: 330,
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    avatarContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 50,
        backgroundColor: '#744B8F',
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    avatarName: {
        color: 'white',
        fontSize: 16,
    },
    menuItem: {
        marginLeft: 50,
        flexDirection: 'row', // Change to 'row' to align items horizontally
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
    },
    icon: {
        marginRight: 15, // Adjust as needed
        color: '#FFC700',
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});


export default Meni;
