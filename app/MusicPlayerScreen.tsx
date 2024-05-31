import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const MusicPlayerScreen = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('@/assets/audio/Lil Baby & Lil Durk - 2040 (Official Audio).mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(true);
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lil Baby & Lil Durk - 2040</Text>
      <Button title={isPlaying ? "Stop" : "Play"} onPress={isPlaying ? stopSound : playSound} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default MusicPlayerScreen;