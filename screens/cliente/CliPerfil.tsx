import * as React from 'react';
import { StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import iconSet from '@expo/vector-icons/build/Fontisto';


export default function CliPerfil({email}: any) {
    return (
      <View style={styles.container}>
      <Text style={styles.texto}>Seu perfil $Nome</Text>
      <Image style={styles.fotoperf} source={require('C:/Users/pietr/Desktop/TCC/tcc3/assets/images/perfil.png')}></Image>
      <TouchableOpacity style={styles.alterarfoto} /*onpress save*/><Text style={styles.textbt}>Alterar Foto</Text></TouchableOpacity>
      <TextInput style={styles.input1} placeholder="Nome" />
      <TextInput style={styles.input2} placeholder="Nascimento" />
      <TextInput style={styles.input3} placeholder="Email" />
      <TextInput style={styles.input4} placeholder="Celular" />
      <View style={styles.picker}>
      <RNPickerSelect
            placeholder={{label:"Selecione seu objetivo...",value:null,inputLabel:null}}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Emagrecer', value: 'Emagrecer' },
                { label: 'Ganhar massa', value: 'Ganhar massa' },
                { label: 'Físico', value: 'Físico' },]}/>
      </View>
      <View style={styles.picker2}>
      <RNPickerSelect
            placeholder={{label:"Selecione seu Preparo Físico...",value:null,inputLabel:null}}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Emagrecer', value: 'Emagrecer' },
                { label: 'Ganhar massa', value: 'Ganhar massa' },
                { label: 'Físico', value: 'Físico' },]}/>
      </View>
      <View style={styles.picker3}>
      <RNPickerSelect
            placeholder={{label:"Selecione seu nível de saúde...",value:null,inputLabel:null}}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Emagrecer', value: 'Emagrecer' },
                { label: 'Ganhar massa', value: 'Ganhar massa' },
                { label: 'Físico', value: 'Físico' },]}/>
      </View>
      <View style={styles.picker4}>
      <RNPickerSelect
            placeholder={{label:"Por quantas horas você pode treinar...",value:null,inputLabel:null}}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Emagrecer', value: 'Emagrecer' },
                { label: 'Ganhar massa', value: 'Ganhar massa' },
                { label: 'Físico', value: 'Físico' },]}/>
      </View>
      <TouchableOpacity style={styles.botao}  /*onpress save*/><Text style={styles.textbt}>Salvar alterações</Text></TouchableOpacity>
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
  fotoperf:{
    width:160,
    height:160,
    borderRadius:100,
    marginLeft:-200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  alterarfoto:  {
    marginLeft: -200,
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  opcao: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  input1: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    marginLeft: 180,
    marginBottom: 110,
    marginTop: -180
  },
  input2: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    marginLeft: 180,
    marginBottom: 100,
    marginTop: -100,
  },
  input3: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    marginLeft: 180,
    marginBottom: 100,
    marginTop: -90,
  },
  input4: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    marginLeft: 180,
    marginBottom: 100,
    marginTop: -90,
  },
   picker: {
    padding: 10,
    width: 270,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    color:'gray',
    marginBottom: -10,
    marginTop: -50,
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
      color:'gray',
      marginBottom: -60
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
    color:'gray',
    marginBottom: -60
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
      color:'gray',
      marginBottom: -60
      },
  texto: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 50,
    marginTop: -100,
    justifyContent: 'flex-end'
  },
  botao: {
    width: 300,
    height: 40,
    backgroundColor: '#FF8C00',
    marginTop: 180,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom:-100
  },  
  botao2: {
    width: 300,
    height: 40,
    backgroundColor: '#FF8C00',
    marginTop: 110,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: -50,
  }, 
    textbt: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  });