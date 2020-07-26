import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp, NavigationProp} from '@react-navigation/core';
import {SettingsStackParamList} from "./Settings";

type LaundryNotificationsRouteProp = RouteProp<SettingsStackParamList, 'LaundryNotifications'>;
type LaundryNotificationsNavigationProp = NavigationProp<SettingsStackParamList, 'LaundryNotifications'>;

interface LaundryNotificationsProps {
    route: LaundryNotificationsRouteProp;
    navigation: LaundryNotificationsNavigationProp;
}

const LaundryNotifications: React.FC<LaundryNotificationsProps> = () => {
    return (
        <View style={styles.container}>
            <Text>Laundry notifications go here!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default LaundryNotifications;
