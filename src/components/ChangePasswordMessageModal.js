import React, { useContext } from 'react';
import SubmitButton from './SubmitButton';
import UserContext from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Text, SafeAreaView, Modal, TouchableWithoutFeedback } from "react-native";

const ChangePasswordMessageModal = ({ apiResponse, modalVisible, setModalVisible }) => {

    const { setIsLogedIn } = useContext(UserContext);

    const handleClose = async () => {
        if (apiResponse?.success) {
            await AsyncStorage.removeItem('basicAuth');
            setIsLogedIn(false);
        }
        setModalVisible(!modalVisible);
    }

    return (
        <>
            <Modal transparent={true} visible={modalVisible} onPress={() => setModalVisible(!modalVisible)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <SafeAreaView style={styles.centeredView}>

                        <View style={[styles.modalView]}>

                            <Text style={{ fontSize: 18, textAlign: 'left' }}>{apiResponse?.success ? 'Update Success!' : 'Update Failed!'}</Text>
                            <Text style={{ marginTop: 20, marginBottom: 15 }}>{apiResponse?.message}</Text>
                            <SubmitButton text={apiResponse?.success ? 'Log out' : 'Close'} onPress={handleClose} />

                        </View>

                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default ChangePasswordMessageModal


const styles = StyleSheet.create({
    centeredView: {
        width: '100%',
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        padding: 20,
        borderRadius: 5,
        width: '90%',
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
});
