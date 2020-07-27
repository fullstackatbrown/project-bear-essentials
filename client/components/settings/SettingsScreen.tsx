import React, {useState} from "react";
import {View, StyleSheet, Alert} from "react-native";
import {RouteProp, NavigationProp} from '@react-navigation/core';
import {SettingsStackParamList} from './Settings';
import SettingsSwitch from './SettingsSwitch';
import SettingsTab from './SettingsTab';
import DietaryPreferencesIcons from './DietaryPreferencesIcons';

type SettingsScreenRouteProp = RouteProp<SettingsStackParamList, 'SettingsScreen'>;
type SettingsScreenNavigationProp = NavigationProp<SettingsStackParamList, 'SettingsScreen'>;

interface SettingsScreenProps {
    route: SettingsScreenRouteProp;
    navigation: SettingsScreenNavigationProp;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}: SettingsScreenProps) => {
    const [darkTheme, setDarkTheme] = useState(false)
    const [dietaryPreferences] = useState(['kosher', 'halal'])

    const toggleDarkTheme = () => {
        setDarkTheme(!darkTheme);
    }

    const navigateToLaundryNotifications = () => {
        navigation.navigate("LaundryNotifications")
    }
    const navigateToDietaryPreferences = () => {
        navigation.navigate("DietaryPreferences")
    }
    const navigateToDeveloperTeam = () => {
        navigation.navigate("DeveloperTeam")
    }

    return (
        <View style={styles.container}>
            <SettingsTab title="Dietary preferences" onPress={navigateToDietaryPreferences} style={styles.sectionHeader} rightElement={<DietaryPreferencesIcons preferences={dietaryPreferences} />} />
            <SettingsTab title="Laundry notifications" onPress={navigateToLaundryNotifications} />
            <SettingsSwitch title="Dark theme" value={darkTheme} onSwitch={toggleDarkTheme} style={styles.sectionHeader} />
            <SettingsTab title="Developer team" onPress={navigateToDeveloperTeam} style={styles.sectionHeader} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    sectionHeader: {
        marginTop: 30,
    }
});

SettingsScreen.navigationOptions = {
    header: null,
};

export default SettingsScreen;
