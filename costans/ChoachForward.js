
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Arrow from "react-native-vector-icons/AntDesign";
import Hearto from 'react-native-vector-icons/AntDesign';  
import Clock from 'react-native-vector-icons/AntDesign';

import { Button } from '@ui-kitten/components';

const ChoachForward = ({ route }) => {

    const navigation = useNavigation();
    const { trainer } = route.params;
    console.log(trainer);
    console.log(trainer.name);


    const handleBuy = () => {
        console.log(`Kupujem trenera ${trainer.name}`);
    }


    return (
        <>
              <View style={styles.mainContainer}>
                <View style={styles.yellowContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Arrow name="left" size={25} color="black" />
                    </TouchableOpacity>
                    <Hearto name="hearto" size={25} color="black" />
                </View>
                <View style={styles.container}>
                    <Image source={trainer.image} style={styles.image} />
                    <View style={{ marginTop: 85 }}>
                        <Text style={styles.exerciseName}>{trainer.name}</Text>
                        <View style={styles.timeContainer}>
                            <Clock name="clockcircleo" size={20} color="blue" />
                            <Text style={{marginLeft:10}}>{trainer.time}</Text>
                            <Text style={{textAlign:"center", paddingHorizontal:20, marginTop:10, fontWeight:"bold", fontSize:16}}>{trainer.specialization}</Text>     
                        </View>
                        <Text style={{textAlign:"center", fontWeight:"bold", fontSize: 22, marginTop:15, marginBottom:15}}>{trainer.price}</Text>
                     
                        <Text style={{textAlign:"center", paddingHorizontal:20}}>{trainer.about}</Text>            
                    </View> 
                </View>
                <Button
                style={styles.button}
                        onPress={() => handleBuy()}><Text>Buy {trainer.name}</Text></Button>
            </View>
        </>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    button: {
        position: 'absolute',
        bottom: 10, 
        width: '90%', 
        height: 55,
        borderRadius: 40,
        alignSelf: 'center',
        backgroundColor: "#8C36C7"
        
    },
    exerciseName: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 30,
    },
    description: {
        marginTop: 10,
    },
    timeContainer: {
        flexDirection: "row", 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10,
    },
    image: {
        position: 'absolute',
        top: -80,
        height: 150,
        width: 280,
        resizeMode: 'cover',
        marginBottom: 50,
        left: 60,
        borderRadius: 35,


    },
    yellowContainer: {
        height: '25%', // Visina žutog kontejnera - 20% visine ekrana
        backgroundColor: 'yellow',
        flexDirection: 'row', // Opcionalno, ako želite da strelice i srce budu u istom redoslijedu
        justifyContent: 'space-between', // Opcionalno, ako želite da strelice i srce budu sa obje strane
        alignItems: 'center', // Opcionalno, ako želite da strelice i srce budu vertikalno centrirani
        paddingHorizontal: 20, // Opcionalno, dodavanje unutrašnjeg prostora sa obje strane
    },
    container: {
        flex: 1, // Ostatak ekrana, nakon žutog kontejnera
        backgroundColor: 'lightgrey',
        borderTopLeftRadius: 45, // Zaobljeni gornji lijevi kut
        borderTopRightRadius: 45, // Zaobljeni gornji desni kut
        paddingHorizontal: 20, // Opcionalno, dodavanje unutrašnjeg prostora sa obje strane
    },
});

export default ChoachForward;