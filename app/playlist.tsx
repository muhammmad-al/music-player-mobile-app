import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const playlistData = [
  { key: '1', title: 'Bataille-92BPM', artist: 'Beat scientists' },
];

const Playlist = () => {
  return (
    <LinearGradient
      colors={['#B0E0FE', '#5EB5F6', '#2A88E0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image source={require('@/assets/images/main_page_pic.png')} style={styles.image} />
        <View style={styles.headerText}>
          <Text style={styles.playlistName}>Playlist Name</Text>
        </View>
      </View>
      <Text style={styles.madeBy}>Made By UserName</Text>
      <FlatList
        data={playlistData}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 120,
    marginRight: 45,
    marginTop: 15, // Adjusted to move the image a little down
    marginLeft: 20, // Adjusted to move the image slightly to the right
  },
  headerText: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  playlistName: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  madeBy: {
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 7, // Adjusted to align with the image position
    marginTop: -10,
    marginBottom: 20, // Added margin to separate the made by text from the playlist items
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: '#666',
  },
});

export default Playlist;
