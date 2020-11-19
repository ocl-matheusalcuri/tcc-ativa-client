import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';

import { styles } from '../styles';


import { SERVER_URL } from '../../url';
import Dialog from "react-native-dialog";


//@ts-ignore
export default function ProfAlunoDetalhado({route, navigation}) {

  const { signOut, user, type } = useContext(AuthContext);

  const { alunoId, temFoto } = route.params;
 
const [nomeTreino, setNomeTreino] = useState("");
const [aparelho, setAparelho] = useState("");
const [serie, setSerie] = useState<number>();
const [repeticao, setRepeticao] = useState<number>();
const [novoAparelho, setNovoAparelho] = useState<any>({});
const [novaSerie, setNovaSerie] = useState<any>({});
const [novaRepeticao, setNovaRepeticao] = useState<any>({});
const [treinos, setTreinos] = useState<any>();
const [peso, setPeso] = useState<number>();
const [massaMuscular, setMassaMuscular] = useState<number>();
const [imc, setImc] = useState<string>();
const [aluno, setAluno] = useState<any>();
const [visible, setVisible] = useState(false);  
const [treinoId, setTreinoId] = useState("");  


async function getAlunoInfo() {
  await api.get(`${SERVER_URL}/api/alunoModel/getById`, {
    params: {
      userId: alunoId
    }
  }).then(response => {
    setAluno(response.data);
  })
}

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
  const aparelhos = {...novoAparelho};
  aparelhos[treinoId] = "";
  setNovoAparelho(aparelhos);

  const series = {...novaSerie};
  series[treinoId] = undefined;
  setNovaSerie(series);

  const repeticoes = {...novaRepeticao};
  repeticoes[treinoId] = undefined;
  setNovaRepeticao(repeticoes);

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
  setNomeTreino("");
  setAparelho("");
  setSerie(undefined);
  setRepeticao(undefined);
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

async function deletarTreino() {
  await api.delete(`${SERVER_URL}/api/treinoModel/deletarTreino`, {
    params: {
      treinoId
    }
  }).then(response => {getTreinos(); setVisible(false)});
}

async function defineAparelhos(info: any, index: any, tipo: any) {
  if(tipo === "aparelho") {
    const aparelhos = {...novoAparelho};
    aparelhos[index] = info;
    setNovoAparelho(aparelhos);
  } else if(tipo === "serie") {
    const series = {...novaSerie};
    series[index] = parseInt(info);
    setNovaSerie(series);
  } else {
    const repeticoes = {...novaRepeticao};
    repeticoes[index] = parseInt(info);
    setNovaRepeticao(repeticoes);
  }

}


    return aluno ? (
      <>      
      <ScrollView>
          <View style={{...styles.container, ...styles.bg, minHeight: 732}}>
          <Dialog.Container visible={visible}>
                <Dialog.Title>Deletar treino</Dialog.Title>
                <Dialog.Description>
                  Você tem certeza de que deseja deletar este treino?
                </Dialog.Description>
                <Dialog.Button label="Cancelar" onPress={() => {setVisible(false); setTreinoId("")}} />
                <Dialog.Button label="Confirmar" onPress={deletarTreino} />
            </Dialog.Container>
              <View style={styles.bg}>
                <View style={{...styles.bg, ...styles.conjuntoInput, marginBottom: 40}}>
                  <View  style={{...styles.bg, ...styles.foto}}>
                    <Image source={{uri: aluno?.fotoUrl ? aluno?.fotoUrl : `https://uploadofototcc.s3.sa-east-1.amazonaws.com/default.png`, cache:"reload"}} style={{width: 100, height: 100, borderRadius: 400/ 2}}/>
                  </View>

                  <View  style={{...styles.bg, paddingRight: 50}}>
                    <Text style={{...styles.btnText}}>Objetivo: {aluno.objetivo}</Text>
                    <Text style={{marginVertical: 20, ...styles.btnText, width: 150}}>Preparo físico: {aluno.prepFisico}</Text>
                    <Text style={{...styles.btnText}}>Saúde: {aluno.saude}</Text>
                  </View>
                </View>
                
                <View style={{...styles.bg, marginBottom: 0}}>
                  <Text style={{...styles.btnText}}>Peso (em kg)</Text>
                  <TextInput style={{...styles.inputSemAltura}} placeholder={aluno?.peso.toString()} keyboardType="number-pad" onChangeText={peso => setPeso(parseInt(peso) || 0)}/>
                  <Text style={{...styles.btnText, marginTop: 10}}>Massa muscular</Text>
                  <TextInput style={{...styles.inputSemAltura}} placeholder={aluno?.massaMuscular.toString()} keyboardType="number-pad" onChangeText={massa => setMassaMuscular(parseInt(massa) || 0)}/>
                  <Text style={{...styles.btnText, marginTop: 10}}>Anotações extras</Text>
                  <TextInput style={{...styles.inputSemAltura}} placeholder={aluno?.imc} onChangeText={imc => setImc(imc)}/>
                  <TouchableOpacity style={{...styles.btnCadastro, marginBottom: 50, marginTop: 20, width: 320}} onPress={atualizarAluno}><Text style={{...styles.btnText}}>Atualizar informações</Text></TouchableOpacity>
                </View>

               
                <View style={{...styles.bg}}>
                {treinos?.map((parent: any, index: any) => (
                  <View key={index} style={{...styles.bg}}>
                    <View style={{...styles.bg, ...styles.profs, alignContent: "center"}}>
                      <Text style={{...styles.btnText, fontWeight: "bold"}}>{parent.nome}</Text>
                      <TouchableOpacity style={{...styles.btnCancel, width: 100}} onPress={() => { setTreinoId(parent._id); setVisible(!visible) }}>
                        <Text style={{...styles.btnText}}>Deletar treino</Text>
                      </TouchableOpacity>
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
                      <TextInput style={{...styles.inputSemLargura, width: 100, maxWidth: 100}} placeholder="Aparelho" value={novoAparelho[parent._id] || ""} onChangeText={(e) => defineAparelhos(e, parent._id, "aparelho")}/>
                      <TextInput style={{...styles.inputSemLargura, width: 50, maxWidth: 50}} placeholder="Série" value={ novaSerie[parent._id] ? novaSerie[parent._id].toString() : undefined } keyboardType="number-pad" onChangeText={(e) => defineAparelhos(e, parent._id, "serie")}/>
                      <TextInput style={{...styles.inputSemLargura, width: 80, maxWidth: 80}} placeholder="Repetições" value={ novaRepeticao[parent._id] ? novaRepeticao[parent._id].toString() : undefined } keyboardType="number-pad" onChangeText={(e) => defineAparelhos(e, parent._id, "repeticao")}/>
                    </View>  
                    <TouchableOpacity style={{...styles.btnCadastro, marginBottom: 50, width: 320}} onPress={() => atualizaTreino(parent._id, novoAparelho[parent._id], novaSerie[parent._id], novaRepeticao[parent._id])}><Text style={{...styles.btnText}}>Add aparelho</Text></TouchableOpacity>

                  </View>
                
                ))}
                
                </View>
                
                <Text style={{...styles.btnText, fontWeight: "bold", fontSize: 18}}>Adicionar novo treino</Text>
                <TextInput style={{...styles.inputIsolado, marginTop: 20, width: 320}} placeholder="Título do novo treino" value={nomeTreino} onChangeText={nome => setNomeTreino(nome)}/>
                <TextInput style={{...styles.inputIsolado, marginTop: 10, width: 320}} placeholder="Coloque no mínimo um aparelho" value={aparelho} onChangeText={aparelho => setAparelho(aparelho)}/>
                <TextInput style={{...styles.inputIsolado, marginTop: 10, width: 320}} placeholder="Repetições" keyboardType="number-pad" value={repeticao ? repeticao.toString() : undefined} onChangeText={repeticao => setRepeticao(parseInt(repeticao) || 0)}/>
                <TextInput style={{...styles.inputIsolado, marginTop: 10, width: 320}} placeholder="Séries"keyboardType="number-pad" value={serie ? serie.toString() : undefined} onChangeText={serie => setSerie(parseInt(serie) || 0)}/>
                
                <TouchableOpacity style={{...styles.btnCadastro, width: 320}} onPress={criarTreino}><Text style={{...styles.btnText}}>Adicionar</Text></TouchableOpacity>
                

              </View>
             
          </View>
      </ScrollView>
      </>
    ) : (<View style={{...styles.bg, height: 740}}/>)
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