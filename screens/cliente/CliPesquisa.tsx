import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { SocialIcon  } from 'react-native-elements';

import { styles } from '../styles';

import { Text, View } from '../../components/Themed';

import RNPickerSelect from 'react-native-picker-select';
import { useEffect, useState } from 'react';

import api from '../../services/api';
import { SERVER_URL } from '../../url'


//@ts-ignore
export default function CliPesquisa({navigation}) {

  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("Ginástica");
  const [faixaEtaria, setFaixaEtaria] = useState("Idosos");
  const [foco, setFoco] = useState("Fortalecimento");
  const [dados, setDados] = useState<any>();
  const [estado, setEstado] = useState("AC");
  const [cidade, setCidade] = useState("");

  const estados1 = [{label: 'AC', value: 'AC'},{label: 'AL', value: 'AL'},{label: 'AP', value: 'AP'},{label: 'AM', value: 'AM'},{label: 'BA', value: 'BA'},{label: 'CE', value: 'CE'},{label: 'DF', value: 'DF'},{label: 'ES', value: 'ES'},{label: 'GO', value: 'GO'},{label: 'MA', value: 'MA'},{label: 'MT', value: 'MT'},{label: 'MS', value: 'MS'},{label: 'MG', value: 'MG'},{label: 'PA', value: 'PA'},{label: 'PB', value: 'PB'},{label: 'PR', value: 'PR'},{label: 'PE', value: 'PE'},{label: 'PI', value: 'PI'},{label: 'RJ', value: 'RJ'},{label: 'RN', value: 'RN'},{label: 'RS', value: 'RS'},{label: 'RO', value: 'RO'},{label: 'RR', value: 'RR'},{label: 'SC', value: 'SC'},{label: 'SP', value: 'SP'},{label: 'SE', value: 'SE'},{label: 'TO', value: 'TO'}]


  async function getPersonal() {
    const response = await api.get(`${SERVER_URL}/api/personalModel/getAll`)
    setDados(response.data);
    setNome("");
    setCidade("");
  }

  async function getPersonalFilter() {
    const response = await api.get(`${SERVER_URL}/api/personalModel/getFiltrado`, {
      params: {
        especialidade,
        foco,
        faixaEtaria,
        nome,
        cidade,
        estado
      }
    });

    setDados(response.data);
  };

  async function getPersonalFilterCidade() {
    const response = await api.get(`${SERVER_URL}/api/personalModel/getFiltrado`, {
      params: {
        cidade,
        estado
      }
    });

    setDados(response.data);
  }

  useEffect(() => {
    getPersonal();
  }, [navigation])


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

    return (
        <View style={{...styles.container, ...styles.bg}}>
            <View style={{...styles.bg}}>
            <View style={{...styles.conjuntoInput, ...styles.bg}}>
              <View style={{...styles.bg}}>
            <Text style={{...styles.btnText}}>Especialidade</Text>
              <View style={{...styles.bg, ...styles.picker, width: 135}}>
                <RNPickerSelect
                  placeholder={{}}
                  value={especialidade}
                  onValueChange={(value) => setEspecialidade(value)}
                  items={especialidadeOpt}
                />
              </View>
              </View>

            <View style={{...styles.bg}}>
              <Text style={{...styles.btnText}}>Faixa etário alvo</Text>
              <View style={{...styles.bg, ...styles.picker, width: 135, marginRight: 20}}>
                <RNPickerSelect
                  placeholder={{}}
                  value={faixaEtaria}
                  onValueChange={(value) => setFaixaEtaria(value)}
                  items={faixaEtariaOpt}
                />
              </View>
              </View>
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

              <View style={{...styles.conjuntoInput, ...styles.bg}}>
                <TextInput autoCapitalize="words" style={{...styles.inputSignUp, width: 160}} value={cidade} placeholder="Cidade" onChangeText={cidade => setCidade(cidade)}/>
                <View style={{...styles.picker, width: 100, marginRight: 20}}>
                    <RNPickerSelect
                      placeholder={{}}
                      value={estado}
                      onValueChange={(value) => setEstado(value)}
                      items={estados1}
                    />
                </View>
              </View>
              <TextInput autoCapitalize="none" style={{...styles.inputIsolado, marginTop: 10}} value={nome} placeholder="Procure por nome ou email" onChangeText={nome => setNome(nome)}/>
              <View style={{...styles.conjuntoInput, ...styles.bg, paddingRight: 20}}>
                <TouchableOpacity style={{...styles.btnCadastro, width: "auto", minWidth: 60}} onPress={getPersonalFilter}><Text style={{...styles.btnText}}>Pesquisar</Text></TouchableOpacity>
                <TouchableOpacity style={{...styles.btnCadastro, width: "auto", minWidth: 80}} onPress={getPersonalFilterCidade}><Text style={{...styles.btnText}}>Pesquisar por região</Text></TouchableOpacity>
                <TouchableOpacity style={{...styles.btnCadastro, width: "auto", minWidth: 60}} onPress={getPersonal}><Text style={{...styles.btnText}}>Ver todos</Text></TouchableOpacity>
              </View>
            </View>

            {dados && dados.length == 0 ? (
              <View style={{...styles.bg, marginTop: 40, marginRight: 20}}>
                <Text style={{...styles.btnText, fontSize: 20}}>Nenhum personal encontrado!</Text>
              </View>
            ) :
            (
              <ScrollView>
              <View style={{...styles.bg, paddingBottom: 50, width: 325}}>
                { dados && dados.map((value: any, index: any) => (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate("CliProfDetalhadoScreen", {
                    personalId: value._id,
                  })}>
                  <View key={index} style={{...styles.bg, ...styles.profs}}>
                  <View style={{...styles.bg, maxWidth: 40}}>
                    <Image source={{uri: value?.fotoUrl ? value?.fotoUrl :  `https://uploadofototcc.s3.sa-east-1.amazonaws.com/default.png`}} style={{width: 40, height: 40, borderRadius: 400/ 2}}/>
                  </View>
                  <View style={{...styles.bg, ...styles.itensProf, width: 180}}>
                    <Text style={{...styles.btnText}}>{value.nome}</Text>
                    <Text style={{...styles.btnText}}>{value.email}</Text>
                    <Text style={{...styles.btnText}}>{value.celular}</Text>
                  </View>
                  <View style={{...styles.bg}}>
                  <SocialIcon
                    type='instagram'
                    onPress={() => Linking.openURL(`https://www.instagram.com/${value.instagram}/`)}
                  />
                  </View>
                </View>
                </TouchableOpacity>
                ))}
                
              </View>
            </ScrollView>
            )}
            
        </View>
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
//   profs: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 10
//   },
//   itensProf: {
//     marginHorizontal: 40,
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
//     width: 290,
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