import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import CEP from './src/screens/Cep';


const Stack = createNativeStackNavigator();
export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Buscador de CEP" options={{ headerStyle: { backgroundColor: '#018786', }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold', }, }} component={CEP}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}