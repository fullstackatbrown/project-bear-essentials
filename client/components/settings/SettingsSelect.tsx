import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import Check from "../../assets/icons/check.svg";

interface SettingsSelectProps {
    title: string;
    rightElement: JSX.Element;
    onPress: () => void;
}

const SettingsSelect: React.FC<SettingsSelectProps> = ({title, rightElement, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.rightElement}>
                {rightElement}
                <Check />
            </View>
        </TouchableOpacity>
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
    rightElement: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default SettingsSelect;
