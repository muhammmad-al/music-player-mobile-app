import { DiscoveryDocument, AuthRequestConfig } from 'expo-auth-session';

export const clientID: string = "35f17a7d95cf4e24b6803e6127a89a7b";
export const clientSecret: string = "848ae8994b6b49b69b34ec9d58774e35";
export const redirectURI: string = "exp://localhost:8081";

export const authDiscoveryDocument: DiscoveryDocument = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export const authRequestConfigs: AuthRequestConfig = {
    clientId: clientID,
    redirectUri: redirectURI,
    usePKCE: false,
    scopes: [
        "user-read-private",
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
    ]
};
