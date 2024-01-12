import React from 'react'
import { appTheme } from '../colors'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'

const SubmitButton = ({ text, onPress, loader = false }) => {
    return (
        <>
            <TouchableOpacity style={styles.submitButton} onPress={onPress}>
                {loader
                    ? <ActivityIndicator size="large" color='white' />
                    : <Text style={{ padding: 10, fontWeight: 400, fontSize: 16, color: "white" }}>{text}</Text>
                }
            </TouchableOpacity>
        </>
    )
}

export default SubmitButton


const styles = StyleSheet.create({
    submitButton: {
        height: 50,
        width: "100%",
        borderRadius: 50,
        marginVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appTheme.primaryColor,

        shadowColor: "black",
        shadowOpacity: 0.8,
        elevation: 8,
    },
});