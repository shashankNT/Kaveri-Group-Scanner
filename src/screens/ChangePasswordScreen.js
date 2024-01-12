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
    const [currentPassowrd, setCurrentPassowrd] = useState('12345678');
    const [newPassword, setNewPassword] = useState('12345678');
    const [confirmPassword, setConfirmPassword] = useState('123456781');

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
                <InputCard input={currentPassowrd} setInput={setCurrentPassowrd} placeholder={'Current Password'} />
                <InputCard input={newPassword} setInput={setNewPassword} placeholder={'New Password'} />
                <InputCard input={confirmPassword} setInput={setConfirmPassword} placeholder={'Confirm New Password'} />
                <SubmitButton text={'Apply'} onPress={handleSubmit} loader={loader} />

            </SafeAreaView>

            <MessageModal apiResponse={apiResponse} modalVisible={modalVisible} setModalVisible={setModalVisible} />

        </>

    )
}

export default ChangePasswordScreen



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

