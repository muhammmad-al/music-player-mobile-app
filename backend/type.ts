export interface UserProfile {
    username: string;
    email: string;
    password: string;
    pronoun: string | null;
    bio: string | null;
    phoneNumber: string | null;
    location: string | null;
    favorite: string | null;
};

export interface Track {
    id: string;
    name: string;
    audio?: string;
    artist_name: string;
    album_name?: string;
    album_cover?: string;
};

export interface Playlist {
    id: string;
    // name: string;
};