import React from 'react'
import { appTheme } from '../colors';
import SubmitButton from './SubmitButton';
import { useNavigation } from "@react-navigation/native";
import { View, Text, SafeAreaView, StyleSheet, Modal, TouchableWithoutFeedback } from "react-native";

const SignUpMessageModal = ({ apiResponse, modalVisible, setModalVisible }) => {

    const navigation = useNavigation();

    return (
        <>
            <Modal transparent={true} visible={modalVisible} onPress={() => setModalVisible(!modalVisible)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <SafeAreaView style={styles.centeredView}>
                        {apiResponse?.success
                            ?
                            <View style={styles.modalView}>
                                <Text style={{ fontSize: 18 }}> Sign Up Success!'</Text>
                                <Text style={{ fontSize: 12, marginTop: 20, marginBottom: 15 }}>{apiResponse?.message}</Text>
                                <SubmitButton text='Close' onPress={() => { setModalVisible(!modalVisible); navigation.navigate('LoginScreen') }} />
                            </View>
                            :
                            <View style={styles.modalView}>
                                <Text style={{ fontSize: 18 }}> Sign Up Failed!'</Text>
                                <Text style={{ fontSize: 12, marginTop: 20, marginBottom: 15 }}>{apiResponse?.message[0]}</Text>
                                <SubmitButton text='Close' onPress={() => setModalVisible(!modalVisible)} />
                            </View>

                        }
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default SignUpMessageModal

const styles = StyleSheet.create({

    centeredView: {
        width: '100%',
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        padding: 20,
        borderRadius: 5,
        width: '90%',
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
});