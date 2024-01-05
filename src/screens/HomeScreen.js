import { appTheme } from '../colors';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, paddingHorizontal: 22, backgroundColor: 'white', flex: 1 }}>
      <TouchableOpacity style={styles.signInButton}>
        <Text style={{ padding: 10, fontWeight: 400, fontSize: 16, color: "white" }}>Scan Barcode / QR Code</Text>
      </TouchableOpacity>

      <View style={styles.textInputContainer}>
        <TextInput placeholder='Scan or enter your Bale Number' selectionColor={appTheme.primaryColor} style={{ flex: 1, borderRadius: 60, textAlign: 'center', paddingLeft: 20 }} />
        <Ionicons style={{ paddingRight: 10, color: appTheme.primaryColor }} name="search-sharp" size={24} />
      </View>

      {/* <Text style={{ paddingTop: 30,  fontWeight: 700, fontSize: 22 }}>Recent Searches</Text> */}

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

  textInputContainer: {
    height: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 50,
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 8,
  },
  signInButton: {
    marginVertical: 40,
    width: "100%",
    backgroundColor: appTheme.primaryColor,
    borderRadius: 50,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 8,
    height: 50,
    justifyContent: "center",
  },
});
