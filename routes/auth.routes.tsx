import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import SignupCli from '../screens/SignupCli';
import SignupProf from '../screens/SignupProf';


const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen}/>
    <AuthStack.Screen name="SignupCli" component={SignupCli}/>
    <AuthStack.Screen name="SignupProf" component={SignupProf}/>
  </AuthStack.Navigator>
)

export default AuthStackScreen;