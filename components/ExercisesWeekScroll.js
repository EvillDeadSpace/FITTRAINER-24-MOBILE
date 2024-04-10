import React,{useEffect, useState} from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, } from "react-native";
import Arrow from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import TrainerList from '../costans/TreinersList';
import base64 from "react-native-base64";


const ExercisesWeekScroll = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [coaches, setCoaches] = useState([]);
    const [image, setImage] = useState(null);

    const handleToCoachList = () => {
        navigation.navigate('CoachList');
    };

    const onPressTrainer = (trainerName) => {
        navigation.navigate('ChoachForward', { trainerName });
        console.log(trainerName);
      };

    useEffect(() => {
        const fetchCoach = async () => {
            try {
                const response = await fetch('http://192.168.0.104:3000/api/coaches');
                const data = await response.json();

                const dataFinale = data.map (coach=> {
                    const image = base64.decode(coach.image);
                    setImage(image)
                    console.log(coach);
                    return {...coach, image};
                })
                console.log(image + "slika")
                setCoaches(dataFinale);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }
        fetchCoach();
    }, []);


    return (
        <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 20, marginRight:20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Find a Coach</Text>
                    <TouchableOpacity style={{ backgroundColor: '#EAEAEA', padding: 5, borderRadius: 20 }} onPress={handleToCoachList}>
                        <Arrow name="chevron-right" size={20} color="black" />
                    </TouchableOpacity>
              </View>
            <ScrollView horizontal={true} style={styles.container}>
                {coaches.slice(0, 3).map((coach) => (
                    <TouchableOpacity key={coach.id} onPress={() => onPressTrainer(coach.username) }>
                        <View style={styles.card}>
                            <Image source={{ uri: coach.image }} style={styles.image} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{coach.username}</Text>
                            <Text style={styles.price}>{coach.price} $</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
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


export default ExercisesWeekScroll;
