import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { AuthContext } from '../../contexts/auth';

export default function CliRelation() {
  const { signOut, user, type } = React.useContext(AuthContext);

  const [foto, setFoto] = useState<any>(user?.temFoto ? `http://192.168.0.45:3001/${user?.id}.png?${Date.now()}` : `http://192.168.0.45:3001/default.png?${Date.now()}`);
  const [imgBase64, setImgBase64] = useState<any>();

  const array = [{label: 'Acre', value: 'Acre'},{label: 'Alagoas', value: 'Alagoas'},{label: 'Amapa', value: 'Amapa'},{label: 'Amazonas', value: 'Amazonas'}]
  const array2 = [{label: 'Acre', value: 'Acre'},{label: 'Alagoas', value: 'Alagoas'},{label: 'Amapa', value: 'Amapa'},{label: 'Amazonas', value: 'Amazonas'},{label: 'Bahia', value: 'Bahia'},{label: 'Ceara', value: 'Ceara'},{label: 'Distrito Federal', value: 'Distrito Federal'},{label: 'Espirito Santo', value: 'Espirito Santo'},{label: 'Goias', value: 'Goias'},{label: 'Maranhao', value: 'Maranhao'},{label: 'Mato Grosso', value: 'Mato Grosso'},{label: 'Mato Grosso do Sul', value: 'Mato Grosso do Sul'},{label: 'Minas Gerais', value: 'Minas Gerais'},{label: 'Para', value: 'Para'},{label: 'Paraiba', value: 'Paraiba'},{label: 'Parana', value: 'Parana'},{label: 'Pernambuco', value: 'Pernambuco'},{label: 'Piaui', value: 'Piaui'},{label: 'Rio de Janeiro', value: 'Rio de Janeiro'},{label: 'Rio Grande do Norte', value: 'Rio Grande do Norte'},{label: 'Rio Grande do Sul', value: 'Rio Grande do Sul'},{label: 'Rondonia', value: 'Rondonia'},{label: 'Roraima', value: 'Roraima'},{label: 'Santa Catarina', value: 'Santa Catarina'},{label: 'Sao Paulo', value: 'Sao Paulo'},{label: 'Sergipe', value: 'Sergipe'},{label: 'Tocantins', value: 'Tocantins'}]



    return (
        <View style={{...styles.container, ...styles.bg}}>
            <View style={{...styles.bg, ...styles.conjuntoInput, marginBottom: 50}}>
                <View  style={{...styles.bg, ...styles.foto}}>
                  <Image source={{uri: foto, cache:"reload"}} style={{width: 80, height: 80}}/>
                </View>

                <View  style={{...styles.bg, marginLeft: 20}}>
                  <Text>Nome personal</Text>
                  <Text style={{marginVertical: 10}}>Email personal</Text>
                  <Text>Telefone personal</Text>
                </View>
              </View>

              <ScrollView>
              <View style={{...styles.bg}}>
                {array2.map(index => (
                  <View key={index.value} style={{...styles.bg}}>
                  <Text style={{marginBottom: 15}}>NOME DO TESTE</Text>
                  <View style={{...styles.bg, ...styles.profs}}>
                    <Text>Aparelho</Text>
                    <Text style={{marginHorizontal: 50}}>Série</Text>
                    <Text>Repetições</Text>
                  </View>
                  
                    <View style={{...styles.bg, marginBottom: 50}}>
                      {array.map(index => (
                        <View key={index.value} style={{...styles.bg, ...styles.profs}}>
                        <View style={{...styles.bg}}>
                          <Text>Esteira</Text>
                        </View>
                        <View style={{...styles.bg}}>
                          <Text>3</Text>
                        </View>
                        <View style={{...styles.bg}}>
                          <Text>15</Text>
                        </View>
                      </View>
                      ))}
                    </View>
                </View>
                
                ))}
                
              </View>
              </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#CC8400'
  },
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  foto: {
    alignItems: "center",
  },
  profs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  itensProf: {
    marginHorizontal: 40,
  },
  conjuntoInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  picker: {
    width: 290, 
    height: 30, 
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    color: "#000",
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
    padding: 0,
    width: 290,
    paddingHorizontal: 10,
    marginVertical: 20,
    marginRight: 20
  },
  btnCadastro: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    marginVertical: 10
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