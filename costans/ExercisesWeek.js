import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image, StyleSheet} from "react-native";
import split from "../costans/Split";

const ExercisesWeek = () => {
    return (
        <>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 20,
                marginBottom: 10,
            }}>Exercises this week</Text>
            <ScrollView horizontal={true} style={styles.container}>
                {split.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => console.log("prijava")}>
                        <View style={styles.card}>
                            <Image source={item.photo} style={styles.image} />
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
