import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import FinanceScreen from './pages/FinanceScreen';
import PropertyScreen from './pages/PropertyScreen';
import ProductionScreen from './pages/ProductionScreen';
import AddPropertyScreen from './pages/AddPropertyScreen';
import AddProductionScreen from './pages/AddProductionScreen';
import AddBalanceScreen from './pages/AddBalanceScreen';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            title: 'Financeiro',
            headerStyle: { backgroundColor: '#004445', elevation: 0 },
            headerTintColor: '#fff',
          }}
          name="Finance"
          component={FinanceScreen}
        />
        <Stack.Screen
          options={{
            title: 'Propriedades',
            headerStyle: { backgroundColor: '#004445', elevation: 0 },
            headerTintColor: '#fff',
          }}
          name="Property"
          component={PropertyScreen}
        />
        <Stack.Screen
          options={{
            title: 'Produções',
            headerStyle: { backgroundColor: '#004445', elevation: 0 },
            headerTintColor: '#fff',
          }}
          name="Production"
          component={ProductionScreen}
        />
        <Stack.Screen
          options={{
            title: 'Nova Propriedade',
            headerStyle: { backgroundColor: '#004445', elevation: 0 },
            headerTintColor: '#fff',
          }}
          name="AddProperty"
          component={AddPropertyScreen}
        />
        <Stack.Screen
          options={{
            title: 'Nova Produção',
            headerStyle: { backgroundColor: '#004445', elevation: 0 },
            headerTintColor: '#fff',
          }}
          name="AddProduction"
          component={AddProductionScreen}
        />
        <Stack.Screen
          options={{
            title: 'Novo Lançamento',
            headerStyle: { backgroundColor: '#004445', elevation: 0 },
            headerTintColor: '#fff',
          }}
          name="AddBalance"
          component={AddBalanceScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
