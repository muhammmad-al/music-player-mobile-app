import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import { UserProfileContext } from '@/contexts/UserProfile';
import { UserProfile, createPlaylist } from '@/backend';

const playlistData = [
    { key: '1', title: 'Bataille-92BPM', artist: 'Beat scientists' },
];

export default function CreatePlaylists() {
    const [playlistName, setPlaylistName] = useState('');
    const userProfile = useContext(UserProfileContext) as UserProfile;

    const createPlaylistHandler = async () => {
        try {
            await createPlaylist(userProfile.email, playlistName);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <LinearGradient
            colors={['#B0E0FE', '#5EB5F6', '#2A88E0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <Image
                source={require('@/assets/images/main_page_pic.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Create a playlist</Text>
            <TextInput
                style={styles.input}
                placeholder="Playlist name"
                value={playlistName}
                onChangeText={setPlaylistName}
            />
            <TouchableOpacity style={styles.button} onPress={createPlaylistHandler}>
                <Text style={styles.buttonText}>CREATE</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        color: 'black',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#FF7F50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
    fileName: {
        marginTop: 10,
        fontSize: 16,
        color: 'black',
    },
});