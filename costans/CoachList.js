import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import trainers from "./TreinersList";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";

export default function CoachList() {
  const navigation = useNavigation();




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
        <Text style={styles.text}>Plan and Program</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
  {/* Mapiranje trenera */}
  {trainers.map((item, index) => (
    // Prikaži dva trenera u svakom redu
    index % 2 === 0 && (
      <View key={index} style={styles.row}>
        {/* Prvi trener u redu */}
        <TouchableOpacity onPress={() => onPressTrainer(item.name)}>
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.specialization}>{item.specialization}</Text>
              <Text style={styles.price}>{item.price}</Text>
              {/* Ostatak vašeg dodatnog sadržaja */}
            </View>
          </View>
        </TouchableOpacity>
        {/* Drugi trener u redu (ako postoji) */}
        {trainers[index + 1] && (
          <TouchableOpacity onPress={() => onPressTrainer(trainers[index + 1].name)}>
            <View style={styles.card}>
              <Image source={trainers[index + 1].image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{trainers[index + 1].name}</Text>
                <Text style={styles.specialization}>{trainers[index + 1].specialization}</Text>
                <Text style={styles.price}>{trainers[index + 1].price}</Text>
                {/* Ostatak vašeg dodatnog sadržaja */}
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  ))}
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
    flexDirection: "column", // Changed flexDirection to column
  },
  row: {
    flexDirection: "row",
  },
});
