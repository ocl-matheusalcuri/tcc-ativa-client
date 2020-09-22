import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import ProfPerfil from '../screens/professor/ProfPerfil';
import ProfDashboard from '../screens/professor/ProfDashboard';
import ProfAlunos from '../screens/professor/ProfAlunos';

import { ProfBottomTabsList, ProfPerfilList, ProfDashboardList, ProfAlunosList } from '../types';

const ProfBottomTab = createBottomTabNavigator<ProfBottomTabsList>();

export default function ProfBottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <ProfBottomTab.Navigator
      initialRouteName="Perfil"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <ProfBottomTab.Screen
        name="Perfil"
        component={ProfPerfilNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-person" color={color} />,
        }}
      />
      <ProfBottomTab.Screen
        name="Dashboard"
        component={ProfDashboardNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-calendar" color={color} />,
        }}
      />
      <ProfBottomTab.Screen
        name="Alunos"
        component={ProfAlunosNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-business" color={color} />,
        }}
      />
    </ProfBottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ProfPerfilStack = createStackNavigator<ProfPerfilList>();

function ProfPerfilNavigator() {
  return (
    <ProfPerfilStack.Navigator>
      <ProfPerfilStack.Screen
        name="ProfPerfilScreen"
        component={ProfPerfil}
        options={{ headerTitle: 'Perfil Prof' }}
      />
    </ProfPerfilStack.Navigator>
  );
}

const ProfDashboardStack = createStackNavigator<ProfDashboardList>();

function ProfDashboardNavigator() {
  return (
    <ProfDashboardStack.Navigator>
      <ProfDashboardStack.Screen
        name="ProfDashboardScreen"
        component={ProfDashboard}
        options={{ headerTitle: 'Dashboard Prof' }}
      />
    </ProfDashboardStack.Navigator>
  );
}

const ProfAlunosStack = createStackNavigator<ProfAlunosList>();

function ProfAlunosNavigator() {
  return (
    <ProfAlunosStack.Navigator>
      <ProfAlunosStack.Screen
        name="ProfAlunosScreen"
        component={ProfAlunos}
        options={{ headerTitle: 'Alunos Prof' }}
      />
    </ProfAlunosStack.Navigator>
  );
}
