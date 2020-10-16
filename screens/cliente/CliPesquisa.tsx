import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';



export default function CliPesquisa() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Encontre o seu Personal</Text>
      <View style={styles.picker}>
        <RNPickerSelect
          placeholder={{ label: "Especialização", value: null, inputLabel: null }}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'Emagrecer', value: 'Emagrecer' },
            { label: 'Ganhar massa', value: 'Ganhar massa' },
            { label: 'Físico', value: 'Físico' },]} />
      </View>
      <View style={styles.picker2}>
        <RNPickerSelect
          placeholder={{ label: "Faixa etária", value: null, inputLabel: null }}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'Emagrecer', value: 'Emagrecer' },
            { label: 'Ganhar massa', value: 'Ganhar massa' },
            { label: 'Físico', value: 'Físico' },]} />
      </View>
      <View style={styles.picker3}>
        <RNPickerSelect
          placeholder={{ label: "Foco", value: null, inputLabel: null }}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'Emagrecer', value: 'Emagrecer' },
            { label: 'Ganhar massa', value: 'Ganhar massa' },
            { label: 'Físico', value: 'Físico' },]} />
      </View>
      <TextInput style={styles.input} placeholder="Procure por email,nome ou telefone" />
      <TouchableOpacity style={styles.botao}  /*onpress save*/><Text style={styles.textbt}>Buscar</Text></TouchableOpacity>
      <View style={styles.containerscr}>
        <Image style={styles.fotoperf} source={require('C:/Users/pietr/Desktop/TCC/tcc3/assets/images/perfil.png')}></Image>
        <Text style={styles.texto2}>Pietro Rey</Text>
        <Text style={styles.texto3}>tcc@acabalogo.com</Text>
        <Text style={styles.texto4}>(13)4002-8922</Text>
        <TouchableOpacity style={styles.botao2}  /*onpress save*/><Text style={styles.textbt}>Insta</Text></TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'orange',
    justifyContent: "center",
  },
  containerscr: {
    backgroundColor: 'orange',
    marginTop: 150,
    marginBottom: -150,
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
  fotoperf: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: -120,
  },
  texto2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: -60,
    marginLeft: -40,
  },
  texto3: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: -40,
  },
  texto4: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: -40,
  },
  picker: {
    padding: 10,
    width: 270,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    color: 'gray',
    marginBottom: -10,
    marginTop: -50,
    marginLeft: -100,
  },
  picker2: {
    padding: 10,
    width: 270,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 25,
    color: 'gray',
    marginBottom: -60,
    marginLeft: -100,
  },
  picker3: {
    padding: 10,
    width: 270,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 75,
    color: 'gray',
    marginBottom: -60,
    marginLeft: -100,
  },
  picker4: {
    padding: 10,
    width: 270,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 75,
    color: 'gray',
    marginBottom: 100,
    marginLeft: -100,
  },
  texto: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 80,
    marginTop: -450,
  },
  input: {
    padding: 10,
    width: 300,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 80,
    marginLeft: -70,
  },
  botao: {
    width: 65,
    height: 40,
    backgroundColor: '#FF8C00',
    marginTop: -40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: -100,
    marginRight: -310
  },
  textbt: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  botao2: {
    width: 65,
    height: 40,
    backgroundColor: '#FF8C00',
    marginTop: -40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: -30,
    marginLeft: 150,
    marginRight: -100,
  },
});