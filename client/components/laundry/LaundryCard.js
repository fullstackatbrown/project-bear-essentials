import React, {useState} from "react";
import {
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    ToolbarAndroidComponent
} from "react-native";
import { AntDesign, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import LaundryMachine from "./LaundryMachine";
import { pluralize} from "./LaundryUtils";
import Colors from "../../constants/Colors.js";

const LaundryCard = props => {
    // states for star
    const [starred, setStarred] = useState(props.isStarred ? true : false);
    const [starName, setStarName] = useState(starred ? "star" : "staro");
    const [starColor, setStarColor] = useState(starred ? Colors.starYellow : Colors.inactiveIcon);

    // states for collapsible
    const [collapsed, setCollapsed] = useState(true);

    // list of machines
    let allWashers = [];
    let allDryers = [];
    let availWashers = 0;
    let availDryers = 0;

    // when star is pressed
    const starHandler = () => {
        if (starred) {
            setStarred(false);
            setStarName("staro");
            setStarColor(Colors.inactiveIcon); //inactive color
        } else {
            setStarred(true);
            setStarName("star");
            setStarColor(Colors.starYellow); //star yellow
        }

        // send changes to parent
        props.starAction();
    };

    // when down arrow is pressed
    const downArrowHandler = () => {
        setCollapsed(false);
    };

    // when up arrow is pressed
    const upArrowHandler = () => {
        setCollapsed(true);
    };

    // returns formatted room, if it exists
    const roomHandler = () => {
        if (props.card.room) {
            return (
                <Text style={styles.room}>
                    {"(Room " + props.card.room + ")"}
                </Text>
            );
        }
    };

    // creates summary for unexpanded laundry card
    const summaryHandler = () => {
        if (availWashers == 0 && availDryers == 0) {
            return <Text style={[styles.fail, styles.words]}>No available machines</Text>;
        } else if (availDryers == 0) {
            return (
                <Text style={[styles.success, styles.words]}>
                    {pluralize(availWashers, "washer")} available
                </Text>
            );
        } else if (availWashers == 0) {
            return (
                <Text style={[styles.success, styles.words]}>
                    {pluralize(availDryers, "dryer")} available
                </Text>
            );
        } else {
            return (
                <Text style={[styles.success, styles.words]}>
                    {pluralize(availWashers, "washer")}, {pluralize(availDryers, "dryer")} available
                </Text>
            );
        }
    };

    // parse room data when card is generated
    const parseRoomData = () => {
        props.card.machines.forEach(function (machine) {
            if (machine.type == "WASHER") {
                allWashers.push(machine);
                if (machine.avail) {
                    availWashers ++;
                }
            } else {
                allDryers.push(machine);
                if (machine.avail) {
                    availDryers ++;
                }
            }
        });
    };

    // parse room data when component is created
    parseRoomData();

    return (
        <View style={styles.back}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={{ maxWidth: "80%" }}>
                        <Text style={styles.title}>{props.card.title}</Text>
                        {roomHandler()}
                    </View>
                    <TouchableOpacity onPress={starHandler}>
                        <AntDesign style={styles.star} name={starName} size={30} color={starColor} />  
                    </TouchableOpacity>
                </View>
                <Collapsible collapsed={!collapsed}>
                    <View style={styles.uncollapsed}>
                        <Text>{summaryHandler()}</Text>
                        <TouchableOpacity onPress={downArrowHandler}>
                            <Ionicons style={styles.arrow} name="ios-arrow-down" size={40} color="#CCCCCC" />
                        </TouchableOpacity>
                    </View>
                </Collapsible>
                <Collapsible collapsed={collapsed}>
                    <View style={styles.collapsed}>
                        <View>
                            {allWashers.map((washer) => 
                                (<LaundryMachine
                                    key={washer.id}
                                    machine={washer}
                                    isNotif={props.notifList.includes(washer.id)}
                                    notifAction={() => props.notifAction(washer.id)} />))}
                        </View>
                        <View style={styles.horizontalLine} />
                        <View style={styles.colSections}>
                            <View>
                                {allDryers.map((dryer) => 
                                    (<LaundryMachine
                                        key={dryer.id}
                                        machine={dryer}
                                        isNotif={props.notifList.includes(dryer.id)}
                                        notifAction={() => props.notifAction(dryer.id)} />))}
                            </View>
                            <View style={styles.upArrow}>
                                <TouchableOpacity onPress={upArrowHandler}>
                                    <Ionicons style={styles.arrow} name="ios-arrow-up" size={36} color="#CCCCCC" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>                    
                </Collapsible>
            </View>
        </View>
    );
};


// styles
const styles = StyleSheet.create({
    back: {
        padding: 5,
        backgroundColor: "#0000"
    },
    card: {
        padding: 25,
        borderRadius: 15,
        // shadows for ios
        shadowColor: "black",
        shadowRadius: 2,
        shadowOpacity: 0.25,
        backgroundColor: "white",
        shadowOffset: {
            width: 0,
            height: 1
        },
        width: "90%",
        alignSelf: "center",

        // shadows for android
        elevation: 5,
    },
    title: {
        fontWeight: "700",
        fontSize: 28,
    },
    room: {
        fontSize: 22,
        color: "gray",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    uncollapsed: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    collapsed: {
        marginTop: 10,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    colSections: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    upArrow: {
        justifyContent: "flex-end"
    },
    arrow: {
        marginBottom: -10,
        marginRight: 2
    },
    horizontalLine: {
        marginTop: 10,
        marginBottom: 10,
        alignSelf: "center",
        width: "100%",
        borderBottomColor: "#AEAEAE",
        borderBottomWidth: 0.7,
    },
    success: {
        color: Colors.success,
    },
    fail: {
        color: Colors.danger,
    },
    words: {
        fontSize: 19,
    },
});

export default LaundryCard;