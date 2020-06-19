import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity,Text, } from "react-native";
import { AntDesign, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors.js";
import { fetchDiningDetailed } from "./DinQueries";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

const DiningCard = props => {
    const [starred, setStarred] = useState(props.isStarred ? true : false);
    const [starName, setStarName] = useState(starred ? "star" : "staro");
    const [starColor, setStarColor] = useState(starred ? Colors.starYellow : Colors.inactiveIcon);

    // if star is pressed
    const starHandler = props => {
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

    /*
    TODO: figure out how to call hoursHandler w/o rerendering too many times and use 
    GraphQL query functions for API calls
    */ 
    const hoursHandler = () => {
        // retrieves the current time in XX:XX format
        let date = new Date();
        let currTime = `11/11/11 ${date.getHours()}:${date.getMinutes()}`;        
        if (date.getHours() < 10) {
            currTime = "0" + currTime;
        }
        // hard coded for samples
        let openTime = "21:00";
        let closeTime = "22:00";
        let curr = Date.parse(currTime);
        let open = Date.parse(openTime);
        let close = Date.parse(closeTime);
        if (curr > open && curr < close) {
            return true;
        } else {
            return false;
        }
    }
    

    // handles open/close sign color and text color
    const signColorHandler = () => {
        if (hoursHandler) {
            return (
                <React.Fragment>
                <Text style={[styles.open, styles.sign]}>Open</Text>
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

    return (
    <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{props.title}</Text>
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
        fontSize: 37,
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
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 3,
        fontWeight: "500",
    },
    text: {
        fontSize: 18,
        borderColor: "white",
        paddingVertical: 5,
        fontWeight: "500",
    },
});

export default DiningCard;