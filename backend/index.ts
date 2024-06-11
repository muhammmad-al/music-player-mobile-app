import {
    addDoc,
    collection, doc, getDoc, getDocs,
    query, setDoc, updateDoc, where
} from "firebase/firestore";
import { firestore, storage } from './setup'
import { UserProfile, Track, Playlist } from "./type";
import { DocumentPickerAsset } from "expo-document-picker";
import * as FileSystem from 'expo-file-system'
import * as Crypto from 'expo-crypto';
import { StringFormat, UploadResult, getBlob, ref, uploadBytes, uploadString } from 'firebase/storage';

export {
    UserProfile,
    Track,
    Playlist,
};

export async function authentication(email: string, password: string)
    : Promise<UserProfile> {
    try {
        const userDoc = doc(firestore, `/users/${email}`);
        const userSnapshot = await getDoc(userDoc);

        if (!userSnapshot.exists()) {
            throw new Error('Authentication failed');
        }

        const userProfile = userSnapshot.data() as UserProfile;
        if (userProfile.password !== password) {
            throw new Error('Authentication failed');
        }

        return userProfile;
    } catch (error) {
        throw error;
    }
}

export async function createUser(username: string, email: string, password: string)
    : Promise<boolean> {
    try {
        const userDoc = doc(firestore, `/users/${email}`);
        const userSnapshot = await getDoc(userDoc);

        // TODO: check if a user exists
        if (userSnapshot.exists()) {
            return false;
        }

        const userProfile: UserProfile = {
            username: username,
            email: email,
            password: password,
            pronoun: null,
            bio: null,
            phoneNumber: null,
            location: null,
            favorite: null,
        };

        await setDoc(userDoc, userProfile);
        return true;
    } catch (error) {
        throw error;
    }
}

export async function updateUserProfile(newProfile: UserProfile)
    : Promise<void> {
    try {
        const userDoc = doc(firestore, `/users/${newProfile.email}`);
        await updateDoc(userDoc, { ...newProfile });
    } catch (error) {
        throw error;
    }
}

export async function createPlaylist(
    userID: string,
    playlistName: string
): Promise<void> {
    try {
        const playlistDoc = doc(firestore,
            `/users/${userID}/playlists/${playlistName}`
        );
        const playlistSnapshot = await getDoc(playlistDoc);

        if (playlistSnapshot.exists()) {
            throw new Error(`A playlist with name ${playlistName} already exists`)
        }

        await setDoc(playlistDoc, {
            tracks: []
        });
    } catch (error) {
        throw error;
    }
}

export async function getPlaylists(userID: string): Promise<Playlist[]> {
    try {
        const playlistColl = collection(firestore,
            `/users/${userID}/playlists`
        );
        const playlistSnapshots = await getDocs(playlistColl);
        return playlistSnapshots.docs.map(doc => ({ id: doc.id }));
    } catch (error) {
        throw error;
    }
}

export async function uploadTrackFile(
    userID: string,
    trackFile: DocumentPickerAsset,
    trackName: string,
    artistName: string,
): Promise<void> {
    try {
        const trackFileContent = await FileSystem.readAsStringAsync(trackFile.uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        const trackID = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            trackFileContent,
        );

        const trackDoc = doc(firestore, `/users/${userID}/tracks/${trackID}`);
        const trackSnapshot = await getDoc(trackDoc);

        if (trackSnapshot.exists()) {
            throw new Error('Track already exists');
        }

        const response = await fetch(trackFile.uri);
        const blob = await response.blob();
        const trackStorageRef = ref(storage, `/audio/${trackID}`);
        const uploadResult: UploadResult = await uploadBytes(
            trackStorageRef,
            blob,
        );

        const track = {
            name: trackName,
            artist_name: artistName,
        };
        await setDoc(trackDoc, track);
    } catch (error) {
        throw error;
    }
}

export async function getTracks(userID: string)
    : Promise<Track[]> {
    try {
        const trackColl = collection(firestore,
            `/users/${userID}/tracks`
        );
        const trackSnapshots = await getDocs(trackColl);
        return trackSnapshots.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            artist_name: doc.data().artist_name,
        }));
    } catch (error) {
        throw error;
    }
}

export async function addTrackToPlaylist() {
    try {

    } catch (error) {
        throw error;
    }
}
