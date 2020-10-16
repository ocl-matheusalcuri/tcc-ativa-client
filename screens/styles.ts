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
      minHeight: 780
    },
    error: {
      backgroundColor: "#ff9191",
      color: "#870000",
      borderWidth: 1,
      borderColor: "#ff0000",
      borderRadius: 4,
      textAlign: "center",
      marginBottom: 10,
      paddingVertical: 5
    },
    agendaBox: {
      marginBottom: 20, 
      paddingBottom: 5,
      width: 300, 
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "gray"
    },
    foto: {
      alignItems: "center",
    },
    profs: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10
      },
      itensProf: {
        marginHorizontal: 40,
      },
      agendaCardBg: {
        backgroundColor: "#593100"
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
      paddingHorizontal: 5,
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
      height: 30,
      width: 160,
      paddingHorizontal: 10,
      marginVertical: 20,
      marginRight: 20,
      borderRadius: 5
    },
    inputIsolado: {
      borderWidth: 1,
      borderColor: "gray",
      backgroundColor: "#fff",
      padding: 0,
      height: 30,
      width: 290,
      paddingHorizontal: 10,
      marginVertical: 20,
      marginRight: 20,
      borderRadius: 5
    },
    inputSemLargura: {
        borderWidth: 1,
        borderColor: "gray",
        backgroundColor: "#fff",
        padding: 0,
        paddingHorizontal: 10,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 5
      },
      inputSemAltura: {
        borderWidth: 1,
        borderColor: "gray",
        backgroundColor: "#fff",
        padding: 0,
        height: 30,
        paddingHorizontal: 10,
        marginVertical: 5,
        marginRight: 20,
        borderRadius: 5
      },
      inputSignUp: {
        borderWidth: 1,
              borderColor: "gray",
              backgroundColor: "#fff",
              padding: 0,
              paddingHorizontal: 10,
              marginVertical: 20,
              height: 30,
              width: 130,
              marginRight: 20,
              borderRadius: 5
      },
      aparelhoText: {
        maxWidth: 180,
        minWidth: 180
      },
          texto: {
              fontSize: 20,
              textAlign: "center",
              paddingRight: 20,
              color: "#FFF"
            },
          btnEntrar: {
      backgroundColor: "green",
      padding: 10,
      alignItems: "center",
      marginVertical: 10,
      width: 290
    },
    btnText: {
      color: "#FFF",
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
