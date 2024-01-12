import React from 'react'
import SubmitButton from './SubmitButton';
import { View, StyleSheet, Text, SafeAreaView, Modal, TouchableWithoutFeedback } from "react-native";


const MessageModal = ({ apiResponse, modalVisible, setModalVisible }) => {
    return (
        <>
            <Modal transparent={true} visible={modalVisible} onPress={() => setModalVisible(!modalVisible)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <SafeAreaView style={styles.centeredView}>
                        <View style={styles.modalView}>

                            {apiResponse?.success
                                ? <Text style={{ fontSize: 18 }}>Update Success!</Text>
                                : <Text style={{ fontSize: 18 }}>Update Failed!</Text>
                            }
                            <Text style={{ fontSize: 16, marginVertical: 20 }}>{apiResponse?.message}</Text>
                            <SubmitButton text={'Close'} onPress={() => setModalVisible(!modalVisible)} />

                        </View>
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
