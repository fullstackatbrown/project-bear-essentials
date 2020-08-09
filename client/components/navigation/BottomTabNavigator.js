import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import * as React from "react";
import {StyleSheet} from "react-native";

import DiningPage from "../dining/DiningPage";
import LaundryScreen from "../laundry/LaundryScreen";
import MapScreen from "../map/MapScreen";
import Settings from "../settings";

import LaundryIcon from "./LaundryIcon";
import DiningIcon from "./DiningIcon";
import MapIcon from "./MapIcon";
import SettingsIcon from "./SettingsIcon";
import Colors from "../../constants/Colors";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Dining";

export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            tabBarOptions={{
                activeTintColor: Colors.accentRed,
                style: styles.tabs,
                showLabel: false,
            }}
        >
            <BottomTab.Screen
                name="Dining"
                component={DiningPage}
                options={{
                    tabBarIcon: ({focused}) => (
                        <DiningIcon focused={focused} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Laundry"
                component={LaundryScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <LaundryIcon focused={focused} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarIcon: ({focused}) => <MapIcon focused={focused} />,
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({focused}) => (
                        <SettingsIcon focused={focused} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabs: {
        paddingVertical: 10
    }
});
