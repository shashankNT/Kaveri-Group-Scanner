import React from 'react'
import SubmitButton from './SubmitButton';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Text, SafeAreaView, Modal, TouchableWithoutFeedback } from "react-native";

const MessageModal = ({ modalName = '', isLogout=false, buttonText='Close', apiResponse, modalVisible, setModalVisible }) => {

    const navigation = useNavigation();

    const handleLogOut = async () => {

        setModalVisible(!modalVisible);

    }

    return (
        <>
            <Modal transparent={true} visible={modalVisible} onPress={() => setModalVisible(!modalVisible)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <SafeAreaView style={styles.centeredView}>

                        {apiResponse?.status === 500 ?
                            <View style={[styles.modalView, { alignItems: 'center' }]}>

                                <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 15 }}>{apiResponse?.error}</Text>
                                <SubmitButton text={buttonText} onPress={() => setModalVisible(!modalVisible)} />

                            </View>
                            :
                            <View style={styles.modalView}>
                                {apiResponse?.success
                                    ? <Text style={{ fontSize: 18 }}>{modalName} Success!</Text>
                                    : <Text style={{ fontSize: 18 }}>{modalName} Failed!</Text>
                                }
                                <Text style={{ fontSize: 12, marginTop: 20, marginBottom: 15 }}>{apiResponse?.message}</Text>
                                <SubmitButton text={buttonText} onPress={handleLogOut} />

                            </View>
                        }
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default MessageModal


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
