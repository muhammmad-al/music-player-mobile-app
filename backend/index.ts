import { initializeApp } from "firebase/app";
import { User } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, initializeFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA8hr1oOEwu4w4bMQwRTiQjNNwHJzZktkY",
    authDomain: "soundrevive-91d60.firebaseapp.com",
    projectId: "soundrevive-91d60",
    storageBucket: "soundrevive-91d60.appspot.com",
    messagingSenderId: "341252652672",
    appId: "1:341252652672:web:9f3c574e1ca02a59f97065"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface UserProfile {
    username: string;
    email: string;
    password: string;
    pronoun: string | null;
    bio: string | null;
    phoneNumber: string | null;
    location: string | null;
    favorite: string | null;
};

export const userProfile: UserProfile = <UserProfile>{};

export async function authentication(email: string, password: string)
    : Promise<boolean> {
    try {
        const userDoc = doc(db, `/users/${email}`);
        const userSnapshot = await getDoc(userDoc);

        // Email not exists
        if (!userSnapshot.exists()) {
            return false;
        }

        // Incorrect password
        const user = userSnapshot.data() as UserProfile;
        if (user.password !== password) {
            return false;
        }

        userProfile.username = user.username;
        userProfile.email = userSnapshot.id;
        userProfile.password = user.password;
        userProfile.pronoun = user.pronoun;
        userProfile.bio = user.bio;
        userProfile.phoneNumber = user.phoneNumber;
        userProfile.location = user.location;
        userProfile.favorite = user.favorite;

        return true;
    } catch (error) {
        throw error;
    }
}

export async function createUser(username: string, email: string, password: string)
    : Promise<boolean> {
    try {
        const userDoc = doc(db, `/users/${email}`);
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
        const userDoc = doc(db, `/users/${newProfile.email}`);
        await updateDoc(userDoc, { ...newProfile });
    } catch (error) {
        throw error;
    }
}
