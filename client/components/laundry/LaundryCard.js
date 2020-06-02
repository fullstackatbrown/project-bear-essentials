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
    };

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
    };

    // when down arrow is pressed
    const downArrowHandler = () => {
        setCollapsed(false);
    };

    // when up arrow is pressed
    const upArrowHandler = () => {
        setCollapsed(true);
    };

    // returns formatted room, if it exists
    const roomHandler = () => {
        if (props.card.room) {
            return (
                <Text style={styles.room}>
                    {"(Room " + props.card.room + ")"}
                </Text>
            );
        }
    };

    const pluralize = (num) => {
        if (num > 1) {
            return 's';
        }
    };

    const summaryHandler = () => {
        let availWashers = 0;
        let availDryers = 0;
        props.card.machines.forEach(function (machine) {
            if (machine.avail == true) {
                if (machine.type == "WASHER") {
                    availWashers++;
                } else if (machine.type == "DRYER") {
                    availDryers++;
                }
            }
        });

        if (availWashers == 0 && availDryers == 0) {
            return <Text style={styles.fail}>No available machines</Text>;
        } else if (availDryers == 0) {
            return (
                <Text style={styles.success}>
                    {availWashers} washer{pluralize(availWashers)} available
                </Text>
            );
        } else if (availWashers == 0) {
            return (
                <Text style={styles.success}>
                    {availDryers} dryer{pluralize(availDryers)} available
                </Text>
            );
        } else {
            return (
                <Text style={styles.success}>
                    {availWashers} washer{pluralize(availWashers)}, {availDryers} dryer{pluralize(availDryers)} available
                </Text>
            );
        }
    };

    return (
        <View style={styles.back}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={{ maxWidth: '80%' }}>
                        <Text style={styles.title}>{props.card.title}</Text>
                        {roomHandler()}
                    </View>
                    <TouchableOpacity onPress={starHandler}>
                        <AntDesign style={styles.star} name={starName} size={30} color={starColor} />  
                    </TouchableOpacity>
                </View>
                <Collapsible collapsed={!collapsed}>
                    <View style={styles.uncollapsed}>
                        <Text>{summaryHandler()}</Text>
                        <TouchableOpacity onPress={downArrowHandler}>
                            <Ionicons style={styles.arrow} name="ios-arrow-down" size={40} color="#CCCCCC" />
                        </TouchableOpacity>
                    </View>
                </Collapsible>
                <Collapsible collapsed={collapsed}>
                    <View style={styles.collapsed}>
                        <View>
                            <Text>Washer</Text>
                            <Text>Washer</Text>
                        </View>
                        <View style={styles.horizontalLine} />
                        <View style={styles.colSections}>
                            <View>
                                <Text>Dryer</Text>
                                <Text>Dryer</Text>
                            </View>
                            <View style={styles.upArrow}>
                            <TouchableOpacity onPress={upArrowHandler}>
                                <Ionicons style={styles.arrow} name="ios-arrow-up" size={36} color="#CCCCCC" />
                            </TouchableOpacity>
                        </View>
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
        padding: 20,
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
        fontWeight: '500',
        fontSize: 26,
    },
    room: {
        fontSize: 20,
        color: 'gray',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    uncollapsed: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    collapsed: {
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    colSections: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    upArrow: {
        justifyContent: 'flex-end'
    },
    arrow: {
        marginBottom: -10,
        marginRight: 2
    },
    horizontalLine: {
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        width: '100%',
        borderBottomColor: '#AEAEAE',
        borderBottomWidth: 0.7,
    },
    success: {
        color: 'green',
        fontSize: 16,
    },
    fail: {
        color: 'red',
        fontSize: 16,
    },
});

export default LaundryCard;