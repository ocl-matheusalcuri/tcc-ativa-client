import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { AuthContext } from '../../contexts/auth';

import { styles } from '../styles'


import { SERVER_URL } from '../../url'
import api from '../../services/api';


//@ts-ignore
export default function ProfAlunos({navigation}) {
  const { signOut, user, type } = React.useContext(AuthContext);

  const [nome, setNome] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [dados, setDados] = useState<any>();

  const array = [{label: 'Acre', value: 'Acre'},{label: 'Alagoas', value: 'Alagoas'},{label: 'Amapa', value: 'Amapa'},{label: 'Amazonas', value: 'Amazonas'},{label: 'Bahia', value: 'Bahia'},{label: 'Ceara', value: 'Ceara'},{label: 'Distrito Federal', value: 'Distrito Federal'},{label: 'Espirito Santo', value: 'Espirito Santo'},{label: 'Goias', value: 'Goias'},{label: 'Maranhao', value: 'Maranhao'},{label: 'Mato Grosso', value: 'Mato Grosso'},{label: 'Mato Grosso do Sul', value: 'Mato Grosso do Sul'},{label: 'Minas Gerais', value: 'Minas Gerais'},{label: 'Para', value: 'Para'},{label: 'Paraiba', value: 'Paraiba'},{label: 'Parana', value: 'Parana'},{label: 'Pernambuco', value: 'Pernambuco'},{label: 'Piaui', value: 'Piaui'},{label: 'Rio de Janeiro', value: 'Rio de Janeiro'},{label: 'Rio Grande do Norte', value: 'Rio Grande do Norte'},{label: 'Rio Grande do Sul', value: 'Rio Grande do Sul'},{label: 'Rondonia', value: 'Rondonia'},{label: 'Roraima', value: 'Roraima'},{label: 'Santa Catarina', value: 'Santa Catarina'},{label: 'Sao Paulo', value: 'Sao Paulo'},{label: 'Sergipe', value: 'Sergipe'},{label: 'Tocantins', value: 'Tocantins'}]

  async function getAlunos() {
    const response = await api.get(`${SERVER_URL}/api/alunoModel/getAlunosByPersonalId`, {
      params: {
        personalId: user?._id
      }
    });
    setNome("");
    setDados(response.data);
  }

  async function getAlunosPorTexto() {
    const response = await api.get(`${SERVER_URL}/api/alunoModel/getFiltrado`, {
      params: {
        nome: nome,
        personalId: user?._id
      }
    });
    setDados(response.data);
  }

  async function addCliente() {
    api.put(`${SERVER_URL}/api/alunoModel/incluirPersonal`, {
      body: {
        alunoId: clienteId,
        personalId: user?._id
      }
    }).then(response => getAlunos())
  }

  useEffect(() => {
    getAlunos();
  }, [navigation])

    return (
      <View style={{...styles.container, ...styles.bg}}>
      <View style={{...styles.bg}}>

        <TextInput style={{...styles.inputIsolado}} placeholder="Procure por nome ou email" onChangeText={nome => setNome(nome)}/>
        <TouchableOpacity style={{...styles.btnCadastro}} onPress={getAlunosPorTexto}><Text style={{...styles.btnText}}>Pesquisar</Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.btnCadastro}} onPress={getAlunos}><Text style={{...styles.btnText}}>Ver todos</Text></TouchableOpacity>

      </View>

      <View style={{...styles.bg}}>
          <TextInput style={{...styles.inputIsolado}} placeholder="Adicionar novo cliente" onChangeText={id => setClienteId(id)}/>
          <TouchableOpacity style={{...styles.btnCadastro}} onPress={addCliente}><Text style={{...styles.btnText}}>Adicionar</Text></TouchableOpacity>
        </View>

     { dados?.length > 0 && 
     (<ScrollView>
        <View style={{...styles.bg}}>
          
          {dados.map((value: any, index: any) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate("ProfAlunoDetalhadoScreen", {
              alunoId: value._id,
              temFoto: value.temFoto
            })}>
            <View key={index} style={{...styles.bg, ...styles.profs}}>
            <View style={{...styles.bg}}>
            <Image source={{uri: value?.fotoUrl ? value?.fotoUrl :  `https://uploadofototcc.s3.sa-east-1.amazonaws.com/default.png`}} style={{width: 40, height: 40, borderRadius: 400/ 2}}/>
            </View>
            <View style={{...styles.bg, ...styles.itensProf}}>
              <Text style={{...styles.btnText}}>{value.nome}</Text>
              <Text style={{...styles.btnText}}>{value.celular}</Text>
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