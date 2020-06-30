import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors.js";
import { fetchHours } from "./DinQueries";

const DiningCard = props => {
    const [starred, setStarred] = useState(props.isStarred ? true : false);
    const [starName, setStarName] = useState(starred ? "star" : "staro");
    const [starColor, setStarColor] = useState(
        starred ? Colors.starYellow : Colors.inactiveIcon
    );
    // TODO: make this capitalized?
    const [hallHours, setHallHours] = useState("loading...");

    /* 
    deal with the lowercase and the josiah error in the search bar component of the diningscene.js
    dont need this for inital generating of cards but will
    need it for searchbar functionality (when ppl look up by name and we need id to get info from api call)
    */
    // TODO: conside using a JS map
    const id = {
        "Sharpe Refectory": "ratty",
        "Verney-Wooley": "vdub",
        "Andrews Commons": "andrews",
        "Blue Room": "blueroom",
        "Josiah's": "jos",
        "Ivy Room": "ivyroom",
        "Gourmet To Go": "campusmarket",
        "Café Carts": "cafecarts",
    };

    // handles changes to star icon if pressed
    const starHandler = () => {
        if (starred) {
            setStarred(false);
            setStarName("staro");
            setStarColor(Colors.inactiveIcon);
        } else {
            setStarred(true);
            setStarName("star");
            setStarColor(Colors.starYellow);
        }
    };

    // TODO: this is misspelled, never called.
    const diningNameHandler = () => {
        return <Text style={styles.hall}>{props.name}</Text>;
    };

    // compares the current time w/ the time from the api
    const hoursCompare = () => {
        let date = new Date();
        let curr = Date.parse(`11/11/11 ${date.getHours()}:${date.getMinutes()}`);
        let open1 = Date.parse(`11/11/11 ${hallHours[0].starttime}`);
        let close1 = Date.parse(`11/11/11 ${hallHours[0].endtime}`);
        let open2 = Date.parse(`11/11/11 ${hallHours[1].starttime}`);
        let close2 = Date.parse(`11/11/11 ${hallHours[1].endtime}`);
        let open3 = Date.parse(`11/11/11 ${hallHours[2].starttime}`);
        let close3 = Date.parse(`11/11/11 ${hallHours[2].endtime}`);
        if (curr > open1 && curr < close1) {
            return 0;
        } else if (curr > open2 && curr < close2) {
            return 1;
        } else if (curr > open3 && curr < close3) {
            return 2;
        } else if (curr > close1 && curr < open2) {
            return 3;
        } else if (curr > close2 && curr < open3) {
            return 4;
        } else {
            return 5;
        }
    };

    // toggles open/close sign color and text color
    const signColorHandler = () => {
        let slot = hoursCompare();
        let sign = styles.open;
        let time = styles.closed;
        let text1 = "Open";
        let text2 = `Closes at ${hallHours[0].endtime}`;
        if (slot === 0) {
            return;
        } else if (slot === 1) {
            text2 = `Closes at ${hallHours[1].endtime}`;
        } else if (slot === 2) {
            text2 = `Closes at ${hallHours[2].endtime}`;
        } else {
            sign = styles.closed;
            time = styles.open;
            text1 = "Closed";
            if (slot === 3) {
                text2 = `Opens at ${hallHours[1].starttime}`;
            } else if (slot === 4) {
                text2 = `Opens at ${hallHours[2].starttime}`;
            } else if (slot === 5) {
                text2 = `Opens at ${hallHours[0].starttime}`;
            }
        }
        return (
            <React.Fragment>
                <Text style={[sign, styles.sign]}>{text1}</Text>
                <Text style={[time, styles.text]}>
                    {text2}
                </Text>
            </React.Fragment>
        );
    };

    useEffect(() => {
        const effectFunction = async () => {
            const time = await fetchHours(id[props.name]);
            setHallHours(time.data.cafe.days[0].dayparts);
        };
        effectFunction();
    }, []);

    return (
        <TouchableOpacity activeOpacity={0.6}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title}>{props.name}</Text>
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
                <View style={styles.info}>{signColorHandler()}</View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 25,
        marginBottom: 20,
        borderRadius: 15,
        shadowColor: "black",
        shadowRadius: 4,
        shadowOpacity: 0.25,
        backgroundColor: "white",
        shadowOffset: { width: 3, height: 3 },
        width: "90%",
        alignSelf: "center",
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontWeight: "600",
        fontSize: 35,
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
    hall: {
        fontWeight: "bold",
        fontSize: 22,
    },
    open: {
        color: Colors.success,
        borderColor: Colors.success,
    },
    closed: {
        color: Colors.danger,
        borderColor: Colors.danger,
    },
    sign: {
        textTransform: "uppercase",
        fontSize: 17,
        borderWidth: 2,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 3,
        fontWeight: "500",
    },
    text: {
        fontSize: 17,
        borderColor: "white",
        paddingVertical: 5,
        fontWeight: "500",
    },
});

export default DiningCard;
