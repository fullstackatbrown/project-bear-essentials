import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const LaundryCard = props => {
    const [starred, setStarred] = useState(false);
    const [starName, setStarName] = useState('staro');
    const [starColor, setStarColor] = useState('black');

    const [notif, setNotif] = useState(false);
    const [bellName, setBellName] = useState('bell-outline');

    // when star is pressed
    const starHandler = () => {
        if (starred) {
            setStarred(false);
            setStarName('staro');
            setStarColor('black');
            
            // remove from favorites
        } else {
            setStarred(true);
            setStarName('star');
            setStarColor('yellow');
            // add to favorites
        }
    }

    // when bell is pressed
    const bellHandler = () => {
        if (notif) {
            setNotif(false);
            setBellName('bell-outline');
            // remove notifications
        } else {
            setNotif(true);
            setBellName('bell');
            // add notifications
        }
    }

    return (
        <View style={styles.back}>
            <View style={styles.card}>
                <View>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.room}>{props.room && "(Room " + props.room + ")"}</Text>
                    <Text>Machine details here</Text>
                </View>
                <View style={styles.icons}>
                    <TouchableOpacity onPress={starHandler}>
                       <AntDesign name={starName} size={24} color={starColor}/>  
                    </TouchableOpacity>
                    <TouchableOpacity onPress={bellHandler}>
                        <MaterialCommunityIcons name={bellName} size={24} color='gray' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// styles
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