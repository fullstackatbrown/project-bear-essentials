import React from "react";
import {SafeAreaView, StyleSheet, Text} from "react-native";
import {RouteProp, NavigationProp} from "@react-navigation/core";
import {SettingsStackParamList} from "./Settings";
import SettingsSelect from "./SettingsSelect";
import {getDietaryPreferenceIcon} from "./DietaryPreferencesIcons";

type DietaryPreferencesRouteProp = RouteProp<SettingsStackParamList, "DietaryPreferences">;
type DietaryPreferencesNavigationProp = NavigationProp<SettingsStackParamList, "DietaryPreferences">;

interface DietaryPreferencesProps {
    route: DietaryPreferencesRouteProp;
    navigation: DietaryPreferencesNavigationProp;
}

const DietaryPreferences: React.FC<DietaryPreferencesProps> = ({route}) => {
    const {preferences, onSelect} = route.params;
    let preferenceList: Array<JSX.Element> = [];
    preferences.forEach((selected, preference) => {
        const icon = getDietaryPreferenceIcon(preference);
        const title = preference.charAt(0).toUpperCase() + preference.slice(1);
        preferenceList.push(<SettingsSelect icon={icon} id={preference} key={preference} title={title} selected={selected} onPress={onSelect} />);
    });
    const desc: string = "Once a dining preference is turned on, the app will only show foods from the selected categories.";
    return (
        <SafeAreaView style={styles.container}>
            {preferenceList}
            <Text style={styles.desc}>{desc}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
    },
    desc: {
        margin: 15,
        color: "#666666",
        fontSize: 14,
        fontWeight: "400",
    }
});

export default DietaryPreferences;
