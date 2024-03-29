import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Arrow from 'react-native-vector-icons/Entypo';
import CardScroll from './CardScroll';
import { useContext } from 'react';
import Meni from '../costans/Meni';
import { UserContext } from './Contex';
import ExercisesWeek from "../costans/ExercisesWeek";
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {


    const navigation = useNavigation();

    const handleToCoachList = () => {
        navigation.navigate('CoachList');
    };


    const { username, userImage } = useContext(UserContext);

    const [isMenuOpen, setMenuOpen] = useState(false);

    console.log(userImage);

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
                    <Text style={{ marginLeft: 20, fontSize: 20, marginBottom: 10 }}>Hello,</Text>
                    <Text style={{ marginLeft: 20, fontSize: 20, marginTop: -10 }}>{username}</Text>
                </View>
                <TouchableOpacity onPress={() => handleMenu()}>
                    <Image source={{ uri: userImage }} style={{ width: 50, height: 50, borderRadius: 50, marginRight: 20 }} />
                </TouchableOpacity>
            </View>
            <Meni isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} onMenuItemPress={handleMenuItemPress} />
            <ScrollView >
                <CardScroll />
                <ExercisesWeek />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 20, marginRight:20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Exercises this week coach</Text>
                    <TouchableOpacity style={{ backgroundColor: '#EAEAEA', padding: 5, borderRadius: 20 }} onPress={handleToCoachList}>
                        <Arrow name="chevron-right" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Text>KURCINA</Text>
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
        marginTop: 25,
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
