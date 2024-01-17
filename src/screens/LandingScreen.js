import React, { useEffect, useState } from 'react'
import SubmitButton from '../components/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground, View, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { appTheme } from '../colors';

const LandingScreen = ({ navigation }) => {

    const [loader, setLoader] = useState(true);

    const checkForTocken = async () => {
        const credentials = await AsyncStorage.getItem('basicAuth');
        if (credentials !== null) navigation.navigate('Home');
        else setLoader(false);
    }

    useEffect(() => {
        checkForTocken();
    }, [])

    return (
        <>
            {loader
                ?
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size={70} color={appTheme.primaryColor} />
                </View>
                :
                <View style={styles.container}>
                    <ImageBackground source={require('../images/introduction.png')} resizeMode="cover" style={styles.image}>
                        <View style={{ alignItems: "center", marginHorizontal: 50, marginTop: 150, justifyContent: 'space-between', flex: 1 }}>
                            <Image source={require("../images/logo_icon.jpg")} style={{ height: 200, aspectRatio: 1, paddingHorizontal: 20 }} />
                            <SubmitButton text={'Get started'} onPress={() => navigation.navigate('LoginScreen')} />
                        </View>

                    </ImageBackground>
                </View>
            }
        </>
    )
}

export default LandingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
});
