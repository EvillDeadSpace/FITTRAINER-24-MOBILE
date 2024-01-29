import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardScroll from './CardScroll';
import BottomTabNavigator from './Navigation';
import MapCard from "./MapCard";
const HomePage = ({ route }) => {
    const { username } = route.params;
    const [searchText, setSearchText] = useState('');


    return (
        <>
            <View style={{marginLeft:20, marginTop:55, flex:0.2, height:50}}>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Hello,</Text>
                <Text style={{ fontSize: 20, marginTop:-10  }}>{username}</Text>
            </View>
            <View style={styles.container}>
                <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search the exercise"
                    style={styles.input}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>
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
