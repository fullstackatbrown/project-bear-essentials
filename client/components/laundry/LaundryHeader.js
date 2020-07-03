import React, { useState } from "react";
import { Platform, StyleSheet, View, Text, TextInput, StatusBar } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

const LaundryHeader = props => {
    const [searchEnabled, setSearchEnabled] = useState(false);
    const [enteredValue, setEnteredValue] = useState("");

    const searchTapHandler = () => {
        setSearchEnabled(!searchEnabled);
    };

    const inputHandler = inputText => {
        setEnteredValue(inputText);
        props.onChangeText(inputText);
    };

    const crossHandler = () => {
        setEnteredValue("");
        props.onChangeText("");
    };

    const crossVisibilityHandler = () => {
        if (enteredValue != "") {
            return (
                <TouchableOpacity onPress={crossHandler}>
                    <AntDesign
                        name="close"
                        size={30}
                        color={Colors.activeIcon}
                    />
                </TouchableOpacity>
            );
        }
    };

    if (searchEnabled) {
        return (
            <View style={styles.header}>
                <View style={styles.searchHeader}>
                    <View style={styles.searchBar}>
                        <Ionicons
                            name="ios-search"
                            size={36}
                            color={Colors.activeIcon}
                        />
                        <TextInput
                            autoFocus={true}
                            style={styles.textInput}
                            placeholder="Search laundry"
                            onChangeText={inputHandler}
                            value={enteredValue}
                        />
                        {crossVisibilityHandler()}
                    </View>
                    <TouchableOpacity onPress={searchTapHandler}>
                        <Text style={styles.cancelText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Laundry</Text>
                <TouchableOpacity onPress={searchTapHandler}>
                    <Ionicons
                        name="ios-search"
                        size={36}
                        color={Colors.inactiveIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    header: {
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
    },
    headerTitle: {
        color: "#cc0200",
        paddingLeft: 12,
        fontSize: 40,
        fontWeight: "bold",
    },
    searchHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        borderColor: Colors.activeIcon,
        borderRadius: 25,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 14,
        marginRight: 10,
    },
    textInput: {
        marginHorizontal: 10,
        flex: 1,
        fontSize: 22,
        color: "#666666",
    },
    cancelText: {
        fontSize: 18,
        color: "#BBBBBB",
    },
});

export default LaundryHeader;
