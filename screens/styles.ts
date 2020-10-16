import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    bg: {
      backgroundColor: '#CC8400'
    },
    container: {
      paddingLeft: 20,
      paddingVertical: 20,
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
      width: 160,
      paddingHorizontal: 10,
      marginVertical: 20,
      marginRight: 20
    },
    inputIsolado: {
      borderWidth: 1,
      borderColor: "gray",
      backgroundColor: "#fff",
      padding: 0,
      width: 290,
      paddingHorizontal: 10,
      marginVertical: 20,
      marginRight: 20
    },
    inputSemLargura: {
        borderWidth: 1,
        borderColor: "gray",
        backgroundColor: "#fff",
        padding: 0,
        paddingHorizontal: 10,
        marginVertical: 20,
        marginRight: 20
      },
      inputSignUp: {
        borderWidth: 1,
              borderColor: "gray",
              backgroundColor: "#fff",
              padding: 0,
              paddingHorizontal: 10,
              marginVertical: 20,
              width: 130,
              marginRight: 20
      },
      aparelhoText: {
        maxWidth: 180,
        minWidth: 180
      },
          texto: {
              fontSize: 20,
              textAlign: "center",
              paddingRight: 20
            },
          btnEntrar: {
      backgroundColor: "green",
      padding: 10,
      alignItems: "center",
      marginVertical: 10,
      width: 290
    },
    btnCadastro: {
      backgroundColor: "#1B82B3",
      padding: 10,
      alignItems: "center",
      marginVertical: 10,
      width: 290,
      borderRadius: 4
    },
    btnSair: {
        backgroundColor: "#E32C22",
        padding: 10,
        alignItems: "center",
        marginVertical: 10,
        width: 290,
        borderRadius: 4
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
