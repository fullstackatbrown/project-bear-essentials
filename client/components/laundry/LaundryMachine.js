import React, {useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { pluralize} from "./LaundryUtils";
import Colors from "../../constants/Colors.js";
import BellIcon from "./BellIcon";

const LaundryMachine = props => {

    const [notif, setNotif] = useState(props.isNotif ? true : false);

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

    if (thisMachine.offline) {
        return (
            <View style={styles.row}>
                <Text style={[styles.words, styles.offline]}>
                    {props.name} {thisMachine.machine_no} (offline)
                </Text>
            </View>);
    }
    if (thisMachine.ext_cycle) {
        return (
            <View style={styles.row}>
                <TouchableOpacity onPress={bellHandler}>
                    <BellIcon focused={notif}/>  
                </TouchableOpacity>
                <Text style={[styles.words, styles.used]}>
                    {props.name} {thisMachine.machine_no} (ext. cycle)
                </Text>
            </View>);
    }
    if (thisMachine.avail) {
        return (
            <View style={styles.row}>
                <Text style={[styles.words, styles.available]}>
                    {props.name} {thisMachine.machine_no}
                </Text>
            </View>);
    }
    return (
        <View style={styles.row}>
            <TouchableOpacity onPress={bellHandler}>
                <BellIcon focused={notif}/>  
            </TouchableOpacity>
            <Text style={[styles.words, styles.used]}>
                {props.name} {thisMachine.machine_no} ({pluralize(thisMachine.time_remaining, "minute")} rem.)
            </Text>
        </View>);
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 7,
    },
    used: {
        color: Colors.danger,
    },
    available: {
        color: Colors.success,
        marginLeft: 42,
    },
    offline: {
        color: "#909090",
        marginLeft: 42,
    },
    words: {
        marginLeft: 12,
        fontSize: 19,
    },
});
export default LaundryMachine;