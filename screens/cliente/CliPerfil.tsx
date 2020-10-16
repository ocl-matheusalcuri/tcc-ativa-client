import * as React from 'react';
import { StyleSheet, TextInput, Image, TouchableOpacity, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


import AsyncStorage from '@react-native-community/async-storage';
import { Text, View } from '../../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import iconSet from '@expo/vector-icons/build/Fontisto';


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
      <View style={styles.container}>
      <Text style={styles.texto}>Seu perfil $Nome</Text>
      <Image style={styles.fotoperf} source={{uri: foto, cache:"reload"}} style={{width: 50, height: 50}}></Image>
      <TouchableOpacity style={styles.alterarfoto} /*onpress save*/><Text style={styles.textbt}>Alterar Foto</Text></TouchableOpacity>
      <TextInput style={styles.input1} placeholder="Nome" />
      <TextInput style={styles.input2} placeholder="Nascimento" />
      <TextInput style={styles.input3} placeholder="Email" />
      <TextInput style={styles.input4} placeholder="Celular" />
      <View style={styles.picker}>
      <RNPickerSelect
            placeholder={{label:"Selecione seu objetivo...",value:null,inputLabel:null}}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Emagrecer', value: 'Emagrecer' },
                { label: 'Ganhar massa', value: 'Ganhar massa' },
                { label: 'Físico', value: 'Físico' },]}/>
      </View>
      <View style={styles.picker2}>
      <RNPickerSelect
            placeholder={{label:"Selecione seu Preparo Físico...",value:null,inputLabel:null}}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Emagrecer', value: 'Emagrecer' },
                { label: 'Ganhar massa', value: 'Ganhar massa' },
                { label: 'Físico', value: 'Físico' },]}/>
      </View>
      <View style={styles.picker3}>
      <RNPickerSelect
            placeholder={{label:"Selecione seu nível de saúde...",value:null,inputLabel:null}}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Emagrecer', value: 'Emagrecer' },
                { label: 'Ganhar massa', value: 'Ganhar massa' },
                { label: 'Físico', value: 'Físico' },]}/>
      </View>
      <View style={styles.picker4}>
      <RNPickerSelect
            placeholder={{label:"Por quantas horas você pode treinar...",value:null,inputLabel:null}}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Emagrecer', value: 'Emagrecer' },
                { label: 'Ganhar massa', value: 'Ganhar massa' },
                { label: 'Físico', value: 'Físico' },]}/>
      </View>
      <TouchableOpacity style={styles.botao}  /*onpress save*/><Text style={styles.textbt}>Salvar alterações</Text></TouchableOpacity>
    </View>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'orange',
    justifyContent: "center",
  },
  fotoperf:{
    width:160,
    height:160,
    borderRadius:100,
    marginLeft:-200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  alterarfoto:  {
    marginLeft: -200,
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  opcao: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  input1: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    marginLeft: 180,
    marginBottom: 110,
    marginTop: -180
  },
  input2: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    marginLeft: 180,
    marginBottom: 100,
    marginTop: -100,
  },
  input3: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    marginLeft: 180,
    marginBottom: 100,
    marginTop: -90,
  },
  input4: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    marginLeft: 180,
    marginBottom: 100,
    marginTop: -90,
  },
   picker: {
    padding: 10,
    width: 270,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    color:'gray',
    marginBottom: -10,
    marginTop: -50,
    },
  picker2: {
      padding: 10,
      width: 270,
      backgroundColor: '#808080',
      fontSize: 16,
      fontWeight: 'bold',
      borderRadius: 3,
      alignSelf: 'center',
      marginTop: 25,
      color:'gray',
      marginBottom: -60
      },  
  picker3: {
    padding: 10,
    width: 270,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 75,
    color:'gray',
    marginBottom: -60
    },
  picker4: {
      padding: 10,
      width: 270,
      backgroundColor: '#808080',
      fontSize: 16,
      fontWeight: 'bold',
      borderRadius: 3,
      alignSelf: 'center',
      marginTop: 75,
      color:'gray',
      marginBottom: -60
      },
  texto: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 50,
    marginTop: -100,
    justifyContent: 'flex-end'
  },
  botao: {
    width: 300,
    height: 40,
    backgroundColor: '#FF8C00',
    marginTop: 180,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom:-100
  },  
  botao2: {
    width: 300,
    height: 40,
    backgroundColor: '#FF8C00',
    marginTop: 110,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: -50,
  }, 
    textbt: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  });