import React from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/type';

export default function MainScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/musicApp-Icon.png')}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  musicLogo: {
    height: 350,
    width: 400,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-around',
    height: 150, //adjust height to fit new button
  },
});
