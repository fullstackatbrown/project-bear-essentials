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

    //capitalize only first letter
    const formatMachineName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    const renderMachine = () => {
        if (thisMachine.avail) {
            return (
                <View style={styles.row}>
                    <Text style={[styles.words, styles.available]}>
                        {formatMachineName(thisMachine.type)} {thisMachine.id}
                    </Text>
                </View>);
        } else {
            return (
                <View style={styles.row}>
                    <TouchableOpacity onPress={bellHandler}>
                        <BellIcon focused={notif}/>  
                    </TouchableOpacity>
                    <Text style={[styles.words, styles.used]}>
                        {formatMachineName(thisMachine.type)} {thisMachine.id} ({pluralize(thisMachine.time_remaining, "minute")})
                    </Text>
                </View>);
        }
    };

    return (
        <View>
            {renderMachine()}
        </View>
    );
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
    words: {
        marginLeft: 12,
        fontSize: 19,
    }
});
export default LaundryMachine;