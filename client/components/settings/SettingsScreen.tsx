import React, {useState} from "react";
import {View, StyleSheet, SafeAreaView} from "react-native";
import {RouteProp, NavigationProp} from "@react-navigation/core";
import { connect } from "react-redux";

import {SettingsStackParamList} from "./Settings";
import SettingsSwitch from "./SettingsSwitch";
import SettingsTab from "./SettingsTab";
import DietaryPreferencesIcons from "./DietaryPreferencesIcons";
import SimpleHeader from "../reusable/SimpleHeader";
import { toggleTheme, togglePreference } from "../../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        darkmode: state.settings.darkmode,
        preferences: state.settings.preferences
    };
};

const mapDispatchToProps = dispatch => ({
    toggleTheme: () => dispatch(toggleTheme()),
    togglePreference: preference => dispatch(togglePreference(preference))
});

type SettingsScreenRouteProp = RouteProp<SettingsStackParamList, "SettingsScreen">;
type SettingsScreenNavigationProp = NavigationProp<SettingsStackParamList, "SettingsScreen">;

interface SettingsScreenProps {
    darkmode: Boolean,
    toggleTheme: Function,
    preferences: Array<string>,
    togglePreference: Function,
    route: SettingsScreenRouteProp;
    navigation: SettingsScreenNavigationProp;
}


const SettingsScreen: React.FC<SettingsScreenProps> = ({darkmode, toggleTheme, preferences, navigation}: SettingsScreenProps) => {
    const navigateToLaundryNotifications = () => {
        navigation.navigate("LaundryNotifications");
    };
    const navigateToDietaryPreferences = () => {
        navigation.navigate("DietaryPreferences", {preferences: preferences});
    };
    const navigateToDeveloperTeam = () => {
        navigation.navigate("DeveloperTeam");
    };

    return (
        <SafeAreaView style={styles.container}>
            <SimpleHeader>Settings</SimpleHeader>
            <SettingsTab title="Dietary preferences" onPress={navigateToDietaryPreferences} rightElement={<DietaryPreferencesIcons preferences={preferences} />} />
            <SettingsTab title="Laundry notifications" onPress={navigateToLaundryNotifications} />
            <SettingsSwitch title="Dark theme" value={darkmode} onSwitch={toggleTheme} style={styles.sectionHeader} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
