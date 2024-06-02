import React, {createContext, useState, useEffect, useContext, ReactNode} from 'react';
import * as SecureStore from 'expo-secure-store';

interface TokenContextType{
    token: string | null;
    setToken: (token: string | null) => void;
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
            setToken(storedToken);
        };

        loadToken();
    }, []);

    return (
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = (): TokenContextType => {
    const context = useContext(TokenContext);
    if(!context){
        throw new Error('nope')
    }
    return context;
};
