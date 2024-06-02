import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/type'; // Adjust the import path as needed

type Track = {
  id: string;
  name: string;
  audio: string;
  artist_name: string;
  album_name: string;
  album_cover: string;
};

type DetailedMusicPlayerScreenRouteProp = RouteProp<RootStackParamList, 'DetailedMusicPlayerScreen'>;

type Props = {
  route: DetailedMusicPlayerScreenRouteProp;
};

const DetailedMusicPlayerScreen: React.FC<Props> = ({ route }) => {
  const { track } = route.params;
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);

  const playSound = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: track.audio });
    newSound.setVolumeAsync(volume);
    setSound(newSound);
    await newSound.playAsync();
    setIsPlaying(true);
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = async (value: number) => {
    setVolume(value);
    if (sound) {
      await sound.setVolumeAsync(value);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: track.album_cover }} style={styles.albumCover} />
      <Text style={styles.trackTitle}>{track.name}</Text>
      <Text style={styles.artistName}>{track.artist_name}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={isPlaying ? stopSound : playSound}>
          <Text style={styles.controlButton}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        {/* Add Skip buttons if you implement skip functionality */}
      </View>
      <Slider
        style={styles.volumeSlider}
        value={volume}
        onValueChange={handleVolumeChange}
        minimumValue={0}
        maximumValue={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  albumCover: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  controlButton: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  volumeSlider: {
    width: '80%',
    marginTop: 20,
  },
});

export default DetailedMusicPlayerScreen;
