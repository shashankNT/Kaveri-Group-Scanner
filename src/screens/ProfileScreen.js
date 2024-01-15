import { appTheme } from '../colors';
import React, { useState } from 'react'
import UserAvatar from 'react-native-user-avatar';
import TabBarButton from '../components/TabBarButton';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import LogoutWarningModal from '../components/LogoutWarningModal';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';


const ProfileScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <SafeAreaView style={{ backgroundColor: appTheme.backgroundColor, flex: 1 }}>

                <TouchableOpacity onPress={() => navigation.navigate('UserInfoScreen')} style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, marginBottom: 6, alignItems: 'center' }} >
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Shyam Admin</Text>
                        <Text style={{ fontSize: 16, color: 'gray' }}>View Profile</Text>
                    </View>
                    <View style={{ height: 90, borderRadius: 100, alignItems: "center", justifyContent: 'center', backgroundColor: 'lightgray', shadowColor: "gray", shadowOpacity: 0.8, elevation: 8 }}>
                        <UserAvatar size={90} textColor={appTheme.primaryColor} name="Shyam Admin" bgColor="lightgray" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                    <Text style={{ fontSize: 18 }}> Settings </Text>
                    <Ionicons name="settings-sharp" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }} style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
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



