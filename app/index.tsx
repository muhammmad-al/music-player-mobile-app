import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Welcome() {
  const [appIsReady, setAppIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Black': require('../assets/fonts/Roboto/Roboto-Black.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate some asynchronous task
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null; // Render nothing while waiting for fonts to load
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#000000', '#000000']}
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
          <Button
            mode="contained"
            onPress={() => router.push('login')}
            style={[styles.button, { backgroundColor: '#3498DB' }]}
            labelStyle={{ color: '#FFFFFF' }}
          >
            Log in
          </Button>
          <Button
            mode="contained"
            onPress={() => router.push('signup')}
            style={[styles.button, { backgroundColor: '#3498DB' }]}
            labelStyle={{ color: '#FFFFFF' }}
          >
            Sign up
          </Button>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
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
    fontFamily: 'Roboto-Bold', // Use the custom font
    color: '#FFFFFF',
    marginBottom: 50,
  },
  buttonContainer: {
    width: '90%',
    justifyContent: 'space-around',
    height: 300,
  },
  button: {
    marginVertical: 15,
  },
});
