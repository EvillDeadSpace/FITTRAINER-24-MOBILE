import React, { useState, useReducer, useEffect } from 'react';
import { Text, View, Image, FlatList, StyleSheet, TouchableOpacity,Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { useNavigation } from '@react-navigation/native';

const ExercisePanel = ({ route }) => {
    const navigation = useNavigation();
    const [dark, toggle] = useReducer((s) => !s, true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);


    const { allExercises } = route.params;

    const mainName= allExercises[0].mainName;

    const fixMainName  = mainName.charAt(0).toUpperCase() + mainName.slice(1);

    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const renderExerciseItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => toggleExpand(index)}>
            <View style={styles.container}>
                {loading ? (
                    <MotiView
                        transition={{
                            type: 'timing',
                        }}
                        style={[styles.container, styles.padded]}
                        animate={{ backgroundColor:  '#ffffff'   }}
                    >
                        <Skeleton backgroundColor="grey"  radius="round"  width={75} />
                        <Spacer />
                        <Skeleton backgroundColor="grey"  radius="round" width={150} height={150} />
                        <Spacer height={24} />
                        <Skeleton backgroundColor="grey"  radius="round" width={200}  />
                    </MotiView>
                ) : (
                    <>
                        <Text style={styles.title}>{item.name}</Text>
                        <Image source={{ uri: item.gifUrl }} style={styles.image} />
                        <Text style={styles.equipment}>{item.equipment}</Text>
                        <Text>{item.mainExercises}</Text>
                        {expandedIndex === index && (
                            <Text style={{ textAlign: "center" }}>{item.instructions}</Text>
                        )}
                    </>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.iconContainer}>
            <Icon name="left" size={25} color="black" />
          </View>
        </TouchableOpacity>
     <Text style={styles.text}>{fixMainName}</Text>
      </View>
        </TouchableOpacity>
    

        <FlatList
            data={allExercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item, index) => index.toString()}
        />
        </View>
    );
};

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
      },
    
    header: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft: 20,
      },
    padded: {
        padding: 20,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        marginTop: 20,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#fff',

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 5,
        marginBottom: 10,
    },
    equipment: {
        fontStyle: 'italic',
        color: '#555',
    },
});

export default ExercisePanel;
