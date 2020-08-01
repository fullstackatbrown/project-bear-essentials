import React from "react";
import {View, Text, StyleSheet, Platform, StatusBar} from "react-native";

const SimpleHeader = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: "#cc0200",
        paddingLeft: 12,
        fontSize: 40,
        fontWeight: "bold",
    },
    container: {
      
        height: 110,
        backgroundColor: "#f9f9f9",
        elevation: 0,
        shadowOpacity: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 26,
        paddingTop: Platform.OS === "ios" ? 30 : StatusBar.currentHeight,
    }
});

export default SimpleHeader;
