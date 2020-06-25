import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity,Text, } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors.js";
import fetchHours from "./DinQueries";


const DiningCard = props => {
    const [starred, setStarred] = useState(props.isStarred ? true : false);
    const [starName, setStarName] = useState(starred ? "star" : "staro");
    const [starColor, setStarColor] = useState(starred ? Colors.starYellow : Colors.inactiveIcon);
    const [hallHours, setHallHours] = useState("");

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
        "Café Carts": "cafecarts"
    }

    // handles changes to star icon if pressed
    const starHandler = () => {
        if (starred) {
            setStarred(false);
            setStarName('staro');
            setStarColor(Colors.inactiveIcon);
        } else {
            setStarred(true);
            setStarName('star');
            setStarColor(Colors.starYellow);
        }
        // props.starPressed(); //will trigger action in diningscreen file
    };

    // compares the current time w/ the time from the api
    const hoursCompare = () => {
        let date = new Date();
        let currTime = `11/11/11 ${date.getHours()}:${date.getMinutes()}`;
        let openTime = "11/11/11 06:00"
        let closeTime = "11/11/11 22:00"
        // let openTime = `11/11/11 ${hallHours.starttime}`;
        // let closeTime = `11/11/11 ${hallHours.endtime}`;
        let curr = Date.parse(currTime);
        let open = Date.parse(openTime);
        let close = Date.parse(closeTime);
        if (curr > open && curr < close) {
            return true;
        }
        return false;
    }

    // toggles open/close sign color and text color
    const signColorHandler = () => {
        if (hoursCompare()) {
            return (
                <React.Fragment>
                <Text style={[styles.open, styles.sign]}>{hallHours}</Text>
                <Text style={[styles.closed, styles.text]}>Closes at 8:00 PM</Text>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Text style={[styles.closed, styles.sign]}>Closed</Text>
                    <Text style={[styles.open, styles.text]}>Opens at 8:00 AM</Text>
                </React.Fragment> 
            );
        }
    };

    useEffect(
        () => {
            const fetchData = async () => {
                const time = await fetchHours(id[props.name]);
                setHallHours(time.data.cafe.name)
                console.log("****************")
                console.log(time)
            }
            fetchData();
        },
        [],
    );

    return (
    <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{props.name}</Text>
                <TouchableOpacity style={styles.starArea} onPress={starHandler}>
                    <AntDesign style={styles.star} name={starName} size={30} color={starColor}/>  
                </TouchableOpacity>
            </View>
            <View style={styles.info}>
                {signColorHandler()}
            </View>
    </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 25,
        borderRadius: 15,
        shadowColor: "black",
        shadowRadius: 4,
        shadowOpacity: 0.25,
        backgroundColor: "white",
        shadowOffset: { width: 3, height: 3},
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
        marginTop: 25
    },
    open: {
        color: Colors.success,
        borderColor: Colors.success
    },
    closed: {
        color: Colors.danger,
        borderColor: Colors.danger
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