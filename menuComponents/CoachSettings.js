import { Button } from '@ui-kitten/components';
import React, {useState, useContext} from 'react'
import { View, Text, TextInput } from 'react-native'
import { UserContext } from '../components/Contex';





const CoachSettings = () => {

    const { username, userImage, setUserImage } = useContext(UserContext);

    const [specialization, setSpecialization] = useState('');
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);
    const [description, setDescription] = useState('');
    const [day, setDay] = useState(0);

    const handleChanges = async () => {
        try {
          const response = await fetch('http://192.168.0.104:3000/api/coaches/price', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username, // Zamijenite s varijablom koja sadrži trenutno prijavljenog trenera
              price: price,
              specialization: specialization,
                duration: duration,
                description: description,
                day: day
            }),
          });

          if (!response.ok) {
            throw new Error('Došlo je do greške prilikom dodavanja cijene.');
          }

          // Ovdje možete dodati dodatne korake ako je dodavanje cijene uspješno
          console.log('Cijena uspješno dodana.');
        } catch (error) {
          console.error('Greška prilikom dodavanja cijene:', error);
        }
      };



  return (
   <>
        <View style={{marginTop:45}}>
            <Text>Welcome, coach</Text>
            <Text>{username}</Text>
            <Text>CoachSettings</Text>
            <Text>Set up your specialization:</Text>
            <TextInput
                value={specialization}
                placeholder='Specialization'
                onChangeText={(text) => setSpecialization(text)}
            ></TextInput>
            <Text>Set up your price:</Text>
            <TextInput
                value={price}
                placeholder='Price'
                onChangeText={(text) => setPrice(text)}
            ></TextInput>
            <Text>Set your duration of trening</Text>
            <TextInput
                value={duration}
                placeholder='Duration'
                onChangeText={(text) => setDuration(text)}
            ></TextInput>
            <Text>Description...</Text>
            <TextInput
                value={description}
                placeholder='Description'
                onChangeText={(text) => setDescription(text)}
            ></TextInput>
            <Text>Day</Text>
            <TextInput
                value={day}
                placeholder='Day'
                onChangeText={(text) => setDay(text)}
            ></TextInput>
            <Button onPress={handleChanges}>Save</Button>
        </View>
    </>
  )
}

export default CoachSettings
