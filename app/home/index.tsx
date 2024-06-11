import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import axios from 'axios';
import { router } from 'expo-router';
import { UserProfile } from '@/backend';
import useUserProfile from '@/hooks/useUserProfile';

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

const GenreSelector = ({ selectedGenre, onSelectGenre }: { selectedGenre: string; onSelectGenre: (genre: string) => void }) => {
  return (
    <ScrollView horizontal={true} style={styles.genreContainer} contentContainerStyle={styles.genreContentContainer} showsHorizontalScrollIndicator={false}>
      {genres.map((genre) => (
        <TouchableOpacity
          key={genre}
          style={[styles.genreButton, selectedGenre === genre && styles.selectedGenreButton]}
          onPress={() => onSelectGenre(genre)}
        >
          <Text style={[styles.genreText, selectedGenre === genre && styles.selectedGenreText]}>{genre}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default function Home() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  useEffect(() => {
    fetchTracks(selectedGenre, page);
  }, [page, searchTerm, selectedGenre]);

  useEffect(() => {
    fetchRecommendedTracks();
  }, []);

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
          genre: genre,
          album_cover: track.album_image || '',
        })),
      ]);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendedTracks = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          client_id: CLIENT_ID,
          format: 'jsonpretty',
          limit: 10,
          tags: 'jazz',
        },
      });
      setRecommendedTracks(response.data.results.map((track: any) => ({
        id: track.id,
        name: track.name,
        audio: track.audio,
        artist_name: track.artist_name,
        album_name: track.album_name,
        genre: 'jazz',
        album_cover: track.album_image || '',
      })));
    } catch (error) {
      console.error('Error fetching recommended tracks:', error);
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
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.profileButton} onPress={
          () => router.push('/home/profile')
        }>
          <Image
            source={{ uri: 'https://example.com/profile-pic-url' }} // Replace with actual profile picture URL
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity style={styles.smallButton} onPress={
            () => router.push('/home/upload')
          }>
            <Text style={styles.smallButtonText}>Upload Music</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={
            () => router.push('/home/create-playlists')
          }>
            <Text style={styles.smallButtonText}>Make Playlist</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by genre, artist, or track name"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <View style={styles.recommendedWrapper}>
        <Text style={styles.recommendedHeader}>Recommended Tracks</Text>
        <FlatList
          data={recommendedTracks}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('DetailedMusicPlayerScreen', { track: item })}>
              <Image source={{ uri: item.album_cover }} style={styles.albumCover} />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.genreWrapper}>
        <GenreSelector selectedGenre={selectedGenre} onSelectGenre={handleGenreSelect} />
      </View>
      <View style={styles.trackListWrapper}>
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={
              // () => navigation.navigate('DetailedMusicPlayerScreen', { track: item })
              () => { }
            }>
              <Text style={styles.trackItem}>{item.name} - {item.artist_name}</Text>
            </TouchableOpacity>
          )}
          onEndReached={loadMoreTracks}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  profileButton: {
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
  topButtonsContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  smallButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    marginLeft: 10,
  },
  smallButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  searchBar: {
    marginTop: 20,
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    paddingLeft: 10,
    marginBottom: 10,
    width: '95%',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  trackItem: {
    fontSize: 16,
    color: 'black',
    marginVertical: 5,
  },
  recommendedWrapper: {
    marginTop: 10, // Adjusted to move right below the search bar
    paddingHorizontal: 10,
  },
  recommendedHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center', // Center the text
  },
  albumCover: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  genreWrapper: {
    marginTop: 10, // Adds space between recommended header and genre buttons
  },
  genreContainer: {
    paddingHorizontal: 0, // Remove padding from the container to manage it individually
  },
  genreContentContainer: {
    paddingHorizontal: 20, // Apply consistent padding on the content container
    alignItems: 'center',
  },
  genreButton: {
    backgroundColor: '#FF7F50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
  },
  selectedGenreButton: {
    backgroundColor: '#FF4500', // Different color for selected genre
  },
  selectedGenreText: {
    color: 'white',
    fontWeight: 'bold',
  },
  genreText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  trackListWrapper: {
    marginTop: 20,
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});