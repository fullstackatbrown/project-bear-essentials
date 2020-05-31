import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';

const LaundryCard = props => {
    // states for star
    const [starred, setStarred] = useState((props.starred) ? true : false);
    const [starName, setStarName] = useState(starred ? 'star' : 'staro');
    const [starColor, setStarColor] = useState(starred ? '#FFEF26' : '#BCBCBC');

    // states for bell
    const [notif, setNotif] = useState(false);
    const [bellName, setBellName] = useState('bell-outline');
    const [bellColor, setBellColor] = useState('#BCBCBC');

    // states for collapsible
    const [collapsed, setCollapsed] = useState(true);

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
            setBellColor('#BCBCBC');
            // remove notifications
        } else {
            setNotif(true);
            setBellName('bell');
            setBellColor('#949494');
            // add notifications
        }
    }

    // when down arrow is pressed
    const downArrowHandler = () => {
        setCollapsed(false);
    }

    // when up arrow is pressed
    const upArrowHandler = () => {
        setCollapsed(true);
    }

    return (
        <View style={styles.back}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{props.card.title}</Text>
                        <Text style={styles.room}>{props.card.room && 
                            "(Room " + props.card.room + ")"}</Text>
                    </View>
                    <TouchableOpacity onPress={starHandler}>
                        <AntDesign name={starName} size={24} color={starColor}/>  
                    </TouchableOpacity>
                </View>
                <Collapsible collapsed={!collapsed}>
                    <View style={styles.temporary}>
                        <Text>Machine details here</Text>
                        <TouchableOpacity onPress={downArrowHandler}>
                            <Ionicons name="ios-arrow-down" size={24} color="#949494" />
                        </TouchableOpacity>
                    </View>
                </Collapsible>
                <Collapsible collapsed={collapsed}>
                    <View style={styles.hiddenCard}>
                        <View>
                            <Text>Individual machines</Text>
                            <Text>Individual machines</Text>
                            <Text>Individual machines</Text>
                            <Text>Individual machines</Text>
                        </View>
                        <View style={styles.upArrow}>
                            <TouchableOpacity onPress={upArrowHandler}>
                                <Ionicons name="ios-arrow-up" size={24} color="#949494" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    
                </Collapsible>
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
    },
    title: {
        fontWeight: '400',
        fontSize: 20
    },
    room : {
        color: 'gray'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    temporary: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    hiddenCard: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    upArrow : {
        justifyContent: 'flex-end'
    }
});

export default LaundryCard;