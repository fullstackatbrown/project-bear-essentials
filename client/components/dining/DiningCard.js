import React from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';

const DiningCard = props => {
    
    // dining informations and times
    let diningMenu = [];
    let openStatus = true;
    let startHour = '0:00';

    // curr time
    let date = new Date();
    let currHours = date.getHours();
    let currMin = date.getMinutes();

    // TODO: finish diningHandler for managing card dining information
    const diningHandler = () => {
        if (openStatus == true) {
        }
    }

    // styles can be overidden from outside components
    return <View style={{...styles.diningCard, ...props.style}}>
        <TouchableOpacity>
        {props.children}
        </TouchableOpacity>
        </View>
    };

const styles = StyleSheet.create({
    diningCard: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: .6,
        shadowOpacity: 0.25,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default DiningCard;