import React from "react";
import {View, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import ChevronRight from "../../assets/icons/chevron-right.svg";

interface SettingsTabProps extends TouchableOpacityProps {
    title: string;
    rightElement?: JSX.Element;
}

const SettingsTab: React.FC<SettingsTabProps> = ({title, rightElement, style, onPress}) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.rightElement}>
                {rightElement}
                <ChevronRight style={styles.chevron} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20
    },
    rightElement: {
        flexDirection: "row",
        alignItems: "center",
    },
    chevron: {
        marginLeft: 10
    }
});

export default SettingsTab;
