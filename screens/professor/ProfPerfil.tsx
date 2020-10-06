import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Text, View } from '../../components/Themed';

import { AuthContext } from '../../contexts/auth';


export default function ProfPerfil() {

  const { signOut, user } = React.useContext(AuthContext);

  async function handleSignOut() {
    await signOut();
  }

    return (
        <View style={styles.container}>
            <View>
              <Text>perfil prof</Text>
              <TouchableOpacity onPress={handleSignOut}><Text>Sair</Text></TouchableOpacity>
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