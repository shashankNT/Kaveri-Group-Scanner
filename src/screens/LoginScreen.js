import axios from "axios";
import { appTheme } from "../colors";
import base64 from 'react-native-base64';
import { offers } from '../api/apiConfig';
import { Ionicons } from "@expo/vector-icons";
import InputCard from "../components/InputCard";
import UserContext from "../context/UserContext";
import SubmitButton from "../components/SubmitButton";
import { inputCardStyles } from '../components/InputCard'
import React, { useContext, useEffect, useState } from "react";
import ResetPasswordModal from "../components/ResetPasswordModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, View, StyleSheet, TextInput, Text, SafeAreaView, ScrollView } from "react-native";


const LoginScreen = ({ navigation }) => {

    const { setIsLogedIn } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [loader, setLoader] = useState(false);

    const isDisabled = !(email && password);

    const validateLoginCredentials = async (basicToken) => {
        setLoader(true);
        try {

            const response = await axios.get(offers, { headers: { Authorization: basicToken } });

            setLoader(false);
            if (response?.data?.status === false) {
                setErrorMessage(response?.data?.message);
            } else {
                setIsLogedIn(true);
            }

        } catch (error) {

            if (error?.response?.status === 401 || error?.response?.status === 403) {
                setErrorMessage(error?.response?.data?.error);
                setLoader(false);
            }
        }
    }

    const handleLogin = async () => {

        const basicAuthValue = 'Basic ' + base64.encode(`${email}:${password}`);

        await AsyncStorage.setItem('basicAuth', basicAuthValue);

        validateLoginCredentials(basicAuthValue);

    };

    useEffect(() => {
        setLoader(false);
        setErrorMessage('');
    }, [email, password]);



    return (
        <>
            <SafeAreaView style={{ backgroundColor: appTheme.backgroundColor, paddingVertical: 40, paddingHorizontal: 20, flex: 1 }}>

                <View style={{ alignItems: "center", marginTop: 50, marginBottom: 30 }}>
                    <View style={{ height: 120, borderRadius: 10, aspectRatio: 1, alignItems: "center", justifyContent: 'center', backgroundColor: 'white', shadowColor: "gray", shadowOpacity: 0.8, elevation: 8 }}>
                        <Image source={require("../images/logo_icon.jpg")} style={{ height: 100, aspectRatio: 1 }} />
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", margin: 20 }} > Sign In </Text>

                    <InputCard placeholder={'Your Email'} setInput={setEmail} />

                    <View style={inputCardStyles.textInputContainer}>
                        <TextInput style={{ flex: 1, borderRadius: 60 }} placeholder="Password" selectionColor={appTheme.primaryColor} onChangeText={(text) => setPassword(text)} secureTextEntry={!showPassword} />
                        {showPassword
                            ? <Ionicons onPress={() => setShowPassword(!showPassword)} style={styles.hidePassword} name="eye" size={24} />
                            : <Ionicons onPress={() => setShowPassword(!showPassword)} style={styles.hidePassword} name="eye-off" size={24} />
                        }
                    </View>

                    <Text style={{ textAlign: 'center', color: '#C12721', paddingTop: 8 }} >{errorMessage}</Text>

                    <SubmitButton text={'Sign In'} onPress={handleLogin} isDisabled={isDisabled} loader={loader} />

                    <Text style={styles.plainText} onPress={() => setModalVisible(!modalVisible)}> Forgot Password? </Text>
                    <Text style={styles.plainText}> Don't have an account? <Text onPress={() => { navigation.navigate('SignUpScreen') }} style={{ color: appTheme.primaryColor, fontWeight: 600 }}> Sign Up </Text></Text>
                </ScrollView>
            </SafeAreaView>
            <ResetPasswordModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>

    );
};

export default LoginScreen;

const styles = StyleSheet.create({

    plainText: {
        textAlign: 'center',
        color: 'gray',
        marginVertical: 20
    },
    hidePassword: {
        padding: 10,
        color: appTheme.primaryColor,
    },
});
