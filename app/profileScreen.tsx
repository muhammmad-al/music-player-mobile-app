import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function ProfileScreen() {
    const userName = 'John Doe';
    const profilePicture = '';

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{userName}</Text>
            <Image
                source={{ uri: profilePicture || 'https://via.placeholder.com/150' }}
                style={styles.profilePicture}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A1CEDC',
    },
    name: {
        fontSize: 24,
        marginBottom: 20,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#ccc',
    },
});