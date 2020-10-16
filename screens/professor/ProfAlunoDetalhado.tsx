import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

//@ts-ignore
export default function ProfAlunoDetalhado({route}) {
    const { aluno } = route.params.params;
    return (
        <View style={styles.container}>
            <View>
                <Text>aluno específico: {aluno}</Text>
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