import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

interface SimpleHeaderProps {
    title: string;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({title}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: Colors.tintColor,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 25,
        paddingVertical: 20,
    }
});

export default SimpleHeader;
