import { appTheme } from "../colors";
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import InputCard from "../components/InputCard";
import SubmitButton from "../components/SubmitButton";
import { View, StyleSheet, Text, SafeAreaView, Modal, TouchableWithoutFeedback } from "react-native";

const ResetPasswordModal = ({ modalVisible, setModalVisible}) => {

    const [resetEmail, setResetEmail] = useState('');

    const handleResetPassword = async () => {
        console.log('Reset Password => send email to', resetEmail);
    }


    return (
        <>
            <Modal transparent={true} visible={modalVisible} onPress={() => setModalVisible(!modalVisible)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <SafeAreaView style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <Ionicons onPress={() => setModalVisible(!modalVisible)} style={{ position: 'absolute', right: 12, top: 12, }} name="close" size={30} color={appTheme.primaryColor} />

                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 40 }}>Reset Password</Text>
                            <Text style={{ fontSize: 12, marginVertical: 20, paddingHorizontal: 30 }}>Please enter your email address to receive instructions on how to reset your password.</Text>

                            <InputCard placeholder={"You Email"} input={resetEmail} setInput={setResetEmail} />
                            <SubmitButton text={'Reset Password'} onPress={handleResetPassword} />

                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default ResetPasswordModal

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
        borderRadius: 15,
        width: '90%',
        backgroundColor: 'white',
        alignItems: 'center',
    }
});
