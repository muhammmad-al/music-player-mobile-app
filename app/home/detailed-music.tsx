import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

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
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(updateStatus);
    }
    return () => {
      sound ? sound.unloadAsync() : undefined;
    };
  }, [sound]);

  const updateStatus = (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const playSound = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: track.audio });
      setSound(newSound);
      await newSound.playAsync();
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const onSliderValueChange = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <PaperProvider>
      <ImageBackground source={{ uri: track.album_cover }} style={styles.background}>
        <BlurView intensity={50} style={styles.blurContainer}>
          <Image source={{ uri: track.album_cover }} style={styles.albumCover} />
          <View style={styles.content}>
            <Text style={styles.trackTitle}>{track.name}</Text>
            <Text style={styles.trackArtist}>{track.artist_name}</Text>
            <Text style={styles.trackAlbum}>{track.album_name}</Text>
            <Text style={styles.trackGenre}>{track.genre}</Text>
            <TouchableOpacity
              onPress={isPlaying ? pauseSound : playSound}
              style={styles.playPauseButton}
            >
              <MaterialIcons
                name={isPlaying ? 'pause' : 'play-arrow'}
                size={50}
                color="white"
              />
            </TouchableOpacity>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={onSliderValueChange}
              minimumTrackTintColor="#3498DB"
              maximumTrackTintColor="#87CEEB"
              thumbTintColor="#1E90FF"
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>{formatTime(duration - position)}</Text>
            </View>
          </View>
        </BlurView>
      </ImageBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    alignItems: 'center',
  },
  albumCover: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 50,
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
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 5,
  },
  trackGenre: {
    fontSize: 18,
    color: '#3498DB',
    marginBottom: 20,
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  slider: {
    width: 300,
    height: 40,
    marginTop: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 10,
  },
  timeText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
