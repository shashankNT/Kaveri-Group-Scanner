import { appTheme } from '../colors';
import React, { useState } from 'react'
import TabBarButton from '../components/TabBarButton';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import LogoutWarningModal from '../components/LogoutWarningModal';
import { Text, View, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';

const ProfileScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false); 

    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, backgroundColor: appTheme.backgroundColor, flex: 1 }}>

                <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, marginBottom: 6, alignItems: 'center' }} >
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Shyam Admin</Text>
                        <Text style={{ fontSize: 16, color: 'gray' }}>View Profile</Text>
                    </View>
                    <View>
                        <Image source={require('../images/logo_icon.jpg')} style={{ height: 90, aspectRatio: 1, borderRadius: 75 }} />
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                    <Text style={{ fontSize: 18 }}> Settings </Text>
                    <Ionicons name="settings-sharp" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { console.log('hu'); setModalVisible(!modalVisible) }} style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                    <Text style={{ fontSize: 18 }}> Log out </Text>
                    <Fontisto name="power" size={24} color="gray" />
                </TouchableOpacity>

                <TabBarButton activeTab='Profile' navigation={navigation} />

            </SafeAreaView>
            <LogoutWarningModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />
        </>
    )
}

export default ProfileScreen



