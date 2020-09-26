import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

//@ts-ignore
export default function SignupCli({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
              <Text>signup cliente</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text>Voltar ao login</Text></TouchableOpacity>
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
    opcao: {
      fontSize: 30,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 30,
      marginTop: 30,
    },
  });