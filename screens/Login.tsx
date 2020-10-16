import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { styles } from '../screens/styles';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../contexts/auth';

//@ts-ignore
export default function Login({navigation}) {
  const { signed, signIn, user, signOut } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
//"aluno1@hotmail.com", "12345"
  async function handleSignIn() {
    await signIn(email, senha);
  };

  async function handleSignOut() {
    await signOut();
  }
    return (
        <View style={{...styles.container, ...styles.bg}}>
            <View style={{...styles.bg}}>
              <Text>login screen</Text>
              <TextInput style={{...styles.inputIsolado}} placeholder="Email" onChangeText={email => setEmail(email)}/>
              <TextInput style={{...styles.inputIsolado}} placeholder="Senha" onChangeText={senha => setSenha(senha)}/>
              <TextInput/>
              <TouchableOpacity style={{...styles.btnEntrar}} onPress={handleSignIn}><Text>Entrar</Text></TouchableOpacity>
              <Text style={{...styles.texto}}>OU</Text>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={() => navigation.navigate("SignupCli")}><Text>Criar conta como Aluno</Text></TouchableOpacity>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={() => navigation.navigate("SignupProf")}><Text>Criar conta como Professor</Text></TouchableOpacity>
              {/* <TouchableOpacity onPress={handleSignOut}><Text>Sair</Text></TouchableOpacity> */}
            </View>
        </View>
    )
}

// const styles = StyleSheet.create({
//     bg: {
//       backgroundColor: '#CC8400'
//     },
//     container: {
//       padding: 20,
//       flex: 1,
//       alignItems: 'center',
//     },
//     input: {
//       borderWidth: 1,
//       borderColor: "gray",
//       backgroundColor: "#fff",
//       padding: 0,
//       paddingHorizontal: 10,
//       marginVertical: 20,
//       height: 30
//     },
//     btnEntrar: {
//       backgroundColor: "green",
//       padding: 10,
//       alignItems: "center",
//       marginVertical: 10
//     },
//     btnCadastro: {
//       backgroundColor: "blue",
//       padding: 10,
//       alignItems: "center",
//       marginVertical: 10
//     },
//     texto: {
//       fontSize: 20,
//       textAlign: "center"
//     },
//     title: {
//       fontSize: 20,
//       fontWeight: 'bold',
//     },
//     separator: {
//       marginVertical: 30,
//       height: 1,
//       width: '80%',
//     },
//   });