import { UserProfile } from "@/backend";
import { UserProfileProvider } from "@/contexts/UserProfile";
import useUserProfile from "@/hooks/useUserProfile";
import { Stack, Tabs } from "expo-router";
import { useState } from "react";


export default function HomeLayout() {
    return (
        <UserProfileProvider>
            <Stack>
                <Stack.Screen name='index' options={{ title: 'Sound Revive' }} />
                <Stack.Screen name='profile' options={{ title: 'Profile' }} />
                <Stack.Screen name='upload' options={{ title: 'Upload musics' }} />
                <Stack.Screen name='create-playlists' options={{ title: 'Create new playlists' }} />
                <Stack.Screen name='edit-profile' options={{ title: 'Edit your profile' }} />
            </Stack>
        </UserProfileProvider>
    );
}