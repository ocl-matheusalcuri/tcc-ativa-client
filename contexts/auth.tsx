import React, { createContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import  * as auth from '../services/auth';
import api from '../services/api';

interface AuthContextData {
    signed: boolean;
    user: {name: string, email: string} | null;
    signIn(): Promise<void>;
    signOut(): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [loading, setLoading] = useState(true);
    
    const [user, setUser] = useState<{name: string, email: string} | null>(null);

    useEffect(() => {
        async function loadStorageData() {

        await new Promise((resolve) => setTimeout(resolve, 2000));

          // TODO: Try using multiget instead of 2 awaits
          const storageUser = await AsyncStorage.getItem('@reactNativeAuth:user');
          const storageToken = await AsyncStorage.getItem('@reactNativeAuth:token');
    
          if (storageUser && storageToken) {
            api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;
            setUser(JSON.parse(storageUser));
          }
          setLoading(false);
        }
        loadStorageData();
      });

    async function signIn() {
        const response = await auth.signIn();
    
        setUser(response.user);
    
        await AsyncStorage.setItem(
          '@reactNativeAuth:user',
          JSON.stringify(response.user),
        );
        await AsyncStorage.setItem('@reactNativeAuth:token', response.token);
        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;
      }

    async function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });

        api.defaults.headers['Authorization'] = undefined;
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        )
      }

    return (
        <AuthContext.Provider value={{signed: !!user, user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}