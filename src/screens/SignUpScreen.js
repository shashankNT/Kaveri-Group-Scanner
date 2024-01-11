import { appTheme } from "../colors";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, View, StyleSheet, Text, TouchableOpacity, SafeAreaView, StatusBar, Linking } from "react-native";
import InputCard from "../components/InputCard";
import SubmitButton from "../components/SubmitButton";

const SignUpScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');

    const handleSignUp = async () => {
        navigation.navigate('Home');
    };

    const handlePolicy = () => {
        Linking.openURL('https://portal.kaveri.group/privacy-policy')
    }

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, padding: 20, backgroundColor: appTheme.backgroundColor, flex: 1 }}>
            <TouchableOpacity style={{ paddingTop: 15 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View style={{ alignItems: "center", margin: 20 }}>
                <View style={{ height: 120, borderRadius: 10, aspectRatio: 1, alignItems: "center", justifyContent: 'center', backgroundColor: 'white', shadowColor: "gray", shadowOpacity: 0.8, elevation: 8 }}>
                    <Image source={require("../images/logo_icon.jpg")} style={{ height: 100, aspectRatio: 1, padding: 5 }} />
                </View>
            </View>

            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", margin: 25 }} > Sign Up </Text>


            <InputCard placeholder={'Name'} input={name} setInput={setName} />
            <InputCard placeholder={'Your Email'} input={email} setInput={setEmail} />
            <InputCard placeholder={'Password'} input={password} setInput={setPassword} />
            <InputCard placeholder={'Phone Number'} input={phoneNumber} setInput={setPhoneNumber} />
            <InputCard placeholder={'Role'} input={role} setInput={setRole} />

            <SubmitButton text={'Sign up'} onPress={handleSignUp}/>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 10, color: 'gray', }}>By signing in you agreet to our</Text>
                <Text onPress={handlePolicy} style={{ fontSize: 10, color: 'gray', textDecorationLine: 'underline' }}>Terms & Privacy Policy.</Text>
            </View>

            <Text style={{ textAlign: 'center', color: 'gray', marginVertical: 25 }}> Already have account?. <Text onPress={() => { navigation.navigate('LoginScreen') }} style={{ color: appTheme.primaryColor, fontWeight: 600 }}>Sign In</Text> </Text>

        </SafeAreaView>
    )
}

export default SignUpScreen


const styles = StyleSheet.create({


    signInButton: {
        marginVertical: "5%",
        width: "100%",
        backgroundColor: appTheme.primaryColor,
        borderRadius: 50,
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.8,
        elevation: 8,
        height: 50,
        justifyContent: "center",
    },
});
