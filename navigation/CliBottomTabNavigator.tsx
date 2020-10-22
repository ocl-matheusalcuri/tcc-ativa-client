import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import CliPerfil from '../screens/cliente/CliPerfil';
import CliPesquisa from '../screens/cliente/CliPesquisa';
import CliDashboard from '../screens/cliente/CliDashboard';
import CliRelation from '../screens/cliente/CliRelation';

import { CliBottomTabsList, CliPerfilList, CliPesquisaList, CliDashboardList, CliRelationList  } from '../types';

const CliBottomTab = createBottomTabNavigator<CliBottomTabsList>();

export default function CliBottomTabNavigator(email: string) {
  const colorScheme = useColorScheme();
  return (
    <CliBottomTab.Navigator
      initialRouteName="Perfil"
      tabBarOptions={{ activeTintColor: "#51C73C", inactiveBackgroundColor: "#784E00", activeBackgroundColor: "#784E00", inactiveTintColor: "white" }}>
      <CliBottomTab.Screen
        name="Perfil"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-person" color={color} />,
        }}
      >
        {props => <CliPerfilNavigator email={email}/>}
      </CliBottomTab.Screen>
      <CliBottomTab.Screen
        name="Pesquisa"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-search" color={color} />,
        }}
      >
        {props => <CliPesquisaNavigator/>}
        </CliBottomTab.Screen>

      <CliBottomTab.Screen
        name="Personal"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-bookmarks" color={color} />,
        }}
      >
        {props => <CliRelationNavigator/>}
      </CliBottomTab.Screen>
    </CliBottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const CliPerfilStack = createStackNavigator<CliPerfilList>();

function CliPerfilNavigator({email}: any) {
  return (
    <CliPerfilStack.Navigator>
      <CliPerfilStack.Screen
        name="CliPerfilScreen"
        options={{ headerTitle: 'Seu Perfil', headerStyle: {backgroundColor: '#CC8400'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 40}, headerTitleAlign: "center"}}
      >
          {props => //@ts-ignore
          <CliPerfil />}
       </CliPerfilStack.Screen> 
    </CliPerfilStack.Navigator>
  );
}

const CliPesquisaStack = createStackNavigator<CliPesquisaList>();

function CliPesquisaNavigator() {
  return (
    <CliPesquisaStack.Navigator>
      <CliPesquisaStack.Screen
        name="CliPesquisaScreen"
        component={CliPesquisa}
        options={{ headerTitle: 'Pesquisa de personal', headerStyle: {backgroundColor: '#CC8400'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 40}, headerTitleAlign: "center" }}
      />
    </CliPesquisaStack.Navigator>
  );
}

// const CliDashboardStack = createStackNavigator<CliDashboardList>();

// function CliDashboardNavigator() {
//   return (
//     <CliDashboardStack.Navigator>
//       <CliDashboardStack.Screen
//         name="CliDashboardScreen"
//         component={CliDashboard}
//         options={{ headerTitle: 'Sua Dashboard' }}
//       />
//     </CliDashboardStack.Navigator>
//   );
// }

const CliRelationStack = createStackNavigator<CliRelationList>();

function CliRelationNavigator() {
  return (
    <CliRelationStack.Navigator>
      <CliRelationStack.Screen
        name="CliRelationScreen"
        component={CliRelation}
        options={{ headerTitle: 'Seu Personal', headerStyle: {backgroundColor: '#CC8400'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 40}, headerTitleAlign: "center" }}
      />
    </CliRelationStack.Navigator>
  );
}
