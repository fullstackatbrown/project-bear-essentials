import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DiningScreen from "../dining/DiningScreen";
import DiningMenu from "../dining/DiningMenu";

// configures dining menu screen for navigator
const DiningStack = createStackNavigator();

const MenuNavigator = () => {
    return (
        <NavigationContainer>
             <DiningStack.Navigator initialRouteName="Dining Screen">
                  <DiningStack.Screen name="Dining Screen" component={DiningScreen} />
                  <DiningStack.Screen name="Menu" component={DiningMenu} />
              </DiningStack.Navigator>
        </NavigationContainer>
    );
}

export default MenuNavigator;