import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image, Platform } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { Text, View } from '../../components/Themed';

import { AuthContext } from '../../contexts/auth';

import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

import api from '../../services/api';

import RNPickerSelect from 'react-native-picker-select';


//@ts-ignore
export default function CliPerfil({navigation}) {
  const { signOut, user, type } = React.useContext(AuthContext);

  const [foto, setFoto] = useState<any>(user?.temFoto ? `http://192.168.0.45:3001/${user?.id}.png?${Date.now()}` : `http://192.168.0.45:3001/default.png?${Date.now()}`);
  const [imgBase64, setImgBase64] = useState<any>();
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoNascimento, setNovoNascimento] = useState("");
  const [novoObjetivo, setNovoObjetivo] = useState("Emagrecer");
  const [novoPrepFisico, setNovoPrepFisico] = useState("Sedentário");
  const [novoSaude, setNovoSaude] = useState("Péssima");
  const [novoHrAtiva, setNovoHrAtiva] = useState("Não pratico nenhuma atividade");

  const objetivoOpt = [
    {label: "Emagrecer", value: "Emagrecer"},
    {label: "Fortalecer", value: "Fortalecer"},
    {label: "Ganhar massa", value: "Ganhar massa"}
  ];

  const hrAtivaOpt = [
    {label: "Não pratico nenhuma atividade", value: "Não pratico nenhuma atividade"},
    {label: "Até 5 horas", value: "Até 5 horas"},
    {label: "Até 10 horas", value: "Até 10 horas"},
    {label: "Até 15 horas", value: "Até 15 horas"},
    {label: "Mais de 15 horas", value: "Mais de 15 horas"},
  ];

  const prepFisicoOpt = [
    {label: "Sedentário", value: "Sedentário"},
    {label: "Levemente sedentário", value: "Levemente sedentário"},
    {label: "Regular", value: "Regular"},
    {label: "Atlético", value: "Atlético"},
  ];

  const saudeOpt = [
    {label: "Péssima", value: "Péssima"},
    {label: "Regular", value: "Regular"},
    {label: "Boa", value: "Boa"},
    {label: "Ótima", value: "Ótima"}
  ]





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
              <View style={{...styles.bg, ...styles.conjuntoInput}}>
                <View  style={{...styles.bg, ...styles.foto}}>
                <Image source={{uri: foto, cache:"reload"}} style={{width: 100, height: 100}}/>
                <TouchableOpacity onPress={handleProfileImage}><Text>Selecionar foto</Text></TouchableOpacity>
                </View>

                <View  style={{...styles.bg}}>
                <TextInput style={{...styles.input}} placeholder={user?.nome} onChangeText={nome => setNovoNome(nome)}/>
                <TextInput style={{...styles.input}} placeholder={user?.email} onChangeText={email => setNovoEmail(email)}/>
                <TextInput style={{...styles.input}} placeholder={user?.nascimento} onChangeText={nascimento => setNovoNascimento(nascimento)}/>
                </View>
              </View>

              <Text style={{marginTop: 40}}>Objetivo</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={novoObjetivo}
                  onValueChange={(value) => setNovoObjetivo(value)}
                  items={objetivoOpt}
                />
              </View>

              <Text>Preparo físico</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={novoPrepFisico}
                  onValueChange={(value) => setNovoPrepFisico(value)}
                  items={prepFisicoOpt}
                />
              </View>

              <Text>Saúde</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={novoSaude}
                  onValueChange={(value) => setNovoSaude(value)}
                  items={saudeOpt}
                />
              </View>

              <Text>Horas ativas por semana</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={novoHrAtiva}
                  onValueChange={(value) => setNovoHrAtiva(value)}
                  items={hrAtivaOpt}
                />
              </View>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={salvarFoto}><Text>Salvar</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleSignOut}><Text>Sair</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#CC8400'
  },
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  foto: {
    alignItems: "center",
  },
  conjuntoInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  picker: {
    width: 290, 
    height: 30, 
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    color: "#000",
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
    padding: 0,
    width: 160,
    paddingHorizontal: 10,
    marginVertical: 20,
    marginRight: 20
  },
  btnCadastro: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    marginVertical: 10
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