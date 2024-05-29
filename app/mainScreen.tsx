import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../types/type';

export default function MainScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <LinearGradient
      colors={['#B0E0FE', '#5EB5F6', '#2A88E0']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Image
        source={require('@/assets/images/main_page_pic.png')}
        style={styles.musicLogo}
      />
      <Text style={styles.welcomeText}>Welcome to SoundRevive</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicLogo: {
    height: 170,
    width: 140,
    marginBottom: 50,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 50, // Adjusted to make space for the buttons
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-around',
    height: 250, // Increased height to add space between buttons
  },
  button: {
    backgroundColor: '#FF7F50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 15, // Increased margin to add space between buttons
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

