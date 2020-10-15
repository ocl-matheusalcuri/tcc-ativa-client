import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';


export default function CliPesquisa() {

  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("Ginástica");
  const [faixaEtaria, setFaixaEtaria] = useState("Idosos");
  const [foco, setFoco] = useState("Fortalecimento");

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
            <Text>Especialidade</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={especialidade}
                  onValueChange={(value) => setEspecialidade(value)}
                  items={especialidadeOpt}
                />
              </View>

              <Text>Faixa etário alvo</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={faixaEtaria}
                  onValueChange={(value) => setFaixaEtaria(value)}
                  items={faixaEtariaOpt}
                />
              </View>

              <Text>Foco</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={foco}
                  onValueChange={(value) => setFoco(value)}
                  items={focoOpt}
                />
              </View>

              <TextInput style={{...styles.input}} placeholder="Procure por nome ou email" onChangeText={nome => setNome(nome)}/>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={() => console.log("chamou")}><Text>Pesquisar</Text></TouchableOpacity>
            </View>

            <ScrollView>
              <View style={{...styles.bg, overflow: "scroll"}}>
                {array.map(index => (
                  <View key={index.value} style={{...styles.bg, ...styles.profs}}>
                  <View style={{...styles.bg}}>
                    <Text>foto</Text>
                  </View>
                  <View style={{...styles.bg, ...styles.itensProf}}>
                    <Text>nome do personal</Text>
                    <Text>email do personal</Text>
                    <Text>telefone do personal</Text>
                  </View>
                  <View style={{...styles.bg}}>
                    <Text>insta</Text>
                  </View>
                </View>
                ))}
                
              </View>
            </ScrollView>
        </View>
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
  profs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  itensProf: {
    marginHorizontal: 40,
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