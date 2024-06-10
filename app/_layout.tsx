import { Stack } from 'expo-router';

export default function WelcomeScreenLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            {/* <Stack.Screen name='(tabs)' /> */}
            <Stack.Screen name='index' options={{ title: 'Welcome' }} />
            <Stack.Screen name='login' options={{ title: 'Login' }} />
            <Stack.Screen name='signup' options={{ title: 'Signup' }} />
            <Stack.Screen name='home' options = {{headerShown: false}} />
        </Stack>
    );
}