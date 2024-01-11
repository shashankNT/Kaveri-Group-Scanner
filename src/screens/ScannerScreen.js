import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SubmitButton from '../components/SubmitButton';
import { Text, View, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';

const ScannerScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState({ data: null });

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        if (scannedData.data !== null)
            navigation.navigate('ScannerSummaryScreen', { lotNumber: scannedData.data });
    }, [scannedData])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setScannedData({ type, data });
    };

    if (hasPermission === null) {
        return <Text>Requesting camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, padding: 20, backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ height: '100%', width: '100%' }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={[StyleSheet.absoluteFillObject, { width: "100%", height: "100%", transform: [{scale: 1.5}]}]}
                />
                <View style={{ paddingTop: 100, alignContent:'center', justifyContent: 'space-between', width: '100%', height: '100%' }}>
                    <Text style={{ fontSize: 25, fontWeight:400, color: 'white', textAlign:'center' }}>Sacn a QR Code</Text>
                    <SubmitButton text={'Cancel'} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
    },
});

export default ScannerScreen;
