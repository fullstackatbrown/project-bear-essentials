import React from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Check from "../../assets/icons/check.svg";

interface SettingsSelectProps {
    title: string;
    selected: boolean;
    icon: any;
    onPress: (title: string) => void;
    id: string;
}

const SettingsSelect: React.FC<SettingsSelectProps> = ({id, title, icon, selected, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
            <View style={styles.leftElem}>
                {icon !== undefined && icon}
                <Text style={styles.title}>{title}</Text>
            </View>
            {selected && <Check />}
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
        fontSize: 20,
        marginLeft: 10
    },
    leftElem: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SettingsSelect;
