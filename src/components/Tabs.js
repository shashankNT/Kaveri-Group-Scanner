import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import OffersScreen from '../screens/OffersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { appTheme } from '../colors';
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';



const Tabs = ({ navigationStack, route }) => {

    const { setBaseAuth } = route.params || {};
    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: appTheme.primaryColor,
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} /> }}
            />

            <Tab.Screen
                name="Offers"
                component={OffersScreen}
                options={{
                    headerTitle: "Today's Offer",
                    tabBarLabel: 'Offers',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="local-offer" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                initialParams={{ setBaseAuth: setBaseAuth, navigationStack: navigationStack }}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs