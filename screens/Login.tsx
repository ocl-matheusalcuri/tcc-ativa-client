import * as React from 'react';
import { StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { BottomTabBar } from '@react-navigation/bottom-tabs';


//@ts-ignore
export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo} 
        />
        <TextInput style={styles.input} placeholder="E-mail" />
        <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha" />
        <TouchableOpacity style={styles.botao}><Text style={styles.textbt}>Login</Text></TouchableOpacity>

        <Text style={styles.opcao}> OU </Text>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("SignupCli")}><Text style={styles.textbt}>Criar conta como Aluno</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("SignupProf")}><Text style={styles.textbt}>Criar conta como Professor</Text></TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  logo: {
    width: 300,
    height: 300,
    marginTop: -200,
  },
  input: {
    marginTop: 10,
    padding: 10,
    width: 300,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
  },
  bg: {
    backgroundColor: 'orange',
  },
  opcao: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  botao: {
    width: 300,
    height: 40,
    backgroundColor: '#FF8C00',
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
  textbt: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});