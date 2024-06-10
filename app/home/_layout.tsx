import { Stack, Tabs } from "expo-router";


export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ title: 'Sound Revive' }} />
            <Stack.Screen name='profile' options={{ title: 'Profile' }} />
            <Stack.Screen name='upload' options={{ title: 'Upload musics' }} />
            <Stack.Screen name='create-playlists' options={{ title: 'Create new playlists' }} />
            <Stack.Screen name='edit-profile' options={{ title: 'Edit Profile' }} />
        </Stack>
    );
}