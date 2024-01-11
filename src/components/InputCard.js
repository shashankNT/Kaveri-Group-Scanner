import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { appTheme } from '../colors'

const InputCard = ({ placeholder, input, setInput }) => {
    return (
        <>
            <TextInput
                style={styles.textInputContainer}
                placeholder={placeholder}
                selectionColor={appTheme.primaryColor}
                onChangeText={() => setInput(input)}
            />
        </>
    )
}

export default InputCard

export const styles = StyleSheet.create({
    textInputContainer: {
        height: 50,
        backgroundColor: "white",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 20,
        marginVertical: 8,
        borderRadius: 50,
        shadowColor: "gray",
        shadowOpacity: 0.8,
        elevation: 5,
    },
});