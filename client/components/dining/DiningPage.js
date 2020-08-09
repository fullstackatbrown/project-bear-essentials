import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import DiningScreen from "./DiningScreen";
import DiningMenu from "./DiningMenu";

// configures dining menu screen for navigator
const DiningStack = createStackNavigator();

const DiningNavigator = () => {
  return(
    <DiningStack.Navigator initialRouteName="DiningScreen">
      <DiningStack.Screen name="DiningScreen" component={DiningScreen} options={{headerShown: false}} />
      <DiningStack.Screen name="Menu" component={DiningMenu} />
    </DiningStack.Navigator>
  );
}

export default DiningNavigator