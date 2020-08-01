import React from "react";
import {SafeAreaView, StyleSheet, Text} from "react-native";
import {RouteProp, NavigationProp} from "@react-navigation/core";
import {SettingsStackParamList} from "./Settings";
import SettingsSelect from "./SettingsSelect";
import {getDietaryPreferenceIcon} from "./DietaryPreferencesIcons";
import { connect } from "react-redux";
import { togglePreference } from "../../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        preferences: state.settings.preferences
    };
};

const mapDispatchToProps = dispatch => ({
    togglePreference: preference => dispatch(togglePreference(preference))
});

type DietaryPreferencesRouteProp = RouteProp<SettingsStackParamList, "DietaryPreferences">;
type DietaryPreferencesNavigationProp = NavigationProp<SettingsStackParamList, "DietaryPreferences">;

interface DietaryPreferencesProps {
    route: DietaryPreferencesRouteProp;
    navigation: DietaryPreferencesNavigationProp;
}

const allPreferences = ["gluten-free", "halal", "kosher", "vegan", "vegetarian"];

const DietaryPreferences: React.FC<DietaryPreferencesProps> = ({route, preferences, togglePreference}) => {
    let preferenceList: Array<JSX.Element> = [];
    allPreferences.forEach((preference) => {
        const icon = getDietaryPreferenceIcon(preference);
        const title = preference.charAt(0).toUpperCase() + preference.slice(1);
        const selected = preferences.includes(preference);
        preferenceList.push(<SettingsSelect icon={icon} id={preference} key={preference} title={title} selected={selected} onPress={(e) => togglePreference(e)} />);
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

export default connect(mapStateToProps, mapDispatchToProps)(DietaryPreferences);
