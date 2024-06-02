import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './mainScreen';
import LoginScreen from './loginScreen';
import SignUpScreen from './signupScreen';
import ProfileScreen from './profileScreen';
import MusicPlayerScreen from './MusicPlayerScreen';
import MusicUploadScreen from './musicUploadScreen';
import DetailedMusicPlayerScreen from './DetailedMusicPlayerScreen';
import EditProfileScreen from './editProfile';
import { RootStackParamList } from '@/types/type';

import { initializeApp } from 'firebase/app';
import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // for firestore
import 'firebase/storage'; // for storage

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
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MusicUpload" component={MusicUploadScreen} />
        <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="DetailedMusicPlayerScreen" component={DetailedMusicPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
