import { appTheme } from "../colors";
import React, { useState } from "react";
import base64 from 'react-native-base64';
import { Ionicons } from "@expo/vector-icons";
import InputCard from "../components/InputCard";
import SubmitButton from "../components/SubmitButton";
import BackArrowIcon from "../components/BackArrowIcon";
import { inputCardStyles } from '../components/InputCard'
import ResetPasswordModal from "../components/ResetPasswordModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, View, StyleSheet, TextInput, Text, StatusBar, SafeAreaView } from "react-native";


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogin = async () => {

        const basicAuthValue = 'Basic ' + base64.encode(`${email}:${password}`);

        await AsyncStorage.setItem('basicAuth', basicAuthValue);
        await AsyncStorage.setItem('email', email);

        navigation.navigate('Home');
    };


    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, backgroundColor: appTheme.backgroundColor, padding: 20, flex: 1 }}>
                <BackArrowIcon navigation={navigation} />

                <View style={{ alignItems: "center", marginTop: 50, marginBottom: 30 }}>
                    <View style={{ height: 120, borderRadius: 10, aspectRatio: 1, alignItems: "center", justifyContent: 'center', backgroundColor: 'white', shadowColor: "gray", shadowOpacity: 0.8, elevation: 8 }}>
                        <Image source={require("../images/logo_icon.jpg")} style={{ height: 100, aspectRatio: 1 }} />
                    </View>
                </View>

                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", margin: 20 }} > Sign In </Text>

                <InputCard placeholder={'Your Email'} setInput={setEmail} />

                <View style={inputCardStyles.textInputContainer}>
                    <TextInput style={{ flex: 1, borderRadius: 60 }} placeholder="Password" selectionColor={appTheme.primaryColor} onChangeText={(text) => setPassword(text)} secureTextEntry={!showPassword} />
                    {showPassword
                        ? <Ionicons onPress={() => setShowPassword(!showPassword)} style={styles.hidePassword} name="eye" size={24} />
                        : <Ionicons onPress={() => setShowPassword(!showPassword)} style={styles.hidePassword} name="eye-off" size={24} />
                    }
                </View>

                <SubmitButton text={'Sign In'} onPress={handleLogin} />

                <Text style={styles.plainText} onPress={() => setModalVisible(!modalVisible)}> Forgot Password? </Text>
                <Text style={styles.plainText}> Don't have an account? <Text onPress={() => { navigation.navigate('SignUpScreen') }} style={{ color: appTheme.primaryColor, fontWeight: 600 }}> Sign Up </Text></Text>

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
