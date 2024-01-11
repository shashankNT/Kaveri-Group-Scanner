import React from 'react'
import { appTheme } from "../colors";
import { View, StyleSheet, Text, SafeAreaView, Modal, TouchableWithoutFeedback, TouchableOpacity } from "react-native";

const LogoutWarningModal = ({ modalVisible, setModalVisible, navigation }) => {

    const handleLogOut = async () => {
        await AsyncStorage.removeItem('basicAuth');
        navigation.navigate('LoginScreen');
    }

    return (
        <>
            <Modal transparent={true} visible={modalVisible} onPress={() => setModalVisible(!modalVisible)}>
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
        </>
    )
}

export default LogoutWarningModal

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
