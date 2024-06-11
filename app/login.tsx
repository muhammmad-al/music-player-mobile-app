import React, { useContext, useState } from 'react';
import {
    StyleSheet, View, TextInput, Button, Text, TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useRouter } from 'expo-router';
import { UserProfile, authentication } from '@/backend';
import { SetUserProfileContext } from '@/contexts/UserProfile';

export default function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const setUserProfile = useContext(SetUserProfileContext);

    const loginHandler = async () => {
        try {
            const userProfile: UserProfile = await authentication(email, password);
            setUserProfile(userProfile);
            router.replace('/home');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <LinearGradient
            colors={['#B0E0FE', '#5EB5F6', '#2A88E0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Log In</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button
                    title="Log In"
                    onPress={async () => await loginHandler()}
                    color="#1E90FF"
                />
            </View>
            <Text style={styles.newUserText}>
                New user?
                <Text
                    style={styles.signUpLink}
                    onPress={() => router.replace('signup')}
                >
                    Sign up here
                </Text>
            </Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'black',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    newUserText: {
        marginTop: 20,
        fontSize: 16,
        color: 'black',
    },
    signUpLink: {
        color: 'white',
        fontWeight: 'bold',
    },
});
