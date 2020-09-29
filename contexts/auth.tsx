import React, { createContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import  * as auth from '../services/auth';
import api from '../services/api';
import axios from "axios";
import { any } from 'sequelize/types/lib/operators';

interface AuthContextData {
    signed: boolean;
    user: {name: string, email: string, id: string} | null;
    type: string | undefined;
    signIn(email: string, password: string): Promise<void>;
    signOut(): Promise<void>;
}

interface Response {
  data: {
    token: string;
    user: {name: string, email: string, id: string};
    type: "aluno" | "personal";
  }
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [loading, setLoading] = useState(true);
    
    const [user, setUser] = useState<{name: string, email: string, id: string} | null>(null);
    const [type, setType] = useState<'aluno' | 'personal'>();

     useEffect(() => {
        async function loadStorageData() {

        await new Promise((resolve) => setTimeout(resolve, 2000));

          // TODO: Try using multiget instead of 2 awaits
          const storageUser = await AsyncStorage.getItem('@reactNativeAuth:user');
          const storageToken = await AsyncStorage.getItem('@reactNativeAuth:token');
          const storageType = await AsyncStorage.getItem('@reactNativeAuth:type');
          
          if (storageUser && storageToken && storageType) {
            api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;
            setUser(JSON.parse(storageUser));
            setType(JSON.parse(storageType));
          }
           setLoading(false);
        }
        loadStorageData();
       },[user]);

    async function signIn(email: string, password:string) {

        const response: Response = await axios.post("http://192.168.0.45:3001/api/login", {email, password} );
        setUser({...response.data.user});
        setType(response.data.type);
    
        await AsyncStorage.setItem(
          '@reactNativeAuth:user',
          JSON.stringify({...response.data.user}),
        );
        await AsyncStorage.setItem(
          '@reactNativeAuth:type',
          JSON.stringify(response.data.type),
        );
        await AsyncStorage.setItem('@reactNativeAuth:token', response.data.token);
        api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
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
        <AuthContext.Provider value={{signed: !!user, user, signIn, signOut, type}}>
            {children}
        </AuthContext.Provider>
    );
}