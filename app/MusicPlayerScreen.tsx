import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/type'; // Adjust the import path as needed

const API_URL = 'https://api.jamendo.com/v3.0/tracks';
const CLIENT_ID = '6b05ee0e';

type Track = {
  id: string;
  name: string;
  audio: string;
  artist_name: string;
  album_name: string;
  genre: string;
  album_cover: string;
};

const genres = ['rock', 'pop', 'hiphop', 'jazz', 'electronic', 'classical'];

const GenreSelector = ({ onSelectGenre }: { onSelectGenre: (genre: string) => void }) => {
  return (
    <View style={styles.genreContainer}>
      {genres.map((genre) => (
        <TouchableOpacity key={genre} style={styles.genreButton} onPress={() => onSelectGenre(genre)}>
          <Text style={styles.genreText}>{genre}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const MusicPlayerScreen = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Use the typed navigation

  useEffect(() => {
    fetchTracks(selectedGenre, page);
  }, [page, searchTerm, selectedGenre]);

  const fetchTracks = async (genre: string = '', page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          client_id: CLIENT_ID,
          format: 'jsonpretty',
          limit: 50,
          offset: (page - 1) * 50,
          tags: genre,
        },
      });
      setTracks((prevTracks) => [
        ...prevTracks,
        ...response.data.results.map((track: any) => ({
          id: `${track.id}-${page}`,
          name: track.name,
          audio: track.audio,
          artist_name: track.artist_name,
          album_name: track.album_name,
          genre: genre, // Add the genre to the track object
          album_cover: track.album_image || '',
        })),
      ]);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreSelect = (genre: string) => {
    setTracks([]);
    setPage(1);
    setSelectedGenre(genre);
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

  const handleSearch = () => {
    setTracks([]);
    setPage(1);
    setSearchTerm(searchQuery);
  };

  return (
    <LinearGradient
      colors={['#B0E0FE', '#5EB5F6', '#2A88E0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
        <Image
          source={{ uri: 'https://example.com/profile-pic-url' }} // Replace with actual profile picture URL
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={() => navigation.navigate('MusicUpload')}>
        <Text style={styles.uploadText}>Upload Music</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by genre, artist, or track name"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <GenreSelector onSelectGenre={handleGenreSelect} />
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DetailedMusicPlayerScreen', { track: item })}>
            <Text style={styles.trackItem}>{item.name} - {item.artist_name}</Text>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreTracks}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
  },
  profileButton: {
    position: 'absolute',
    top: 20,
    left: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'black',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadButton: {
    position: 'absolute',
    top: 25, // Adjusted to align vertically as shown in the image
    left: 160, // Adjusted to align horizontally as shown in the image
    padding: 25, // Increased padding for a larger button
    backgroundColor: 'white',
    borderRadius: 6,
  },
  uploadText: {
    fontSize: 20,
    fontWeight: 'bold', // Made the text bold
    color: '#000',
  },
  searchBar: {
    marginTop: 120,
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    paddingLeft: 10,
    marginBottom: 10,
    width: '95%',
    backgroundColor: 'white',
  },
  trackItem: {
    fontSize: 16,
    color: 'black',
    marginVertical: 5,
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  genreButton: {
    backgroundColor: '#FF7F50',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  genreText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MusicPlayerScreen;