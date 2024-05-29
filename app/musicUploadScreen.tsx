import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function MusicUploadScreen() {
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [trackFile, setTrackFile] = useState<any | null>(null);

  const pickTrack = async () => {
    let result: any = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.type === 'success') {
      setTrackFile(result);
    } else {
      setTrackFile(null); // or handle the case where the user cancels the picker
    }
  };

  const handleUpload = () => {
    if (trackFile && trackFile.type === 'success') {
      console.log('Track Name:', trackName);
      console.log('Artist Name:', artistName);
      console.log('Track File URI:', trackFile.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Music</Text>
      <TextInput
        style={styles.input}
        placeholder="Track Name"
        value={trackName}
        onChangeText={setTrackName}
      />
      <TextInput
        style={styles.input}
        placeholder="Artist Name"
        value={artistName}
        onChangeText={setArtistName}
      />
      <Button title="Pick a Track" onPress={pickTrack} color="#1E90FF" />
      {trackFile && trackFile.type === 'success' && (
        <Text style={styles.fileName}>{trackFile.name}</Text>
      )}
      <Button title="Upload" onPress={handleUpload} color="#1E90FF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A1CEDC',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
});