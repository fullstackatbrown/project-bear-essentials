import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import LottieView from "lottie-react-native";

import { pluralize } from "./utils";
import { fetchLaundryRoomDetailed } from "./queries";
import LaundryMachine from "./LaundryMachine";

import { getColors } from "../reusable/getColors";

const mapStateToProps = (state) => {
    return {
        darkmode: state.settings.darkmode
    };
};

// import { LAUNDRY_DATA } from "../../data/dummydata/laundry/endpoint"; // for testing

// Component representing an individual laundry room
const LaundryCard = (props) => {
    const Colors = getColors(props.darkmode);
    const styles = getStyles(Colors);

    // states for collapsible
    const [collapsed, setCollapsed] = useState(true);

    // loading and parsed card data
    const [cardInfo, setCardInfo] = useState({
        loading: true,
    });

    // when arrow is pressed, update collapsed
    const arrowHandler = () => {
        if (!cardInfo.loading) setCollapsed(!collapsed);
    };

    // returns formatted room number, if it exists
    const roomNumberHandler = () => {
        if (props.card.room) {
            return <Text style={styles.room}>{"Room " + props.card.room}</Text>;
        }
    };

    // creates summary for unexpanded laundry card
    const summaryHandler = () => {
        if (cardInfo.loading) {
            return (
                <View style={{ width: "100%" }}>
                    <LottieView
                        source={require("./animations/small-loader.json")}
                        autoPlay
                        loop
                        style={{
                            marginTop: -22,
                            marginBottom: -80,
                            width: "auto",
                            height: 160,
                            alignSelf: "center",
                        }}
                    />
                </View>
            );
        } else if (cardInfo.numAvailWashers == 0 && cardInfo.numAvailDryers == 0) {
            return (
                <Text style={[styles.fail, styles.words]}>No available machines</Text>
            );
        } else if (cardInfo.numAvailDryers == 0) {
            return (
                <Text style={[styles.success, styles.words]}>
                    {pluralize(cardInfo.numAvailWashers, "washer")} available
                </Text>
            );
        } else if (cardInfo.numAvailWashers == 0) {
            return (
                <Text style={[styles.success, styles.words]}>
                    {pluralize(cardInfo.numAvailDryers, "dryer")} available
                </Text>
            );
        } else {
            return (
                <Text style={[styles.success, styles.words]}>
                    {pluralize(cardInfo.numAvailWashers, "washer")},{" "}
                    {pluralize(cardInfo.numAvailDryers, "dryer")} available
                </Text>
            );
        }
    };

    // (executed once) get initial data, set repeating timer for updates,
    // re-parse room data on changes in machineInfo or loading states
    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            const { data } = await fetchLaundryRoomDetailed(props.card.id);

            if (mounted) {
                let newWashers = [];
                let newDryers = [];
                let newNumAvailWashers = 0;
                let newNumAvailDryers = 0;

                data.data.laundryRoomDetailed.machines
                    .sort((a, b) => a.machine_no - b.machine_no) // LAUNDRY_DATA
                    .forEach((machine) => {
                        if (machine.type == "wash") {
                            newWashers.push(machine);
                            if (machine.avail && !machine.offline && !machine.ext_cycle) {
                                newNumAvailWashers++;
                            }
                        } else if (machine.type == "dry") {
                            newDryers.push(machine);
                            if (machine.avail && !machine.offline && !machine.ext_cycle) {
                                newNumAvailDryers++;
                            }
                        }
                    });

                setCardInfo({
                    loading: false,
                    allWashers: newWashers,
                    allDryers: newDryers,
                    numAvailWashers: newNumAvailWashers,
                    numAvailDryers: newNumAvailDryers,
                });
            }
        };

        // fetch once, and then every 60 seconds afterwards
        fetchData();
        let interval = setInterval(fetchData, 60000);

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
                        <TouchableOpacity style={styles.starArea} onPress={props.starAction}>
                            <AntDesign
                                style={styles.star}
                                name={props.isStarred ? "star" : "staro"}
                                size={30}
                                color={props.isStarred ? Colors.starYellow : Colors.inactiveIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <Collapsible collapsed={!collapsed}>
                        <View style={styles.uncollapsed}>
                            {summaryHandler()}
                            {!cardInfo.loading &&
                            <View style={styles.colSections}>
                                <View>
                                    <Text style={styles.tapText}>Tap to expand</Text>
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
                            }
                        </View>
                    </Collapsible>
                    {!cardInfo.loading &&
                    <Collapsible collapsed={collapsed}>
                        <View style={styles.collapsed}>
                            <View>
                                {cardInfo.allWashers.map((washer) => (
                                    <LaundryMachine
                                        key={washer.id}
                                        name="Washer"
                                        machine={washer}
                                        isNotif={props.notifList.includes(washer.id.toString())}
                                        notifAction={props.notifAction(
                                            washer.id,
                                            `Washer ${washer.machine_no}`
                                        )}
                                    />
                                ))}
                            </View>
                            <View style={styles.horizontalLine} />
                            <View>
                                {cardInfo.allDryers.map((dryer) => (
                                    <LaundryMachine
                                        key={dryer.id}
                                        name="Dryer"
                                        machine={dryer}
                                        isNotif={props.notifList.includes(dryer.id.toString())}
                                        notifAction={props.notifAction(
                                            dryer.id,
                                            `Dryer ${dryer.machine_no}`
                                        )}
                                    />
                                ))}
                            </View>
                            <View style={styles.colSections}>
                                <View>
                                    <Text style={styles.tapText}>Tap to collapse</Text>
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
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
};

// styles
const getStyles = (Colors) => StyleSheet.create({
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
        fontWeight: "bold",
        fontSize: 28,
    },
    room: {
        fontWeight: "bold",
        fontSize: 22,
    },
    uncollapsed: {
        marginTop: 10,
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
        marginBottom: -15,
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

export default connect(mapStateToProps)(LaundryCard);
