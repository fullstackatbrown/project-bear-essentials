import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 

const LaundryCard = props => {
    return (
        <View style={styles.back}>
            <View style={styles.card}>
                <View>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.room}>{props.room && "(Room " + props.room + ")"}</Text>
                    <Text>Machine details here</Text>
                </View>
                <View style={styles.icons}>
                    <AntDesign name="staro" size={24} color="black" />
                    <EvilIcons name="bell" size={24} color="black" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    back: {
        padding: 5,
        backgroundColor: '#0000'
    },
    card: {
        padding: 10,
        borderRadius: 5,
        width: 300,

        // shadows for ios
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',

        // shadows for android
        elevation: 5,

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: '400',
        fontSize: 20
    },
    room : {
        color: 'gray'
    },
    icons: {
        justifyContent: 'space-around'
    }
});

export default LaundryCard;