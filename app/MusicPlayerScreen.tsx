import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';

const API_URL = 'https://api.jamendo.com/v3.0/tracks';
const CLIENT_ID = '6b05ee0e';

type Track = {
  id: string;
  name: string;
  audio: string;
};

const MusicPlayerScreen = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTracks();
  }, [page]);

  const fetchTracks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          client_id: CLIENT_ID,
          format: 'jsonpretty',
          limit: 50, // Number of tracks to fetch per page
          offset: (page - 1) * 50, // Calculate offset for pagination
        },
      });
      setTracks((prevTracks) => [
        ...prevTracks,
        ...response.data.results.map((track: any) => ({
          id: track.id,
          name: track.name,
          audio: track.audio,
        })),
      ]);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  const playSound = async (track: Track) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: track.audio });
    setSound(newSound);
    await newSound.playAsync();
    setIsPlaying(true);
    setCurrentTrack(track);
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const loadMoreTracks = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentTrack ? currentTrack.name : 'Select a track'}</Text>
      <Button title={isPlaying ? "Stop" : "Play"} onPress={isPlaying ? stopSound : () => playSound(currentTrack as Track)} disabled={!currentTrack} />
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => playSound(item)}>
            <Text style={styles.trackItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreTracks}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
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
  trackItem: {
    fontSize: 16,
    color: 'blue',
    marginVertical: 5,
  },
});

export default MusicPlayerScreen;