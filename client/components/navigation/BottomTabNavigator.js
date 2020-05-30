import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "./TabBarIcon";
import DiningScreen from "../dining/DiningScreen";
import LaundryScreen from "../laundry/LaundryScreen";
import MapScreen from "../map/MapScreen";
import SettingsScreen from "../settings/SettingsScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Dining";

//TODO: Make colors not blue
export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Dining"
        component={DiningScreen}
        options={{
          title: "Dining",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-pizza" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Laundry"
        component={LaundryScreen}
        options={{
          title: "Laundry",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-basket" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Map",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-map" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-settings" />
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
      return "Laundry";
    case "Map":
      return "Map";
    case "Settings":
      return "Settings";
  }
}
