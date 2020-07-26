import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsScreen from './SettingsScreen';
import DietaryPreferences from './DietaryPreferences';
import LaundryNotifications from './LaundryNotifications';
import DeveloperTeam from './DeveloperTeam';

export type SettingsStackParamList = {
    SettingsScreen: undefined;
    DietaryPreferences: undefined;
    LaundryNotifications: undefined;
    DeveloperTeam: undefined;
}

const SettingsStack = createStackNavigator<SettingsStackParamList>();

interface SettingsStackProps {}

const Settings: React.FC<SettingsStackProps> = () => {
    return (
        <SettingsStack.Navigator initialRouteName="SettingsScreen">
            <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}} />
            <SettingsStack.Screen name="DietaryPreferences" component={DietaryPreferences} />
            <SettingsStack.Screen name="LaundryNotifications" component={LaundryNotifications} />
            <SettingsStack.Screen name="DeveloperTeam" component={DeveloperTeam} />
        </SettingsStack.Navigator>
    )
}

export default Settings;
