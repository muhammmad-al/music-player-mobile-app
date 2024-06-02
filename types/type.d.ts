// types.d.ts
export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  SignUp: undefined;
  Profile: undefined;
  MusicUpload: undefined;
  MusicPlayer: undefined;
  DetailedMusicPlayerScreen: {track: Track};
  EditProfile: {
    profileImage: string;
    setProfileImage: React.Dispatch<React.SetStateAction<string>>;
  };
};

  