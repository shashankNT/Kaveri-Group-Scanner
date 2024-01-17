import { useState } from 'react';
import { appTheme } from '../colors';
import { Ionicons } from "@expo/vector-icons";
import TabBarButton from '../components/TabBarButton';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SubmitButton from '../components/SubmitButton';
import { inputCardStyles } from '../components/InputCard';
import { SafeAreaView, Text, TextInput, ToastAndroid, View } from 'react-native';

const HomeScreen = ({ navigation }) => {

    const [lotNumber, setLotNumber] = useState('');

    const openCamera = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();

        if (status === "granted") {
            navigation.navigate('ScannerScreen');
        } else if (status === "denied") {
            ToastAndroid.show('Need Camera Permission to Scan', ToastAndroid.SHORT);
        }
    };

    const handleSearch = (lotNo) => {
        if (!lotNo) return;
        navigation.navigate('ScannerSummaryScreen', { lotNumber: lotNo });
    }

    return (
        <SafeAreaView style={{ backgroundColor: appTheme.backgroundColor, flex: 1 }}>

            <Text style={{ textAlign: 'center', paddingVertical: 20, fontSize: 20, fontWeight: 600 }}>Home</Text>

            <View style={{ paddingHorizontal: 22 }}>

                <SubmitButton text={'Scan Barcode / QR Code'} onPress={openCamera} />

                <View style={inputCardStyles.textInputContainer}>
                    <TextInput placeholder='Scan or enter your Bale Number' selectionColor={appTheme.primaryColor} style={{ flex: 1, borderRadius: 60, textAlign: 'center', paddingLeft: 20 }} onChangeText={(text) => setLotNumber(text)} />
                    <Ionicons onPress={() => handleSearch(lotNumber)} style={{ paddingRight: 15, color: appTheme.primaryColor }} name="search-sharp" size={24} />
                </View>

            </View>

            <TabBarButton activeTab='Home' navigation={navigation} />
        </SafeAreaView>
    )
}

export default HomeScreen
