import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import Slider from '@react-native-community/slider';
import { Track } from '@/backend';
import { router } from 'expo-router';

export default function DetailedMusic() {
    const track: Track = JSON.parse(useLocalSearchParams().item as string);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1.0);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const playSound = async () => {
        if (sound) {
            await sound.unloadAsync();
        }
        const { sound: newSound } = await Audio.Sound.createAsync({
            uri: track.audio as string
        });
        newSound.setVolumeAsync(volume);
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
    };

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    const handleVolumeChange = async (value: number) => {
        setVolume(value);
        if (sound) {
            await sound.setVolumeAsync(value);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Image source={{ uri: track.album_cover }} style={styles.albumCover} />
            <Text style={styles.trackTitle}>{track.name}</Text>
            <Text style={styles.artistName}>{track.artist_name}</Text>
            <View style={styles.controls}>
                <TouchableOpacity onPress={isPlaying ? pauseSound : playSound} style={styles.playButton}>
                    <Text style={styles.playButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
                </TouchableOpacity>
                <Slider
                    style={styles.volumeSlider}
                    value={volume}
                    onValueChange={handleVolumeChange}
                    minimumValue={0}
                    maximumValue={1}
                    thumbTintColor="#5EB5F6"
                    minimumTrackTintColor="#5EB5F6"
                    maximumTrackTintColor="#ffffff"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#000000',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        backgroundColor: '#5EB5F6',
    },
    backButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    albumCover: {
        width: 300,
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    trackTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    artistName: {
        fontSize: 18,
        color: '#3498DB',
        marginBottom: 20,
        marginTop: 20,
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5EB5F6',
        marginTop: 30,
    },
    playButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    volumeSlider: {
        width: 300,
        marginTop: 30,
    },
});
