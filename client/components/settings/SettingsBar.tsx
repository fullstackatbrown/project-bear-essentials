/* eslint-disable react/prop-types */
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Switch } from "react-native";
import ChevronRight from "../../assets/icons/chevron-right.svg";

interface SettingsBarProps {
    title: string;
    toggleable: boolean;
    rightElement?: JSX.Element;
    onPress?: () => void;
    onToggle?: () => void;
}

const SettingsBar: React.FC<SettingsBarProps> = ({title, toggleable, rightElement, onPress, onToggle}) => {
    const Content = () => (
        <View style={styles.barContainer}>
            <Text>{title}</Text>
            {toggleable ?
                <Switch onValueChange={onToggle}/> :
                <View style={styles.barRightElement}>
                    {rightElement}
                    <ChevronRight />
                </View>}
        </View>
    );
    return (
        toggleable ? 
            <Content /> : 
            <TouchableOpacity onPress={onPress}>
                <Content />
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    barContainer: {
        flexDirection: "row",
        padding: 10,
    },
    barRightElement: {}
});

export default SettingsBar;