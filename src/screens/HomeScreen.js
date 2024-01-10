import { useState } from 'react';
import { appTheme } from '../colors';
import { Ionicons } from "@expo/vector-icons";
import TabBarButton from '../components/TabBarButton'
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, StatusBar, View } from 'react-native';

const HomeScreen = ({ navigation }) => {

    const [lotNumber, setLotNumber] = useState('23KE30501');

    const handleSearch = () => {
        navigation.navigate('ScannerSummaryScreen', { lotNumber: lotNumber });
    }

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, backgroundColor: 'white', flex: 1 }}>

            <Text style={{ textAlign: 'center', paddingTop: 12, fontSize: 20, fontWeight: 600 }}>Home</Text>

            <View style={{ paddingHorizontal: 22 }}>

                <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('ScannerScreen')}>
                    <Text style={{ padding: 10, fontWeight: 400, fontSize: 16, color: "white" }}>Scan Barcode / QR Code</Text>
                </TouchableOpacity>

                <View style={styles.textInputContainer}>
                    <TextInput value='23KE30501' placeholder='Scan or enter your Bale Number' selectionColor={appTheme.primaryColor} style={{ flex: 1, borderRadius: 60, textAlign: 'center', paddingLeft: 20 }} onChangeText={() => setLotNumber(lotNumber)} />
                    <Ionicons onPress={handleSearch} style={{ paddingRight: 10, color: appTheme.primaryColor }} name="search-sharp" size={24} />
                </View>

                {/* <Text style={{ paddingTop:] 30,  fontWeight: 700, fontSize: 22 }}>Recent Searches</Text> */}
            </View>

            <TabBarButton activeTab='Home' navigation={navigation} />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

    textInputContainer: {
        height: 50,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 10,
        borderRadius: 50,
        shadowColor: "black",
        shadowOpacity: 0.8,
        elevation: 8,
    },
    searchButton: {
        marginVertical: 40,
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
