// MapScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import axios from 'axios';


import MapCard from "./MapCard";



const MapScreen = () => {
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [gyms, setGyms] = useState([]);

    useEffect(() => {
        const getUserLocation = async () => {
            try {
                const { status } = await requestForegroundPermissionsAsync();

                if (status === 'granted') {
                    const location = await getCurrentPositionAsync();
                    const { latitude, longitude } = location.coords;

                    console.log('User location:', latitude, longitude);

                    setRegion(prevRegion => ({
                        ...prevRegion,
                        ...{ latitude, longitude },
                    }));

                    // Pozovite funkciju za pretragu teretana kada se dobije lokacija korisnika
                    searchGyms(latitude, longitude);  // Dodato pozivanje funkcije
                } else {
                    console.error('Location permission not granted');
                }
            } catch (error) {
                console.error('Error getting user location:', error);
            }
        };

        const searchGyms = async (latitude, longitude) => {
            try {
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/search?format=json&limit=10&q=gym&lat=${latitude}&lon=${longitude}`
                );

                const gymsData = response.data.filter(place => place.category === 'gym');

                // Obrada i postavljanje markera na mapu
                const gymsMarkers = gymsData.map(gym => ({
                    id: gym.place_id,
                    coordinate: {
                        latitude: parseFloat(gym.lat),
                        longitude: parseFloat(gym.lon),
                    },
                    title: gym.display_name,
                    description: gym.address,
                }));

                // Postavite markere u state
                setGyms(gymsMarkers);
            } catch (error) {
                console.error('Error fetching gyms:', error);
            }
        };

        getUserLocation();

    }, []);




    return (
        <View style={styles.container}>

            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={newRegion => setRegion(newRegion)}
            >
                {gyms.map(gym => (
                    <Marker
                        key={gym.id}
                        coordinate={{
                            latitude: gym.coordinate.latitude,
                            longitude: gym.coordinate.longitude,
                        }}
                        title={gym.title}
                        description={gym.description}
                    />
                ))}
            </MapView>
            <MapCard  />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MapScreen;
