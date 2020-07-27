import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import HalalIcon from '../../assets/icons/halal-icon.svg'
import KosherIcon from '../../assets/icons/kosher-icon.svg'
import VeganIcon from '../../assets/icons/vegan-icon.svg'
import VegetarianIcon from '../../assets/icons/vegetarian-icon.svg'
import GlutenFreeIcon from '../../assets/icons/gluten-free-icon.svg'

interface DietaryPreferencesIconsProps {
    preferences: Array<string>
}

const DietaryPreferencesIcons: React.FC<DietaryPreferencesIconsProps> = ({preferences}) => {
    return (
        <View style={styles.container}>
            {preferences.map((preference) => {
                switch (preference) {
                    case 'halal':
                        return <HalalIcon key={preference} style={styles.icon} />
                    case 'kosher':
                        return <KosherIcon key={preference} style={styles.icon} />
                    case 'vegan':
                        return <VeganIcon key={preference} style={styles.icon} />
                    case 'vegetarian':
                        return <VegetarianIcon key={preference} style={styles.icon} />
                    case 'gluten-free':
                        return <GlutenFreeIcon key={preference} style={styles.icon} />
                    default:
                        return null
                }
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
    },
    icon: {
        marginLeft: -5
    }
})

export default DietaryPreferencesIcons;
