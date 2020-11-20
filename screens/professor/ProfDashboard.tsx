import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, Platform, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

import { styles } from '../styles';

import { AuthContext } from '../../contexts/auth';

import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../services/api';
import { SERVER_URL } from '../../url';
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();


function compare(a: any, b: any, field: "data" | "hora") {
  // Use toUpperCase() to ignore character casing
  const bandA = a.data.toUpperCase();
  const bandB = b.data.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}

//@ts-ignore
export default function ProfDashboard({navigation}) {
  const { signOut, user, type } = React.useContext(AuthContext);

  const [date, setDate] = useState(new Date(Date.now()));
  const [data, setData] = useState<any>();
  const [hora, setHora] = useState<any>();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"date" | "time">('date');
  const [titulo, setTitulo] = useState("");
  const [agenda, setAgenda] = useState<any>()

  async function getPersonalFilter() {
    const response = await api.get(`${SERVER_URL}/api/agendaModel/getAgenda`, {
      params: {  professorId: user?._id }
    });
    const eventos = response.data.sort(function(a: any, b: any) {
      var aa = a.data.split('/').reverse().join();
      var bb = b.data.split('/').reverse().join();
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
  });
    setAgenda(eventos);
  }

  async function salvarCompromisso() {
    await api.post(`${SERVER_URL}/api/agendaModel/cadastroAgenda`, {nome: titulo, professorId: user?._id, data, hora});
    getPersonalFilter();
    setTitulo("");
    setData("");
    setHora("");
  }

  async function deletarCompromisso(agendaId: string) {
    await api.delete(`${SERVER_URL}/api/agendaModel/deletarAgenda`, {
      params: {
        agendaId: agendaId
      }
    });
    getPersonalFilter();
  }

  useEffect(() => {
    getPersonalFilter();
  }, [navigation])

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    const compromisso = new Date(currentDate);
    setData(("0" + compromisso.getDate()).slice(-2) +'/'+("0" + (compromisso.getMonth()+1)).slice(-2) +'/'+compromisso.getFullYear());

    let compromissoHora = compromisso.getUTCHours() - 3;
    if(compromissoHora === -3) compromissoHora = 21;
    if(compromissoHora === -2) compromissoHora = 22;
    if(compromissoHora === -1) compromissoHora = 23;
    setHora(("0" + compromissoHora).slice(-2) + 'h ' + ("0" + compromisso.getUTCMinutes()).slice(-2) + 'min');


    setDate(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

    return (
        <View style={{...styles.container, ...styles.bg}}>
          <View style={{...styles.bg, marginBottom: 40}}>
            <TextInput style={{...styles.inputIsolado, marginTop: 20}} value={titulo} placeholder="Título do evento" onChangeText={titulo => setTitulo(titulo)}/>
            <Text style={{...styles.btnText}}>Dia selecionado: {data}</Text>
            <TouchableOpacity style={{...styles.btnCadastro}} onPress={showDatepicker}><Text style={{...styles.btnText}}>Selecione o dia</Text></TouchableOpacity>
            <Text style={{...styles.btnText}}>Horário selecionado: {hora}</Text>
            <TouchableOpacity style={{...styles.btnCadastro}} onPress={showTimepicker}><Text style={{...styles.btnText}}>Seleciona a hora</Text></TouchableOpacity>
            <TouchableOpacity style={{...styles.btnCadastro}} onPress={salvarCompromisso}><Text style={{...styles.btnText}}>Salvar</Text></TouchableOpacity>

            <View style={{...styles.bg}}>
            {show && <DateTimePicker
              testID="dateTimePicker"
              value={date}  
              mode={mode}
              display="default"
              onChange={onChange}
            />}
            </View>
            </View>
            
            {agenda && agenda.length > 0 ? 
            
            (<ScrollView>
            <View style={{...styles.bg, paddingBottom: 50, paddingRight: 23}}>
                {agenda.map((value: any, index: any) => (
                  <View key={index} style={{...styles.bg, ...styles.agendaBox}}>
                    <TouchableOpacity style={{...styles.agendaBtn}} onPress={() => deletarCompromisso(value?._id)}><Icon name="close" style={{paddingTop: "100%"}} size={20} color="#992D2D" /></TouchableOpacity>
                    <View style={{...styles.agendaBtn, zIndex: 9}}/>
                    <Text style={{...styles.btnText, ...styles.agendaConteudo}}>{value.nome}</Text>
                    <Text style={{...styles.btnText, ...styles.agendaConteudo}}>{value.data} às {value.hora}</Text>
                  </View>
                ))}
              
            </View>
            </ScrollView>) : agenda === undefined ?
            (<View style={{...styles.bg, ...styles.container}}/>) :
            (
              <View style={{...styles.bg, marginTop: 50}}>
                <Text style={{...styles.btnText, fontSize: 20, marginRight: 20}}>Você não possui nenhum evento!</Text>
              </View>
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