import { UserProfile } from "@/backend";
import { UserProfileProvider } from "@/contexts/UserProfile";
import useUserProfile from "@/hooks/useUserProfile";
import { Stack } from "expo-router";
import { useState } from "react";

export default function HomeLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' options={{
                // TODO: remove back button
                headerBackButtonMenuEnabled: false,
                title: 'Sound Revive'
            }}
            />
            <Stack.Screen name='profile' options={{ title: 'Profile' }} />
            <Stack.Screen name='upload' options={{ title: 'Upload musics' }} />
            <Stack.Screen name='create-playlists' options={{ title: 'Create new playlists' }} />
            <Stack.Screen name='edit-profile' options={{ title: 'Edit your profile' }} />
            <Stack.Screen name='detailed-music' options={{ title: 'Detailed music' }} />
            <Stack.Screen name='playlists' options={{ title: 'Your playlists' }} />
        </Stack>
    );
}
