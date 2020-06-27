import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { DINING_DATA } from "../../data/dummydata/dining/endpoint";
import { ScrollView } from "react-native-gesture-handler";

export const DiningMenu = () => {
    const [diningMenu, setDiningMenu] = useState({});

    <View style={styles.screen}>
        <View style={styles.header}>
            <Text>Hello!</Text>
        </View>
    </View>;
}

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
});


