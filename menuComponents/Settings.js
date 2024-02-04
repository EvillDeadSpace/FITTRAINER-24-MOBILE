import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text>Settings</Text>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text>Manage Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text>Privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text>Change Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text>Change Language</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text>Help and Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: '10%',
    },
    button: {
        marginVertical: 5,
        width: '90%',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        color: 'black',
    },
});

export default Settings;
