import {Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, } from "react-native";
import axios from "axios";
import React, {useState} from "react";
import exercises from "../costans/Exercises";
import {fetchData, exerciseOptions} from "../costans/GetData";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";


export default function CardScroll() {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();

    const handleExercisePress = async (exerciseName) => {
        try {
            if (exerciseName === 'biceps' || exerciseName === 'triceps' || exerciseName === 'quads' || exerciseName === 'abs' || exerciseName === 'glutes') {
                console.log('Tražim vježbu:', exerciseName);
                // Fetch podataka s API-ja prema imenu vježbe
                const url = `https://exercisedb.p.rapidapi.com/exercises/target/${exerciseName}`;
                const data = await fetchData(url, exerciseOptions);
                console.log(data);
                
                if (data && data.length > 0) {
                    // Prikupljanje svih informacija o vježbama
                    const allExercises = data.map(exercise => ({
                        name: exercise.name,
                        gifUrl: exercise.gifUrl,
                        equipment: exercise.equipment,
                    }));
                    // Prikazivanje informacija na ekranu ExercisePanel
                    navigation.navigate('ExercisePanel', { allExercises });
                } else {
                    console.warn('Nema podataka o vježbi.');
                }

            } else {
                console.log('Tražim vježbu:', exerciseName);
                // Fetch podataka s API-ja prema imenu vježbe
                const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${exerciseName}`;
                const data = await fetchData(url, exerciseOptions);
                console.log(data);

                if (data && data.length > 0) {
                    // Prikupljanje svih informacija o vježbama
                    const allExercises = data.map(exercise => ({
                        name: exercise.name,
                        gifUrl: exercise.gifUrl,
                        equipment: exercise.equipment,
                    }));
                    // Prikazivanje informacija na ekranu ExercisePanel
                    navigation.navigate('ExercisePanel', { allExercises });
                } else {
                    console.warn('Nema podataka o vježbi.');
                }
            }
        } catch (error) {
            console.error('Greška prilikom dohvaćanja podataka:', error);
        }
    };


    return (
        <>
            <View style={styles.containerScroll}>
                <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search the exercise"
                    style={styles.input}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>
            <ScrollView horizontal={true} style={styles.container}>
                {exercises
                    .filter((exercise) =>
                        exercise.name.toLowerCase().includes(searchText.toLowerCase())
                    )
                    .map((exercise, index) => (
                        <TouchableOpacity key={index} onPress={() => handleExercisePress(exercise.name)}>
                            <View key={index} style={[styles.card, styles.cardElevated]}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={exercise.photo}
                                        style={styles.roundImage}
                                    />
                                </View>
                                <Text style={{ color: "white" }}>{exercise.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    card: {
        width:100,
        height:100,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin:8,
    },
    searchIcon: {
        marginRight: 15,
    },
    input: {
        flex: 1,
        height: 40,
    },
    containerScroll: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 18,
        marginTop:25,
    },
    cardElevated: {
        backgroundColor: '#af8cdb',
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "#333",
    },
    container:{
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        marginTop:-8,
        marginRight:15,
        marginLeft:15,
    },
    imageContainer: {
        marginTop:5,
        alignItems: 'center',
    },
    roundImage: {
        width: 70,
        height: 70,
        borderRadius: 40,
        borderColor: 'black',
        borderWidth: 2,
    },
});


