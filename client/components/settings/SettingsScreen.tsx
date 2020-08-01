import React, {useState} from "react";
import {View, StyleSheet, SafeAreaView} from "react-native";
import {RouteProp, NavigationProp} from "@react-navigation/core";
import {SettingsStackParamList} from "./Settings";
import SettingsSwitch from "./SettingsSwitch";
import SettingsTab from "./SettingsTab";
import DietaryPreferencesIcons from "./DietaryPreferencesIcons";
import {SimpleHeader} from "../reusable";

type SettingsScreenRouteProp = RouteProp<SettingsStackParamList, "SettingsScreen">;
type SettingsScreenNavigationProp = NavigationProp<SettingsStackParamList, "SettingsScreen">;

interface SettingsScreenProps {
    route: SettingsScreenRouteProp;
    navigation: SettingsScreenNavigationProp;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}: SettingsScreenProps) => {
    const [darkTheme, setDarkTheme] = useState(false);
    const [preferences, setPreferences] = useState(new Map<string, boolean>([["gluten-free", false], ["halal", true], ["kosher", true], ["vegan", false], ["vegetarian", false]]));
    const toggleDarkTheme = () => {
        setDarkTheme(!darkTheme);
    };
    const onSelect = (preference: string) => {
        let newPreferences = new Map(preferences);
        newPreferences.set(preference, !preferences.get(preference));
        setPreferences(newPreferences);
    };

    const navigateToLaundryNotifications = () => {
        navigation.navigate("LaundryNotifications");
    };
    const navigateToDietaryPreferences = () => {
        navigation.navigate("DietaryPreferences", {preferences: preferences, onSelect: onSelect});
    };
    const navigateToDeveloperTeam = () => {
        navigation.navigate("DeveloperTeam");
    };

    return (
        <SafeAreaView style={styles.container}>
            <SimpleHeader title={"Settings"} />
            <SettingsTab title="Dietary preferences" onPress={navigateToDietaryPreferences} rightElement={<DietaryPreferencesIcons preferences={preferences} />} />
            <SettingsTab title="Laundry notifications" onPress={navigateToLaundryNotifications} />
            <SettingsSwitch title="Dark theme" value={darkTheme} onSwitch={toggleDarkTheme} style={styles.sectionHeader} />
            <SettingsTab title="Developer team" onPress={navigateToDeveloperTeam} style={styles.sectionHeader} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
    },
    sectionHeader: {
        marginTop: 30,
    }
});

export default SettingsScreen;
