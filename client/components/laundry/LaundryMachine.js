import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { pluralize, COLORS } from './LaundryUtils';

const LaundryMachine = props => {

    const [notif, setNotif] = useState(props.isNotif ? true : false);
    const [bellName, setBellName] = useState(notif ? 'bell' : 'bell-outline');
    const [bellColor, setBellColor] = useState(notif ? '#949494' : '#CCCCCC');

    const thisMachine = props.machine;

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

        props.notifAction()
    }

    //capitalize only first letter
    const formatMachineName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    const renderMachine = () => {
        if (thisMachine.avail) {
            return (
                <View style={styles.row}>
                    <MaterialCommunityIcons name='bell-outline' size={30} color='transparent' />
                    <Text style={[styles.available, styles.words]}>
                        {formatMachineName(thisMachine.type)} {thisMachine.id}
                    </Text>
                </View>)
        } else {
            return (
                <View style={styles.row}>
                <TouchableOpacity onPress={bellHandler}>
                    <MaterialCommunityIcons name={bellName} size={30} color={bellColor} /> 
                </TouchableOpacity>
                <Text style={[styles.used, styles.words]}>
                    {formatMachineName(thisMachine.type)} {thisMachine.id} ({pluralize(thisMachine.time_remaining, "minute")})
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
        paddingVertical: 7,
    },
    used: {
        color: COLORS.fail,
    },
    available: {
        color: COLORS.success,
    },
    words: {
        marginLeft: 12,
        fontSize: 19,
    }
})
export default LaundryMachine;