import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    AntDesign,
} from "react-native";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { getColors } from "../reusable/getColors";

const mapStateToProps = (state) => {
    return {
        darkmode: state.settings.darkmode
    };
};

const DiningMenu = (props) => {
    const Colors = getColors(props.darkmode);
    const styles = getStyles(Colors);
    const [starred, setStarred] = useState(props.isStarred ? true : false);
    const [starName, setStarName] = useState(starred ? "star" : "staro");
    const [starColor, setStarColor] = useState(
        starred ? Colors.starYellow : Colors.inactiveIcon
    );
    console.log(props.route.params);
    
    const hoursHandler = () => { 
        let signStyle = styles.open;
        let timeStyle = styles.closed;
        let text1 = "Open";
        let text2 = "7:00 AM - 7:30 PM"
        return (
            <View style={styles.info}>
                <Text style={[signStyle, styles.sign]}>{text1}</Text>
                <Text style={styles.text}>{text2}</Text>
            </View>
        );
    }

    return (
       
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>{props.children}Sharpe Refrectory</Text>
                {/* <TouchableOpacity>
                    <AntDesign
                            style={styles.star}
                            name={starName}
                            size={30}
                            color={starColor}
                        />
                </TouchableOpacity> */}
            </View>
            <View>
                {hoursHandler()}
            </View>
            <View style={styles.mealInfo}>
                <Text style={styles.text}>Now Serving</Text>
                <Text style={[styles.text, styles.mealStatus]}>Breakfast</Text>
            </View>
            <Text style={styles.menuTitle}>Entrees</Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.menuTitle}>Fresh Fruits</Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.menuTitle}>Desserts</Text>
            <View style={styles.horizontalLine} />
        </View>
    );
};

// useEffect(() => {
//     const fetchMenu = async () => {
//         const menu = await fetchMenuDetailed(id[props.name]);
//         setHallHours(menu.menu.dayparts[0].stations);
//     };
//     fetchMenu();
// }, []);

const getStyles = (Colors) => StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#fafafa",
    },
    header: {
        height: 110,
        backgroundColor: "#f9f9f9",
        elevation: 0,
        shadowOpacity: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 26,
    },
    title: {
        color: "#000000",
        paddingLeft: 12,
        fontSize: 32,
    },
    starArea: {
        height: 32,
    },
    menuTitle: {
        color: "#000000",
        fontSize: 18,
    },
    horizontalLine: {
        marginBottom: 18,
        alignSelf: "center",
        width: "86%",
        borderBottomColor: "#D3D3D3",
        borderBottomWidth: 1,
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingBottom: 10,
    },
    openHours: {
        flexDirection: "row",
        justifyContent: "space-between", 
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
    mealInfo: {
        alignItems: "center",
        paddingBottom: 10,
    },
    mealStatus: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
        borderColor: "white",
        paddingVertical: 4,
        fontWeight: "300",
        fontStyle: "italic",
        marginLeft: 10,
    },
});

export default connect(mapStateToProps)(DiningMenu);