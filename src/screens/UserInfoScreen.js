import React from 'react'
import { appTheme } from '../colors';
import BackArrowIcon from '../components/BackArrowIcon'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';


const UserInfoScreen = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, backgroundColor: appTheme.backgroundColor, paddingHorizontal: 20, flex: 1 }}>
                <BackArrowIcon navigation={navigation} />

                <View style={{ alignItems: "center", marginVertical: 30 }}>
                    <View style={{ height: 120, borderRadius: 100, alignItems: "center", justifyContent: 'center', backgroundColor: 'lightgray', shadowColor: "gray", shadowOpacity: 0.8, elevation: 8 }}>
                        <UserAvatar size={120} name="Shyam Admin" textColor={appTheme.primaryColor} bgColor="lightgray" />
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