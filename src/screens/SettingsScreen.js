import { appTheme } from '../colors';
import React, { useState } from 'react'
import { Entypo, Fontisto } from "@expo/vector-icons";
import BackArrowIcon from '../components/BackArrowIcon';
import LogoutWarningModal from '../components/LogoutWarningModal';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native'

const SettingsScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, paddingHorizontal: 20, backgroundColor: appTheme.backgroundColor, flex: 1 }}>
                <BackArrowIcon navigation={navigation} />

                <Text style={{ paddingVertical: 20, fontSize: 20, fontWeight: 'bold' }}>Settings</Text>

                <>
                    <TouchableOpacity onPress={() => { navigation.navigate('ChangePasswordScreen') }} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                        <Text style={{ fontSize: 16 }}> Change Password </Text>
                        <Entypo name="chevron-right" size={24} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setModalVisible(true) }} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                        <Text style={{ fontSize: 16 }}> Log out </Text>
                        <Fontisto name="power" size={24} color="gray" />
                    </TouchableOpacity>
                </>

            </SafeAreaView>
            <LogoutWarningModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />
        </>
    )
}

export default SettingsScreen