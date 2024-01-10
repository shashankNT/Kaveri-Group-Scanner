import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react'
import * as Print from "expo-print";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import SummaryTable from '../components/SummaryTable'
import DownloadSummary from '../components/DownloadSummary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, SafeAreaView, StatusBar } from 'react-native'

const ScannerSummaryScreen = ({ route, navigation }) => {

    const { lotNumber } = route.params;
    const [lotData, setLotData] = useState();
    const [testReportPDF, setTestReportPDF] = useState();

    const getApiData = async () => {
        try {

            const credentials = await AsyncStorage.getItem('basicAuth');
            const response = await axios.get(`https://portal.kaveri.group/search.json?lot_number=${lotNumber}`, { headers: { Authorization: credentials } });

            setLotData(response.data.test_report_items);
            setTestReportPDF(response.data.test_report_summary);

        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getApiData();
    }, []);

    const handleDownload = async () => {

        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission needed', 'This app needs access to your Media library ');
                return;
            }

            // console.log('Starting download..!!');
            const downloadResumable = FileSystem.createDownloadResumable(testReportPDF, FileSystem.cacheDirectory + `${lotNumber}.pdf`);
            const { uri } = await downloadResumable.downloadAsync(null, { shouldCache: false });
            // console.log('Download completed successfully', uri);

            await Print.printAsync({ uri });

            // const asset = await MediaLibrary.createAssetAsync(uri);
            // console.log('Asset created successfully', asset);

            // await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, flex: 1, backgroundColor: 'white' }}>

                <Ionicons name="close-sharp" size={24} onPress={() => navigation.navigate('Home')} style={{ margin: 15, color: 'black' }} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }}> Reference No. - {lotNumber}</Text>
                <SummaryTable lotData={lotData} />
                <DownloadSummary handleDownload={handleDownload} />

            </SafeAreaView >
        </>
    )
}

export default ScannerSummaryScreen

