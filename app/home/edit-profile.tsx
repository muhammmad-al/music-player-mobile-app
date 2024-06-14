import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { UserProfile, updateUserProfile } from '@/backend';
import { UserProfileContext, SetUserProfileContext } from '@/contexts/UserProfile';
import { router } from 'expo-router';

export default function EditProfileScreen() {
    const userProfile = useContext(UserProfileContext) as UserProfile;
    const setUserProfile = useContext(SetUserProfileContext);
    const [name, setName] = useState<string>(userProfile.username);
    const [pronoun, setPronoun] = useState<string>(userProfile.pronoun || '');
    const [bio, setBio] = useState<string>(userProfile.bio || '');
    const [location, setLocation] = useState<string>(userProfile.location || '');
    const [phoneNumber, setPhoneNumber] = useState<string>(userProfile.phoneNumber || '');
    const [favorite, setFavorite] = useState<string>(userProfile.favorite || '');
    const screenHeight = Dimensions.get('window').height;

    const saveHandler = async () => {
        const newProfile: UserProfile = {
            email: userProfile.email,
            password: userProfile.password,
            username: name,
            pronoun: pronoun,
            bio: bio,
            location: location,
            phoneNumber: phoneNumber,
            favorite: favorite,
        };

        setUserProfile(newProfile);
        await updateUserProfile(newProfile);
        router.back();
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            // setLocalProfileImage(uri);
            // setProfileImage(uri);
        }
    };

    return (
        <ScrollView contentContainerStyle={[styles.scrollContainer, { minHeight: screenHeight }]}>
            <LinearGradient
                colors={['#000000', '#000000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.container}
            >
                <View style={styles.profilePictureContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        <View style={styles.profilePicture}>
                            {/* {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                            ) : (
                                <Text style={styles.uploadText}>Please upload your profile picture here</Text>
                            )} */}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        value={name}
                        style={styles.input}
                        onChangeText={(text) => {
                            setName(text);
                        }}
                    />

                    <Text style={styles.label}>Pronoun:</Text>
                    <TextInput
                        value={pronoun}
                        style={styles.input}
                        onChangeText={(text) => {
                            setPronoun(text);
                        }}
                    />

                    <Text style={styles.label}>Bio:</Text>
                    <TextInput
                        value={bio}
                        style={styles.input}
                        onChangeText={(text) => {
                            setBio(text);
                        }}
                    />

                    <Text style={styles.label}>Phone Number:</Text>
                    <TextInput
                        value={phoneNumber}
                        style={styles.input}
                        onChangeText={(text) => {
                            setPhoneNumber(text);
                        }}
                    />

                    <Text style={styles.label}>Location:</Text>
                    <TextInput
                        value={location}
                        style={styles.input}
                        onChangeText={(text) => {
                            setLocation(text);
                        }}
                    />

                    <Text style={styles.label}>Favorite Genre:</Text>
                    <TextInput
                        value={favorite}
                        style={styles.input}
                        onChangeText={(text) => {
                            setFavorite(text);
                        }}
                    />
                </View>
                <View style={styles.saveButtonWrapper}>
                    <View style={styles.saveButton}>
                        <TouchableOpacity
                            onPress={saveHandler}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    saveButtonWrapper: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    saveButton: {
        backgroundColor: '#3498DB',
        height: 50,
        width: 100,
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 50,
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFFFFF',
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
        color: '#000000',
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FFFFFF',
    },
    input: {
        height: 40,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#000000',
        color: '#FFFFFF',
    },
});
