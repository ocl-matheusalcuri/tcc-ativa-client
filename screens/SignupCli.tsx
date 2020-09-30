import React from "react";
import { StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useState } from "react";

//@ts-ignore



export default function SignupCli({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.texto}>Crie já sua conta e ativa!</Text>
      <TextInput style={styles.input1} placeholder="Nome" />
      <TextInput style={styles.input2} placeholder="Nascimento" />
      <TextInput style={styles.input3} placeholder="Email" />
      <TextInput style={styles.input4} placeholder="Celular" />
      <TextInput secureTextEntry={true} style={styles.input5} placeholder="Senha" />
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
      <TouchableOpacity style={styles.botao}  onPress={() => navigation.navigate("Login")}><Text style={styles.textbt}>Criar Conta</Text></TouchableOpacity>
      <TouchableOpacity style={styles.botao2} onPress={() => navigation.navigate("Login")}><Text style={styles.textbt}>Voltar para Login</Text></TouchableOpacity>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
  logo: {
    width: 250,
    height: 250,
    alignItems: 'center',
    marginTop: -150,
    marginBottom: 10,
  },
  input1: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'stretch',
    marginLeft: 30,
  },
  input2: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'flex-end',
    marginTop: -38,
    marginRight: 30,
  },
  input3: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 30,
  },
  input4: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'flex-end',
    marginTop: -39,
    marginRight: 30,
  },
  input5: {
    padding: 10,
    width: 270,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 14,
    marginBottom: 3,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'gray',
    paddingRight: 30, 
    fontWeight: 'bold',
  },
   picker: {
    padding: 10,
    width: 270,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 10,
    color:'gray',
    marginBottom: -60
    },
  picker2: {
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
    marginBottom: 20,
    marginTop: -100,
    justifyContent: 'flex-end'
  },
  botao: {
    width: 300,
    height: 40,
    backgroundColor: '#FF8C00',
    marginTop: 200,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: -100,
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
    marginBottom: -100,
  }, 
    textbt: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});