import { NavigationContainer } from '@react-navigation/native';
import Stacks from './src/components/Stacks';
import { StatusBar } from 'react-native';
import { appTheme } from './src/colors';


const App = () => {
    StatusBar.setBackgroundColor(appTheme.primaryColor);
    StatusBar.setBarStyle("light-content");
    return (
        <NavigationContainer>
            <Stacks />
        </NavigationContainer>
    )
}

export default App