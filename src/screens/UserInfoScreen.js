import { appTheme } from '../colors';
import { Text, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import BackArrowIcon from '../components/BackArrowIcon'
import { SafeAreaView } from 'react-native-safe-area-context'


const UserInfoScreen = ({ navigation, route }) => {

    const { userInfo } = route.params;

    return (
        <>
            <SafeAreaView style={{ backgroundColor: appTheme.backgroundColor, paddingHorizontal: 20, flex: 1 }}>
                <BackArrowIcon navigation={navigation} />

                <View style={{ alignItems: "center", marginVertical: 30 }}>
                    <View style={{ height: 120, borderRadius: 100, alignItems: "center", justifyContent: 'center', backgroundColor: 'lightgray', shadowColor: "gray", shadowOpacity: 0.8, elevation: 8 }}>
                        <UserAvatar size={120} name={userInfo?.name} textColor={appTheme.primaryColor} bgColor="lightgray" />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}> Name </Text>
                    <Text style={{ fontSize: 16 }}> {userInfo?.name} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}> Email </Text>
                    <Text style={{ fontSize: 16 }}> {userInfo?.email} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}> Phone </Text>
                    <Text style={{ fontSize: 16 }}> {userInfo?.phone_number} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingRight: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
                    <Text style={{ fontSize: 16, color: 'gray' }}> Role </Text>
                    <Text style={{ fontSize: 16 }}> {userInfo?.role} </Text>
                </View>

            </SafeAreaView>
        </>
    )
}

export default UserInfoScreen