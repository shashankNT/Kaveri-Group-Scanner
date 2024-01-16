import { useState } from 'react';
import { appTheme } from '../colors';
import { Ionicons } from "@expo/vector-icons";
import TabBarButton from '../components/TabBarButton'
import SubmitButton from '../components/SubmitButton';
import { inputCardStyles } from '../components/InputCard';
import { SafeAreaView, Text, TextInput, View } from 'react-native';

const HomeScreen = ({ navigation }) => {

    const [lotNumber, setLotNumber] = useState('');

    const handleSearch = () => {
        navigation.navigate('ScannerSummaryScreen', { lotNumber: lotNumber });
    }

    return (
        <SafeAreaView style={{ backgroundColor: appTheme.backgroundColor, flex: 1 }}>

            <Text style={{ textAlign: 'center', paddingVertical: 20, fontSize: 20, fontWeight: 600 }}>Home</Text>

            <View style={{ paddingHorizontal: 22 }}>

                <SubmitButton text={'Scan Barcode / QR Code'} onPress={() => navigation.navigate('ScannerScreen')} />

                <View style={inputCardStyles.textInputContainer}>
                    <TextInput placeholder='Scan or enter your Bale Number' selectionColor={appTheme.primaryColor} style={{ flex: 1, borderRadius: 60, textAlign: 'center', paddingLeft: 20 }} onChangeText={() => setLotNumber(lotNumber)} />
                    <Ionicons onPress={handleSearch} style={{ paddingRight: 15, color: appTheme.primaryColor }} name="search-sharp" size={24} />
                </View>

                {/* <Text style={{ paddingTop: 30,  fontWeight: 700, fontSize: 22 }}>Recent Searches</Text> */}
            </View>

            <TabBarButton activeTab='Home' navigation={navigation} />
        </SafeAreaView>
    )
}

export default HomeScreen
