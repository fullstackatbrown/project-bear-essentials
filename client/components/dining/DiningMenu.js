import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    AntDesign,
} from "react-native";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";

const DiningMenu = props => {
    console.log(props.route.params)

    return (
        <Text>Hi</Text>
        // <View style={styles.screen}>
        //     <View style={styles.header}>
        //         <Text style={styles.title}>Dining Menu</Text>
        //         <TouchableOpacity style={styles.starArea} onPress={starHandler}>
        //             <AntDesign
        //                 style={styles.star}
        //                 name={starName}
        //                 size={30}
        //                 color={starColor}
        //             />
        //         </TouchableOpacity>
        //     </View>
        //     <View style={styles.openHours}></View>
        //     <Text>Entrees</Text>
        //     <View style={styles.horizontalLine} />
        // </View>
    );
};

// useEffect(() => {
//     const fetchMenu = async () => {
//         const menu = await fetchMenuDetailed(id[props.name]);
//         setHallHours(menu.menu.dayparts[0].stations);
//     };
//     fetchMenu();
// }, []);

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#fafafa",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontWeight: "600",
        fontSize: 28,
    },
    starArea: {
        height: 32,
    },
    horizontalLine: {
        marginBottom: 18,
        alignSelf: "center",
        width: "86%",
        borderBottomColor: "#D3D3D3",
        borderBottomWidth: 1,
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
});

export default DiningMenu