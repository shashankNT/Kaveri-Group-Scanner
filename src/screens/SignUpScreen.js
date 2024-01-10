import { appTheme } from "../colors";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, View, StyleSheet, TextInput, Text, TouchableOpacity, SafeAreaView, StatusBar, Linking } from "react-native";

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
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, padding: 20, backgroundColor: 'white', flex: 1 }}>
            <TouchableOpacity style={{ paddingTop: 15 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View style={{ alignItems: "center", margin: 20 }}>
                <View style={{ height: 120, borderRadius: 10, aspectRatio: 1, alignItems: "center", justifyContent: 'center', backgroundColor: 'white', shadowColor: "gray", shadowOpacity: 0.8, elevation: 8 }}>
                    <Image source={require("../images/logo_icon.jpg")} style={{ height: 100, aspectRatio: 1, padding: 5 }} />
                </View>
            </View>

            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", margin: 25 }} > Sign Up </Text>

            <TextInput style={styles.textInputContainer} placeholder="Name" selectionColor={appTheme.primaryColor} onChangeText={() => setName(name)} />
            <TextInput style={styles.textInputContainer} placeholder="Your Email" selectionColor={appTheme.primaryColor} onChangeText={() => setEmail(email)} />
            <TextInput style={styles.textInputContainer} placeholder="Password" selectionColor={appTheme.primaryColor} onChangeText={() => setPassword(password)} />
            <TextInput style={styles.textInputContainer} placeholder="Phone Number" selectionColor={appTheme.primaryColor} onChangeText={() => setPhoneNumber(phoneNumber)} />
            <TextInput style={styles.textInputContainer} placeholder="Role" selectionColor={appTheme.primaryColor} onChangeText={() => setRole(role)} />

            <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
                <Text style={{ padding: 10, fontWeight: 400, fontSize: 16, color: "white" }}>Sign up</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 10, color: 'gray', }}>By signing in you agreet to our</Text>
                <Text onPress={handlePolicy} style={{ fontSize: 10, color: 'gray', textDecorationLine: 'underline' }}>Terms & Privacy Policy.</Text>
            </View>

            <Text style={styles.plainText}> Already have account?. <Text onPress={() => { navigation.navigate('LoginScreen') }} style={{ color: appTheme.primaryColor, fontWeight: 600 }}>Sign In</Text> </Text>

        </SafeAreaView>
    )
}

export default SignUpScreen


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
        marginVertical: 8,
        borderRadius: 50,
        shadowColor: "gray",
        shadowOpacity: 0.8,
        elevation: 5,
    },
    plainText: {
        textAlign: 'center',
        color: 'gray',
        marginVertical: 25
    },
    hidePassword: {
        padding: 10,
        color: appTheme.primaryColor,
    },
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
