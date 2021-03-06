import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { styles } from '../screens/styles';

import { TextInputMask } from 'react-native-masked-text';


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
  const [error, setError] = useState("");

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
    const formularioPreenchido = senha && nome && celular && email && nascimento && hrAtiva && saude && prepFisico && objetivo && nascimento.length === 10 && celular.length === 15;
    if(senha.length < 8) {
      setError("Senha deve conter no mínimo 8 caracteres!")
    } else if(!formularioPreenchido) {
      setError("Por favor preencha todos os campos!")
    } else {
      setError("");
      await signUp(aluno, "aluno").then((response: any) => {
        if(response === "Conta criada com sucesso!") {
          setError("");
          navigation.navigate("Login", { status: response });
        } else {
          setError(response);
        }
      });
    }
  }

    return (
        <View style={{...styles.container, ...styles.bg}}>
            <View style={{...styles.bg}}>
              {!!error && <Text style={{...styles.error, width: 300}}>{error}</Text>}
              <View style={{...styles.conjuntoInput, ...styles.bg}}>
                <View style={{...styles.bg}}>
                  <Text style={{...styles.btnText, marginTop: 20, marginBottom: 5}}>Nome</Text>
                  <TextInput autoCapitalize="words" style={{...styles.inputSignUp}} placeholder="Nome" onChangeText={nome => setNome(nome)}/>
                </View>

                <View style={{...styles.bg}}>
                  <Text style={{...styles.btnText, marginTop: 20, marginBottom: 5}}>Data de nascimento</Text>
                  <TextInputMask 
                    type={'datetime'}
                    options={{
                      format: 'DD/MM/YYYY'
                    }} 
                    style={{...styles.inputSignUp}} 
                    value={nascimento} 
                    placeholder="xx/xx/xxxx" 
                    onChangeText={nascimento => setNascimento(nascimento)}/>
                </View>
              </View>
              <View style={{...styles.conjuntoInput, ...styles.bg}}>
                <View style={{...styles.bg}}>
                  <Text style={{...styles.btnText, marginBottom: 5}}>Email</Text>
                  <TextInput autoCapitalize="none" style={{...styles.inputSignUp}} placeholder="Email" onChangeText={email => setEmail(email)}/>
                </View>

                <View style={{...styles.bg}}>
                  <Text style={{...styles.btnText, marginBottom: 5}}>Celular</Text>
                  <TextInputMask 
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                  }} 
                  value={celular}
                  style={{...styles.inputSignUp}} 
                  keyboardType="number-pad" 
                  placeholder="(xx) xxxxx-xxxx"
                  onChangeText={celular => setCelular(celular)}/>
                </View>
              </View>

                <View style={{...styles.bg}}>
                  <Text style={{...styles.btnText, marginBottom: 5}}>Senha</Text>
                  <TextInput autoCapitalize="none" style={{...styles.inputSignUp, width: 300}} secureTextEntry={true} placeholder="Mínimo 8 dígitos" onChangeText={senha => setSenha(senha)}/>
                </View>
              
              <Text style={{...styles.btnText}}>Objetivo</Text>
              <View style={{...styles.bg, ...styles.picker, width: 300}}>
                <RNPickerSelect
                  placeholder={{}}
                  value={objetivo}
                  onValueChange={(value) => setObjetivo(value)}
                  items={objetivoOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Preparo físico</Text>
              <View style={{...styles.bg, ...styles.picker, width: 300}}>
                <RNPickerSelect
                  placeholder={{}}
                  value={prepFisico}
                  onValueChange={(value) => setprepFisico(value)}
                  items={prepFisicoOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Saúde</Text>
              <View style={{...styles.bg, ...styles.picker, width: 300}}>
                <RNPickerSelect
                  placeholder={{}}
                  value={saude}
                  onValueChange={(value) => setSaude(value)}
                  items={saudeOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Horas ativas por semana</Text>
              <View style={{...styles.bg, ...styles.picker, width: 300}}>
                <RNPickerSelect
                  placeholder={{}}
                  value={hrAtiva}
                  onValueChange={(value) => sethrAtiva(value)}
                  items={hrAtivaOpt}
                />
              </View>
              <TouchableOpacity style={{...styles.btnCadastro, width: 300, marginTop: 40}} onPress={() => navigation.navigate("Login")}><Text style={{...styles.btnText}}>Voltar ao login</Text></TouchableOpacity>
              <TouchableOpacity style={{...styles.btnCadastro, width: 300}} onPress={handleSignUp}><Text style={{...styles.btnText}}>Criar conta</Text></TouchableOpacity>
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