import React, {Component} from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';


interface AppState{
    loading: boolean;
    token: string | null;
}
export default class AuthLoadingScreen extends Component<{}, AppState> {
    constructor(props: {}){
        super(props);
        this.state = {loading: true, token: null};
    }

    componentWillMount(){
        setTimeout(() => {this.checkForToken();}, 2000);
    }

    async checkForToken(){
        let token = await SecureStore.getItemAsync('token');
        console.log(token);
        this.setState({
            token: token,
            loading: false
        })
    }

    async saveTokenToSecureStorage(token: string){
        SecureStore.setItemAsync("token", token);
        this.setState({
            token: token
        })
    }

    render(){
        const {loading, token} = this.state;

        if(loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Loading...</Text>
                </View>
            )
        }

        return(
            <View style={styles.container}>
                <Text>Token: {token}</Text>
                <Button
                title="Save New Token"
                onPress={() => this.saveTokenToSecureStorage('new_token_value')}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})