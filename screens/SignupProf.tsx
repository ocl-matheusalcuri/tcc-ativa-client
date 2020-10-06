import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../contexts/auth';

//@ts-ignore
export default function SignupProf({navigation}) {
  const { signUp, user, type } = React.useContext(AuthContext);

  const [prof, setProf] = useState<any>({ 
    password: "12345", 
    nome: "Professor 1", 
    celular: "(00) 00000-0000", 
    email: "professor1@hotmail.com", 
    nascimento: "00/00/0000", 
    instagram: "professor1", 
    facebook: "profacessor1", 
    cref: "1233456788", 
    foco: "Fortalecimento", 
    especializacao: "Natação", 
    faixaEtaria: "Idosos"
  });

  async function handleSignUp() {
    await signUp(prof, "personal");
    navigation.navigate("Login");
  }

    return (
        <View style={styles.container}>
            <View>
              <Text>signup professor</Text>
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