import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { styles } from '../screens/styles';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../contexts/auth';

import RNPickerSelect from 'react-native-picker-select';


//@ts-ignore
export default function SignupCli({navigation}) {
  const { signUp, user, type } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [hrAtiva, sethrAtiva] = useState("Não pratico nenhuma atividade");
  const [saude, setSaude] = useState("Péssima");
  const [prepFisico, setprepFisico] = useState("Sedentário");
  const [objetivo, setObjetivo] = useState("Emagrecer");

  const objetivoOpt = [
    {label: "Emagrecer", value: "Emagrecer"},
    {label: "Fortalecer", value: "Fortalecer"},
    {label: "Ganhar massa", value: "Ganhar massa"}
  ];

  const hrAtivaOpt = [
    {label: "Não pratico nenhuma atividade", value: "Não pratico nenhuma atividade"},
    {label: "Até 5 horas", value: "Até 5 horas"},
    {label: "Até 10 horas", value: "Até 10 horas"},
    {label: "Até 15 horas", value: "Até 15 horas"},
    {label: "Mais de 15 horas", value: "Mais de 15 horas"},
  ];

  const prepFisicoOpt = [
    {label: "Sedentário", value: "Sedentário"},
    {label: "Levemente sedentário", value: "Levemente sedentário"},
    {label: "Regular", value: "Regular"},
    {label: "Atlético", value: "Atlético"},
  ];

  const saudeOpt = [
    {label: "Péssima", value: "Péssima"},
    {label: "Regular", value: "Regular"},
    {label: "Boa", value: "Boa"},
    {label: "Ótima", value: "Ótima"}
  ]



  // const [aluno, setAluno] = useState<any>({ 
  //   password: senha, 
  //   nome: nome, 
  //   celular: celular, 
  //   email: email, 
  //   nascimento: nascimento, 
  //   hrAtiva: "Muita", 
  //   saude: "Regular", 
  //   prepFisico: "Sedentário", 
  //   objetivo: "Emagrecer" 
  // });

  async function handleSignUp() {
    const aluno = {
      password: senha, 
      nome: nome, 
      celular: celular, 
      email: email, 
      nascimento: nascimento, 
      hrAtiva: hrAtiva, 
      saude: saude, 
      prepFisico: prepFisico, 
      objetivo: objetivo 
    }
    await signUp(aluno, "aluno");
    navigation.navigate("Login");
  }

  
    return (
        <View style={{...styles.container, ...styles.bg}}>
            <View style={{...styles.bg}}>
              <View style={{...styles.conjuntoInput, ...styles.bg}}>
                <TextInput style={{...styles.inputSignUp}} placeholder="Nome" onChangeText={nome => setNome(nome)}/>
                <TextInput style={{...styles.inputSignUp}} placeholder="Nascimento" onChangeText={nascimento => setNascimento(nascimento)}/>
              </View>
              <View style={{...styles.conjuntoInput, ...styles.bg}}>
                <TextInput style={{...styles.inputSignUp}} placeholder="Email" onChangeText={email => setEmail(email)}/>
                <TextInput style={{...styles.inputSignUp}} keyboardType="number-pad" placeholder="Celular" onChangeText={celular => setCelular(celular)}/>
              </View>
              <TextInput style={{...styles.inputSignUp, width: 300}} secureTextEntry={true} placeholder="Senha" onChangeText={senha => setSenha(senha)}/>
              
              <Text style={{...styles.btnText}}>Objetivo</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={objetivo}
                  onValueChange={(value) => setObjetivo(value)}
                  items={objetivoOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Preparo físico</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={prepFisico}
                  onValueChange={(value) => setprepFisico(value)}
                  items={prepFisicoOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Saúde</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={saude}
                  onValueChange={(value) => setSaude(value)}
                  items={saudeOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Horas ativas por semana</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={hrAtiva}
                  onValueChange={(value) => sethrAtiva(value)}
                  items={hrAtivaOpt}
                />
              </View>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={() => navigation.navigate("Login")}><Text style={{...styles.btnText}}>Voltar ao login</Text></TouchableOpacity>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={handleSignUp}><Text style={{...styles.btnText}}>Criar conta</Text></TouchableOpacity>
            </View>
        </View>
    )
}

// const styles = StyleSheet.create({
//     bg: {
//       backgroundColor: '#CC8400'
//     },
//     container: {
//       padding: 20,
//       flex: 1,
//       alignItems: 'center',
//     },
//     conjuntoInput: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     picker: {
//       width: 290, 
//       height: 30, 
//       borderWidth: 1,
//       borderColor: "gray",
//       marginRight: 10,
//       backgroundColor: "#fff",
//       justifyContent: "center",
//       color: "#000",
//       marginVertical: 10
//     },
//     input: {
//       borderWidth: 1,
//       borderColor: "gray",
//       backgroundColor: "#fff",
//       padding: 0,
//       paddingHorizontal: 10,
//       marginVertical: 20,
//       width: 130,
//       marginRight: 20
//     },
//     btnCadastro: {
//       backgroundColor: "blue",
//       padding: 10,
//       alignItems: "center",
//       marginVertical: 10
//     },
//     title: {
//       fontSize: 20,
//       fontWeight: 'bold',
//     },
//     separator: {
//       marginVertical: 30,
//       height: 1,
//       width: '80%',
//     },
//   });