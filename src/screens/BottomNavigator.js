import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "./ProfileScreen";
import OffersScreen from "./OffersScreen";
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { Icon } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';

import {
  Dimensions,
  Platform,
  View,
  useWindowDimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { appTheme } from "../colors";
import ChatScreen from "./ChatScreen";

export function BottomNavigator() {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();

  const customTabBarStyle = {
    tabBarActiveTintColor: appTheme.primaryColor,
    tabBarInactiveTintColor: "gray",
    tabBarStyle: {
      backgroundColor: appTheme.backgroundColor,
      height: 60 + insets.bottom,
      shadowOffset: { width: 0, height: 0 },
      shadowColor: "gray",
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 2,
      paddingBottom: insets.bottom,
      // borderWidth: 1
    },
    headerShown: false,
    tabBarHideOnKeyboard: true
  };
  const { width, height } = useWindowDimensions();
  // height: height + insets.bottom
  // height: height + StatusBar.currentHeight
  // height + StatusBar.currentHeight + insets.bottom
  console.log("insets: ", insets.bottom, Platform.OS)
  return (
    // <SafeAreaView style={{ width, height: eight + StatusBar.currentHeight  }}>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        screenOptions={customTabBarStyle}
        shifting="false"
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              // <Icon
              //   source={require("../assets/Home_grey.png")}
              //   color={color}
              //   size={30}
              // />
              <Entypo name="home" size={24}color={color} />
            ),
          }}
          component={HomeScreen}
        />
            <Tab.Screen
          name="Offers"
          options={{
            tabBarLabel: "Offers",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="local-offer" size={24} color={color} />
            ),
          }}
          component={OffersScreen}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
          component={ProfileScreen}
        />
         <Tab.Screen
          name="Chat"
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble-ellipses-sharp" size={24} color={color} />
            ),
          }}
          component={ChatScreen}d
        />
      </Tab.Navigator>
    // </SafeAreaView>
  );
}
