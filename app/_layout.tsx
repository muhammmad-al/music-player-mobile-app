import {Stack} from 'expo-router';


export default function LoginScreenLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name='index' />    
        </Stack>
    );
}