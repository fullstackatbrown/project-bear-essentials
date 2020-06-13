import React, {useState} from "react";
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text, 
} from "react-native";
import { Ionicons, AntDesign} from "@expo/vector-icons";

const DiningCard = props => {

    const [openStatus, setOpenStatus] = useState(props.isOpen ? true : false);
    const [starred, setStarred] = useState(props.isStarred ? true : false);
    const [starColor, setStarColor] = useState(starred ? "#ffef26" : "#FFFFFF");
    
    // dining informations and times
    let diningMenu = [];
    let startHour = "0:00";

    // curr time
    let date = new Date();
    let currHours = date.getHours();
    let currMin = date.getMinutes();

    // if star is pressed
    const starHandler = () => {
        if (starred) {
            setStarred(false);
            setStarColor("#FFFFFF");
        } else {
            setStarred(true);
            setStarColor("#ffef26");
        }
        props.starPressed();
    };

    // TODO: finish diningHandler for managing card dining information
    const diningHandler = () => {
        if (openStatus == true) {
        }
    };

    return (
    <View style={styles.diningCard}>
            <View style={styles.header}>
                <View style={{ minWidth: "100%" }}>
                    <Text style={styles.title}>
                        Dining Hall
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.star}>
                <AntDesign name="staro" size={24} color="black"/>
            </TouchableOpacity>
            <View style={styles.cardSummary}>
                <Text style={styles.openSign}>
                    Open
                </Text>
                <Text style={styles.menu}>
                    Bacon, eggs, cheese...
                </Text>
            </View>
    </View>
    );
};

const styles = StyleSheet.create({
    diningCard: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: .6,
        shadowOpacity: 0.25,
        elevation: 8,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        maxWidth: "100%"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        
    },
    cardSummary: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
});

export default DiningCard;