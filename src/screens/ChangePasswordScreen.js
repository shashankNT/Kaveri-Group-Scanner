import axios from 'axios';
import { appTheme } from '../colors';
import { StatusBar } from 'expo-status-bar'
import InputCard from '../components/InputCard';
import { changePassword } from '../api/apiConfig';
import React, { useEffect, useState } from 'react';
import MessageModal from '../components/MessageModal'
import SubmitButton from '../components/SubmitButton';
import BackArrowIcon from '../components/BackArrowIcon';
import { inputCardStyles } from '../components/InputCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';

const ChangePasswordScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [currentPassowrd, setCurrentPassowrd] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [apiResponse, setApiResponse] = useState();
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const getEmailFromStorage = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('email');
                if (storedEmail !== null) {
                    setEmail(storedEmail);
                }
            } catch (error) {
                console.error('Error retrieving email from AsyncStorage:', error);
            }
        };

        getEmailFromStorage();
    }, []);


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

            console.log(changePasswordObj);

            const response = await axios.put(changePassword, changePasswordObj, { headers: { Authorization: credentials, 'Content-Type': 'application/json' } });

            setLoader(false);
            setModalVisible(true);
            setApiResponse(response?.data);

        } catch (error) {
            setLoader(false);
            setModalVisible(true);
            setApiResponse(error?.response?.data)
        }
    }

    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, padding: 20, backgroundColor: appTheme.backgroundColor, flex: 1 }}>

                <BackArrowIcon navigation={navigation} />

                <Text style={{ paddingVertical: 14, fontSize: 20, fontWeight: 'bold' }}>Change Password</Text>
                <Text style={{ paddingBottom: 15, fontSize: 12, color: 'gray' }}>Enter your new password and confirm your password</Text>

                <TextInput value={email} style={inputCardStyles.textInputContainer} editable={false} selectTextOnFocus={false} />

                <InputCard setInput={setCurrentPassowrd} placeholder={'Current Password'} />
                <InputCard setInput={setNewPassword} placeholder={'New Password'} />
                <InputCard setInput={setConfirmPassword} placeholder={'Confirm New Password'} />
                <SubmitButton text={'Apply'} onPress={handleSubmit} loader={loader} />

            </SafeAreaView>

            <MessageModal modalName={'Update'} apiResponse={apiResponse} modalVisible={modalVisible} setModalVisible={setModalVisible} />

        </>

    )
}

export default ChangePasswordScreen