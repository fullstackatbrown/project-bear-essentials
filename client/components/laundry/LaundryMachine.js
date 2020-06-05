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
                <Text style={styles.available}>
                {formatMachineName(props.machine.type)} {props.machine.id}
            </Text>)

        } else {
            return (
                <View style={styles.row}>
                <TouchableOpacity onPress={bellHandler}>
                    <MaterialCommunityIcons name={bellName} size={24} color={bellColor} /> 
                </TouchableOpacity>
                <Text style={styles.used}>
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
        flexDirection: 'row'
    },
    used: {
       color: "#CC0200" 
    },
    available: {
        color: "#0F9960"
    }
})
export default LaundryMachine;