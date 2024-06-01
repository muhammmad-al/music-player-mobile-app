import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '@/types/type';

export default function ProfileScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [profileImage, setProfileImage] = useState('');

    const userName = 'John Doe';
    const userPronouns = 'He/Him';
    const userBio = 'Music enthusiast';
    const userFollowers = 120;
    const userUploads = 34;
    const userFollowing = 50;
    const userEmail = 'johndoe@example.com';
    const userPhoneNumber = '+1234567890';
    const userLocation = 'New York, USA';
    const userFavoriteGenre = 'Hip Hop';

    return (
        <LinearGradient
            colors={['#B0E0FE', '#5EB5F6', '#2A88E0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View style={styles.header}>
                <Image
                    source={{ uri: profileImage || 'https://via.placeholder.com/150' }}
                    style={styles.profilePicture}
                />
                <View style={styles.headerText}>
                    <Text style={styles.name}>{userName}</Text>
                    <Text style={styles.pronouns}>{userPronouns}</Text>
                    <Text style={styles.bio}>{userBio}</Text>
                </View>
            </View>
            <View style={styles.stats}>
                <Text style={styles.stat}>{userFollowers} followers</Text>
                <Text style={styles.stat}>{userUploads} uploads</Text>
                <Text style={styles.stat}>{userFollowing} following</Text>
            </View>
            <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => navigation.navigate('EditProfile', { profileImage, setProfileImage })}
            >
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={styles.details}>
                <Text style={styles.detailText}>Email: {userEmail}</Text>
                <Text style={styles.detailText}>Phone Number: {userPhoneNumber}</Text>
                <Text style={styles.detailText}>Location: {userLocation}</Text>
                <Text style={styles.detailText}>Favorite Genre: {userFavoriteGenre}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Play Lists</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Uploaded Tracks</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Likes and Comments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Followed Artists</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ccc',
    },
    headerText: {
        marginLeft: 30,
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    pronouns: {
        fontSize: 18,
    },
    bio: {
        fontSize: 16,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    stat: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: '#FF7F50',
        padding: 10,
        alignItems: 'center',
        marginBottom: 40, // Increase space between Edit Profile button and details section
    },
    editButtonText: {
        fontSize: 20,
        color: 'white', 
        fontWeight: 'bold',
    },
    details: {
        marginBottom: 30,
    },
    detailText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    actionButton: {
        backgroundColor: '#FF7F50',
        padding: 10,
        marginBottom: 50,
        alignItems: 'center',
        width: '48%',
    },
    actionButtonText: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
    },
});
