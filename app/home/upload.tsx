import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function MusicUploadScreen() {
    const [trackName, setTrackName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [trackFile, setTrackFile] = useState<any | null>(null);

    const pickTrack = async () => {
        let result: any = await DocumentPicker.getDocumentAsync({
            type: 'audio/*',
            copyToCacheDirectory: true,
            multiple: false,
        });

        if (result.type === 'success') {
            setTrackFile(result);
        } else {
            setTrackFile(null); // or handle the case where the user cancels the picker
        }
    };

    const handleUpload = () => {
        if (trackFile && trackFile.type === 'success') {
            console.log('Track Name:', trackName);
            console.log('Artist Name:', artistName);
            console.log('Track File URI:', trackFile.uri);
        }
    };

    return (
        <LinearGradient
            colors={['#B0E0FE', '#5EB5F6', '#2A88E0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <Image source={require('@/assets/images/main_page_pic.png')} style={styles.logo} />
            <Text style={styles.title}>Upload Your Music Here</Text>
            <TextInput
                style={styles.input}
                placeholder="Track Name"
                value={trackName}
                onChangeText={setTrackName}
            />
            <TextInput
                style={styles.input}
                placeholder="Artist Name"
                value={artistName}
                onChangeText={setArtistName}
            />
            <TouchableOpacity style={styles.button} onPress={pickTrack}>
                <Text style={styles.buttonText}>PICK A TRACK</Text>
            </TouchableOpacity>
            {trackFile && trackFile.type === 'success' && (
                <Text style={styles.fileName}>{trackFile.name}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleUpload}>
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
