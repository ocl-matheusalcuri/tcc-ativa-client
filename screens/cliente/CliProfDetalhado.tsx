import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image, Alert, Linking } from 'react-native';

import { styles } from '../styles';

import { Text, View } from '../../components/Themed';

import { AuthContext } from '../../contexts/auth';
import { SocialIcon  } from 'react-native-elements';


import RNPickerSelect from 'react-native-picker-select';
import { TextInputMask } from 'react-native-masked-text';

import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

import api from '../../services/api';
import { ScrollView } from 'react-native-gesture-handler';

import { SERVER_URL } from '../../url';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

//@ts-ignore
export default function CliProfDetalhado({route, navigation}) {

    const { personalId } = route.params;

    const [personal, setPersonal] = useState<any>();

    async function getAlunoInfo() {
        await api.get(`${SERVER_URL}/api/personalModel/getById`, {
        params: {
            userId: personalId
        }
        }).then(response => {
        setPersonal(response.data);
        })
    }

    useEffect(() => {
        getAlunoInfo();
    }, [navigation]);


    return personal ? (
        <ScrollView>
           <View style={{...styles.container, ...styles.bg}}>
            <Image source={{uri: personal?.fotoUrl ? personal?.fotoUrl : `https://uploadofototcc.s3.sa-east-1.amazonaws.com/default.png`, cache:"reload"}} style={{width: 150, height: 150, borderRadius: 400/ 2}}/>
            <View style={{...styles.bg, marginTop: 30}}>
                <View style={{...styles.bg, ...styles.row}}>
                    <Text style={{...styles.profText, fontWeight: "bold"}}>Nome:   </Text>
                    <Text style={{...styles.profText}}>{personal.nome}</Text>
                </View>
                
                <View style={{...styles.bg, ...styles.row}}>
                    <Text style={{...styles.profText, fontWeight: "bold"}}>Nascimento:   </Text>
                    <Text style={{...styles.profText}}>{personal.nascimento}</Text>
                </View>
              
                <View style={{...styles.bg, ...styles.row}}>
                    <Text style={{...styles.profText, fontWeight: "bold"}}>Email:   </Text>
                    <Text style={{...styles.profText}}>{personal.email}</Text>
                </View>

                <View style={{...styles.bg, ...styles.row}}>
                    <Text style={{...styles.profText, fontWeight: "bold"}}>Celular:   </Text>
                    <Text style={{...styles.profText}}>{personal.celular}</Text>
                </View>

              
                <View style={{...styles.bg, ...styles.row}}>
                    <Text style={{...styles.profText, fontWeight: "bold"}}>CREF:   </Text>
                    <Text style={{...styles.profText}}>{personal.cref}</Text>
                </View>

                <View style={{...styles.bg, ...styles.row}}>
                    <Text style={{...styles.profText, fontWeight: "bold"}}>Especialidade:   </Text>
                    <Text style={{...styles.profText}}>{personal.especializacao}</Text>
                </View>
              
                <View style={{...styles.bg, ...styles.row}}>
                    <Text style={{...styles.profText, fontWeight: "bold"}}>Faixa etário foco:   </Text>
                    <Text style={{...styles.profText}}>{personal.faixaEtaria}</Text>
                </View>

                <View style={{...styles.bg, ...styles.row}}>
                    <Text style={{...styles.profText, fontWeight: "bold"}}>Foco:   </Text>
                    <Text style={{...styles.profText}}>{personal.foco}</Text>
                </View>

              <View style={{...styles.profRow, ...styles.bg}}>
                    <SocialIcon
                        type='instagram'
                        onPress={() => Linking.openURL(`https://www.instagram.com/${personal.instagram}/`)}
                    />
                    <SocialIcon
                        type='facebook'
                        onPress={() => Linking.openURL(`https://www.facebook.com/${personal.facebook}/`)}
                    />
              </View>

                <TouchableOpacity style={{...styles.btnWhatsApp}} onPress={() => Linking.openURL(`whatsapp://send?text=Olá ${personal.nome}, tudo bem? Vi seu perfil no *Ativa!* e gostaria de falar mais sobre seus planos e valores!&phone=+55${personal.celular}`)}>
                  <Text style={{...styles.profTextSemMargin}}>Mande um WhatsApp para o personal</Text>
                </TouchableOpacity>

            </View>
            </View>
        </ScrollView>
    ) : (<View/>)
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