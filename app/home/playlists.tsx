import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Playlist, UserProfile, getPlaylists } from '@/backend';
import { UserProfileContext } from '@/contexts/UserProfile';

export default function Playlists() {
    const userProfile = useContext(UserProfileContext) as UserProfile;
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        getPlaylists(userProfile.email)
            .then(res => setPlaylists(res))
            .catch(error => alert(error));
    }, []);

    return (
        <LinearGradient
            colors={['#B0E0FE', '#5EB5F6', '#2A88E0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <ScrollView>
                <View style={styles.header}>
                    <Image source={require('@/assets/images/main_page_pic.png')} style={styles.image} />
                </View>
                {playlists.map((playlist, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.item}
                        >
                            <Text style={styles.playlistTitle}>{playlist.id}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
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
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 10,
        borderRadius: 10,
    },
    playlistTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
