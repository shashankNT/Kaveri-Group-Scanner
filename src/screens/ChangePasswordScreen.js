import axios from 'axios';
import { appTheme } from '../colors';
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import InputCard from '../components/InputCard';
import { changePassword } from '../api/apiConfig';
import MessageModal from '../components/MessageModal'
import SubmitButton from '../components/SubmitButton';
import BackArrowIcon from '../components/BackArrowIcon';
import { inputCardStyles } from '../components/InputCard'
import { SafeAreaView, StyleSheet, Text, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';



const ChangePasswordScreen = ({ navigation }) => {

    const [currentPassowrd, setCurrentPassowrd] = useState('12345678');
    const [newPassword, setNewPassword] = useState('12345678');
    const [confirmPassword, setConfirmPassword] = useState('12345678');

    const [modalVisible, setModalVisible] = useState(false);
    const [apiResponse, setApiResponse] = useState();


    const handleSubmit = async () => {

        console.log('endPoint ==========>', changePassword === 'https://portal.kaveri.group/users.json');

        const changePasswordObj = {
            user: {
                _method: 'put',
                email: 'shashank.k@navtech.io',
                current_password: currentPassowrd,
                password: newPassword,
                password_confirmation: confirmPassword,
                commit: 'Update',
            },
        }
        console.log('changePasswordObj', changePasswordObj.user);

        try {
            const credentials = await AsyncStorage.getItem('basicAuth');
            console.log('credentials ========>', credentials === 'Basic c2hhc2hhbmsua0BuYXZ0ZWNoLmlvOjEyMzQ1Njc4');

            const response = await axios.put(
                changePassword,
                changePasswordObj,
                { headers: { Authorization: credentials, 'Content-Type': 'application/json' } }
            );
            console.log('response', response);
            setApiResponse(response.data)
            setModalVisible(true);

        } catch (err) {
            console.log(err);
        }

        //TODO
        // modal to sow the message
        // navigation to Home 

        // navigation.goBack();
    }

    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, padding: 20, backgroundColor: appTheme.backgroundColor, flex: 1 }}>

                <BackArrowIcon navigation={navigation} />

                <Text style={{ paddingVertical: 14, fontSize: 20, fontWeight: 'bold' }}>Change Password</Text>
                <Text style={{ paddingBottom: 15, fontSize: 12, color: 'gray' }}>Enter your new password and confirm your password</Text>

                <TextInput style={inputCardStyles.textInputContainer} editable={false} selectTextOnFocus={false} />
                <InputCard input={currentPassowrd} setInput={setCurrentPassowrd} placeholder={'Current Password'} />
                <InputCard input={newPassword} setInput={setNewPassword} placeholder={'New Password'} />
                <InputCard input={confirmPassword} setInput={setConfirmPassword} placeholder={'Confirm New Password'} />
                <SubmitButton text={'Apply'} onPress={handleSubmit} />

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

