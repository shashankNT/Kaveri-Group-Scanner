import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { appTheme } from '../colors';


const TabBarButton = ({ activeTab, navigation }) => {

    const activeColor = appTheme.primaryColor;
    const inActiveColor = 'gray';

    return (
        <View style={{ borderWidth: Platform.OS === "android" ? 0 : 1, elevation: 1, borderColor: "gray", position: 'absolute', width: '100%', bottom: 0, height: 65, flexDirection: 'row', }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Entypo name="home" size={24} color={activeTab === 'Home' ? activeColor : inActiveColor} />
                <Text style={{ color: activeTab === 'Home' ? activeColor : inActiveColor }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Offers')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons name="local-offer" size={24} color={activeTab === 'Offers' ? activeColor : inActiveColor} />
                <Text style={{ color: activeTab === 'Offers' ? activeColor : inActiveColor }}>Offers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome name="user" size={24} color={activeTab === 'Profile' ? activeColor : inActiveColor} />
                <Text style={{ color: activeTab === 'Profile' ? activeColor : inActiveColor }}>Profile</Text>
            </TouchableOpacity>
        </View >
    )
}

export default TabBarButton