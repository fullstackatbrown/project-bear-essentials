import React, {useState} from "react";
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text, 
} from "react-native";
import { AntDesign, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors.js";
import { fetchDiningDetailed } from "./dinQueries";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

const DiningCard = props => {
    const [openStatus, setOpenStatus] = useState(true , false);
    const [starred, setStarred] = useState(props.isStarred ? true : false);
    const [starName, setStarName] = useState(starred ? "star" : "staro");
    const [starColor, setStarColor] = useState(starred ? Colors.starYellow : Colors.inactiveIcon);

    // retrieves the current time in XX:XX format
    let date = new Date();
    let currTime = `${date.getHours()}:${date.getMinutes()}`;

    // hard coded for samples
    let openTime = "07:00";
    let closeTime = "22:00";

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
    requires another function that changes openStatus.
    maybe we can create new function that can act as a component (replace styles.info). within this function,
    we can render correct information and just call function below
    */
    let text = "";

    /*
    TODO: figure out how to call hoursHandler w/o rerendering too many times and use 
    GraphQL query functions for API calls
    */ 
     const hoursHandler = () => {
        let curr = Date.parse(currTime);
        let open = Date.parse(openTime);
        let close = Date.parse(closeTime);
        if (curr > open && curr < close) {
            setOpenStatus(true);
        } else {
            setOpenStatus(false);
        }
    }

    // handles open/close sign color and text color
    const signColorHandler = () => {
        if (openStatus) {
            return (
                <React.Fragment>
                <Text style={styles.openSign}>Open</Text>
                <Text style={styles.closeText}>Closes at 8:00 PM</Text>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Text style={styles.closeSign}>Closed</Text>
                    <Text style={styles.openText}>Opens at 8:00 AM</Text>
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
            <View style={styles.info}>{signColorHandler()}
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
    openSign: {
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
    closeSign: {
        textTransform: "uppercase",
        fontSize: 18,
        color: Colors.danger,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: Colors.danger,
        paddingHorizontal: 12,
        paddingVertical: 3,
        fontWeight: "500",
    },
    openText: {
        fontSize: 18,
        color: Colors.success,
        paddingVertical: 5,
        fontWeight: "500",
    },
    closeText: {
        fontSize: 18,
        color: Colors.danger,
        paddingVertical: 5,
        fontWeight: "500",
    }
});

export default DiningCard;