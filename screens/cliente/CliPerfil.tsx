import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image, Platform, ScrollView, Clipboard, Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { Text, View } from '../../components/Themed';

import { styles } from '../styles';


import { AuthContext } from '../../contexts/auth';
import { TextInputMask } from 'react-native-masked-text';

import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

import api from '../../services/api';

import RNPickerSelect from 'react-native-picker-select';

import { SERVER_URL } from '../../url'
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();


//@ts-ignore
export default function CliPerfil({navigation}) {
  const { signOut, user, type, refreshUser } = React.useContext(AuthContext);

  const [foto, setFoto] = useState<any>(user?.fotoUrl != "" ? user?.fotoUrl : `https://uploadofototcc.s3.sa-east-1.amazonaws.com/default.png`);
  const [imgBase64, setImgBase64] = useState<any>();
  const [novoNome, setNovoNome] = useState(user?.nome);
  const [novoEmail, setNovoEmail] = useState(user?.email);
  const [novoNascimento, setNovoNascimento] = useState("");
  const [novoObjetivo, setNovoObjetivo] = useState(user?.objetivo);
  const [novoPrepFisico, setNovoPrepFisico] = useState(user?.prepFisico);
  const [novoSaude, setNovoSaude] = useState(user?.saude);
  const [novoHrAtiva, setNovoHrAtiva] = useState(user?.hrAtiva);
  const [status, setStatus] = useState("");


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

  function salvarFoto(base64: any) {
    api.post(`${SERVER_URL}/upload`, {
      body: {
        //@ts-ignore
        base64: base64,
        userId: user?._id,
        type
      },
    }).then(async (response) => {
      setFoto(response.data.url);
      refreshUser(user?._id).then(() => {
        setStatus("")
        Alert.alert("Foto de perfil atualizada com sucesso!")
      });
    }) 
}

async function handleProfileImage() {
  let image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    base64: true,
  });
    //@ts-ignore
    setImgBase64(image.base64)
    setStatus("Atualizando foto, aguarde...")
    //@ts-ignore
    await salvarFoto(image.base64);
}




function atualizaPerfil() {
  setStatus("");
  api.put(`${SERVER_URL}/api/alunoModel/editarPerfil`, {
    body: {
      alunoId: user?._id, 
      nome: novoNome, 
      email: novoEmail, 
      nascimento: novoNascimento != "" ? novoNascimento: user?.nascimento, 
      hrAtiva: novoHrAtiva, 
      saude: novoSaude, 
      prepFisico: novoPrepFisico, 
      objetivo: novoObjetivo
    }
  }).then(async response => {
    refreshUser(user?._id).then(() => Alert.alert("Perfil atualizado com sucesso!"));
    
  })
}



    return (
      <ScrollView>
        <View style={{...styles.container, ...styles.bg}}>
            <View style={styles.bg}>
            {!!status && <Text style={{...styles.sucesso}}>{status}</Text>}
              <View style={{...styles.bg, ...styles.conjuntoInput}}>
                <View  style={{...styles.bg, ...styles.foto}}>
                  <Image source={{uri: foto, cache:"reload"}} style={{width: 100, height: 100, borderRadius: 400/ 2}}/>
                  <View style={{...styles.bg, ...styles.conjuntoInput}}>
                    <TouchableOpacity style={{padding: 15}} onPress={handleProfileImage}><Icon name="camera-alt" size={20} color="white" /></TouchableOpacity>
                  </View>
                </View>

                <View  style={{...styles.bg}}>
                <TextInput autoCapitalize="words" style={{...styles.input}} placeholder={user?.nome} onChangeText={nome => setNovoNome(nome)}/>
                <TextInput autoCapitalize="none" style={{...styles.input}} placeholder={user?.email} onChangeText={email => setNovoEmail(email)}/>
                <TextInputMask 
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY'
                  }} 
                  style={{...styles.input}} 
                  value={novoNascimento} 
                  placeholder={user?.nascimento} 
                  onChangeText={nascimento => setNovoNascimento(nascimento)}/>
                </View>
              </View>

              <TouchableOpacity style={{...styles.btnToken}} onPress={() => Clipboard.setString(user?.token)}>
                <Text style={{...styles.btnText}}>Clique aqui para copiar seu token de registro</Text>
              </TouchableOpacity>

              <Text style={{...styles.btnText, marginTop: 40}}>Objetivo</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={novoObjetivo}
                  onValueChange={(value) => setNovoObjetivo(value)}
                  items={objetivoOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Preparo físico</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={novoPrepFisico}
                  onValueChange={(value) => setNovoPrepFisico(value)}
                  items={prepFisicoOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Saúde</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={novoSaude}
                  onValueChange={(value) => setNovoSaude(value)}
                  items={saudeOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Horas ativas por semana</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={novoHrAtiva}
                  onValueChange={(value) => setNovoHrAtiva(value)}
                  items={hrAtivaOpt}
                />
              </View>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={atualizaPerfil}><Text style={{...styles.btnText}}>Salvar informações do perfil</Text></TouchableOpacity>
              <TouchableOpacity style={{...styles.btnSair}} onPress={handleSignOut}><Text style={{...styles.btnText}}>Sair</Text></TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    )
}

// const styles = StyleSheet.create({
//   bg: {
//     backgroundColor: '#CC8400'
//   },
//   container: {
//     padding: 20,
//     flex: 1,
//     alignItems: 'center',
//   },
//   foto: {
//     alignItems: "center",
//   },
//   conjuntoInput: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   picker: {
//     width: 290, 
//     height: 30, 
//     borderWidth: 1,
//     borderColor: "gray",
//     marginRight: 10,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     color: "#000",
//     marginVertical: 10
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "gray",
//     backgroundColor: "#fff",
//     padding: 0,
//     width: 160,
//     paddingHorizontal: 10,
//     marginVertical: 20,
//     marginRight: 20
//   },
//   btnCadastro: {
//     backgroundColor: "blue",
//     padding: 10,
//     alignItems: "center",
//     marginVertical: 10
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
//   });