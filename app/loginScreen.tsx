import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/type';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';import firebase, { initializeApp } from 'firebase/app';
import * as SecureStore from 'expo-secure-store';

const firebaseConfig = {
  apiKey: "AIzaSyB4RR8z55G29L0hweKx72P2dsE07e04CTg",
  authDomain: "musicdistribution-fea87.firebaseapp.com",
  projectId: "musicdistribution-fea87",
  storageBucket: "musicdistribution-fea87.appspot.com",
  messagingSenderId: "286063233697",
  appId: "1:286063233697:web:22da5691adaf320142fee0",
  measurementId: "G-0R3BBY9TJ6"
};

const app = initializeApp(firebaseConfig);

interface LoginScreenProps{
  navigation: any;
  appObject: any;
}

const saveTokenToSecureStorage = async (token: string) => {
  try{
    await SecureStore.setItemAsync('token', token);
    console.log('Token Saved');
  } catch (error){
    console.error('failed to save token');
  }
};

export default function LoginScreen(props: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const auth = getAuth(app);

  const handleLogin = async () => { 
    try{
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();
      await saveTokenToSecureStorage(token);
      navigation.navigate('MusicPlayer');
    } catch (e){
      console.log('Login failed', e);
    }
  };

  return (
    <LinearGradient
      colors={['#B0E0FE', '#5EB5F6', '#2A88E0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Log In</Text>
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
          title="Log In"
          onPress={handleLogin}
          color="#1E90FF"
        />
      </View>
      <Text style={styles.newUserText}>New user? <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>Sign up here</Text></Text>
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
  newUserText: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
  signUpLink: {
    color: 'white',
    fontWeight: 'bold',
  },
});
