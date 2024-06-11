import React, { useContext, useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { UserProfile } from '@/backend';
import { UserProfileContext } from '@/contexts/UserProfile';

export default function Profile() {
    const [profileImage, setProfileImage] = useState('');
    const userProfile: UserProfile = useContext(UserProfileContext) as UserProfile;

    return (
        <ScrollView>
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
                        <Text style={styles.name}>{userProfile.username}</Text>
                        <Text style={styles.pronouns}>{userProfile.pronoun}</Text>
                        <Text style={styles.bio}>{userProfile.bio}</Text>
                    </View>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.stat}>{''} liked songs</Text>
                    <Text style={styles.stat}>{''} uploads</Text>
                </View>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => router.push('/home/edit-profile')}
                >
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
                <View style={styles.details}>
                    <Text style={styles.detailText}>Email: {userProfile.email}</Text>
                    <Text style={styles.detailText}>Phone Number: {userProfile.phoneNumber}</Text>
                    <Text style={styles.detailText}>Location: {userProfile.location}</Text>
                    <Text style={styles.detailText}>Favorite Genre: {userProfile.favorite}</Text>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => router.push('/home/playlists')}
                    >
                        <Text style={styles.actionButtonText}>Play Lists</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => router.push('/home/tracks')}
                    >
                        <Text style={styles.actionButtonText}>Uploaded Tracks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                    // onPress={() => navigation.navigate('LikedSongs')}
                    >
                        <Text style={styles.actionButtonText}>Liked Songs</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.replace('/')}
                        style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient >
        </ScrollView >
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
        marginBottom: 40,
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
