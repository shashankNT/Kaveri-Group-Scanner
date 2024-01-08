import React from 'react'
import ScannerScreen from '../screens/ScannerScreen'
import ScannerSummaryScreen from '../screens/ScannerSummaryScreen'
import Tabs from './Tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ScannerSummaryScreen" component={ScannerSummaryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Stack