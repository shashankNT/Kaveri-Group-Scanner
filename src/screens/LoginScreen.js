import { appTheme } from "../colors";
import React, { useState } from "react";
import base64 from 'react-native-base64';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, View, StyleSheet, TextInput, Text, TouchableOpacity, SafeAreaView, StatusBar, Linking } from "react-native";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {

        const basicAuthValue = 'Basic ' + base64.encode('svisamsetty@navtech.io:1234567890');

        await AsyncStorage.setItem('basicAuth', basicAuthValue);

        navigation.navigate('Home');
    };

    const handlePolicy = () => {
        Linking.openURL('https://portal.kaveri.group/privacy-policy')
    }


    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, padding: 20, backgroundColor: 'white', flex: 1 }}>
            {/* <TouchableOpacity style={{ paddingTop: 15 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity> */}

            <View style={{ alignItems: "center", marginTop: 50 }}>
                <Image source={require("../images/logo_icon.jpg")} style={{ height: 100, aspectRatio: 1 }} />
            </View>

            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: "15%" }} > Sign In </Text>


            <TextInput style={styles.textInputContainer} placeholder="Your Email" selectionColor={appTheme.primaryColor} onChangeText={() => setEmail(email)} />
            <View style={styles.textInputContainer}>
                <TextInput style={{ flex: 1, borderRadius: 60 }} placeholder="Password" selectionColor={appTheme.primaryColor} onChangeText={() => setPassword(password)} secureTextEntry={!showPassword} />
                {showPassword
                    ? <Ionicons onPress={() => setShowPassword(!showPassword)} style={styles.hidePassword} name="eye" size={24} />
                    : <Ionicons onPress={() => setShowPassword(!showPassword)} style={styles.hidePassword} name="eye-off" size={24} />
                }
            </View>

            <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
                <Text style={{ padding: 10, fontWeight: 400, fontSize: 16, color: "white" }}>Sign In</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 10, color: 'gray',  }}>By signing in you agreet to our</Text>
                <Text onPress={handlePolicy} style={{ fontSize: 10, color: 'gray', textDecorationLine:'underline' }}>Terms & Privacy Policy.</Text>
            </View>

            {/* <Text style={styles.plainText}> Forgot Password? </Text>
            <Text style={styles.plainText}> Don't have an account?  <Text style={{ color: appTheme.primaryColor, fontWeight: 600 }}>Sign Up</Text> </Text> */}

        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    input: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        marginVertical: 5,
    },
    textInputContainer: {
        height: 50,
        backgroundColor: "white",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 10,
        marginVertical: 20,
        borderRadius: 50,
        shadowColor: "black",
        shadowOpacity: 0.8,
        elevation: 8,
    },
    plainText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 16,
        marginVertical: 20
    },
    hidePassword: {
        padding: 10,
        color: appTheme.primaryColor,
    },
    signInButton: {
        marginVertical: "15%",
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
