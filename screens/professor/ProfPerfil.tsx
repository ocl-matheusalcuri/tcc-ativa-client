import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

import { styles } from '../styles';

import { Text, View } from '../../components/Themed';

import { AuthContext } from '../../contexts/auth';

import RNPickerSelect from 'react-native-picker-select';
import { TextInputMask } from 'react-native-masked-text';

import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

import api from '../../services/api';
import { ScrollView } from 'react-native-gesture-handler';

import { SERVER_URL } from '../../url';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

export default function ProfPerfil() {

  const { signOut, user, type, refreshUser } = React.useContext(AuthContext);

  const [foto, setFoto] = useState<any>(user?.fotoUrl != "" ? user?.fotoUrl : `https://uploadofototcc.s3.sa-east-1.amazonaws.com/default.png`);
  const [imgBase64, setImgBase64] = useState<any>();

  const [novoNome, setNovoNome] = useState(user?.nome);
  const [novoEmail, setNovoEmail] = useState(user?.email);
  const [novoNascimento, setNovoNascimento] = useState("");
  const [novoCelular, setNovoCelular] = useState("");
  const [novoFacebook, setNovoFacebook] = useState(user?.facebook);
  const [novoInstagram, setNovoInstagram] = useState(user?.instagram);

  const [especialidade, setEspecialidade] = useState(user?.especializacao);
  const [faixaEtaria, setFaixaEtaria] = useState(user?.faixaEtaria);
  const [foco, setFoco] = useState(user?.foco);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [estado, setEstado] = useState(user?.estado);
  const [cidade, setCidade] = useState(user?.cidade);

  const estados1 = [{label: 'AC', value: 'AC'},{label: 'AL', value: 'AL'},{label: 'AP', value: 'AP'},{label: 'AM', value: 'AM'},{label: 'BA', value: 'BA'},{label: 'CE', value: 'CE'},{label: 'DF', value: 'DF'},{label: 'ES', value: 'ES'},{label: 'GO', value: 'GO'},{label: 'MA', value: 'MA'},{label: 'MT', value: 'MT'},{label: 'MS', value: 'MS'},{label: 'MG', value: 'MG'},{label: 'PA', value: 'PA'},{label: 'PB', value: 'PB'},{label: 'PR', value: 'PR'},{label: 'PE', value: 'PE'},{label: 'PI', value: 'PI'},{label: 'RJ', value: 'RJ'},{label: 'RN', value: 'RN'},{label: 'RS', value: 'RS'},{label: 'RO', value: 'RO'},{label: 'RR', value: 'RR'},{label: 'SC', value: 'SC'},{label: 'SP', value: 'SP'},{label: 'SE', value: 'SE'},{label: 'TO', value: 'TO'}]




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
        setStatus("");
        Alert.alert("Foto de perfil atualizada com sucesso!");
      });;
    }) 
};

async function handleProfileImage() {
  let image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    base64: true,
  });

    //@ts-ignore
    setImgBase64(image.base64)

    setStatus("Atualizando foto, aguarde...");
    //@ts-ignore
    await salvarFoto(image.base64);
}

