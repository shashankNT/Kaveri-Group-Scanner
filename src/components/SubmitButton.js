import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { appTheme } from '../colors'

const SubmitButton = ({ handleSubmit }) => {
    return (
        <>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={{ padding: 10, fontWeight: 400, fontSize: 16, color: "white" }}>Apply</Text>
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