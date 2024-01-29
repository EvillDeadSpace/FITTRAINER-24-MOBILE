import {Text, View, ScrollView, StyleSheet, Image} from "react-native";
import React from "react";
import exercises from "../costans/Exercises";
export default function CardScroll() {
    return (
        <>
            <ScrollView horizontal={true} style={styles.container}>
                {exercises.map((exercise,index) => (
                    <View key={index} style={[styles.card, styles.cardElevated]}>
                        <View style={styles.imageContainer}>
                            <Image source={exercise.photo}
                            style={styles.roundImage}/>
                        </View>
                        <Text style={{color:"white"}}>{exercise.name}</Text>
                    </View>
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
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
    },
});


