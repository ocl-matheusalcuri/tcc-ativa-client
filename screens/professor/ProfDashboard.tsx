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
    setAgenda(response.data);
  }

  async function salvarCompromisso() {
    await api.post(`${SERVER_URL}/api/agendaModel/cadastroAgenda`, {nome: titulo, professorId: user?._id, data, hora});
    getPersonalFilter();
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
    setData(compromisso.getDate() +'/'+(compromisso.getMonth()+1)+'/'+compromisso.getFullYear());
    setHora(compromisso.getUTCHours() - 3 + 'h ' + compromisso.getUTCMinutes() + 'min');

    setDate(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const array = [{label: 'Acre', value: 'Acre'},{label: 'Alagoas', value: 'Alagoas'},{label: 'Amapa', value: 'Amapa'},{label: 'Amazonas', value: 'Amazonas'},{label: 'Bahia', value: 'Bahia'},{label: 'Ceara', value: 'Ceara'},{label: 'Distrito Federal', value: 'Distrito Federal'},{label: 'Espirito Santo', value: 'Espirito Santo'},{label: 'Goias', value: 'Goias'},{label: 'Maranhao', value: 'Maranhao'},{label: 'Mato Grosso', value: 'Mato Grosso'},{label: 'Mato Grosso do Sul', value: 'Mato Grosso do Sul'},{label: 'Minas Gerais', value: 'Minas Gerais'},{label: 'Para', value: 'Para'},{label: 'Paraiba', value: 'Paraiba'},{label: 'Parana', value: 'Parana'},{label: 'Pernambuco', value: 'Pernambuco'},{label: 'Piaui', value: 'Piaui'},{label: 'Rio de Janeiro', value: 'Rio de Janeiro'},{label: 'Rio Grande do Norte', value: 'Rio Grande do Norte'},{label: 'Rio Grande do Sul', value: 'Rio Grande do Sul'},{label: 'Rondonia', value: 'Rondonia'},{label: 'Roraima', value: 'Roraima'},{label: 'Santa Catarina', value: 'Santa Catarina'},{label: 'Sao Paulo', value: 'Sao Paulo'},{label: 'Sergipe', value: 'Sergipe'},{label: 'Tocantins', value: 'Tocantins'}]

    return (
        <View style={{...styles.container, ...styles.bg}}>
          <View style={{...styles.bg, marginBottom: 40}}>
            <TextInput style={{...styles.inputIsolado}} placeholder="Título do evento" onChangeText={titulo => setTitulo(titulo)}/>
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
            <ScrollView>
            {agenda && <View style={{...styles.bg}}>
              
                {agenda.map((value: any, index: any) => (
                  <View key={index} style={{...styles.bg, ...styles.agendaBox}}>
                    <TouchableOpacity style={{position: "absolute", left: 10, top: "30%"}} onPress={() => deletarCompromisso(value?._id)}><Icon name="close" size={20} color="#E32C22" /></TouchableOpacity>
                    <Text style={{...styles.btnText}}>{value.nome}</Text>
                    <Text style={{...styles.btnText}}>{value.data} às {value.hora}</Text>
                  </View>
                ))}
              
            </View>}
            </ScrollView>

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