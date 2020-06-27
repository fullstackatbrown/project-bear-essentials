import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import DiningScreen from "../dining/DiningScreen";
import LaundryScreen from "../laundry/LaundryScreen";
import MapScreen from "../map/MapScreen";
import SettingsScreen from "../settings/SettingsScreen";

// import icons
import LaundryIcon from "./LaundryIcon";
import DiningIcon from "./DiningIcon";
import MapIcon from "./MapIcon";
import SettingsIcon from "./SettingsIcon";
//import colors
import Colors from "../../constants/Colors";

//import headers
import LaundryHeader from "./LaundryHeader";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Dining";

export default function BottomTabNavigator({ navigation, route }) {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    return (
        <BottomTab.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            tabBarOptions={{
                activeTintColor: Colors.accentRed,
            }}
        >
            <BottomTab.Screen
                name="Dining"
                component={DiningScreen}
                options={{
                    title: "Dining",
                    tabBarIcon: ({ focused }) => (
                        <DiningIcon focused={focused} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Laundry"
                component={LaundryScreen}
                options={{
                    title: "Laundry",
                    tabBarIcon: ({ focused }) => (
                        <LaundryIcon focused={focused} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    title: "Map",
                    tabBarIcon: ({ focused }) => <MapIcon focused={focused} />,
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: "Settings",
                    tabBarIcon: ({ focused }) => (
                        <SettingsIcon focused={focused} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName =
        route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
    case "Dining":
        return "Dining";
    case "Laundry":
        return () => <LaundryHeader/>;
    case "Map":
        return "Map";
    case "Settings":
        return "Settings";
    }
}
