import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

//@ts-ignore
export default function SignupProf({navigation}) {
    return (
        <View style={styles.container}>
            <View>
              <Text>signup professor</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text>Voltar ao login</Text></TouchableOpacity>
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