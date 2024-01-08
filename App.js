import { NavigationContainer } from '@react-navigation/native';
import ScannerScreen from './src/screens/ScannerScreen';
import LoginScreen from './src/screens/LoginScreen';
import Tabs from './src/components/Tabs';
import Stack from './src/components/Stack';

const App = () => {
    return (
        <NavigationContainer>
            <Stack />
        </NavigationContainer>
        // <>
        // <LoginScreen/>
        // </>
    )
}

export default App