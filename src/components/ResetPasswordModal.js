import axios from "axios";
import { appTheme } from "../colors";
import React, { useState } from 'react'
import MessageModal from "./MessageModal";
import { Ionicons } from "@expo/vector-icons";
import InputCard from "../components/InputCard";
import { forgetPassword } from '../api/apiConfig';
import SubmitButton from "../components/SubmitButton";
import { View, StyleSheet, Text, SafeAreaView, Modal, TouchableWithoutFeedback } from "react-native";

const ResetPasswordModal = ({ modalVisible, setModalVisible }) => {

    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const [messageModal, setMessageModal] = useState(false);
    const [apiResponse, setApiResponse] = useState();

    const handleResetPassword = async () => {
        setLoader(true);
        try {
            const forgetPasswordObj = {
                user: {
                    email: email
                }
            }

            const response = await axios.post(forgetPassword, forgetPasswordObj);

            setLoader(false);
            setMessageModal(true);
            setModalVisible(false);
            setApiResponse(response?.data);

        } catch (error) {
            setLoader(false);
            setMessageModal(true);
            setModalVisible(false);
            setApiResponse(error?.response?.data);
        }
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

                            <InputCard placeholder={"You Email"} setInput={setEmail} />
                            <SubmitButton text={'Reset Password'} onPress={handleResetPassword} loader={loader} />

                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
            <MessageModal modalName={'Update'} apiResponse={apiResponse} modalVisible={messageModal} setModalVisible={setMessageModal} />

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
