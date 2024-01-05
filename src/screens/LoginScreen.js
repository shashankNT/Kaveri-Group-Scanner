import React, { useState } from "react";
import { appTheme } from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleHidePassword = () => {
        setShowPassword(!showPassword);
    }


    return (
        <View style={{ width: "100%", paddingTop: 50, height: "100%", padding: 20 }}>

            <TouchableOpacity>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View style={{ alignItems: "center" }}>
                <Image source={require("../images/logo_icon.jpg")} style={{ height: 100, aspectRatio: 1 }} />
            </View>

            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: "15%" }} > Sign In </Text>


            <TextInput style={styles.textInputContainer} placeholder="Your Email" onChangeText={() => setEmail(email)} />
            <View style={styles.textInputContainer}>
                <TextInput style={{ flex: 1, borderRadius: 60 }} placeholder="Password" onChangeText={() => setPassword(password)} secureTextEntry={!showPassword} />
                {showPassword
                    ? <Ionicons onPress={handleHidePassword} style={styles.hidePassword} name="eye" size={24} />
                    : <Ionicons onPress={handleHidePassword} style={styles.hidePassword} name="eye-off" size={24} />
                }
            </View>

            <TouchableOpacity style={styles.signInButton}>
                <Text style={{ padding: 10, fontWeight: 400, fontSize: 16, color: "white" }}>Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.plainText}> Forgot Password? </Text>
            <Text style={styles.plainText}> Don't have an account?  <Text style={{ color: appTheme.primaryColor, fontWeight: 600 }}>Sign Up</Text> </Text>

        </View>
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
