import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import CliBottomTabNavigator from './CliBottomTabNavigator';
import ProfBottomTabNavigator from './ProfBottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import LoginScreen from '../screens/Login';
import SignupCli from '../screens/SignupCli';
import SignupProf from '../screens/SignupProf';



const cliente = false;
const login = false;

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {login ? (
        <>
      <Stack.Screen name="Login" component={LoginScreen} />
      </>
      ) : 
      (
      <Stack.Screen name="Root" component={cliente ? CliBottomTabNavigator : ProfBottomTabNavigator} />
      )}
      <Stack.Screen name="SignupCli" component={SignupCli} />
      <Stack.Screen name="SignupProf" component={SignupProf} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
