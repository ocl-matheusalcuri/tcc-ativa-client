import React, { createContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

import { SERVER_URL } from '../url';

interface AuthContextData {
    signed: boolean;
    user: any;
    type: string | undefined;
    signIn(email: string, password: string): Promise<void>;
    signUp(user: any, type: "aluno" | "personal"): Promise<void>;
    signOut(): Promise<void>;
    refreshUser(alunoId: string): Promise<void>;
}

interface Response {
  data: {
    token: string;
    user: any;
    type: "aluno" | "personal";
  }
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [loading, setLoading] = useState(true);
    
    const [user, setUser] = useState<any>(null);
    const [type, setType] = useState<'aluno' | 'personal'>();

    async function loadStorageData() {


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

     useEffect(() => {
        loadStorageData();
       },[user?._id]);


    async function signUp(user: any, type: "aluno" | "personal") {
      const url = type === "aluno" ? `${SERVER_URL}/api/aluno` : `${SERVER_URL}/api/personal`
      api.post(url, {user}).then(response  => {
      })
    }

    async function signIn(email: string, password:string) {
        const response: Response = await api.post(`${SERVER_URL}/api/login`, {email, password} );
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

      async function refreshUser(userId: string) {
        api.get(`${SERVER_URL}/api/${type === "aluno" ? 'alunoModel' : 'personalModel'}/getById`, {
          params: {
            userId: userId
          }
        }).then(async response => {
          setUser({...response.data._doc, type: response.data.type});

          await AsyncStorage.setItem(
            '@reactNativeAuth:user',
            JSON.stringify({...response.data._doc, type: response.data.type}),
          );
        })
      }

    async function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
            setType(undefined);
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
        <AuthContext.Provider value={{signed: !!user, user, signIn, signOut, signUp, type, refreshUser}}>
            {children}
        </AuthContext.Provider>
    );
}