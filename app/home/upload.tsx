import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { UserProfile, uploadTrackFile } from '@/backend';
import { UserProfileContext } from '@/contexts/UserProfile';

export default function MusicUpload() {
    const userProfile = useContext(UserProfileContext) as UserProfile;

    const [trackName, setTrackName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [trackFile, setTrackFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

    const pickTrack = async () => {
        let result: DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync({
            type: 'audio/*',
            copyToCacheDirectory: true,
            multiple: false,
        });

        if (result.assets) {
            setTrackFile(result.assets[0]);
        } else {
            setTrackFile(null); // or handle the case where the user cancels the picker
        }
    };

    const handleUpload = async () => {
        if (!trackFile) {
            return;
        }

        try {
            await uploadTrackFile(
                userProfile.email,
                trackFile,
                trackName,
                artistName,
            );
        } catch (error) {
            alert(error);
        }
    };

    return (
        <LinearGradient
            colors={['#000000', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <Image source={require('@/assets/images/main_page_pic.png')} style={styles.logo} />
            <Text style={styles.title}>Upload Your Music Here</Text>
            <TextInput
                style={styles.input}
                placeholder="Track Name"
                placeholderTextColor="#888"
                value={trackName}
                onChangeText={setTrackName}
            />
            <TextInput
                style={styles.input}
                placeholder="Artist Name"
                placeholderTextColor="#888"
                value={artistName}
                onChangeText={setArtistName}
            />
            <TouchableOpacity style={styles.button} onPress={pickTrack}>
                <Text style={styles.buttonText}>PICK A TRACK</Text>
            </TouchableOpacity>
            {trackFile && (
                <Text style={styles.fileName}>{trackFile.name}</Text>
            )}
            <TouchableOpacity
                style={styles.button}
                onPress={handleUpload}
            >
                <Text style={styles.buttonText}>UPLOAD</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        color: '#FFFFFF',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#3498DB',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        backgroundColor: '#333333',
        color: '#FFFFFF',
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#3498DB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    fileName: {
        marginTop: 10,
        fontSize: 16,
        color: '#FFFFFF',
    },
});
