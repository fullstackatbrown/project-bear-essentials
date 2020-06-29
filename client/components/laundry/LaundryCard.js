import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import LottieView from "lottie-react-native";

import { pluralize } from "./utils";
import { fetchLaundryRoomDetailed } from "./queries";
import LaundryMachine from "./LaundryMachine";
import Colors from "../../constants/Colors.js";
// import { LAUNDRY_DATA } from "../../data/dummydata/laundry/endpoint"

// Component representing an individual laundry room
const LaundryCard = props => {
    // initial fetching of card data
    const [loading, setLoading] = useState(true);

    // states for star
    const [starred, setStarred] = useState(props.isStarred ? true : false);
    const [starName, setStarName] = useState(starred ? "star" : "staro");
    const [starColor, setStarColor] = useState(
        starred ? Colors.starYellow : Colors.inactiveIcon
    );

    // states for collapsible
    const [collapsed, setCollapsed] = useState(true);

    // list of machines
    const [allWashers, setAllWashers] = useState([]);
    const [allDryers, setAllDryers] = useState([]);
    const [numAvailWashers, setNumAvailWashers] = useState(0);
    const [numAvailDryers, setNumAvailDryers] = useState(0);

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

    // when arrow is pressed, update collapsed
    const arrowHandler = () => {
        if (!loading) setCollapsed(!collapsed);
    };

    // returns formatted room number, if it exists
    const roomNumberHandler = () => {
        if (props.card.room) {
            return <Text style={styles.room}>{"Room " + props.card.room}</Text>;
        }
    };

    // creates summary for unexpanded laundry card
    const summaryHandler = () => {
        if (loading) {
            return (
                <View style={{ width: "100%" }}>
                    <LottieView
                        source={require("./animations/small-loader.json")}
                        autoPlay
                        loop
                        style={{
                            marginTop: -32,
                            marginBottom: -96,
                            width: "auto",
                            height: 160,
                            alignSelf: "center",
                        }}
                    />
                </View>
            );
        } else if (numAvailWashers == 0 && numAvailDryers == 0) {
            return (
                <Text style={[styles.fail, styles.words]}>
                    No available machines
                </Text>
            );
        } else if (numAvailDryers == 0) {
            return (
                <Text style={[styles.success, styles.words]}>
                    {pluralize(numAvailWashers, "washer")} available
                </Text>
            );
        } else if (numAvailWashers == 0) {
            return (
                <Text style={[styles.success, styles.words]}>
                    {pluralize(numAvailDryers, "dryer")} available
                </Text>
            );
        } else {
            return (
                <Text style={[styles.success, styles.words]}>
                    {pluralize(numAvailWashers, "washer")},{" "}
                    {pluralize(numAvailDryers, "dryer")} available
                </Text>
            );
        }
    };

    // (executed once) get initial data, set repeating timer for updates,
    // re-parse room data on changes in machineInfo or loading states
    useEffect(() => {
        let mounted = true;
        const fetchData = async isInitial => {
            const fetchedMachineData = await fetchLaundryRoomDetailed(
                props.card.id
            );
            if (mounted) {
                let newWashers = [];
                let newDryers = [];
                let newNumAvailWashers = 0;
                let newNumAvailDryers = 0;

                fetchedMachineData.data.data.laundryRoomDetailed.machines // LAUNDRY_DATA (fake data)
                    .sort((a, b) => a.machine_no - b.machine_no)
                    .forEach(machine => {
                        if (machine.type == "wash") {
                            newWashers.push(machine);
                            if (
                                machine.avail &&
                            !machine.offline &&
                            !machine.ext_cycle
                            ) {
                                newNumAvailWashers++;
                            }
                        } else if (machine.type == "dry") {
                            newDryers.push(machine);
                            if (
                                machine.avail &&
                            !machine.offline &&
                            !machine.ext_cycle
                            ) {
                                newNumAvailDryers++;
                            }
                        }
                    });

                if (mounted) {
                    setAllWashers(newWashers);
                    setAllDryers(newDryers);
                    setNumAvailWashers(newNumAvailWashers);
                    setNumAvailDryers(newNumAvailDryers);
                }

                if (isInitial) setLoading(false);
            }
        };

        fetchData(true);

        let interval = setInterval(() => fetchData(false), 60000);

        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, []);

    return (
        <View style={styles.back}>
            <View style={styles.card}>
                <TouchableOpacity activeOpacity={0.6} onPress={arrowHandler}>
                    <View style={styles.colSections}>
                        <View style={{ maxWidth: "80%" }}>
                            <Text style={styles.title}>{props.card.title}</Text>
                            {roomNumberHandler()}
                        </View>
                        <TouchableOpacity
                            style={styles.starArea}
                            onPress={starHandler}
                        >
                            <AntDesign
                                style={styles.star}
                                name={starName}
                                size={30}
                                color={starColor}
                            />
                        </TouchableOpacity>
                    </View>
                    <Collapsible collapsed={!collapsed}>
                        <View style={styles.uncollapsed}>
                            {summaryHandler()}
                            {!loading && (
                                <View style={styles.colSections}>
                                    <View>
                                        <Text style={styles.tapText}>
                                            Tap to expand
                                        </Text>
                                    </View>
                                    <View style={styles.upArrow}>
                                        <Ionicons
                                            style={styles.arrow}
                                            name="ios-arrow-down"
                                            size={40}
                                            color="#CCCCCC"
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    </Collapsible>
                    <Collapsible collapsed={collapsed}>
                        <View style={styles.collapsed}>
                            <View>
                                {allWashers.map(washer => (
                                    <LaundryMachine
                                        key={washer.id}
                                        name="Washer"
                                        machine={washer}
                                        isNotif={props.notifList.includes(
                                            washer.id
                                        )}
                                        notifAction={() =>
                                            props.notifAction(washer.id)
                                        }
                                    />
                                ))}
                            </View>
                            <View style={styles.horizontalLine} />
                            <View>
                                {allDryers.map(dryer => (
                                    <LaundryMachine
                                        key={dryer.id}
                                        name="Dryer"
                                        machine={dryer}
                                        isNotif={props.notifList.includes(
                                            dryer.id
                                        )}
                                        notifAction={() =>
                                            props.notifAction(dryer.id)
                                        }
                                    />
                                ))}
                            </View>
                            <View style={styles.colSections}>
                                <View>
                                    <Text style={styles.tapText}>
                                        Tap to collapse
                                    </Text>
                                </View>
                                <View style={styles.upArrow}>
                                    <Ionicons
                                        style={styles.arrow}
                                        name="ios-arrow-up"
                                        size={40}
                                        color="#CCCCCC"
                                    />
                                </View>
                            </View>
                        </View>
                    </Collapsible>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// styles
const styles = StyleSheet.create({
    back: {
        padding: 5,
        marginBottom: 12,
        backgroundColor: "#0000",
    },
    card: {
        padding: 22,
        borderRadius: 8,
        // shadows for ios
        shadowColor: "black",
        shadowRadius: 2,
        shadowOpacity: 0.25,
        backgroundColor: "white",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        width: "88%",
        alignSelf: "center",

        // shadows for android
        elevation: 5,
    },
    title: {
        fontWeight: "bold", // medium
        fontSize: 28,
    },
    room: {
        fontWeight: "bold", // medium
        fontSize: 22,
    },
    uncollapsed: {
        marginTop: 15,
        flexDirection: "column",
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
        justifyContent: "flex-end",
    },
    arrow: {
        marginBottom: -10,
        marginRight: 2,
    },
    horizontalLine: {
        marginVertical: 6,
        alignSelf: "center",
        width: "100%",
        borderBottomColor: "#D3D3D3",
        borderBottomWidth: 0.7,
    },
    success: {
        color: Colors.success,
    },
    fail: {
        color: Colors.danger,
    },
    loading: {
        color: "#9A9A9A",
    },
    words: {
        fontSize: 19,
        marginBottom: 4,
    },
    starArea: {
        height: 32,
    },
    tapText: {
        paddingTop: 6,
        fontStyle: "italic",
        fontSize: 16,
    },
});

export default LaundryCard;
