import React, { useState, useCallback } from 'react'
import { appTheme } from '../colors';
import { RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';


const OffersScreen = () => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, padding: 20, backgroundColor: 'white', flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={{ backgroundColor: '#824E4133', borderRadius: 10, height: 190, borderWidth: 1, borderColor: appTheme.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: appTheme.primaryColor, fontSize: 18, fontWeight: 'bold' }}> No offers are available today.</Text>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default OffersScreen