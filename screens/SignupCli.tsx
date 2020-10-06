import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../contexts/auth';

//@ts-ignore
export default function SignupCli({navigation}) {
  const { signUp, user, type } = React.useContext(AuthContext);

  const [aluno, setAluno] = useState<any>({ 
    password: "12345", 
    nome: "Aluno 1", 
    celular: "(11) 11111-1111", 
    email: "aluno1@hotmail.com", 
    nascimento: "11/11/1111", 
    hrAtiva: "Muita", 
    saude: "Regular", 
    prepFisico: "Sedentário", 
    objetivo: "Emagrecer" 
  });

  async function handleSignUp() {
    await signUp(aluno, "aluno");
    navigation.navigate("Login");
  }
  
    return (
        <View style={styles.container}>
            <View>
              <Text>signup cliente</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text>Voltar ao login</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleSignUp}><Text>Criar conta</Text></TouchableOpacity>
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