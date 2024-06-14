import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import axios from 'axios';
import { router } from 'expo-router';
import { Text, Appbar, Button, TextInput, Avatar, List } from 'react-native-paper';

const API_URL = 'https://api.jamendo.com/v3.0/tracks';
const CLIENT_ID = '6b05ee0e';
const FALLBACK_IMAGE_URL = 'https://path.to/your/fallback/image.png';

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
      {genres.map((genre, index) => (
        <Button
          key={index} // Using index as key for genres since it won't change
          mode={selectedGenre === genre ? 'contained' : 'outlined'}
          onPress={() => onSelectGenre(genre)}
          style={styles.genreButton}
          labelStyle={styles.genreButtonLabel}
        >
          {genre}
        </Button>
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
        ...response.data.results.map((track: any, index: number) => ({
          id: `${track.id}-${page}-${index}`, // Ensuring unique keys
          name: track.name,
          audio: track.audio,
          artist_name: track.artist_name,
          album_name: track.album_name,
          genre: genre,
          album_cover: track.album_image || FALLBACK_IMAGE_URL,
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
        album_cover: track.album_image || FALLBACK_IMAGE_URL,
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
      colors={['#000000', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="SoundRevive" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="account" onPress={() => router.push('/home/profile')} />
      </Appbar.Header>
      <TextInput
        mode="outlined"
        label="Search by genre, artist, or track name"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchBar}
        theme={{ colors: { text: '#ffffff', primary: '#3498DB', background: '#1a1a1a', placeholder: '#ffffff' }}}
      />
      <View style={styles.recommendedWrapper}>
        <Text style={styles.recommendedHeader}>Recommended Tracks</Text>
        <FlatList
          data={recommendedTracks}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push({
              pathname: 'home/detailed-music',
              params: { item: JSON.stringify(item) }
            })}>
              <Image source={{ uri: item.album_cover }} style={styles.albumCover} />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.genreWrapper}>
        <Text style={styles.recommendedHeader}>Jump Right In</Text>
        <GenreSelector selectedGenre={selectedGenre} onSelectGenre={handleGenreSelect} />
      </View>
      <View style={styles.trackListWrapper}>
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>
              router.push({
                pathname: 'home/detailed-music',
                params: { item: JSON.stringify(item) }
              })
            }>
              <List.Item
                title={item.name}
                description={item.artist_name}
                titleStyle={styles.trackTitle}
                descriptionStyle={styles.trackDescription}
                left={() => <Avatar.Image size={48} source={{ uri: item.album_cover }} />}
                style={styles.listItem}
              />
            </TouchableOpacity>
          )}
          onEndReached={loadMoreTracks}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" animating={true} color="#3498DB" /> : null}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: 'black',
  },
  headerTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  searchBar: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  recommendedWrapper: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  recommendedHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 10,
    textAlign: 'center',
  },
  albumCover: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  genreWrapper: {
    marginTop: 10,
  },
  genreContainer: {
    paddingHorizontal: 0,
  },
  genreContentContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  genreButton: {
    marginHorizontal: 5,
    borderColor: '#3498DB',
    borderWidth: 1,
  },
  genreButtonLabel: {
    color: '#ffffff',
  },
  selectedGenreButton: {
    marginHorizontal: 5,
    backgroundColor: '#3498DB',
  },
  selectedGenreButtonLabel: {
    color: '#ffffff',
  },
  trackListWrapper: {
    marginTop: 20,
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  listItem: {
    backgroundColor: '#1a1a1a',
    marginBottom: 5,
    borderRadius: 5,
  },
  trackTitle: {
    color: '#ffffff', // Track title color
    fontWeight: 'bold', // Bold font for the track title
  },
  trackDescription: {
    color: '#3498DB', // Artist/description color to match the primary color
  },
});
