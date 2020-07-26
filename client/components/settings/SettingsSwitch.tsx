import React from "react";
import {ViewProps, View, StyleSheet, Text, Switch} from "react-native";
import Colors from '../../constants/Colors';

interface SettingsSwitchProps extends ViewProps {
    title: string;
    value: boolean;
    onSwitch: () => void;
}

const SettingsSwitch: React.FC<SettingsSwitchProps> = ({title, value, onSwitch, style}) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>
            <Switch value={value} onValueChange={onSwitch} trackColor={{true: Colors.tintColor, false: 'grey'}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20
    },
});

export default SettingsSwitch;
