import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, StatusBar, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { appTheme } from "../colors";


const ScannerSummaryScreen = ({ route, navigation }) => {

    const lotNumber = '23KE30401';

    const [lotData, setLotData] = useState();

    const getApiData = async () => {
        try {

            const credentials = await AsyncStorage.getItem('basicAuth');
            const response = await axios.get(`https://portal.kaveri.group/search.json?lot_number=${lotNumber}`, { headers: { Authorization: credentials } });

            console.log('scanner', response.data);

            const formattedData = Object.entries(response.data.test_report_items);
            setLotData(formattedData);

        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getApiData();
    }, []);


    const handleDownload = () => {
        console.log('Downlaod');
    }

    const renderRow = ({ item }) => (
        <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#f2f2f2', padding: 10 }}>
            <Text style={{ flex: 1 }}>{item[0]}</Text>
            <Text style={{ flex: 1 }}>{parseFloat(item[1]).toFixed(2)}</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, paddingHorizontal: 5, flex: 1, width: '100%' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ margin: 15 }}>
                <Ionicons name="close-sharp" size={24} color="black" />
            </TouchableOpacity>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }}> Reference No. - {lotNumber}</Text>
            <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#f2f2f2', padding: 10 }}>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>Parameter</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>Reading</Text>
                </View>

                <FlatList
                    data={lotData}
                    renderItem={renderRow}
                    keyExtractor={(item) => item[0]}
                />
            </View>
            <View style={{ position: 'absolute', backgroundColor: 'white', bottom: 0, borderTopColor: 'gray', borderTopWidth: 0.5, width: '103%', alignItems: 'center' }}>
                <TouchableOpacity style={styles.signInButton} onPress={handleDownload}>
                    <Text style={{ padding: 10, fontWeight: 400, fontSize: 16, color: "white" }}>Download Summary </Text>
                    <Ionicons name="cloud-download-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default ScannerSummaryScreen

const styles = StyleSheet.create({
    signInButton: {

        marginVertical: 20,
        flexDirection: 'row',
        width: "90%",
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
