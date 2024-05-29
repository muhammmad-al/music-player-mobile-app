import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './mainScreen';
import LoginScreen from './loginScreen';
import SignUpScreen from './signupScreen';
import ProfileScreen from './profileScreen';
import { RootStackParamList } from '@/types/type';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4RR8z55G29L0hweKx72P2dsE07e04CTg",
  authDomain: "musicdistribution-fea87.firebaseapp.com",
  projectId: "musicdistribution-fea87",
  storageBucket: "musicdistribution-fea87.appspot.com",
  messagingSenderId: "286063233697",
  appId: "1:286063233697:web:22da5691adaf320142fee0",
  measurementId: "G-0R3BBY9TJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(app);

const Stack = createStackNavigator<RootStackParamList>();
const app2 = "test";
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="SignUp"  component={SignUpScreen} initialParams = {{appObject: app}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}
