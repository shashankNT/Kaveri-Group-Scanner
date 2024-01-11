import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';


const BackArrowIcon = ({ navigation }) => {
    return (
        <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingTop: 25 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
        </>
    )
}

export default BackArrowIcon