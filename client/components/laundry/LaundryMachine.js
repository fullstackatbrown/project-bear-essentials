import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { pluralize } from "./utils";
import BellIcon from "./BellIcon";
import Colors from "../../constants/Colors";

// Component representing an individual laundry machine
const LaundryMachine = props => {
    // are push notifications toggled for this machine?
    const [notif, setNotif] = useState(props.isNotif ? true : false);

    // machine details
    const thisMachine = props.machine;

    // when bell is pressed
    const bellHandler = () => {
        if (notif) {
            setNotif(false);
        } else {
            setNotif(true);
        }

        props.notifAction();
    };

    // machine is either offline, ext. cycle, available, or in use
    if (thisMachine.offline) {
        return (
            <View style={styles.row}>
                <Text style={[styles.words, styles.offline]}>
                    {props.name} {thisMachine.machine_no} (offline)
                </Text>
            </View>
        );
    }
    if (thisMachine.ext_cycle) {
        return (
            <View style={styles.row}>
                <Text style={[styles.words, styles.used]}>
                    {props.name} {thisMachine.machine_no} (ext. cycle)
                </Text>
            </View>
        );
    }
    if (thisMachine.avail) {
        return (
            <View style={styles.row}>
                <Text style={[styles.words, styles.available]}>
                    {props.name} {thisMachine.machine_no}
                </Text>
            </View>
        );
    }
    return (
        <View style={styles.row}>
            <Text style={[styles.words, styles.used]}>
                {props.name} {thisMachine.machine_no} (
                {pluralize(thisMachine.time_remaining, "minute")} rem.)
            </Text>
            <TouchableOpacity onPress={bellHandler}>
                <BellIcon focused={notif} />
            </TouchableOpacity>
        </View>
    );
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
