import React from 'react';
import { Text, View, Image, FlatList, StyleSheet } from 'react-native';

const ExercisePanel = ({ route }) => {

    const { allExercises } = route.params;

    const renderExerciseItem = ({ item }) => (
        <View style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
            <Image source={{ uri: item.gifUrl }} style={styles.image} />
            <Text style={styles.equipment}>{item.equipment}</Text>
        </View>
    );
    return (
        <FlatList
            data={allExercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0', // Boja pozadine
        padding: 20,
        margin: 10,
        marginTop: 50,
        borderRadius: 25, // Radijus roga
        borderWidth: 2, // Debljina granice
        borderColor: '#333', // Boja granice
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 5, // Radijus roga slike
        marginBottom: 10,
    },
    equipment: {
        fontStyle: 'italic',

        color: '#555', // Boja teksta
    },
});

export default ExercisePanel;
