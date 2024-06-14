import { UserProfileProvider } from '@/contexts/UserProfile';
import { Stack } from 'expo-router';

export default function WelcomeScreenLayout() {
    return (
        <UserProfileProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' options={{ title: 'Welcome' }} />
                <Stack.Screen name='login' options={{ title: 'Login' }} />
                <Stack.Screen name='signup' options={{ title: 'Signup' }} />
                <Stack.Screen name='home' options={{ headerShown: false }} />
            </Stack>
        </UserProfileProvider>
    );
}