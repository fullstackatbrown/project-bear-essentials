import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const LaundryCard = props => {
    const [starred, setStarred] = useState((props.starred) ? true : false);
    const [starName, setStarName] = useState(starred ? 'star' : 'staro');
    const [starColor, setStarColor] = useState(starred ? '#FFEF26' : '#BCBCBC');

    const [notif, setNotif] = useState(false);
    const [bellName, setBellName] = useState('bell-outline');

    

    // when star is pressed
    const starHandler = () => {
        if (starred) {
            setStarred(false);
            setStarName('staro');
            setStarColor('#BCBCBC'); //inactive color
        } else {
            setStarred(true);
            setStarName('star');
            setStarColor('#FFEF26'); //star yellow
        }

        // send changes to parent
        props.starAction()
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
                    <Text style={styles.title}>{props.card.title}</Text>
                    <Text style={styles.room}>{props.card.room && 
                        "(Room " + props.card.room + ")"}</Text>
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
        padding: 12,
        borderRadius: 10,
        // shadows for ios
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: 0.25,
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 1
        },
        width: '90%',
        alignSelf: 'center',

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