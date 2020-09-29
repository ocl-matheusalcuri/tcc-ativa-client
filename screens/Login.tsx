import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../contexts/auth';

//@ts-ignore
export default function Login({navigation}) {
  const { signed, signIn, user, signOut } = React.useContext(AuthContext);

  async function handleSignIn() {
    await signIn("eliasjunior6@teste.com", "12345");
  };

  async function handleSignOut() {
    await signOut();
  }
    return (
        <View style={styles.container}>
            <View>
              <Text>login screen</Text>
              <TouchableOpacity onPress={handleSignIn}><Text>Entrar</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SignupCli")}><Text>Criar conta como Aluno</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SignupProf")}><Text>Criar conta como Professor</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleSignOut}><Text>Sair</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'gray'
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