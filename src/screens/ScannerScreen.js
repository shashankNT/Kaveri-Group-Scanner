import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Platform, StatusBar, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
            <View style={{ aspectRatio: 1, width: 350, borderColor: 'red', borderWidth: 1 }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
            <View>
                {scanned && (
                    <View>
                        <Text>Data: {scannedData?.data}</Text>
                    </View>
                )}
            </View>
            {/* <Button
                title="Press me"
                // color={appTheme}
                onPress={() => Alert.alert('Button with adjusted color pressed')}
            /> */}
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
