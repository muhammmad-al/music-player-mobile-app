import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './mainScreen';
import LoginScreen from './loginScreen';
import SignUpScreen from './signupScreen';
import ProfileScreen from './profileScreen';
import MusicPlayerScreen from './MusicPlayerScreen';
import DetailedMusicPlayerScreen, {Track} from './DetailedMusicPlayerScreen';
import EditProfileScreen from './editProfile';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';import firebase from 'firebase/app';
import AuthLoadingScreen from './LoginFlow';
import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // for firestore
import 'firebase/storage'; // for storage
import MusicUploadScreen from './musicUploadScreen';
import * as SecureStore from 'expo-secure-store';
import {registerRootComponent} from 'expo';
import {TokenProvider, useToken} from './TokenStuff';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'
import { ReactNativeAsyncStorage } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
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
export const auth = getAuth(app);
export const db = getFirestore(app);

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  SignUp: {appObject: firebase.FirebaseApp};
  Profile: undefined;
  MusicUpload: undefined;
  MusicPlayer: undefined;
  DetailedMusicPlayerScreen: {track: Track};
  EditProfile: {
    profileImage: string;
    setProfileImage: React.Dispatch<React.SetStateAction<string>>;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const[loading, setLoading] = useState(true);
  const {token, setToken} = useToken();
  
  useEffect(() => {
    const checkForToken = async () => {
      try{
        const storedToken = await SecureStore.getItemAsync('token');
        console.log('Stored Token:', storedToken)
        setToken(storedToken);
    } catch(error) {
      console.error("Failed", error);
    } finally {
      setLoading(false);
    }
  };

    checkForToken();
  }, [setToken]);

  useEffect(()=>{
    console.log('Token changed:', token);
  }, [token]);

  if(loading){
    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" color="0000ff" />
      </View>
    );
  }

  console.log('Index: Rendering', {token});

  return(
      <Stack.Navigator initialRouteName={token ? "MusicPlayer" : "Main"}>
        {token ? (
          <>
            <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="MusicUpload" component={MusicUploadScreen} />
            <Stack.Screen name="DetailedMusicPlayerScreen" component={DetailedMusicPlayerScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
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

const RootApp: React.FC = () => (
  <TokenProvider>
      <App />
  </TokenProvider>
);

export default RootApp;
