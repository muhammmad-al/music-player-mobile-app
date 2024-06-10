import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const allPlaylistsData = [
  { key: '1', title: 'Playlist 1' },
  { key: '2', title: 'Playlist 2' },
  // Add more playlists as needed
];

const AllPlaylists = () => {
  return (
    <LinearGradient
      colors={['#B0E0FE', '#5EB5F6', '#2A88E0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image source={require('@/assets/images/main_page_pic.png')} style={styles.image} />
        <Text style={styles.title}>All Playlists</Text>
      </View>
      <FlatList
        data={allPlaylistsData}
        ListEmptyComponent={<Text style={styles.emptyText}>Show all the playlists created by user that are stored in the database</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.playlistTitle}>{item.title}</Text>
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
  playlistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AllPlaylists;
