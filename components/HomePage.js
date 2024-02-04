import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import CardScroll from './CardScroll';
import BottomTabNavigator from './Navigation';

import {Button} from "@ui-kitten/components";
import Meni from '../costans/Meni';



const HomePage = ({ route }) => {
    const { username } = route.params;

    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const handleMenuItemPress = (menuItem) => {
        // Dodajte logiku za rukovanje odabirom stavke izbornika
        console.log(`Odabrana stavka izbornika: ${menuItem}`);
        setMenuOpen(false); // Zatvori meni nakon odabira stavke
    };



    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginTop: 55, alignItems: 'center' }}>
                <View>
                    <Text style={{ marginLeft:20,fontSize: 20, marginBottom: 10 }}>Hello,</Text>
                    <Text style={{ marginLeft:20,fontSize: 20, marginTop: -10 }}>{username}</Text>
                </View>
                <TouchableOpacity onPress={()=> handleMenu()}>
                    <Icon
                        name="meho"
                        size={24}
                    />
                </TouchableOpacity>
            </View>
            <Meni isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} onMenuItemPress={handleMenuItemPress} />
            <ScrollView>
                <CardScroll />
            </ScrollView>
            <BottomTabNavigator />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 18,
        marginTop:25,
    },
    searchIcon: {
        marginRight: 15,
    },
    input: {
        flex: 1,
        height: 40,
    },
});

export default HomePage;
