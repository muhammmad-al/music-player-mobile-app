import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import {createUserWithEmailAndPassword, onAuthStateChanged, getAuth} from '@firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/type';

const firebaseConfig = {
  apiKey: "AIzaSyB4RR8z55G29L0hweKx72P2dsE07e04CTg",
  authDomain: "musicdistribution-fea87.firebaseapp.com",
  projectId: "musicdistribution-fea87",
  storageBucket: "musicdistribution-fea87.appspot.com",
  messagingSenderId: "286063233697",
  appId: "1:286063233697:web:22da5691adaf320142fee0",
  measurementId: "G-0R3BBY9TJ6"
};

export interface SignUpScreenProps {
  app: any;
  navigation: any;
};

const app = initializeApp(firebaseConfig);

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const auth = getAuth(app);
  return (
    <LinearGradient
      colors={['#B0E0FE', '#5EB5F6', '#2A88E0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title="Sign Up"
          onPress={ async () => {
          await createUserWithEmailAndPassword(auth, email, password).catch(e => {console.log(e)});
          navigation.navigate('Main')
          
        }}
          color="#1E90FF"
        />
      </View>
      <Text style={styles.accountText}>Already have an account? <Text style={styles.logInLink} onPress={() => navigation.navigate('Login')}>Log in here</Text></Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  accountText: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
  logInLink: {
    color: 'white',
    fontWeight: 'bold',
  },
});
