import {Image, Text, View} from "react-native";
import React, {useContext} from 'react';
import { UserContext } from '../components/Contex';
const ViewProfile = () => {


    const {userImage} = useContext(UserContext);
    return (
        <View style={{marginTop:150}}>
            <Image source={{ uri: userImage }} style={{ width: 200, height: 200, borderRadius: 50, marginRight: 20,alignItems: "center", }} />
            <Text>View Profile</Text>
        </View>
    )
}


export default ViewProfile
