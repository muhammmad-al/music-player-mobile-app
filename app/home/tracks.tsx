import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { UserProfileContext } from '@/contexts/UserProfile';
import { Playlist, Track, UserProfile, getTracks } from '@/backend';

const uploadedTracksData = [
    { key: '1', title: 'Track 1', artist: 'Artist 1' },
    { key: '2', title: 'Track 2', artist: 'Artist 2' },
    // Add more tracks as needed
];

export default function Tracks() {
    const userProfile = useContext(UserProfileContext) as UserProfile;
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        getTracks(userProfile.email)
            .then(res => setTracks(res))
            .catch(error => alert(error));
    }, []);

    return (
        <LinearGradient
            colors={['#000000', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View style={styles.header}>
                <Image source={require('@/assets/images/main_page_pic.png')} style={styles.image} />
                <Text style={styles.title}>Uploaded Tracks</Text>
            </View>
            <FlatList
                data={tracks}
                ListEmptyComponent={<Text style={styles.emptyText}>Show all the uploaded tracks by user that are stored in the database</Text>}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.songTitle}>{item.name}</Text>
                        <Text style={styles.artist}>{item.artist_name}</Text>
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
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50,
        color: '#FFFFFF',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#3498DB',
    },
    songTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    artist: {
        fontSize: 14,
        color: '#B0E0FE',
    },
});
