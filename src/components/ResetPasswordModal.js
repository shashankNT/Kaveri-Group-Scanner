import axios from "axios";
import { appTheme } from "../colors";
import React, { useEffect, useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import InputCard from "../components/InputCard";
import { forgetPassword } from '../api/apiConfig';
import { View, StyleSheet, Text, SafeAreaView, Modal, TouchableOpacity, ActivityIndicator } from "react-native";

const ResetPasswordModal = ({ modalVisible, setModalVisible }) => {

    const [email, setEmail] = useState();
    const [loader, setLoader] = useState(false);
    const [apiResponse, setApiResponse] = useState({ statusCode: 0, message: '' });

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
            setApiResponse({ statusCode: response?.status, message: response?.data?.message });

        } catch (error) {

            setLoader(false);
            setApiResponse({ statusCode: error?.response?.status, message: error?.response?.data?.message });

        }
    }

    const handleCloseModal = () => {
        setModalVisible(!modalVisible);
    }

    useEffect(() => {
        setApiResponse();
        setLoader(false);
    }, [email]);

    return (
        <>
            <Modal transparent={true} visible={modalVisible} onPress={() => setModalVisible(!modalVisible)}>
                <SafeAreaView style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Ionicons onPress={() => setModalVisible(!modalVisible)} style={{ position: 'absolute', right: 12, top: 12, }} name="close" size={30} color={appTheme.primaryColor} />

                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 40 }}>Reset Password</Text>
                        <Text style={{ fontSize: 12, marginVertical: 20, paddingHorizontal: 30 }}>Please enter your email address to receive instructions on how to reset your password.</Text>

                        {apiResponse?.statusCode === 200 && <Text style={{ textAlign: 'center', color: 'green', fontSize: 18 }}>{apiResponse?.message}</Text>}
                        {apiResponse?.statusCode === 500 && <Text style={{ textAlign: 'center', color: '#C12721' }}>{apiResponse?.message}</Text>}

                        <InputCard placeholder={"You Email"} setInput={setEmail} />

                        {apiResponse?.statusCode === 200
                            ?
                            <TouchableOpacity onPress={handleCloseModal} style={styles.submitButton}>
                                {loader
                                    ? <ActivityIndicator size="large" color='white' />
                                    : <Text style={{ padding: 10, fontWeight: 400, fontSize: 16, color: "white" }}>Close</Text>
                                }
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={handleResetPassword}
                                disabled={email ? false : true}
                                style={[styles.submitButton, !email && { backgroundColor: '#9a9a9a' }]}
                            >
                                {loader
                                    ? <ActivityIndicator size="large" color='white' />
                                    : <Text style={{ padding: 10, fontWeight: 400, fontSize: 16, color: "white" }}>Reset Password</Text>
                                }
                            </TouchableOpacity>
                        }

                    </View>
                </SafeAreaView>
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
    },

    submitButton: {
        height: 50,
        width: "100%",
        borderRadius: 50,
        marginVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appTheme.primaryColor,

        shadowColor: "black",
        // shadowOpacity: 0.8,
        elevation: 8,
    },

});
