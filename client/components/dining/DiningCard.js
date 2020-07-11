import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors.js";
import { fetchHours, fetchMenuDetailed } from "./DinQueries";
import LottieView from "lottie-react-native";

const DiningCard = props => {
    const [starred, setStarred] = useState(props.isStarred ? true : false);
    const [starName, setStarName] = useState(starred ? "star" : "staro");
    const [starColor, setStarColor] = useState(
        starred ? Colors.starYellow : Colors.inactiveIcon
    );
    const [hallHours, setHallHours] = useState("Loading...");
    const [loading, setLoading] = useState(true);
    const [menuSummary, setMenuSummary] = useState([]);

    /* 
    deal with the lowercase and the josiah error in the search bar component of the diningscene.js
    dont need this for inital generating of cards but will
    need it for searchbar functionality (when ppl look up by name and we need id to get info from api call)
    */
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

    // formats the time returned from the api
    const timeFormatter = time => {
        let num = parseInt(time.slice(0, 2))
        if (num < 10) {
            return `${time.slice(1)} am`
        } else if (num >= 10 && num <= 12) {
            return `${time} am`
        } else {
            num -= 12
            time = `${num}${time.slice(2)}`
            return `${time} pm`
        }
    }

    // returns correct open status and hours
    const hoursHandler = () => {
        let slot = hoursCompare();
        let time;
        let text2;
        let signStyle = styles.open;
        let timeStyle = styles.closed;
        let text1 = "Open";
        if (slot <= 2) {
            time = hallHours[slot].endtime;
        }
        if (slot >= 3) {
            signStyle = styles.closed;
            timeStyle = styles.open;
            text1 = "Closed";
            if (slot === 3) {
                time = hallHours[1].starttime
            } else if (slot === 4) {
                time = hallHours[2].starttime
            } else if (slot === 5) {
                time = hallHours[0].starttime
            }
        }
        time = timeFormatter(time);
        if (slot <= 2) {
            text2 = `Closes at ${time}`
        } else {
            text2 = `Opens at ${time}`
        }
        return (
            <View style={styles.info}>
                <Text style={[signStyle, styles.sign]}>{text1}</Text>
                <Text style={[timeStyle, styles.text]}>
                    {text2}
                </Text>
            </View>
        );
    };

    // handles menu summary for card w/ placeholder for menu
    const menuHandler = () => {
        return (
            <View style={styles.menuSummary}>
                <Text >Turkey bacon, oatmeal, scrambled eggs...</Text>
            </View>
        )
    }

    const detailHandler = () => {
        if (loading) {
            return (
                <View style={{ width: "100%" }}>
                    <LottieView
                        source={require("./animations/small-loader.json")}
                        autoPlay
                        loop
                        style={{
                            marginTop: Platform.OS === "ios" ? -20 : -32,
                            marginBottom: -96,
                            width: "auto",
                            height: 160,
                            alignSelf: "center",
                        }}
                    />
                </View>
            );
        } else {
            return (
                <View>
                    {hoursHandler()}
                    {menuHandler()}
                </View>
            )
        }
    }

    useEffect(() => {
        const effectFunction = async () => {
            const time = await fetchHours(id[props.name]);
            const menu = await fetchMenuDetailed(id[props.name]);
            setHallHours(time.data.data.cafe.days[0].dayparts);
            setLoading(false);
            // setMenuSummary(menu.data.menu.dayparts[0].stations);
        };
        effectFunction();
    }, []);

    return (
        <View style={styles.card}>
            <TouchableOpacity activeOpacity={0.6}>
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
                {detailHandler()}
            </TouchableOpacity>
        </View>
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
        fontWeight: "bold",
        fontSize: 26,
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    hall: {
        fontWeight: "bold",
        fontSize: 28,
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
    menuSummary: {
        marginTop: 20,
    },
    text: {
        fontSize: 17,
        borderColor: "white",
        paddingVertical: 5,
        fontWeight: "500",
    },
});

export default DiningCard;
