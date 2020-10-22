import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';

import { styles } from '../styles';


import { SERVER_URL } from '../../url'

//{label: 'Alagoas', value: 'Alagoas'},{label: 'Amapa', value: 'Amapa'},{label: 'Amazonas', value: 'Amazonas'},{label: 'Bahia', value: 'Bahia'},{label: 'Ceara', value: 'Ceara'},{label: 'Distrito Federal', value: 'Distrito Federal'},{label: 'Espirito Santo', value: 'Espirito Santo'},{label: 'Goias', value: 'Goias'},{label: 'Maranhao', value: 'Maranhao'},{label: 'Mato Grosso', value: 'Mato Grosso'},{label: 'Mato Grosso do Sul', value: 'Mato Grosso do Sul'},{label: 'Minas Gerais', value: 'Minas Gerais'},{label: 'Para', value: 'Para'},{label: 'Paraiba', value: 'Paraiba'},{label: 'Parana', value: 'Parana'},{label: 'Pernambuco', value: 'Pernambuco'},{label: 'Piaui', value: 'Piaui'},{label: 'Rio de Janeiro', value: 'Rio de Janeiro'},{label: 'Rio Grande do Norte', value: 'Rio Grande do Norte'},{label: 'Rio Grande do Sul', value: 'Rio Grande do Sul'},{label: 'Rondonia', value: 'Rondonia'},{label: 'Roraima', value: 'Roraima'},{label: 'Santa Catarina', value: 'Santa Catarina'},{label: 'Sao Paulo', value: 'Sao Paulo'},{label: 'Sergipe', value: 'Sergipe'},{label: 'Tocantins', value: 'Tocantins'}
//@ts-ignore
export default function ProfAlunoDetalhado({route, navigation}) {

  const { signOut, user, type } = useContext(AuthContext);

  const { alunoId, temFoto } = route.params;
 
const [nomeTreino, setNomeTreino] = useState("");
const [aparelho, setAparelho] = useState("");
const [serie, setSerie] = useState<number>();
const [repeticao, setRepeticao] = useState<number>();
const [treinos, setTreinos] = useState<any>();
const [peso, setPeso] = useState<number>();
const [massaMuscular, setMassaMuscular] = useState<number>();
const [imc, setImc] = useState<string>();
const [aluno, setAluno] = useState<any>();

async function getAlunoInfo() {
  await api.get(`${SERVER_URL}/api/alunoModel/getById`, {
    params: {
      userId: alunoId
    }
  }).then(response => {
    setAluno(response.data);
  })
}

// const test = [
//   {
//     treinoId,
//     título,
//     descricaoTreino: [{}]
//   }
// ]

async function getTreinos() {
  const response = await api.get(`${SERVER_URL}/api/treinoModel/getTreinosByAlunoId`, {
    params: {
      alunoId: alunoId
    }
  });

  setTreinos(response.data);
}
useEffect(() => {
  getAlunoInfo();
  getTreinos();
}, [navigation])

async function atualizaTreino(treinoId: any, aparelho: string, serie: number | undefined, repeticao: number | undefined) {
  await api.put(`${SERVER_URL}/api/treinoModel/editarTreino`, {
    body: {
      treinoId: treinoId, 
      nome: aparelho,
      serie: serie,
      repeticao: repeticao
    }
  }).then(response => getTreinos());
}

async function atualizarAluno() {
  await api.put(`${SERVER_URL}/api/alunoModel/atualizarStatus`, {
    body: {
      alunoId: alunoId,
      peso,
      massaMuscular,
      imc
    }
  });
  await getAlunoInfo();

  Alert.alert("Informações atualizadas com sucesso!")
}

async function criarTreino() {
  const response = await api.post(`${SERVER_URL}/api/treinoModel/cadastrarTreino`, {
    body: {
      alunoId: alunoId, 
      personalId: user?._id, 
      nome: nomeTreino, 
      descricaoTreino: [{
        nome: aparelho,
        repeticao: repeticao,
        serie: serie
      }]
    }
  })
  getTreinos();
}


    return aluno ? (
      <>      
      <ScrollView>
          <View style={{...styles.container, ...styles.bg, minHeight: 732}}>
              <View style={styles.bg}>
                <View style={{...styles.bg, ...styles.conjuntoInput, marginBottom: 40}}>
                  <View  style={{...styles.bg, ...styles.foto}}>
                    <Image source={{uri: aluno?.fotoUrl ? aluno?.fotoUrl : `https://uploadofototcc.s3.sa-east-1.amazonaws.com/default.png`, cache:"reload"}} style={{width: 100, height: 100, borderRadius: 400/ 2}}/>
                  </View>

                  <View  style={{...styles.bg, marginLeft: 20}}>
                    <Text style={{...styles.btnText}}>Objetivo: {aluno.objetivo}</Text>
                    <Text style={{marginVertical: 20, ...styles.btnText}}>Preparo físico: {aluno.prepFisico}</Text>
                    <Text style={{...styles.btnText}}>Saúde: {aluno.saude}</Text>
                  </View>
                </View>
                
                <View style={{...styles.bg, marginBottom: 30}}>
                  <Text style={{...styles.btnText}}>Peso (em kg)</Text>
                  <TextInput style={{...styles.inputSemAltura}} placeholder={aluno?.peso.toString()} onChangeText={peso => setPeso(parseInt(peso) || 0)}/>
                  <Text style={{...styles.btnText}}>Massa muscular</Text>
                  <TextInput style={{...styles.inputSemAltura}} placeholder={aluno?.massaMuscular.toString()} onChangeText={massa => setMassaMuscular(parseInt(massa) || 0)}/>
                  <Text style={{...styles.btnText}}>IMC (e anotações)</Text>
                  <TextInput style={{...styles.inputSemAltura}} placeholder={aluno?.imc} onChangeText={imc => setImc(imc)}/>
                  <TouchableOpacity style={{...styles.btnCadastro, marginBottom: 50}} onPress={atualizarAluno}><Text style={{...styles.btnText}}>Atualizar informações</Text></TouchableOpacity>
                </View>

               
                <View style={{...styles.bg}}>
                {treinos?.map((parent: any, index: any) => (
                  <View key={index} style={{...styles.bg}}>
                    <View style={{...styles.bg, ...styles.profs}}>
                      <Text style={{marginBottom: 15, ...styles.btnText}}>{parent.nome}</Text>
                    </View>

                    <View style={{...styles.bg, ...styles.profs}}>
                      <Text style={{...styles.btnText}}>Aparelho</Text>
                      <Text style={{marginLeft: 50, ...styles.btnText}}>Série</Text>
                      <Text style={{...styles.btnText}}>Repetições</Text>
                    </View>
                  
                    <View style={{...styles.bg}}>
                      {parent.descricaoTreino.map((value: any ,index: any) => (
                        <View key={index} style={{...styles.bg, ...styles.profs}}>
                        <View style={{...styles.bg}}>
                          <Text numberOfLines={1} style={{...styles.aparelhoText, ...styles.btnText}}>{value.nome}</Text>
                        </View>
                        <View style={{...styles.bg}}>
                          <Text numberOfLines={1} style={{paddingRight: 100, ...styles.btnText}}>{value.serie}</Text>
                        </View>
                        <View style={{...styles.bg}}>
                          <Text numberOfLines={1} style={{...styles.btnText}}>{value.repeticao}</Text>
                        </View>
                      </View>
                      ))}
                    </View>

                    <View style={{...styles.bg, ...styles.profs}}>
                      <TextInput style={{...styles.inputSemLargura}} placeholder="Aparelho" onChangeText={aparelho => setAparelho(aparelho)}/>
                      <TextInput style={{...styles.inputSemLargura}} placeholder="Série" onChangeText={serie => setSerie(parseInt(serie))}/>
                      <TextInput style={{...styles.inputSemLargura}} placeholder="Repetições" onChangeText={repeticao => setRepeticao(parseInt(repeticao))}/>
                    </View>  
                    <TouchableOpacity style={{...styles.btnCadastro, marginBottom: 50}} onPress={() => atualizaTreino(parent._id, aparelho, serie, repeticao)}><Text style={{...styles.btnText}}>Add aparelho</Text></TouchableOpacity>

                  </View>
                
                ))}
                
                </View>
                
                <Text style={{...styles.btnText}}>Adicionar novo treino</Text>
                <TextInput style={{...styles.inputIsolado}} placeholder="Título do novo treino" onChangeText={nome => setNomeTreino(nome)}/>
                <TextInput style={{...styles.inputIsolado}} placeholder="Coloque no mínimo um aparelho" onChangeText={aparelho => setAparelho(aparelho)}/>
                <TextInput style={{...styles.inputIsolado}} placeholder="Repetições" onChangeText={repeticao => setRepeticao(parseInt(repeticao) || 0)}/>
                <TextInput style={{...styles.inputIsolado}} placeholder="Séries" onChangeText={serie => setSerie(parseInt(serie) || 0)}/>
                
                <TouchableOpacity style={{...styles.btnCadastro}} onPress={criarTreino}><Text style={{...styles.btnText}}>Adicionar</Text></TouchableOpacity>
                

              </View>
             
          </View>
      </ScrollView>
      </>
    ) : (<View/>)
}

// const styles = StyleSheet.create({
//   bg: {
//     backgroundColor: '#CC8400'
//   },
//   container: {
//     padding: 20,
//     flex: 1,
//     height: "100%",
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

//     paddingHorizontal: 10,
//     marginVertical: 5,
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