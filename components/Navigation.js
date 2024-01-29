//BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import HomePage from "./HomePage";
import Login from "./Login";
import TestHomePAge from "./TestHomePAge";
import Gymaps from "./Gymaps";

const Tab = createBottomTabNavigator();


const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        height: 60,
        backgroundColor: '#fff',
    },
};

const BottomTabNavigator = () => {
    const navigation = useNavigation();

    return (
        <Tab.Navigator screenOptions={screenOptions} >
            <Tab.Screen
                name="HomePage"
                component={TestHomePAge}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        e.preventDefault(); // Ovo spriječava prelazak na drugi ekran kada je pritisnut tab
                        navigation.navigate('Login');
                    },
                })}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            backgroundColor: focused ? '#af8cdb' : 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Icon name="home" size={24} color={focused ? '#16247d' : 'gray'} />
                        </View>
                    ),

                }}
            />
            <Tab.Screen
                name="Search"
                component={ () => { /* Dodaj komponentu za Signup ekran */ }}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            backgroundColor: focused ? '#af8cdb' : 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Icon name="plus" size={24} color={focused ? '#16247d' : 'gray'} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Shop"
                component={Login}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            backgroundColor: focused ? '#af8cdb' : 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Icon name="shopping-bag" size={24}   color={focused ? '#16247d' : 'gray'} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Heart"
                component={() => { /* Dodaj komponentu za Signup ekran */ }}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            backgroundColor: focused ? '#af8cdb' : 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Icon name="heart" size={24} color={focused ? '#16247d' : 'gray'} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Fav"
                component={Gymaps}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        e.preventDefault(); // Ovo spriječava prelazak na drugi ekran kada je pritisnut tab
                        navigation.navigate('Gymaps');
                    },
                })}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            backgroundColor: focused ? '#af8cdb' : 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Icon name="map" size={24} color={focused ? '#16247d' : 'gray'} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>

    );
};

export default BottomTabNavigator;


