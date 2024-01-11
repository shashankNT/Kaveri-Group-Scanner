import React from 'react'
import { appTheme } from '../colors';
import BackArrowIcon from '../components/BackArrowIcon'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Image, Text, View } from 'react-native';

const UserInfoScreen = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, backgroundColor: appTheme.backgroundColor, paddingHorizontal: 20, flex: 1 }}>
                <BackArrowIcon navigation={navigation} />

                <View style={{ alignItems: "center", marginVertical: 30 }}>
                    <View style={{ height: 120, borderRadius: 100, aspectRatio: 1, alignItems: "center", justifyContent: 'center', backgroundColor: 'white', shadowColor: "gray", shadowOpacity: 0.8, elevation: 8 }}>
                        <Image source={require("../images/logo_icon.jpg")} style={{ height: 100, aspectRatio: 1, padding: 5, borderRadius: 100 }} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}> Name </Text>
                    <Text style={{ fontSize: 16 }}> Shyam Admin </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}> Email </Text>
                    <Text style={{ fontSize: 16 }}> svisamsetty@navtech.io </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}> Phone </Text>
                    <Text style={{ fontSize: 16 }}> 1234567890 </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}> Role </Text>
                    <Text style={{ fontSize: 16 }}> Admin </Text>
                </View>

            </SafeAreaView>
        </>
    )
}

export default UserInfoScreen