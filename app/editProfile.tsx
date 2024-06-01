import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/type';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export default function EditProfileScreen({ route, navigation }: Props) {
    const { profileImage: initialProfileImage, setProfileImage } = route.params;
    const [profileImage, setLocalProfileImage] = useState(initialProfileImage);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setLocalProfileImage(uri);
            setProfileImage(uri);
        }
    };

    return (
        <LinearGradient
            colors={['#B0E0FE', '#5EB5F6', '#2A88E0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View style={styles.profilePictureContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.profilePicture}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <Text style={styles.uploadText}>Please upload your profile picture here</Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} placeholder="Enter your name" />

                <Text style={styles.label}>Username:</Text>
                <TextInput style={styles.input} placeholder="Enter your username" />

                <Text style={styles.label}>Pronoun:</Text>
                <TextInput style={styles.input} placeholder="Enter your pronoun" />

                <Text style={styles.label}>Bio:</Text>
                <TextInput style={styles.input} placeholder="Enter your bio" />

                <Text style={styles.label}>Phone Number:</Text>
                <TextInput style={styles.input} placeholder="Enter your phone number" />

                <Text style={styles.label}>Location:</Text>
                <TextInput style={styles.input} placeholder="Enter your location" />

                <Text style={styles.label}>Favorite Genre:</Text>
                <TextInput style={styles.input} placeholder="Enter your favorite genre" />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    uploadText: {
        textAlign: 'center',
        color: '#000',
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000',
    },
    input: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        color: '#000',
    },
});
