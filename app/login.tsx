import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { TextInput, Button } from 'react-native-paper';
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
            colors={['#000000', '#000000']}
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
                    mode="contained"
                    onPress={loginHandler}
                    style={styles.button}
                    labelStyle={{ color: '#FFFFFF' }}
                >
                    Log In
                </Button>
            </View>
            <Text style={styles.accountText}>
                New user?{' '}
                <Text style={styles.signUpLink} onPress={() => router.replace('signup')}>
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
    signUpLink: {
        color: '#3498DB',
        fontWeight: 'bold',
    },
    button: {
        width: '100%',
        marginTop: 20,
        backgroundColor: '#3498DB',
    },
});
