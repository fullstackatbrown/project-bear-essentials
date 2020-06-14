import React, {useState} from "react";
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text, 
} from "react-native";
import { AntDesign, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors.js";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

const DiningCard = props => {
    const [openStatus, setOpenStatus] = useState(props.isOpen ? true : false);
    const [starred, setStarred] = useState(props.isStarred ? true : false);
    const [starName, setStarName] = useState(starred ? "star" : "staro");
    const [starColor, setStarColor] = useState(starred ? Colors.starYellow : Colors.inactiveIcon);

    // retrieves the current time in XX:XX format
    let date = new Date();
    let currTime = `${date.getHours()}:${date.getMinutes()}`;
    if (date.getHours() < 10) {
        currTime = "0" + currTime;
    }

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
    when dining hall is open/closed, should check open status and use it to change color of sign and text. 
    (make color and border color js variables that are adjusted in this method)
    should also return correct variable that inputs the text for closes and opens times
    requires another function that changes openStatus
    */
    let text = "";
    const diningHandler = () => {
        if (openStatus == true) {
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
                <Text style={styles.sign}>Open</Text>
                <Text style={styles.text}>Closes at 8:00 PM</Text>
            </View>
    </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 25,
        borderRadius: 15,
        // shadows for ios
        shadowColor: "black",
        shadowRadius: 4,
        shadowOpacity: 0.25,
        backgroundColor: "white",
        shadowOffset: {
            width: 3,
            height: 3
        },
        width: "90%",
        alignSelf: "center",

        // shadows for android
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
    sign: {
        textTransform: "uppercase",
        fontSize: 18,
        color: Colors.success,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: Colors.success,
        paddingHorizontal: 12,
        paddingVertical: 3,
        fontWeight: "500",
    },
    text: {
        fontSize: 18,
        color: Colors.success,
        paddingVertical: 5,
        fontWeight: "500",
    }
});

export default DiningCard;