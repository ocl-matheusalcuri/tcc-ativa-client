import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';

import { styles } from '../screens/styles';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../contexts/auth';

//@ts-ignore
export default function Login({route, navigation}) {
  let statusParam = route.params?.status || ""
  const { signed, signIn, user, signOut } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");


  useEffect(() => {
    setStatus(statusParam);
  }, [route.params?.status])

  async function handleSignIn() {
    navigation.setParams({status: ""})
    setStatus("");
    setError("");
   const login = await signIn(email, senha);
   if(login) {
     setError(login);
     setTimeout(function(){ setError(""); }, 3000);
    }
  };

  async function handleSignOut() {
    await signOut();
  }
    return (
      <ScrollView>
        <View style={{...styles.container, ...styles.bg}}>
            <View style={{...styles.bg}}>
              <Image source={require('../assets/images/logo.png')} style={{width: 300, height: 300, borderRadius: 400/ 2}}/>
              {!!error && <Text style={{...styles.error}}>{error}</Text>}
              {!!status && <Text style={{...styles.sucesso}}>{status}</Text>}
              <TextInput style={{...styles.inputIsolado}} placeholder="Email" onChangeText={email => setEmail(email)}/>
              <TextInput style={{...styles.inputIsolado}} secureTextEntry={true} placeholder="Senha" onChangeText={senha => setSenha(senha)}/>
              <TextInput/>
              <TouchableOpacity style={{...styles.btnEntrar}} onPress={handleSignIn}><Text style={{...styles.btnText}}>Entrar</Text></TouchableOpacity>
              <Text style={{...styles.texto}}>OU</Text>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={() => navigation.navigate("SignupCli")}><Text style={{...styles.btnText}}>Criar conta como Aluno</Text></TouchableOpacity>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={() => navigation.navigate("SignupProf")}><Text style={{...styles.btnText}}>Criar conta como Professor</Text></TouchableOpacity>
              {/* <TouchableOpacity onPress={handleSignOut}><Text>Sair</Text></TouchableOpacity> */}
            </View>
        </View>
      </ScrollView>
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