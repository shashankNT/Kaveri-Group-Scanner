import { appTheme } from '../colors';
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import InputCard from '../components/InputCard';
import SubmitButton from '../components/SubmitButton';
import BackArrowIcon from '../components/BackArrowIcon';
import { inputCardStyles } from '../components/InputCard'
import { SafeAreaView, Text, TextInput } from 'react-native'


const ChangePasswordScreen = ({ navigation }) => {

    const [currentPassowrd, setCurrentPassowrd] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        console.log('Password change');
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, padding: 20, backgroundColor: appTheme.backgroundColor, flex: 1 }}>
           
            <BackArrowIcon navigation={navigation} />

            <Text style={{ paddingVertical: 14, fontSize: 20, fontWeight: 'bold' }}>Change Password</Text>
            <Text style={{ paddingBottom: 15, fontSize: 12, color: 'gray' }}>Enter your new password and confirm your password</Text>

            <TextInput style={inputCardStyles.textInputContainer} value='email' editable={false} selectTextOnFocus={false} />
            <InputCard input={currentPassowrd} setInput={setCurrentPassowrd} placeholder={'Current Password'} />
            <InputCard input={newPassword} setInput={setNewPassword} placeholder={'New Password'} />
            <InputCard input={confirmPassword} setInput={setConfirmPassword} placeholder={'Confirm New Password'} />
            <SubmitButton text={'Apply'} onPress={handleSubmit} />

        </SafeAreaView>
    )
}

export default ChangePasswordScreen


