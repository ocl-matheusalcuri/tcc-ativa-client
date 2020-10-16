import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function ProfDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Sua Dashboard</Text>
      <Text style={styles.texto2}>Hoje é 15/10/2020</Text>
      <TouchableOpacity style={styles.textoclic} /*onpress guia aluno*/><Text style={styles.textbt}>Você tem 25 alunos</Text></TouchableOpacity>
      <TouchableOpacity style={styles.textoclic2} /* guia aluno filtrado sem treino*/><Text style={styles.textbt}>Existem X Alunos sem treinos</Text></TouchableOpacity>
      <TouchableOpacity style={styles.textoclic3} /* guia aluno filtrado sem treino*/><Text style={styles.textbt}>Existem X novos contatos</Text></TouchableOpacity>



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
  texto: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 100,
    marginTop: -200,
    justifyContent: 'flex-end'
  },
  texto2: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 70,
    marginTop: -80,
    justifyContent: 'flex-end'
  },
  textoclic: {
    marginLeft: -110,
    marginTop: 10,
  },
  textoclic2: {
    marginLeft: 10,
    marginTop: 100,
  },
  textoclic3: {
    marginLeft: -30,
    marginTop: 100,
  },
  textbt: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});