import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

import { Text, View } from '../../components/Themed';

import { AuthContext } from '../../contexts/auth';

import RNPickerSelect from 'react-native-picker-select';

import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

import api from '../../services/api';
import { ScrollView } from 'react-native-gesture-handler';



export default function ProfPerfil() {

  const { signOut, user, type } = React.useContext(AuthContext);

  const [foto, setFoto] = useState<any>(user?.temFoto ? `http://192.168.0.45:3001/${user?.id}.png?${Date.now()}` : `http://192.168.0.45:3001/default.png?${Date.now()}`);
  const [imgBase64, setImgBase64] = useState<any>();

  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoNascimento, setNovoNascimento] = useState("");
  const [novoCelular, setNovoCelular] = useState("");
  const [novoFacebook, setNovoFacebook] = useState("");
  const [novoInstagram, setNovoInstagram] = useState("");

  const [especialidade, setEspecialidade] = useState(user?.especializacao);
  const [faixaEtaria, setFaixaEtaria] = useState(user?.faixaEtaria);
  const [foco, setFoco] = useState(user?.foco);


  const especialidadeOpt = [
    {label: "Ginástica", value: "Ginástica"},
    {label: "Natação", value: "Natação"},
    {label: "Dança", value: "Dança"},
    {label: "Hiit", value: "Hiit"},
    {label: "Academia", value: "Academia"}
  ];

  const faixaEtariaOpt = [
    {label: "Idosos", value: "Idosos"},
    {label: "Crianças", value: "Crianças"},
    {label: "Adulto", value: "Adulto"},
    {label: "Bebês", value: "Bebês"},
  ];

  const focoOpt = [
    {label: "Fortalecimento", value: "Fortalecimento"},
    {label: "Emagrecimento", value: "Emagrecimento"},
    {label: "Ganho de massa muscular", value: "Ganho de massa muscular"},
    {label: "Recuperação", value: "Recuperação"},
  ];

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
      <ScrollView>
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

        <TextInput style={{...styles.inputIsolado}} placeholder={user?.celular} onChangeText={celular => setNovoCelular(celular)}/>
        <TextInput style={{...styles.inputIsolado}} placeholder={user?.facebook} onChangeText={facebook => setNovoFacebook(facebook)}/>
        <TextInput style={{...styles.inputIsolado}} placeholder={user?.instagram} onChangeText={instagram => setNovoInstagram(instagram)}/>


        <Text style={{marginTop: 20}}>Objetivo</Text>
        <View style={{...styles.bg, ...styles.picker}}>
          <RNPickerSelect
            value={especialidade}
            onValueChange={(value) => setEspecialidade(value)}
            items={especialidadeOpt}
          />
        </View>

        <Text>Preparo físico</Text>
        <View style={{...styles.bg, ...styles.picker}}>
          <RNPickerSelect
            value={faixaEtaria}
            onValueChange={(value) => setFaixaEtaria(value)}
            items={faixaEtariaOpt}
          />
        </View>

        <Text>Saúde</Text>
        <View style={{...styles.bg, ...styles.picker}}>
          <RNPickerSelect
            value={foco}
            onValueChange={(value) => setFoco(value)}
            items={focoOpt}
          />
        </View>

        <TouchableOpacity style={{...styles.btnCadastro}} onPress={salvarFoto}><Text>Salvar</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut}><Text>Sair</Text></TouchableOpacity>
      </View>
  </View>
  </ScrollView>
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
  inputIsolado: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
    padding: 0,
    width: 290,
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