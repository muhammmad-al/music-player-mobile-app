import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { TextInput, Button } from 'react-native-paper';
import { createUser } from '@/backend';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupHandler = async () => {
        try {
            await createUser(username, email, password);
            router.replace('login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LinearGradient
            colors={['#000000', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
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
                    mode="contained"
                    onPress={signupHandler}
                    style={styles.button}
                    labelStyle={{ color: '#FFFFFF' }}
                >
                    Sign Up
                </Button>
            </View>
            <Text style={styles.accountText}>
                Already have an account?{' '}
                <Text style={styles.logInLink} onPress={() => router.replace('login')}>
                    Log in here
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
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly transparent to match style
        borderRadius: 10,
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
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
    accountText: {
        marginTop: 20,
        fontSize: 16,
        color: 'white', // Ensure text color is white for better visibility
    },
    logInLink: {
        color: '#3498DB',
        fontWeight: 'bold',
    },
    button: {
        width: '100%',
        marginTop: 20,
        backgroundColor: '#3498DB',
    },
});
