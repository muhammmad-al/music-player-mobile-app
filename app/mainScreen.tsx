import React from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../types/type';



export default function MainScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <LinearGradient
      colors={['#00C7FF', '#00C9FF', '#00D1FF', '#00A5FF', '#00A3FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image
        source={require('@/assets/images/main_page_pic.png')}
        style={styles.musicLogo}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Log In"
          onPress={() => navigation.navigate('Login')}
          color="#1E90FF"
        />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
          color="#1E90FF"
        />
        <Button 
          title="Profile" //for testing - should later be deleted
          onPress={() => navigation.navigate('Profile')}
          color="#1E90FF"
        />
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
    height: 120,
    width: 100,
    marginBottom: 300,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-around',
    height: 150, //adjust height to fit new button
  },
});

