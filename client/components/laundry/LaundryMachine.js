import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LaundryMachine = props => {

    const [notif, setNotif] = useState(false);
    const [bellName, setBellName] = useState('bell-outline');
    const [bellColor, setBellColor] = useState('#CCCCCC');

    // when bell is pressed
    const bellHandler = () => {
        if (notif) {
            setBellName('bell-outline');
            setBellColor('#CCCCCC');
            setNotif(false);
        } else {
            setBellName('bell');
            setBellColor('#949494')
            setNotif(true);
        }

        //TODO: send to parent
    }

    //capitalize only first letter
    const formatMachineName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    const renderMachine = () => {
        if (props.machine.avail) {
            return (
                <View style={styles.row}>
                    <MaterialCommunityIcons name='bell-outline' size={30} color='transparent' />
                    <Text style={[styles.available, styles.words]}>
                        {formatMachineName(props.machine.type)} {props.machine.id}
                    </Text>
                </View>)
        } else {
            return (
                <View style={styles.row}>
                <TouchableOpacity onPress={bellHandler}>
                    <MaterialCommunityIcons name={bellName} size={30} color={bellColor} /> 
                </TouchableOpacity>
                <Text style={[styles.used, styles.words]}>
                    {formatMachineName(props.machine.type)} {props.machine.id} ({props.machine.time_remaining} minutes)
                </Text>
            </View>)
        }
    }

    return (
        <View>
            {renderMachine()}  
        </View>
    )
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7
    },
    used: {
       color: "#CC0200",
       fontSize: 16
    },
    available: {
        color: "#0F9960",
        fontSize: 16
    },
    words: {
        marginLeft: 7
    }
})
export default LaundryMachine;