import React from 'react'
import { Text, SafeAreaView, StatusBar } from 'react-native'

const ScannerSummaryScreen = () => {
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, paddingHorizontal: 22, backgroundColor: 'white', flex: 1 }}>
            <Text>
                Scanner Data
            </Text>
        </SafeAreaView>
    )
}

export default ScannerSummaryScreen