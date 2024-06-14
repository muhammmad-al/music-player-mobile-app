import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import { Audio } from 'expo-av';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Define the type for the route parameters
type RootStackParamList = {
  'home/detailed-music': { item: string };
};

type DetailedMusicRouteProp = RouteProp<RootStackParamList, 'home/detailed-music'>;

export default function DetailedMusic() {
  const route = useRoute<DetailedMusicRouteProp>();
  const { item } = route.params;
  const track = JSON.parse(item);

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return sound ? () => {
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

  const playSound = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: track.audio });
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  return (
    <LinearGradient
      colors={['#000000', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image source={{ uri: track.album_cover }} style={styles.albumCover} />
        <Text style={styles.trackTitle}>{track.name}</Text>
        <Text style={styles.trackArtist}>{track.artist_name}</Text>
        <Text style={styles.trackAlbum}>{track.album_name}</Text>
        <Text style={styles.trackGenre}>{track.genre}</Text>
        <View style={styles.buttons}>
          <Button
            title={isPlaying ? 'Pause' : 'Play'}
            onPress={isPlaying ? pauseSound : playSound}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  albumCover: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  trackArtist: {
    fontSize: 18,
    color: '#3498DB',
    marginBottom: 5,
  },
  trackAlbum: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
  trackGenre: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
