import React, {useState, useEffect, useContext} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image, StyleSheet} from "react-native";
import split from "../costans/Split";
import Icon from 'react-native-vector-icons/AntDesign';
import Arrow from 'react-native-vector-icons/Entypo';
import ExercisesList from './ExercisesList';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../components/Contex';

const ExercisesWeek = () => {

    const { username} = useContext(UserContext);


    const navigation = useNavigation();

    const handleToExercisesList = () => {
        navigation.navigate('ExercisesList');
    };

    const handleExercisePress = (exerciseName) => {
        console.log('Tražim vježbu:', exerciseName);
        navigation.navigate('ExerciseForward', {exerciseName});
      };


    const [heartVisibleMap, setHeartVisibleMap] = useState({}); // Stanje za praćenje vidljivosti srca


//test za github

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`http://192.168.0.104:3000/api/user/favorites/${username}`);
                const data = await response.json();
                console.log(data);

               
                if (data.favorites && data.favorites.length > 0) {
                    const newHeartVisibleMap = {};
                    data.favorites.forEach((item, index) => {
                        newHeartVisibleMap[item] = true; 
                    });
                    setHeartVisibleMap(newHeartVisibleMap);
                }
            } catch (error) {
                console.error('Došlo je do greške prilikom dohvatanja omiljenih stavki:', error);
            }
        };

        fetchFavorites();
    }, [username]);
    const removeFavorite = async (itemId) => {
        try {
            const response = await fetch(`http://192.168.0.104:3000/api/user/removefavorite/${username}/${itemId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    itemId: itemId,
                }),
            });

            const data = await response.json();
            console.log(data); 
           
            if (data.success) {
                setHeartVisibleMap(prevState => ({
                    ...prevState,
                    [itemId]: false, 
                }));
            }
        } catch (error) {
            console.error('Došlo je do greške prilikom uklanjanja stavke kao omiljene:', error);
        }
    };

    const markAsFavorite = async (itemId) => {
        try {
            const response = await fetch(`http://192.168.0.104:3000/api/user/addfavorite/${username}/${itemId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    itemId: itemId,
                }),
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                setHeartVisibleMap(prevState => ({
                    ...prevState,
                    [itemId]: true, // Ovdje mijenjamo na true jer je stavka označena kao omiljena
                }));
            }
        } catch (error) {
            console.error('Došlo je do greške prilikom označavanja stavke kao omiljene:', error);
        }
    };

    const toggleFavorite = async (itemId) => {
        try {
            // Provjeri trenutno stanje srca za ovaj item
            const isFavorite = heartVisibleMap[itemId];

            if (isFavorite) {
                await removeFavorite(itemId); // Ako je označeno kao omiljeno, ukloni iz omiljenih
            } else {
                await markAsFavorite(itemId); // Inače označi kao omiljeno
            }
        } catch (error) {
            console.error('Došlo je do greške prilikom ažuriranja omiljenih stavki:', error);
        }
    };

    return (
        <>
             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 20, marginRight:20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Explore all Plans and Programs</Text>
                    <TouchableOpacity style={{ backgroundColor: '#EAEAEA', padding: 5, borderRadius: 20 }} onPress={handleToExercisesList}>
                        <Arrow name="chevron-right" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            <ScrollView horizontal={true} style={styles.container}>
                {split.slice(0,5).map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => toggleFavorite(index)}>
                        <View style={styles.card}>
                            <Image source={item.photo} style={styles.image} />
                            <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(index)}>
                                {/* Prikazuje srce ili srce u punom obliku na osnovu stanja */}
                                {heartVisibleMap[index] ? (
                                    <Icon name="heart" size={24} color="red" />
                                ) : (
                                    <Icon name="hearto" size={24} color="red" />
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.price}>{item.price}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    card: {
        width: 250,
        height: 150, // Adjusted height to accommodate additional content
        backgroundColor: '#333',
        marginHorizontal: 5,
        borderRadius: 10,
        justifyContent: 'center',
        overflow: 'hidden', // Ensures the image doesn't overflow the card
        position: 'relative',
    },
    heartIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textContainer: {
        marginTop: 10, // Added margin to create space between image and text
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        color: 'black',
        fontSize: 14,
    },
});


export default ExercisesWeek;
