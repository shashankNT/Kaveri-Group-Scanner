import React, { useEffect, useState } from 'react'
import Tabs from './Tabs'
import LoginScreen from '../screens/LoginScreen'
import ScannerScreen from '../screens/ScannerScreen'
import ScannerSummaryScreen from '../screens/ScannerSummaryScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = () => {

    const Stack = createNativeStackNavigator();
    const [baseAuth, setBaseAuth] = useState('');

    const chackAuth = async () => {
        setBaseAuth(await AsyncStorage.getItem('basicAuth'));
    }

    useEffect(() => {
        chackAuth();
    }, [baseAuth])


    return (
        <Stack.Navigator initialRouteName={baseAuth === '' ? 'LoginScreen' : 'Tabs'}>

             <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} /> 
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} initialParams={{ setBaseAuth: setBaseAuth }} />
            <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={{ headerShown: false }} /> 
            <Stack.Screen name="ScannerSummaryScreen" component={ScannerSummaryScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

export default Stack