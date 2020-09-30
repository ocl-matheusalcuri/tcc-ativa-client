import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image, Platform } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { Text, View } from '../../components/Themed';

import { AuthContext } from '../../contexts/auth';

import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

import api from '../../services/api';

//@ts-ignore
export default function CliPerfil({navigation}) {
  const { signOut, user, type } = React.useContext(AuthContext);

  const [foto, setFoto] = useState<any>(user?.temFoto ? `http://192.168.0.45:3001/${user?.id}.png?${Date.now()}` : `http://192.168.0.45:3001/default.png?${Date.now()}`);
  const [imgBase64, setImgBase64] = useState<any>();

  async function handleSignOut() {
    await signOut();
  }

async function handleProfileImage() {
  let image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    base64: true,
  });

  //@ts-ignore
    Platform.OS !== 'web' ? setImgBase64(image.base64) : setImgBase64(image.uri.split(',')[1]);
}

function salvarFoto() {
    api.post('http://192.168.0.45:3001/upload', {
      body: {
        //@ts-ignore
        imgsource: imgBase64,
        userId: user?.id,
        type
      },
    }).then(response => {
      setFoto(response.data.url);
    }) 
}



    return (
        <View style={{...styles.container, ...styles.bg}}>
            <View style={styles.bg}>
              <Text>perfil: {user?.email}</Text>
              <Image source={{uri: foto, cache:"reload"}} style={{width: 50, height: 50}}/>
              <TouchableOpacity onPress={handleProfileImage}><Text>Selecionar foto</Text></TouchableOpacity>
              <TouchableOpacity onPress={salvarFoto}><Text>Salvar</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleSignOut}><Text>Sair</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      alignItems: 'center',
    },
    bg: {
      backgroundColor: '#808080'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });