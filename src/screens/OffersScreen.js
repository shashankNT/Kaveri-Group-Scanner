import { appTheme } from '../colors';
import React, { useState, useCallback } from 'react'
import TabBarButton from '../components/TabBarButton';
import { RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';


const OffersScreen = ({ navigation }) => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: appTheme.backgroundColor, flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={{ margin: 20, backgroundColor: '#824E4133', borderRadius: 10, height: 190, borderWidth: 1, borderColor: appTheme.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: appTheme.primaryColor, fontSize: 18, fontWeight: 'bold' }}> No offers are available today.</Text>
                </View>
            </ScrollView>

            <TabBarButton activeTab='Offers' navigation={navigation} />
        </SafeAreaView >
    )
}

export default OffersScreen