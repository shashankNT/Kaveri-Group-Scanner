import React from 'react'
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { Text, View, Image, SafeAreaView, StatusBar } from 'react-native';

const ProfileScreen = () => {
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, padding: 20, backgroundColor: 'white', flex: 1 }}>
          
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, marginBottom: 6, alignItems: 'center' }} >
                <View>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Shyam Admin</Text>
                    <Text style={{ fontSize: 16, color: 'gray' }}>View Profile</Text>
                </View>
                <View>
                    <Image source={require('../images/logo_icon.jpg')} style={{ height: 90, aspectRatio: 1, borderRadius: 75 }} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                <Text style={{ fontSize: 18 }}> Settings </Text>
                <Ionicons name="settings-sharp" size={24} color="gray" />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                <Text style={{ fontSize: 18 }}> Log out </Text>
                <Fontisto name="power" size={24} color="gray" />
            </View>

        </SafeAreaView>
    )
}

export default ProfileScreen