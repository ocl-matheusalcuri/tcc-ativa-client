import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { TextInputMask } from 'react-native-masked-text';

import { styles } from '../screens/styles';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../contexts/auth';

import RNPickerSelect from 'react-native-picker-select';


//@ts-ignore
export default function SignupProf({navigation}) {
  const { signUp, user, type } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [cref, setCREF] = useState("");
  const [especialidade, setEspecialidade] = useState("Ginástica");
  const [faixaEtaria, setFaixaEtaria] = useState("Idosos");
  const [foco, setFoco] = useState("Fortalecimento");
  const [error, setError] = useState("");


  const especialidadeOpt = [
    {label: "Ginástica", value: "Ginástica"},
    {label: "Natação", value: "Natação"},
    {label: "Dança", value: "Dança"},
    {label: "Hiit", value: "Hiit"},
    {label: "Academia", value: "Academia"}
  ];

  const faixaEtariaOpt = [
    {label: "Idosos", value: "Idosos"},
    {label: "Crianças", value: "Crianças"},
    {label: "Adulto", value: "Adulto"},
    {label: "Bebês", value: "Bebês"},
  ];

  const focoOpt = [
    {label: "Fortalecimento", value: "Fortalecimento"},
    {label: "Emagrecimento", value: "Emagrecimento"},
    {label: "Ganho de massa muscular", value: "Ganho de massa muscular"},
    {label: "Recuperação", value: "Recuperação"},
  ];



  // const [prof, setProf] = useState<any>({ 
  //   password: "12345", 
  //   nome: "Professor 1", 
  //   celular: "(00) 00000-0000", 
  //   email: "professor1@hotmail.com", 
  //   nascimento: "00/00/0000", 
  //   instagram: "professor1", 
  //   facebook: "profacessor1", 
  //   cref: "1233456788", 
  //   foco: "Fortalecimento", 
  //   especializacao: "Natação", 
  //   faixaEtaria: "Idosos"
  // });

  async function handleSignUp() {
    const prof = {
      password: senha, 
      nome: nome, 
      celular: celular, 
      email: email, 
      nascimento: nascimento, 
      instagram: instagram, 
      facebook: facebook, 
      cref: cref, 
      foco: foco, 
      especializacao: especialidade, 
      faixaEtaria: faixaEtaria
    }

    const formularioPreenchido = senha && nome && celular && email && nascimento && instagram && facebook && cref && foco && especialidade && faixaEtaria;

    if(senha.length < 8) {
      setError("Senha deve conter no mínimo 8 caracteres!")
    } else if(!formularioPreenchido) {
      setError("Por favor preencha todos os campos!")
    } else {
      setError("");
      await signUp(prof, "personal").then((response: any) => navigation.navigate("Login", { status: response }));
    }
  }

    return (
      <ScrollView>
            <View style={{...styles.container, ...styles.bg}}>
            <View style={{...styles.bg}}>
            {!!error && <Text style={{...styles.error}}>{error}</Text>}
              <View style={{...styles.conjuntoInput, ...styles.bg}}>
                <TextInput autoCapitalize="words" style={{...styles.inputSignUp}} placeholder="Nome" onChangeText={nome => setNome(nome)}/>
                <TextInputMask 
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY'
                  }} 
                  style={{...styles.inputSignUp}} 
                  value={nascimento} 
                  placeholder="Nascimento" 
                  onChangeText={nascimento => setNascimento(nascimento)}/>
              </View>
              <View style={{...styles.conjuntoInput, ...styles.bg}}>
                <TextInput autoCapitalize="none" style={{...styles.inputSignUp}} placeholder="Email" onChangeText={email => setEmail(email)}/>
                <TextInputMask 
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                  }} 
                  value={celular}
                  style={{...styles.inputSignUp}} 
                  keyboardType="number-pad" 
                  placeholder="Celular" 
                  onChangeText={celular => setCelular(celular)}/>
              </View>
              <View style={{...styles.conjuntoInput, ...styles.bg}}>
                <TextInput autoCapitalize="none" style={{...styles.inputSignUp}} placeholder="Instagram" onChangeText={instagram => setInstagram(instagram)}/>
                <TextInput autoCapitalize="none" style={{...styles.inputSignUp}} placeholder="Facebook" onChangeText={facebook => setFacebook(facebook)}/>
              </View>
              <TextInput autoCapitalize="characters" style={{...styles.inputSignUp, width: 300}} placeholder="CREF" onChangeText={cref => setCREF(cref)}/>
              <TextInput autoCapitalize="none" style={{...styles.inputSignUp, width: 300}} secureTextEntry={true} placeholder="Senha" onChangeText={senha => setSenha(senha)}/>
              
              <Text style={{...styles.btnText}}>Especialidade</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={especialidade}
                  onValueChange={(value) => setEspecialidade(value)}
                  items={especialidadeOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Faixa etário alvo</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={faixaEtaria}
                  onValueChange={(value) => setFaixaEtaria(value)}
                  items={faixaEtariaOpt}
                />
              </View>

              <Text style={{...styles.btnText}}>Foco</Text>
              <View style={{...styles.bg, ...styles.picker}}>
                <RNPickerSelect
                  value={foco}
                  onValueChange={(value) => setFoco(value)}
                  items={focoOpt}
                />
              </View>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={() => navigation.navigate("Login")}><Text style={{...styles.btnText}}>Voltar ao login</Text></TouchableOpacity>
              <TouchableOpacity style={{...styles.btnCadastro}} onPress={handleSignUp}><Text style={{...styles.btnText}}>Criar conta</Text></TouchableOpacity>
            </View>
            </View>
          </ScrollView>
    )
}

// const styles = StyleSheet.create({
//   bg: {
//     backgroundColor: '#CC8400'
//   },
//   container: {
//     padding: 20,
//     flex: 1,
//     alignItems: 'center',
//   },
//   conjuntoInput: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   picker: {
//     width: 290, 
//     height: 30, 
//     borderWidth: 1,
//     borderColor: "gray",
//     marginRight: 10,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     color: "#000",
//     marginVertical: 10
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "gray",
//     backgroundColor: "#fff",
//     padding: 0,
//     paddingHorizontal: 10,
//     marginVertical: 20,
//     width: 130,
//     marginRight: 20
//   },
//   btnCadastro: {
//     backgroundColor: "blue",
//     padding: 10,
//     alignItems: "center",
//     marginVertical: 10
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
//   });