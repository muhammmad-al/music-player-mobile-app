import React, {createContext, useState, useEffect, useContext, ReactNode} from 'react';
import * as SecureStore from 'expo-secure-store';

interface TokenContextType{
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
}

interface TokenProviderProp{
    children: ReactNode;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<TokenProviderProp> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await SecureStore.getItemAsync('token');
            console.log('Loaded from secure storage', storedToken);
            setToken(storedToken);
        };

        loadToken();
    }, []);

    const logout = async () => {
        await SecureStore.deleteItemAsync('token');
        setToken(null);
        console.log('Token Cleared')
};
    const updateToken = (newToken: string | null) => {
        console.log('TokenProvider: setting token', newToken);
        setToken(newToken);
    }

    return (
        <TokenContext.Provider value={{token, setToken: updateToken, logout}}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = (): TokenContextType => {
    const context = useContext(TokenContext);
    if(!context){
        throw new Error('useToken must be used within a TokenProvider')
    }
    return context;
};
