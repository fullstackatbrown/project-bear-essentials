import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { pluralize } from "./utils";
import { BellIcon } from "./icons";
import Colors from "../../constants/Colors";

// Component representing an individual laundry machine
const LaundryMachine = props => {

    // machine details
    const thisMachine = props.machine;

    // when bell is pressed
    const bellHandler = () => props.notifAction(thisMachine.time_remaining);

    // machine is either offline, ext. cycle, available, or in use
    if (thisMachine.offline) {
        return (
            <View style={styles.row}>
                <Text style={[styles.words, styles.offline]}>
                    {props.name} {thisMachine.machine_no} (offline)
                </Text>
            </View>
        );
    } else if (thisMachine.ext_cycle) {
        return (
            <View style={styles.row}>
                <Text style={[styles.words, styles.used]}>
                    {props.name} {thisMachine.machine_no} (ext. cycle)
                </Text>
            </View>
        );
    } else if (thisMachine.avail) {
        return (
            <View style={styles.row}>
                <Text style={[styles.words, styles.available]}>
                    {props.name} {thisMachine.machine_no}
                </Text>
            </View>
        );
    } else {
        return (
            <View style={styles.row}>
                <Text style={[styles.words, styles.used]}>
                    {props.name} {thisMachine.machine_no} (
                    {pluralize(thisMachine.time_remaining, "minute")} rem.)
                </Text>
                <TouchableOpacity onPress={bellHandler}>
                    <BellIcon focused={props.isNotif} />
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 4,
    },
    used: {
        color: Colors.danger,
    },
    available: {
        color: Colors.success,
    },
    offline: {
        color: "#909090",
    },
    words: {
        fontSize: 19,
    },
});

export default LaundryMachine;
