import React, { Component } from "react";
import DiningCard from "./DiningCard";
import { 
    Text,
    View, 
    StyleSheet, 
    CheckBox,
} from "react-native";
import { Ionicons, AntDesign} from "@expo/vector-icons";
import { addStarred, deleteStarred, } from "../../redux/ActionCreators";
import { connect } from "react-redux";
import { SearchBar, } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DINING_DATA } from "../../data/dummydata/dining/endpoint";

// const mapStateToProps = state => {
//     return {
//         starred: state.dining.starred,
//     };
// };

const mapDispatchToProps = dispatch => ({
    addStarred: flag => dispatch(addStarred(flag)),
    deleteStarred: flag => dispatch(deleteStarred(flag)),
});

const DINING_HALL = "Sharpe Refrectory"
const DiningStack = createStackNavigator();

class DiningScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            cards: DINING_DATA,
        };

        this.starChanged = this.starChanged.bind(this);
    }

    // updates star's state when clicked
    starChanged = card => {
        if(!this.props.starred.includes(card)){
            this.props.addStarred(card);
        } else {
            this.props.deleteStarred(card);
        }
    };

    // replaces query with text user searches
    updateSearch = search => {
        this.setState({ search });
    };

    // creates individual dining cards
    mapDiningCard(starred) {
        return (
            <ScrollView>
                {starred.map(diningHall => (
                <DiningCard
                diningCard = {this.state.cards[diningHall]}
                starPressed = {() => this.starChanges(diningHall)}
                isStarred = {this.props.starred.includes(diningHall)}
                />
                ))}
            </ScrollView>
        )
    };

    render() { 
        const { search } = this.state;

        return (

            //TODO: set up navgation from card to menu 
            < View style={styles.screen}>
                <ScrollView> 
                    <SearchBar
                    round lightTheme
                    inputStyle={{backgroundColor: 'white'}}
                    containerStyle={{backgroundColor: 'white', borderWidth: 0, borderRadius: 0}}
                    placeholderTextColor={"#g5g5g5"}
                    placeholder={"Type Here"}
                    onChangeText = {this.updateSearch} 
                    value = {search}
                    />
                    <DiningCard style={styles.inputContainer}> 
                    </DiningCard>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#fafafa",
    },
    header:{
        minWidth: "100",
    },
    title:{
        fontSize: 25,
        marginVertical: 10,
    },
    inputContainer:{
        width: 332,
        maxWidth: "100%",
        height: 175,
        alignItems: "center",
    },
});

export default connect(mapDispatchToProps)(DiningScreen);