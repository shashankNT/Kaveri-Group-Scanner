import React, { useState } from 'react'
import { Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Ionicons, Entypo, Fontisto } from "@expo/vector-icons";
import { appTheme } from '../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const handleLogOut = async () => {
        await AsyncStorage.removeItem('basicAuth');
        navigation.navigate('LoginScreen');
    }

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, backgroundColor: 'white', flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingTop: 20, paddingLeft: 15 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={{ padding: 20, fontSize: 20, fontWeight: 'bold' }}>Settings</Text>

            <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                <Text style={{ fontSize: 16 }}> Country </Text>
                <Text style={{ fontSize: 16, color: 'gray', fontWeight: 500 }}> India </Text>
            </View>
            <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                <Text style={{ fontSize: 16 }}> Currency </Text>
                <Text style={{ fontSize: 16, color: 'gray', fontWeight: 500 }}> ₹ INR </Text>
            </View>
            <TouchableOpacity style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                <Text style={{ fontSize: 16 }}> Change Password </Text>
                <Entypo name="chevron-right" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(true) }} style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                <Text style={{ fontSize: 16 }}> Log out </Text>
                <Fontisto name="power" size={24} color="gray" />
            </TouchableOpacity>

            <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>

                    <SafeAreaView style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ fontSize: 16, marginBottom: 40, textAlign: 'center' }}>Are you sure you want to Log out?</Text>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => setModalVisible(false)}>
                                    <Text style={{ color: 'gray', fontWeight: 'bold' }}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={handleLogOut}>
                                    <Text style={{ color: appTheme.primaryColor, fontWeight: 'bold' }}>Log out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>

        </SafeAreaView>
    )
}

export default SettingsScreen


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        margin: 35,
        padding: 20,
        borderRadius: 5,
        backgroundColor: 'white',
    }
});
