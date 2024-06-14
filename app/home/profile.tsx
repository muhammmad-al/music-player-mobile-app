import React, { useContext, useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { UserProfile } from '@/backend';
import { UserProfileContext } from '@/contexts/UserProfile';

export default function Profile() {
    const [profileImage, setProfileImage] = useState('');
    const userProfile: UserProfile = useContext(UserProfileContext) as UserProfile;
    const screenHeight = Dimensions.get('window').height;

    return (
        <ScrollView contentContainerStyle={[styles.scrollContainer, { minHeight: screenHeight }]}>
            <LinearGradient
                colors={['#000000', '#000000']}
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
                        <Text style={styles.subText}>{userProfile.pronoun}</Text>
                        <Text style={styles.subText}>{userProfile.bio}</Text>
                    </View>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailText}>Email: {userProfile.email}</Text>
                    <Text style={styles.detailText}>Phone: {userProfile.phoneNumber}</Text>
                    <Text style={styles.detailText}>Location: {userProfile.location}</Text>
                    <Text style={styles.detailText}>Favorite Genre: {userProfile.favorite}</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.stat}>Liked songs</Text>
                    <Text style={styles.stat}>Uploads</Text>
                </View>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => router.push('/home/edit-profile')}
                >
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
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
                    >
                        <Text style={styles.actionButtonText}>Liked Songs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.replace('/')}
                        style={styles.actionButton}
                    >
                        <Text style={styles.actionButtonText}>Logout</Text>
                    </TouchableOpacity>
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
        paddingVertical: 40, // Increased vertical padding to move everything down
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ccc',
    },
    headerText: {
        flex: 1,
        marginLeft: 20,
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
        marginTop: 30,
    },
    subText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 10,
        marginTop: 10,
    },
    details: {
        marginBottom: 20,
    },
    detailText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        marginTop: 10,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    stat: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    editButton: {
        backgroundColor: '#3498DB', // Updated button color
        padding: 12,
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 25,
        marginTop: 10,
    },
    editButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: '#3498DB', // Updated button color
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        width: '48%',
        borderRadius: 25,
        marginTop: 30,
    },
    actionButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
