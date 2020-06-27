import * as React from "react";
import { View, StyleSheet } from "react-native";
import { DINING_DATA } from "../../data/dummydata/dining/endpoint";
import { ScrollView } from "react-native-gesture-handler";

export default function DiningMenu() {
    <View style={styles.screen}>
        <View style={styles.header}>
            <Text>Hello!</Text>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#fafafa",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default DiningMenu;
