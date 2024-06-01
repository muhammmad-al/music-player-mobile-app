// types.d.ts
export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  SignUp: undefined;
  Profile: undefined;
  MusicUpload: undefined;
  MusicPlayer: undefined;
  EditProfile: {
    profileImage: string;
    setProfileImage: React.Dispatch<React.SetStateAction<string>>;
  };
};

  