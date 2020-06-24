import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";

export default function SettingsScreen() {
    return (
        <ScrollView style={styles.pane}>
            <View style={styles.block}>
                <View style={styles.profile}>
                    <View style={{flexDirection: "row"}}>
                        <View>
                            <Text>PICTURE HERE</Text>
                        </View>
                        <View>
                            <Text style={styles.textPrimary}>Guest</Text>
                            <Text style={styles.textSecondary}>Tap to login.</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.block}>
                <View style={styles.option}>
                    <Text>ICON</Text>
                    <Text style={styles.optionText}>Dining</Text>
                </View>
                <View style={styles.option}>
                    <Text>ICON</Text>
                    <Text style={styles.optionText}>Laundry</Text>
                </View>
                <View style={styles.option}>
                    <Text>ICON</Text>
                    <Text style={styles.optionText}>Map</Text>
                </View>
            </View>
            <View style={styles.block}>
                <View style={styles.option}>
                    <Text>ICON</Text>
                    <Text style={styles.optionText}>Dark Theme</Text>
                </View>
            </View>
            <View style={styles.block}>
                <View style={styles.option}>
                    <Text>ICON</Text>
                    <Text style={styles.optionText}>Developer Team</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pane: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    block: {
        marginBottom: 20
    },
    profile: {
        padding: 20,
        backgroundColor: "#f9f9f9",
        elevation: 3,
        shadowOpacity: 1
    },
    option: {
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        padding: 10
    },
    optionText: {
        fontSize: 20
    },
    textPrimary: {
        fontSize: 32
    },
    textSecondary: {
        fontSize: 14
    }
});

SettingsScreen.navigationOptions = {
    header: null,
};
