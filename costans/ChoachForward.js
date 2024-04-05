
import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Arrow from "react-native-vector-icons/AntDesign";
import Hearto from 'react-native-vector-icons/AntDesign';  
import Clock from 'react-native-vector-icons/AntDesign';
import axios from "axios";
import { Button } from '@ui-kitten/components';
import base64 from "react-native-base64";
const ChoachForward = ({ route }) => {
    const [finalUserData, setFinalUserData] = useState({});
    const [image, setImage] = useState(null);
    const [coach, setCoach] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 


    const navigation = useNavigation();

    const {coaches} = route.params;
    const { trainerName } = route.params;


    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://192.168.0.104:3000/api/username/${trainerName}`);
            const userData = await response.json();
    
            if (userData && userData.length > 0) { // Provjera postojanja i ispravnosti podataka o korisniku
              const image = userData[0].image;
              const finalImage = base64.decode(image);
    
              setImage(finalImage);
              setFinalUserData(userData);
              setIsLoading(false);
            } else {
                
              console.error('Podaci o korisniku nisu definirani ili prazni.');
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Greška prilikom dohvaćanja podataka o korisniku:', error);
            setIsLoading(false);
          }
        };
          fetchUserData();
      }, [trainerName]);
    
   
      console.log(finalUserData);

    const handleBuy = () => {
        console.log(`Kupujem trenera ${finalUserData[0].username}!`);
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
                    <Image source={{ }} style={styles.image} />
                    <View style={{ marginTop: 85 }}>
                        <Image source={{ uri: image }} style={styles.image} />
                        <View style={styles.timeContainer}>
                            <Clock name="clockcircleo" size={20} color="blue" />
                            {
                                isLoading ? (
                                    <Text>Kurac</Text>
                                ) : (
                                    <View>
                                    <Text>{finalUserData[0].username}</Text>
                                    <Text>{finalUserData[0].password}</Text>
                                    </View>
                                )
                            }
                        </View>
                        <Text style={{textAlign:"center", fontWeight:"bold", fontSize: 22, marginTop:15, marginBottom:15}}>{}</Text>
                     
                        <Text style={{textAlign:"center", paddingHorizontal:20}}></Text>            
                    </View> 
                 
                </View>
                <Button
                style={styles.button}
                        onPress={() => handleBuy()}><Text>Buy </Text></Button>
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