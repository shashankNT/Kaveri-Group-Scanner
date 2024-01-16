import axios from 'axios';
import { appTheme } from '../colors';
import React, { useState } from 'react';
import InputCard from '../components/InputCard';
import { changePassword } from '../api/apiConfig';
import BackArrowIcon from '../components/BackArrowIcon';
import { inputCardStyles } from '../components/InputCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChangePasswordMessageModal from '../components/ChangePasswordMessageModal';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const ChangePasswordScreen = ({ navigation, route }) => {
    const { email } = route.params;


    const [currentPassowrd, setCurrentPassowrd] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const [modalVisible, setModalVisible] = useState(false);
    const [apiResponse, setApiResponse] = useState();
    const [loader, setLoader] = useState(false);

    const isDisabled = !(currentPassowrd && newPassword && confirmPassword);

    const handleSubmit = async () => {
        setLoader(true);
        try {

            const credentials = await AsyncStorage.getItem('basicAuth');
            const changePasswordObj = {
                user: {
                    _method: 'put',
                    email: email,
                    current_password: currentPassowrd,
                    password: newPassword,
                    password_confirmation: confirmPassword,
                    commit: 'Update',
                },
            }

            const response = await axios.put(changePassword, changePasswordObj, { headers: { Authorization: credentials, 'Content-Type': 'application/json' } });

            setLoader(false);
            setModalVisible(true);
            setApiResponse(response?.data);

        } catch (error) {

            const errorMessageObj = {
                success: false,
                message:
                    Array.isArray(error?.response?.data?.message)
                        ? error?.response?.data?.message[0]
                        : error?.response?.data?.message
            }

            setLoader(false);
            setModalVisible(true);
            setApiResponse(errorMessageObj);
        }
    }

    return (
        <>
            <SafeAreaView style={{ padding: 20, backgroundColor: appTheme.backgroundColor, flex: 1 }}>

                <BackArrowIcon navigation={navigation} />

                <Text style={{ paddingVertical: 14, fontSize: 20, fontWeight: 'bold' }}>Change Password</Text>
                <Text style={{ paddingBottom: 15, fontSize: 12, color: 'gray' }}>Enter your new password and confirm your password</Text>

                <TextInput value={email} style={inputCardStyles.textInputContainer} editable={false} selectTextOnFocus={false} />

                <InputCard setInput={setCurrentPassowrd} placeholder={'Current Password'} />
                <InputCard setInput={setNewPassword} placeholder={'New Password'} />
                <InputCard setInput={setConfirmPassword} placeholder={'Confirm New Password'} />


                <TouchableOpacity
                    disabled={isDisabled}
                    onPress={handleSubmit}
                    style={[styles.submitButton, isDisabled && { backgroundColor: '#9a9a9a' }]}
                >
                    {loader
                        ? <ActivityIndicator size="large" color='white' />
                        : <Text style={{ padding: 10, fontWeight: 400, fontSize: 16, color: "white" }}>Apply</Text>
                    }
                </TouchableOpacity>


            </SafeAreaView>
            <ChangePasswordMessageModal apiResponse={apiResponse} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    submitButton: {
        height: 50,
        width: "100%",
        borderRadius: 50,
        marginVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appTheme.primaryColor,

        shadowColor: "black",
        shadowOpacity: 0.8,
        elevation: 8,
    },
});