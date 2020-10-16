import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import ProfPerfil from '../screens/professor/ProfPerfil';
import ProfDashboard from '../screens/professor/ProfDashboard';
import ProfAlunos from '../screens/professor/ProfAlunos';
import ProfAlunoDetalhado from '../screens/professor/ProfAlunoDetalhado';

import { ProfBottomTabsList, ProfPerfilList, ProfDashboardList, ProfAlunosList } from '../types';

const ProfBottomTab = createBottomTabNavigator<ProfBottomTabsList>();

export default function ProfBottomTabNavigator(email: string) {
  const colorScheme = useColorScheme();

  return (
    <ProfBottomTab.Navigator
      initialRouteName="Perfil"
      tabBarOptions={{ activeTintColor: "#51C73C", inactiveBackgroundColor: "#784E00", activeBackgroundColor: "#784E00", inactiveTintColor: "white" }}>
      <ProfBottomTab.Screen
        name="Perfil"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-person" color={color} />,
        }}
      >
        {props => <ProfPerfilNavigator/>}
      </ProfBottomTab.Screen>
      <ProfBottomTab.Screen
        name="Dashboard"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-calendar" color={color} />,
        }}
      >
        {props => <ProfDashboardNavigator/>}
      </ProfBottomTab.Screen>
      <ProfBottomTab.Screen
        name="Alunos"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-business" color={color} />,
        }}
      >
        {props => <ProfAlunosNavigator/>}
      </ProfBottomTab.Screen>
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
        options={{ headerTitle: 'Seu Perfil', headerStyle: {backgroundColor: '#CC8400'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 40}, headerTitleAlign: "center" }}
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
        options={{ headerTitle: 'Sua Agenda', headerStyle: {backgroundColor: '#CC8400'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 40}, headerTitleAlign: "center" }}
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
        options={{ headerTitle: 'Lista de Alunos', headerStyle: {backgroundColor: '#CC8400'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 40}, headerTitleAlign: "center" }}
      />

    <ProfAlunosStack.Screen
        name="ProfAlunoDetalhadoScreen"
        component={ProfAlunoDetalhado}
        options={{ headerTitle: 'Detalhado', headerStyle: {backgroundColor: '#CC8400'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 40}, headerTitleAlign: "center" }}
      /> 
    </ProfAlunosStack.Navigator>
  );
}
