import React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import trainers from "./TreinersList";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import base64 from "react-native-base64";



export default function CoachList() {
  const navigation = useNavigation();
  const [coaches, setCoaches] = useState([]);

useEffect(() => {
  const fetchCoach = async () => {
    try {
      const response = await fetch('http://192.168.0.104:3000/api/coaches');
      const data = await response.json();
   
      const dataFinale = data.map (coach=> {
        const image = base64.decode(coach.image);
        return {...coach, image};
      
      })

      console.log(dataFinale);

      setCoaches(dataFinale);
    } catch (error) {
      
    }
  }

  fetchCoach();
}, []);

  console.log(coaches);
  

  const onPressTrainer = (trainerName) => {
    const trainer = trainers.find((trainer) => trainer.name === trainerName);
    navigation.navigate("ChoachForward", { trainer });
    console.log(trainer.name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.iconContainer}>
            <Icon name="left" size={25} color="black" />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Coach</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {
    coaches.map((item, index) => (
      // Prikaži dva trenera u svakom redu
         (
        <View key={index} style={styles.row}>
          {/* Prvi trener u redu */}
          <TouchableOpacity onPress={() => console.log("buduci problem mene ")}>
            <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.username}</Text>
                <Text style={styles.specialization}>{item.specialization}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )
    ))
   }
   
 
</ScrollView>
   
    </View>
  );
}

const styles = StyleSheet.create({
  paddingContainer: {
    padding: 20,
  },
  container: {
    flex: 1,
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "gray",
  },
  specialization: {
    fontSize: 16,
    color: "gray",
  },
  iconContainer: {},
  textContainer: {
    padding: 10,
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    color: "black",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 150, // Prilagođena visina slike
    resizeMode: "cover",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  card: {
    width: 160, // Prilagođena širina za smještanje dviju slika u redu
    height: 260, // Prilagođena visina za dodatni sadržaj ispod teksta
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  scrollViewContent: {
    alignItems: "center", // Changed alignment to start from left
    flexDirection: "row", 
    flexWrap: "wrap",// Changed flexDirection to column
  },
  row: {
    flexDirection: "row",
  },
});
