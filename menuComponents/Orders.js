import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import trainerPhoto from '../photo/photoFindTrainer.png';
import coachPhoto from '../photo/photoCoach.png';
import { useNavigation } from '@react-navigation/native';
const Orders = () => {

    const navigation = useNavigation();


    const handlerButton = (pages) => {
        if (pages === 'trainer') {
            navigation.navigate('CoachList');
        } else {
            navigation.navigate('ExercisesList');
        }
    }


    return (
        <View>
            <View style={{ marginTop: 60, margin: 25 }}>
                <TouchableOpacity onPress={() => handlerButton('trainer')}
                >
                    <Image source={trainerPhoto} style={{ width: '100%', height: 250, borderRadius: 25 }} />
                </TouchableOpacity >

                <TouchableOpacity onPress={() => handlerButton("Amar")}>
                    <Image source={coachPhoto} style={{ width: '100%', height: 250, borderRadius: 25, marginTop: 20 }} />
                </TouchableOpacity>
            </View>

            <Text style={{ textAlign: 'center', fontSize: 24 }}>More coming soon!! </Text>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Stay tuned</Text>
            <Text style={{ textAlign: 'center', fontSize:24, marginTop:20}}>🤗🤗</Text>
        </View>
    )
}

export default Orders;
