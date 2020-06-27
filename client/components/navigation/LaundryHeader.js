import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from "../../constants/Colors";

const LaundryHeader = (props) => {
    const [searchEnabled, setSearchEnabled] = useState(false)

    const searchTapHandler = () => {
        if (searchEnabled) {
            setSearchEnabled(false)
        } else {
            setSearchEnabled(true);
        }
       
    }

    if (searchEnabled) {
        return(
            <View style={styles.searchHeader}>
                <View style={styles.searchBar}>
                    <Ionicons name="ios-search" size={24} color="gray" />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search laundry"
                    />
                </View>
                    <TouchableOpacity onPress={searchTapHandler}>
                        <Text>Cancel</Text>  
                    </TouchableOpacity>

                </View>)
    }
    else {
        return(
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Laundry</Text>
                <TouchableOpacity onPress={searchTapHandler}>
                    <Ionicons name="ios-search" size={30} color="gray" />
                </TouchableOpacity>
            </View>
        ) 
    }

}

const styles = StyleSheet.create({
    header: {
        height: 'auto',
        backgroundColor: "#f9f9f9",
        elevation: 0,
        shadowOpacity: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        color: "#cc0200",
        paddingLeft: 12,
        fontSize: 40,
        fontWeight: "bold"
    },
    searchHeader: {
        flexDirection: "row",
        alignItems: 'center'
    },
    searchBar : {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderColor: Colors.activeIcon,
        borderRadius: 25,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10
    },
    textInput: {
        flex: 1,
        marginLeft: 5
    }
})

export default LaundryHeader;