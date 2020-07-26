import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp, NavigationProp} from '@react-navigation/core';
import {SettingsStackParamList} from "./Settings";

type DietaryPreferencesRouteProp = RouteProp<SettingsStackParamList, 'DietaryPreferences'>;
type DietaryPreferencesNavigationProp = NavigationProp<SettingsStackParamList, 'DietaryPreferences'>;

interface DietaryPreferencesProps {
    route: DietaryPreferencesRouteProp;
    navigation: DietaryPreferencesNavigationProp;
}

const DietaryPreferences: React.FC<DietaryPreferencesProps> = () => {
    return (
        <View style={styles.container}>
            <Text>Dietary preferences go here!</Text>
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

export default DietaryPreferences;
