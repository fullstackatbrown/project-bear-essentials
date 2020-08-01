import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {RouteProp, NavigationProp} from "@react-navigation/core";
import {SettingsStackParamList} from "./Settings";

type DeveloperTeamRouteProp = RouteProp<SettingsStackParamList, "DeveloperTeam">;
type DeveloperTeamNavigationProp = NavigationProp<SettingsStackParamList, "DeveloperTeam">;

interface DeveloperTeamProps {
    route: DeveloperTeamRouteProp;
    navigation: DeveloperTeamNavigationProp;
}

const DeveloperTeam: React.FC<DeveloperTeamProps> = () => {
    return (
        <View style={styles.container}>
            <Text>Developer team goes here!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default DeveloperTeam;
