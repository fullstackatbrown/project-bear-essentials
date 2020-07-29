import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsScreen from './SettingsScreen';
import DietaryPreferences from './DietaryPreferences';
import LaundryNotifications from './LaundryNotifications';
import DeveloperTeam from './DeveloperTeam';

export type SettingsStackParamList = {
    SettingsScreen: undefined;
    DietaryPreferences: {preferences: Map<string, boolean>, onSelect: (preference: string) => void};
    LaundryNotifications: undefined;
    DeveloperTeam: undefined;
}

const SettingsStack = createStackNavigator<SettingsStackParamList>();

interface SettingsStackProps {}

const Settings: React.FC<SettingsStackProps> = () => {
    return (
        <SettingsStack.Navigator initialRouteName="SettingsScreen">
            <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} options={{title: "Settings", headerShown: false}} />
            <SettingsStack.Screen name="DietaryPreferences" component={DietaryPreferences} options={{title: "Dietary Preferences"}} />
            <SettingsStack.Screen name="LaundryNotifications" component={LaundryNotifications} options={{title: "Laundry Notifications"}} />
            <SettingsStack.Screen name="DeveloperTeam" component={DeveloperTeam} options={{title: "Developer Team"}} />
        </SettingsStack.Navigator>
    )
}

export default Settings;
