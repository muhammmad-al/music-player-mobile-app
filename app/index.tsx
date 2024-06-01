import 'react-native-gesture-handler';
import React, {useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './mainScreen';
import LoginScreen from './loginScreen';
import SignUpScreen from './signupScreen';
import ProfileScreen from './profileScreen';
import MusicPlayerScreen from './MusicPlayerScreen';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';import firebase from 'firebase/app';
import AuthLoadingScreen from './LoginFlow';
import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // for firestore
import 'firebase/storage'; // for storage
import MusicUploadScreen from './musicUploadScreen';
import * as SecureStore from 'expo-secure-store';
import {registerRootComponent} from 'expo';
import {TokenProvider} from './TokenStuff';
import MainApp from './index'
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

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  SignUp: {appObject: firebase.FirebaseApp};
  Profile: undefined;
  MusicUpload: undefined;
  MusicPlayer: undefined;
};

const RootApp = () => (
  <TokenProvider>
    <MainApp />
  </TokenProvider>
)

registerRootComponent(RootApp)

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const[loading, setLoading] = useState(true);
  const[token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkForToken = async () => {
      try{
        const storedToken = await SecureStore.getItemAsync('token');
        setToken(storedToken);
        setLoading(false);
    } catch(error) {
      console.error("Failed", error);
    } finally {
      setLoading(false);
    }
  };

    checkForToken();
  }, []);

  if(loading){
    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" color="0000ff" />
      </View>
    );
  }

  return(
      <Stack.Navigator initialRouteName={token ? "MusicPlayer" : "Main"}>
        {token ? (
          <>
            <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="MusicUpload" component={MusicUploadScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} appObject={app} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUpScreen} initialParams={{appObject: app}} />
          </>
        )}
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
