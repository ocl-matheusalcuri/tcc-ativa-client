import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function CliRelation() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Aqui estão os seus Personal</Text>
      <TextInput style={styles.input} placeholder="Procure por email,nome ou telefone" />
      <TouchableOpacity style={styles.botao}  /*onpress save*/><Text style={styles.textbt}>Buscar</Text></TouchableOpacity>
      <View style={styles.containerscr}>
        <Image style={styles.fotoperf} source={require('C:/Users/pietr/Desktop/TCC/tcc3/assets/images/perfil.png')}></Image>
        <Text style={styles.texto2}>Pietro Rey</Text>
        <Text style={styles.texto3}>tcc@acabalogo.com</Text>
        <Text style={styles.texto4}>(13)4002-8922</Text>
        <TouchableOpacity style={styles.botao2}  /*onpress save*/><Text style={styles.textbt}>Insta</Text></TouchableOpacity>
      </View>
      <View style={styles.containerscr2}>
        <Image style={styles.fotoperf} source={require('C:/Users/pietr/Desktop/TCC/tcc3/assets/images/perfil.png')}></Image>
        <Text style={styles.texto2}>Pietro Rey</Text>
        <Text style={styles.texto3}>tcc@acabalogo.com</Text>
        <Text style={styles.texto4}>(13)4002-8922</Text>
        <TouchableOpacity style={styles.botao2}  /*onpress save*/><Text style={styles.textbt}>Insta</Text></TouchableOpacity>
      </View>
      <View style={styles.containerscr3}>
        <Image style={styles.fotoperf} source={require('C:/Users/pietr/Desktop/TCC/tcc3/assets/images/perfil.png')}></Image>
        <Text style={styles.texto2}>Pietro Rey</Text>
        <Text style={styles.texto3}>tcc@acabalogo.com</Text>
        <Text style={styles.texto4}>(13)4002-8922</Text>
        <TouchableOpacity style={styles.botao2}  /*onpress save*/><Text style={styles.textbt}>Insta</Text></TouchableOpacity>
      </View>
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
  containerscr: {
    backgroundColor: 'orange',
    marginTop: 150,
    marginBottom: -130,
  },
  containerscr2: {
    backgroundColor: 'orange',
    marginTop: 180,
    marginBottom: -160,
  },
  containerscr3: {
    backgroundColor: 'orange',
    marginTop: 210,
    marginBottom: -210,
  },
  fotoperf: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: -120,
  },
  texto2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: -60,
    marginLeft: -40,
  },
  texto3: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: -40,
  },
  texto4: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: -40,
  },
  texto: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: -50,
    justifyContent: 'flex-end',
    marginTop: -600,
  },
  input: {
    padding: 10,
    width: 300,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 80,
    marginLeft: -70,
  },
  botao: {
    width: 65,
    height: 40,
    backgroundColor: '#FF8C00',
    marginTop: -40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: -100,
    marginRight: -310
  },
  botao2: {
    width: 65,
    height: 40,
    backgroundColor: '#FF8C00',
    marginTop: -40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: -30,
    marginLeft: 150,
    marginRight: -100,
  },
  textbt: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});