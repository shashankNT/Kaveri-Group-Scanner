import React, { useState } from 'react'
import TabBarButton from '../components/TabBarButton';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, SafeAreaView, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Modal, StyleSheet } from 'react-native';
import { appTheme } from '../colors';

const ProfileScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const handleLogOut = async () => {
        await AsyncStorage.removeItem('basicAuth');
        navigation.navigate('LoginScreen');
    }

    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, backgroundColor: 'white', flex: 1 }}>

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
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                    <Text style={{ fontSize: 18 }}> Log out </Text>
                    <Fontisto name="power" size={24} color="gray" />
                </TouchableOpacity>

                <TabBarButton activeTab='Profile' navigation={navigation} />


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
        </>
    )
}

export default ProfileScreen



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
