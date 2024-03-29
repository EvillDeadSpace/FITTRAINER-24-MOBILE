import React from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import Arrow from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import TrainerList from '../costans/TreinersList';


const ExercisesWeekScroll = () => {
    const navigation = useNavigation();
    

    const handleToCoachList = () => {
        navigation.navigate('CoachList');
    };
    
    const onPressTrainer = (trainerName) => {
        const trainer = TrainerList.find((TrainerList) => TrainerList.name === trainerName);
        navigation.navigate("ChoachForward", { trainer });
        console.log(trainer.name);
      };
    
    
    return (
        <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 20, marginRight:20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Exercises this week coach</Text>
                    <TouchableOpacity style={{ backgroundColor: '#EAEAEA', padding: 5, borderRadius: 20 }} onPress={handleToCoachList}>
                        <Arrow name="chevron-right" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true} style={styles.container}>
                {TrainerList.slice(0,3).map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => onPressTrainer(item.name)}>
                        <View style={styles.card}>
                            <Image source={item.image} style={styles.image} />
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