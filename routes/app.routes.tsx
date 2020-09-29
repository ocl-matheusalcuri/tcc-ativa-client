import React, { useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import CliBottomTabNavigator from '../navigation/CliBottomTabNavigator';
import ProfBottomTabNavigator from '../navigation/ProfBottomTabNavigator';
import { AuthContext } from '../contexts/auth';

const cliente = true;
const login = false;
const email = "teste@teste.com";

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
function RootNavigator() {

  const { type } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={type === "aluno" ? () => CliBottomTabNavigator(email) : () => ProfBottomTabNavigator(email)} />
    </Stack.Navigator>
  );
};

export default RootNavigator