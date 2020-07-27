import React, {useState, useEffect} from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {fetchHours, fetchMenuDetailed} from "./DinQueries";
import LottieView from "lottie-react-native";

const DiningCard = props => {
    const [starred, setStarred] = useState(props.isStarred ? true : false);
    const [starName, setStarName] = useState(starred ? "star" : "staro");
    const [starColor, setStarColor] = useState(
        starred ? Colors.starYellow : Colors.inactiveIcon
    );
    const [hallHours, setHallHours] = useState("Loading...");
    const [loading, setLoading] = useState(true);
    const [isClosed, setClosed] = useState(false);
    const [menuSummary, setMenuSummary] = useState([]);
    const {navigation} = props;

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
        props.starPressed();
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
            text2 = `Closes ${time}`
        } else {
            text2 = `Opens ${time}`
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
                <Text style={styles.menuText}>Turkey bacon, oatmeal, eggs...</Text>
                <AntDesign name="right" size={24} color="#CCCCCC" />
            </View>
        )
    }

    // handles detail return and loading delay
    const detailHandler = () => {
        if(loading) {
            return (
                <View style={{width: "100%"}}>
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
        } else if(isClosed) {
            return (
                <View style={styles.info}>
                    <Text style={[styles.text, styles.closed]}>Closed All Day</Text>
                </View>
            )
        }
        else {
            return (
                <View>
                    {hoursHandler()}
                    {menuHandler()}
                </View>
            )
        }
    }

    useEffect(() => {
        let mounted = true;
        const effectFunction = async (isInitial) => {
            if(mounted) {
                const time = await fetchHours(props.card.queryText);
                // const menu = await fetchMenuDetailed(props.queryText);
                const hours = time.data.data.cafe.days[0].dayparts;
                hours.length === 0 ? setClosed(true) : setHallHours(hours);
                // setMenuSummary(menu.data.menu.dayparts[0].stations);
                if (isInitial) setLoading(false);
            }
        };
        effectFunction(true);

        let interval = setInterval(() => effectFunction(false), 60000);

        return () => {
            mounted = false;
            clearInterval(interval);
        }
    }, []);

    return (
        <View style={styles.card}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("Menu")}>
                <View style={styles.header}>
                    <Text style={styles.title}>{props.card.name}</Text>
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
        paddingVertical: 22,
        marginBottom: 20,
        borderRadius: 8,
        shadowColor: "black",
        shadowRadius: 3,
        shadowOpacity: 0.25,
        backgroundColor: "white",
        shadowOffset: { width: 1, height: 1 },
        width: "87%",
        alignSelf: "center",
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontWeight: "600",
        fontSize: 28,
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
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
        fontSize: 20,
        borderWidth: 1.5,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingTop: 2,
        paddingBottom: 1,
        fontWeight: "600",
    },
    menuSummary: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    menuText: {
        marginTop: 6,
    },
    text: {
        fontSize: 20,
        borderColor: "white",
        paddingVertical: 3,
        fontWeight: "300",
        fontStyle: "italic"
    },
});

export default DiningCard;
