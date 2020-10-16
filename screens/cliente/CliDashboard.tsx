import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function CliDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Sua Dashboard</Text>
      <Text style={styles.texto2}>Hoje é 15/10/2020 e seu treino é o A</Text>
      <Text style={styles.texto3}>Treino A</Text>
      <View style={styles.container2}>
        <Text style={styles.texto4}>Aquecimento</Text>
        <Text style={styles.texto5}>Esteira</Text><Text style={styles.texto6}>10 minutos</Text><Text style={styles.texto7}>1 série</Text>
        <Text style={styles.texto8}>Elíptico</Text><Text style={styles.texto9}>10 minutos</Text><Text style={styles.texto10}>1 série</Text>
        <Text style={styles.texto11}>Bicicleta</Text><Text style={styles.texto12}>10 minutos</Text><Text style={styles.texto13}>1 série</Text>
      </View>
      <View style={styles.container3}>
        <Text style={styles.texto4}>Posteriores</Text>
        <Text style={styles.texto5}>Esteira</Text><Text style={styles.texto6}>10 minutos</Text><Text style={styles.texto7}>1 série</Text>
        <Text style={styles.texto8}>Elíptico</Text><Text style={styles.texto9}>10 minutos</Text><Text style={styles.texto10}>1 série</Text>
        <Text style={styles.texto11}>Bicicleta</Text><Text style={styles.texto12}>10 minutos</Text><Text style={styles.texto13}>1 série</Text>
      </View>
      <View style={styles.container4}>
        <Text style={styles.texto4}>Anteriores</Text>
        <Text style={styles.texto5}>Esteira</Text><Text style={styles.texto6}>10 minutos</Text><Text style={styles.texto7}>1 série</Text>
        <Text style={styles.texto8}>Elíptico</Text><Text style={styles.texto9}>10 minutos</Text><Text style={styles.texto10}>1 série</Text>
        <Text style={styles.texto11}>Bicicleta</Text><Text style={styles.texto12}>10 minutos</Text><Text style={styles.texto13}>1 série</Text>
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
  container2: {
    backgroundColor: 'orange',
    marginTop: 60,
    marginBottom: -200
  },
  container3: {
    backgroundColor: 'orange',
    marginTop: 300,
    marginBottom: -400
  },
  container4: {
    backgroundColor: 'orange',
    marginTop: 500,
    marginBottom: -650
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
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 50,
    marginTop: -700,
    justifyContent: 'flex-end'
  },
  texto2: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 50,
    marginTop: -20,
    justifyContent: 'flex-end'
  },
  texto3: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 50,
    marginTop: -20,
    justifyContent: 'flex-end',
    marginLeft: -270
  },
  texto4: {
    fontSize: 35,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginTop: -100,
    marginBottom: 85,
  },
  texto5: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: -75,
    marginLeft: -21
  },
  texto6: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -60,
    justifyContent: 'flex-end',
    marginLeft: -10
  },
  texto7: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -28,
    justifyContent: 'flex-end',
    marginLeft: 230
  },
  texto8: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 5,
    justifyContent: 'flex-end',
    marginLeft: -270
  },
  texto9: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -30,
    justifyContent: 'flex-end',
    marginLeft: -10
  },
  texto10: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -30,
    justifyContent: 'flex-end',
    marginLeft: 230
  },
  texto11: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 5,
    justifyContent: 'flex-end',
    marginLeft: -270
  },
  texto12: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -30,
    justifyContent: 'flex-end',
    marginLeft: 93
  },
  texto13: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -30,
    justifyContent: 'flex-end',
    marginLeft: 230
  },
});