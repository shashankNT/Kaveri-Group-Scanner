import Stacks from './src/components/Stacks';
import { Platform, SafeAreaView, StatusBar, View } from 'react-native';
import { appTheme } from './src/colors';


const App = () => {
    if (Platform.OS === "android") {
        StatusBar.setBackgroundColor(appTheme.backgroundColor); //this works just for android
      }
      StatusBar.setBarStyle("dark-content");
    return (
        <View style={{ height: "100%", backgroundColor: appTheme.backgroundColor }}>
        <SafeAreaView style={{flex: 1}}>
        <Stacks />
        </SafeAreaView>
        </View>
    )
}

export default App