function atualizaPerfil() {
  setError("");
  setStatus("");

  const podeAtualizar = (novoNascimento === "" || novoNascimento.length === 10) && (novoCelular === "" || novoCelular.length === 15);

  if(podeAtualizar) {
    api.put(`${SERVER_URL}/api/personalModel/editarPerfil`, {
      body: {
        personalId: user?._id,
        nome: novoNome,
         celular: novoCelular != "" ? novoCelular : user?.celular, 
         email: novoEmail, 
         nascimento: novoNascimento != "" ? novoNascimento : user?.nascimento, 
         instagram: novoInstagram, 
         facebook: novoFacebook, 
         foco: foco, 
         especializacao: especialidade, 
         faixaEtaria: faixaEtaria,
         cidade: cidade,
         estado: estado
      }
    }).then(async response => {
      refreshUser(user?._id).then(() => Alert.alert("Perfil atualizado com sucesso!"))
    })
  } else {
    setError("Por favor preencha todos os campos!");
    setTimeout(function(){ setError(""); }, 3000);
  }
}

    return (
      <ScrollView>
      <View style={{...styles.container, ...styles.bg}}>
      <View style={styles.bg}>
      {!!error && <Text style={{...styles.error, width: 300}}>{error}</Text>}
      {!!status && <Text style={{...styles.sucesso}}>{status}</Text>}
        <View style={{...styles.bg, ...styles.conjuntoInput}}>
          <View style={{...styles.bg, ...styles.foto}}>
            <Image source={{uri: foto, cache:"reload"}} style={{width: 100, height: 100, borderRadius: 400/ 2}}/>
            <View style={{...styles.bg, ...styles.conjuntoInput}}>
              <TouchableOpacity style={{padding: 15}} onPress={handleProfileImage}><Icon name="camera-alt" size={20} color="white" /></TouchableOpacity>
            </View>
          </View>

          <View  style={{...styles.bg}}>
            <View style={{...styles.bg}}>
              <Text style={{...styles.btnText, marginBottom: 5}}>Nome</Text>
              <TextInput autoCapitalize="words" style={{...styles.input}} placeholder={user?.nome} onChangeText={nome => setNovoNome(nome)}/>
            </View>

            <View style={{...styles.bg}}>
              <Text style={{...styles.btnText, marginBottom: 5}}>Email</Text>
              <TextInput autoCapitalize="none" style={{...styles.input}} placeholder={user?.email} onChangeText={email => setNovoEmail(email)}/>
            </View>

            <View style={{...styles.bg}}>
              <Text style={{...styles.btnText, marginBottom: 5}}>Nascimento</Text>
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
        </View>

        <View style={{...styles.conjuntoInput, ...styles.bg, marginTop: 20}}>
            <View style={{...styles.bg}}>
              <Text style={{...styles.btnText, marginBottom: 5}}>Cidade</Text>
              <TextInput autoCapitalize="words" style={{...styles.inputSignUp, width: 160}} value={cidade} placeholder={user?.cidade} onChangeText={cidade => setCidade(cidade)}/>
            </View>

            <View style={{...styles.picker, width: 100, marginRight: 25}}>
              <Text style={{...styles.btnText, marginBottom: -4}}>Estado</Text>
              <RNPickerSelect
                  style={{viewContainer: {marginBottom: 9}}}
                  placeholder={{}}
                  value={estado}
                  onValueChange={(value) => setEstado(value)}
                  items={estados1}
                />
            </View>
          </View>

          <View style={{...styles.bg}}>
            <Text style={{...styles.btnText, marginBottom: 5}}>Celular</Text>
            <TextInputMask 
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
              }} 
              value={novoCelular}
              style={{...styles.inputIsolado}} 
              keyboardType="number-pad" 
              placeholder={user?.celular}
              onChangeText={celular => setNovoCelular(celular)}/>
          </View>


        <View style={{...styles.bg}}>
          <Text style={{...styles.btnText, marginBottom: 5}}>Instagram</Text>
          <TextInput autoCapitalize="none" style={{...styles.inputIsolado}} placeholder={user?.instagram} onChangeText={instagram => setNovoInstagram(instagram)}/>
        </View>

        <View style={{...styles.bg}}>
          <Text style={{...styles.btnText, marginBottom: 5}}>Facebook</Text>
          <TextInput autoCapitalize="none" style={{...styles.inputIsolado}} placeholder={user?.facebook} onChangeText={facebook => setNovoFacebook(facebook)}/>
        </View>
        


        <Text style={{marginTop: 0, ...styles.btnText}}>Especialidade</Text>
        <View style={{...styles.bg, ...styles.picker}}>
          <RNPickerSelect
            placeholder={{}}
            value={especialidade}
            onValueChange={(value) => setEspecialidade(value)}
            items={especialidadeOpt}
          />
        </View>

        <Text style={{...styles.btnText}}>Faixa etária</Text>
        <View style={{...styles.bg, ...styles.picker}}>
          <RNPickerSelect
            placeholder={{}}
            value={faixaEtaria}
            onValueChange={(value) => setFaixaEtaria(value)}
            items={faixaEtariaOpt}
          />
        </View>

        <Text style={{...styles.btnText}}>Foco</Text>
        <View style={{...styles.bg, ...styles.picker}}>
          <RNPickerSelect
            placeholder={{}}
            value={foco}
            onValueChange={(value) => setFoco(value)}
            items={focoOpt}
          />
        </View>

        <TouchableOpacity style={{...styles.btnCadastro}} onPress={atualizaPerfil}><Text style={{...styles.btnText}}>Atualizar perfil</Text></TouchableOpacity>
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
//   inputIsolado: {
//     borderWidth: 1,
//     borderColor: "gray",
//     backgroundColor: "#fff",
//     padding: 0,
//     width: 290,
//     paddingHorizontal: 10,
//     marginVertical: 20,
//     marginRight: 20
//   },
//   btnCadastro: {
//     backgroundColor: "blue",
//     padding: 10,
//     alignItems: "center",
//     marginVertical: 10,
//     width: 290,
//     borderRadius: 4
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