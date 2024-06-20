import { appTheme } from '../colors';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'


const DownloadSummary = ({ handleDownload }) => {
    return (
        <>
            <View style={{ position: 'absolute', backgroundColor: 'white', bottom: 0, borderTopColor: 'gray', borderTopWidth: 0.5, width: '103%', alignItems: 'center' }}>
                <TouchableOpacity style={styles.downlaodButton} onPress={handleDownload}>
                    <Text style={{ padding: 10, fontWeight: 400, fontSize: 16, color: "white" }}>Download Summary </Text>
                    <Ionicons name="cloud-download-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default DownloadSummary

const styles = StyleSheet.create({
    downlaodButton: {
        marginVertical: 20,
        flexDirection: 'row',
        width: "90%",
        backgroundColor: appTheme.primaryColor,
        borderRadius: 50,
        alignItems: "center",
        shadowColor: "black",
        // shadowOpacity: 0.8,
        elevation: 8,
        height: 50,
        justifyContent: "center",
    },
});
