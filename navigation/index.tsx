import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { ColorSchemeName } from 'react-native';

import LinkingConfiguration from './LinkingConfiguration';

import { AuthProvider } from '../contexts/auth';

const cliente = false;
const login = false;
const email = "teste@teste.com";

import Routes from '../routes';


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <AuthProvider>
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DefaultTheme}>
      <Routes />
    </NavigationContainer>
    </AuthProvider>
  );
}
