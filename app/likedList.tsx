import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const likedSongsData = [
  { key: '1', title: 'Song 1', artist: 'Artist 1' },
  { key: '2', title: 'Song 2', artist: 'Artist 2' },
  // Add more songs as needed
];

const LikedSongs = () => {
  return (
    <LinearGradient
      colors={['#B0E0FE', '#5EB5F6', '#2A88E0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image source={require('@/assets/images/main_page_pic.png')} style={styles.image} />
        <Text style={styles.title}>Liked Songs</Text>
      </View>
      <FlatList
        data={likedSongsData}
        ListEmptyComponent={<Text style={styles.emptyText}>Show all the liked songs by user that are stored in the database</Text>}
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
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#333',
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

export default LikedSongs;
