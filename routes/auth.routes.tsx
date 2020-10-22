import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import SignupCli from '../screens/SignupCli';
import SignupProf from '../screens/SignupProf';


const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" options={{ headerTitle: 'Login', headerStyle: {backgroundColor: '#CC8400'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 40}, headerTitleAlign: "center" }} component={LoginScreen}/>
    <AuthStack.Screen name="SignupCli" options={{ headerTitle: 'Criar conta', headerStyle: {backgroundColor: '#CC8400'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 40}, headerTitleAlign: "center" }} component={SignupCli}/>
    <AuthStack.Screen name="SignupProf" options={{ headerTitle: 'Criar conta', headerStyle: {backgroundColor: '#CC8400'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 40}, headerTitleAlign: "center" }} component={SignupProf}/>
  </AuthStack.Navigator>
)

export default AuthStackScreen;