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

  async function getPersonal() {
    const response = await api.get(`${SERVER_URL}/api/personalModel/getAll`)
    setDados(response.data);
    setNome("");
  }

  async function getPersonalFilter() {
    const response = await api.get(`${SERVER_URL}/api/personalModel/getFiltrado`, {
      params: {
        especialidade,
        foco,
        faixaEtaria,
        nome
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

  const array = [{label: 'Acre', value: 'Acre'},{label: 'Alagoas', value: 'Alagoas'},{label: 'Amapa', value: 'Amapa'},{label: 'Amazonas', value: 'Amazonas'},{label: 'Bahia', value: 'Bahia'},{label: 'Ceara', value: 'Ceara'},{label: 'Distrito Federal', value: 'Distrito Federal'},{label: 'Espirito Santo', value: 'Espirito Santo'},{label: 'Goias', value: 'Goias'},{label: 'Maranhao', value: 'Maranhao'},{label: 'Mato Grosso', value: 'Mato Grosso'},{label: 'Mato Grosso do Sul', value: 'Mato Grosso do Sul'},{label: 'Minas Gerais', value: 'Minas Gerais'},{label: 'Para', value: 'Para'},{label: 'Paraiba', value: 'Paraiba'},{label: 'Parana', value: 'Parana'},{label: 'Pernambuco', value: 'Pernambuco'},{label: 'Piaui', value: 'Piaui'},{label: 'Rio de Janeiro', value: 'Rio de Janeiro'},{label: 'Rio Grande do Norte', value: 'Rio Grande do Norte'},{label: 'Rio Grande do Sul', value: 'Rio Grande do Sul'},{label: 'Rondonia', value: 'Rondonia'},{label: 'Roraima', value: 'Roraima'},{label: 'Santa Catarina', value: 'Santa Catarina'},{label: 'Sao Paulo', value: 'Sao Paulo'},{label: 'Sergipe', value: 'Sergipe'},{label: 'Tocantins', value: 'Tocantins'}]


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
            <Text style={{...styles.btnText}}>Especialidade</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={especialidade}
                  onValueChange={(value) => setEspecialidade(value)}
                  items={especialidadeOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Faixa etário alvo</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={faixaEtaria}
                  onValueChange={(value) => setFaixaEtaria(value)}
                  items={faixaEtariaOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Foco</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={foco}
                  onValueChange={(value) => setFoco(value)}
                  items={focoOpt}
                />
              </View>

              <TextInput style={{...styles.inputIsolado}} value={nome} placeholder="Procure por nome ou email" onChangeText={nome => setNome(nome)}/>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={getPersonalFilter}><Text style={{...styles.btnText}}>Pesquisar</Text></TouchableOpacity>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={getPersonal}><Text style={{...styles.btnText}}>Ver todos</Text></TouchableOpacity>
            </View>

            {dados && dados.length == 0 ? (
              <View style={{...styles.bg, marginTop: 40, marginRight: 20}}>
                <Text style={{...styles.btnText, fontSize: 20}}>Nenhum personal encontrado!</Text>
              </View>
            ) :
            (
              <ScrollView>
              <View style={{...styles.bg, overflow: "scroll", paddingBottom: 50}}>
                { dados && dados.map((value: any, index: any) => (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate("CliProfDetalhadoScreen", {
                    personalId: value._id,
                  })}>
                  <View key={index} style={{...styles.bg, ...styles.profs}}>
                  <View style={{...styles.bg, maxWidth: 40}}>
                    <Image source={{uri: value?.fotoUrl ? value?.fotoUrl :  `https://uploadofototcc.s3.sa-east-1.amazonaws.com/default.png`}} style={{width: 40, height: 40, borderRadius: 400/ 2}}/>
                  </View>
                  <View style={{...styles.bg, ...styles.itensProf}}>
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