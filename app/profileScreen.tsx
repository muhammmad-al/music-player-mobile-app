import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/type';

export default function ProfileScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const userName = 'John Doe';
    const profilePicture = '';

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{userName}</Text>
            <Image
                source={{ uri: profilePicture || 'https://via.placeholder.com/150' }}
                style={styles.profilePicture}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('MusicUpload')}
            >
                <Text style={styles.buttonText}>Upload Music</Text>
            </TouchableOpacity>
        </View>
    );
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
    button: {
      backgroundColor: '#FF7F50',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });