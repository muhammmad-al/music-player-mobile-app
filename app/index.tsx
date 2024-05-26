import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './mainScreen';
import LoginScreen from './loginScreen';
import SignUpScreen from './signupScreen';
import ProfileScreen from './profileScreen';
import { RootStackParamList } from '@/types/type';
import { Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth'; // // for authentication
import 'firebase/firestore'; // for firestore
import 'firebase/storage'; // for storage

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8hr1oOEwu4w4bMQwRTiQjNNwHJzZktkY",
  authDomain: "soundrevive-91d60.firebaseapp.com",
  projectId: "soundrevive-91d60",
  storageBucket: "soundrevive-91d60.appspot.com",
  messagingSenderId: "341252652672",
  appId: "1:341252652672:web:9f3c574e1ca02a59f97065"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(app);

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
