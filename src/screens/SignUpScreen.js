import axios from "axios";
import { appTheme } from "../colors";
import React, { useState } from "react";
import { signUp } from '../api/apiConfig';
import { baseUrl } from '../api/apiConfig';
import BackArrowIcon from "../components/BackArrowIcon";
import { Dropdown } from 'react-native-element-dropdown';
import SignUpMessageModal from "../components/SignUpMessageModal";
import InputCard, { inputCardStyles } from "../components/InputCard";
import { Image, View, Text, SafeAreaView, Linking, ScrollView, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import SubmitButton from "../components/SubmitButton";

const SignUpScreen = ({ navigation }) => {

    const rolesData = [
        { label: 'Admin', value: 'Admin' },
        { label: 'Staff', value: 'Staff' },
        { label: 'Agent', value: 'Agent' },
        { label: 'Customer', value: 'Customer' },
    ];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('Admin');

    const [modalVisible, setModalVisible] = useState(false);
    const [apiResponse, setApiResponse] = useState();
    const [loader, setLoader] = useState(false);

    const isDisabled = !(name && email && password && phoneNumber);

    const handleSignUp = async () => {
        setLoader(true);
        try {

            const signUpObj = {
                user: {
                    email: email,
                    name: name,
                    phone_number: phoneNumber,
                    role: role,
                    password: password
                },
            }

            const response = await axios.post(signUp, signUpObj);

            // console.log('response', response?.data);

            setLoader(false);
            setModalVisible(true);
            setApiResponse(response?.data);


        } catch (error) {

            // console.log('error', error?.response?.data);

            setLoader(false);
            setModalVisible(true);
            setApiResponse(error?.response?.data)
        }

    };

    const handlePolicy = () => {
        const privacyPolicyLink = baseUrl + 'privacy-policy';
        Linking.openURL(privacyPolicyLink);
    }

    return (
        <>
            <SafeAreaView style={{ paddingHorizontal: 20, backgroundColor: appTheme.backgroundColor, flex: 1 }}>
                <BackArrowIcon navigation={navigation} />

                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <View style={{ height: 120, borderRadius: 10, aspectRatio: 1, alignItems: "center", justifyContent: 'center', backgroundColor: 'white', shadowColor: "gray", shadowOpacity: 0.8, elevation: 8 }}>
                        <Image source={require("../images/logo_icon.jpg")} style={{ height: 100, aspectRatio: 1 }} />
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", margin: 40 }} > Sign Up </Text>


                    <InputCard placeholder={'Name'} setInput={setName} />
                    <InputCard placeholder={'Your Email'} setInput={setEmail} />
                    <InputCard placeholder={'Password'} setInput={setPassword} />
                    <TextInput
                        style={inputCardStyles.textInputContainer}
                        placeholder='Phone Number'
                        keyboardType='numeric'
                        setInput={setPhoneNumber}
                        selectionColor={appTheme.primaryColor}
                        onChangeText={(text) => setPhoneNumber(text)}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        data={rolesData}
                        labelField="label"
                        valueField="value"
                        value={role}
                        iconColor={appTheme.primaryColor}
                        onChange={item => {
                            setRole(item.value);
                        }}
                    />

                    <SubmitButton text={'Sign Up'} onPress={handleSignUp} isDisabled={isDisabled} loader={loader}/>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, color: 'gray' }}>By signing in you agreet to our</Text>
                        <Text onPress={handlePolicy} style={{ fontSize: 10, color: 'gray', textDecorationLine: 'underline' }}>Terms & Privacy Policy.</Text>
                    </View>

                    <Text style={{ textAlign: 'center', color: 'gray', marginVertical: 25 }}> Already have account?. <Text onPress={() => { navigation.navigate('LoginScreen') }} style={{ color: appTheme.primaryColor, fontWeight: 600 }}>Sign In</Text> </Text>
                </ScrollView>

            </SafeAreaView>

            <SignUpMessageModal apiResponse={apiResponse} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({

    dropdown: {
        paddingRight: 15,
        width: '100%',
        height: 50,
        backgroundColor: "white",
        alignItems: "center",
        paddingLeft: 20,
        marginVertical: 8,
        borderRadius: 50,
        shadowColor: "gray",
        shadowOpacity: 0.8,
        elevation: 5,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});