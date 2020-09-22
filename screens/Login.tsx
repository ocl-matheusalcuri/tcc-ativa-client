import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

//@ts-ignore
export default function Login({navigation}) {
    return (
        <View style={styles.container}>
            <View>
              <Text>login screen</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignupCli")}><Text>Criar conta como Aluno</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SignupProf")}><Text>Criar conta como Professor</Text></TouchableOpacity>
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