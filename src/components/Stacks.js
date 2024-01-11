import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen'
import LoginScreen from '../screens/LoginScreen'
import OffersScreen from '../screens/OffersScreen';
import ScannerScreen from '../screens/ScannerScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ProfileScreen from '../screens/ProfileScreen';
import ScannerSummaryScreen from '../screens/ScannerSummaryScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const Stack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>

            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ScannerSummaryScreen" component={ScannerSummaryScreen} options={{ headerShown: false }} />

            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Offers" component={OffersScreen} options={{ title: "Today's Offer", headerTitleAlign: 'center' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

export default Stack