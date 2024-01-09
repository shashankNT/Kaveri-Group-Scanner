import React, { useEffect, useState } from 'react'
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen'
import OffersScreen from '../screens/OffersScreen';
import ScannerScreen from '../screens/ScannerScreen'
import ProfileScreen from '../screens/ProfileScreen';
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
            <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ScannerSummaryScreen" component={ScannerSummaryScreen} options={{ headerShown: false }} />

            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Offers" component={OffersScreen} options={{ title: "Today's Offer", headerTitleAlign: 'center' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

export default Stack