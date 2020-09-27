import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

import { AuthContext } from '../../contexts/auth';

export default function CliPerfil({email}: any) {
  const { signOut, user } = React.useContext(AuthContext);

  async function handleSignOut() {
    await signOut();
  }

    return (
        <View style={{...styles.container, ...styles.bg}}>
            <View style={styles.bg}>
              <Text>perfil: {user?.name}</Text>
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
    },
    bg: {
      backgroundColor: '#808080'
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