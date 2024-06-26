import React, { useEffect, useState } from 'react'
import HomeScreen from '../screens/HomeScreen';
import UserContext from '../context/UserContext';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OffersScreen from '../screens/OffersScreen';
import ScannerScreen from '../screens/ScannerScreen';
import LandingScreen from '../screens/LandingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import { NavigationContainer } from '@react-navigation/native';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ScannerSummaryScreen from '../screens/ScannerSummaryScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {BottomNavigator} from '../screens/BottomNavigator';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import { appTheme } from '../colors';

const Stack = () => {

    const Stack = createNativeStackNavigator();

    const [isLogedIn, setIsLogedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const checkAuthToken = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('basicAuth');
            if (token) setIsLogedIn(true);
            setLoading(false);
        } catch (error) {
            console.error('Failed to check auth token:', error);
            setLoading(false);
        }
    };


    useEffect(() => {
        checkAuthToken();
    }, [isLogedIn]);

    return (
        <UserContext.Provider value={{ isLogedIn, setIsLogedIn }}>
            <NavigationContainer>
                {loading ? 
                 <View
                 style={{
                   flex: 1,
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                 }}
               >
                 <ActivityIndicator animating={true} color={appTheme.primaryColor} />
               </View>
                :
                !isLogedIn
                    ?
                    <Stack.Navigator>
                        <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                    :
                    <Stack.Navigator>
                        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Offers" component={OffersScreen} options={{ title: "Today's Offer", headerTitleAlign: 'center' }} />
                        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} /> */}

                        <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />

                        <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ScannerSummaryScreen" component={ScannerSummaryScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                }
            </NavigationContainer>
        </UserContext.Provider>
    )
}

export default Stack