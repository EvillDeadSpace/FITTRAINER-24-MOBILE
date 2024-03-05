import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import split from './Split';


const ExercisesList = () => {
  const navigation = useNavigation();


  const handleExercisePress = (exerciseName) => {
   console.log('Tražim vježbu:', exerciseName);  
   navigation.navigate('ExerciseForward', {exerciseName});
 };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.iconContainer}>
            <Icon name="left" size={25} color="black" />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Plan and Program</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {split.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleExercisePress(item.name)}>
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

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {},
  textContainer: {
 // Added margin to create space between image and text
  },
  title: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    color: 'black',
    fontSize: 14,
    marginBottom: 25,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    width: 350,
    height: 200, // Adjusted height to accommodate additional content
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'hidden', // Ensures the image doesn't overflow the card
    marginBottom: 2,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
});

export default ExercisesList;
