import React, {useState} from "react";
import {View, StyleSheet, Alert} from "react-native";
import SettingsSwitch from './SettingsSwitch';
import SettingsTab from './SettingsTab';

const SettingsScreen = () => {
    const [darkTheme, setDarkTheme] = useState(false)

    const toggleDarkTheme = () => {
        setDarkTheme(!darkTheme);
    }

    const navigateToLaundryNotifications = () => {
        Alert.alert("Navigating to laundry notifications!")
    }
    const navigateToDietaryPreferences = () => {
        Alert.alert("Navigating to dietary preferences!")
    }
    const navigateToDeveloperTeam = () => {
        Alert.alert("Navigating to developer team!")
    }

    return (
        <View style={styles.container}>
            <SettingsTab title="Dietary preferences" onPress={navigateToDietaryPreferences} style={styles.sectionHeader} />
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
