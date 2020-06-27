import React, { Component } from "react";
import DiningCard from "./DiningCard";
import DiningMenu from "./DiningMenu";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { addStarred, deleteStarred } from "../../redux/ActionCreators";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DINING_DATA } from "../../data/dummydata/dining/endpoint";
import { fetchCafes } from "./DinQueries";
import Colors from "../../constants/Colors.js";

// const mapStateToProps = state => {
//     return {
//         starred: state.dining.starred,
//     };
// };

const mapDispatchToProps = dispatch => {
    return {
        addStarred: flag => dispatch(addStarred(flag)),
        deleteStarred: flag => dispatch(deleteStarred(flag)),
    };
};

// configures dining menu screen for navigator

const DINING_HALL = "Sharpe Refrectory";
const DiningStack = createStackNavigator();

// const DiningMenu = ({ navigation }) => {
//     return (
//         <ScreenContainer>
//          <DiningCard 
//             style={styles.inputContainer}
//             name={"Sharpe Refectory"}/> 
//             onPress={() => {
//                 navigation.push("Menu");
//             }}  
//         </ScreenContainer>
//     );
// };

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
        if (!this.props.starred.includes(card)) {
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
                        diningCard={this.state.cards[diningHall]}
                        starPressed={() => this.starChanges(diningHall)}
                        isStarred={this.props.starred.includes(diningHall)}
                    />
                ))}
            </ScrollView>
        );
    }

    // creates navigator for dining menu
    createMenuStack = () => {
        <NavigationContainer>
            <DiningStack.Navigator>
                <DiningStack.Screen
                    name = "Dining Menu"
                    component={DiningMenu} />
            </DiningStack.Navigator>
        </NavigationContainer>
    }

    render() {
        const { search } = this.state;
        this.createMenuStack();
        return (
            //TODO: set up navigation from card to menu
            <View style={styles.screen}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.search}>
                        <Ionicons name="ios-search" size={24} color="gray" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Search dining halls"
                        />
                    </View>
                    <DiningCard
                        style={styles.inputContainer}
                        name={"Sharpe Refectory"}
                    />
                    <DiningCard
                        style={styles.inputContainer}
                        name={"Sharpe Refectory"}
                    />
                    <DiningCard
                        style={styles.inputContainer}
                        name={"Sharpe Refectory"}
                    />
                    <DiningCard
                        style={styles.inputContainer}
                        name={"Sharpe Refectory"}
                    />
                    <DiningCard
                        style={styles.inputContainer}
                        name={"Sharpe Refectory"}
                    />
                    <DiningCard
                        style={styles.inputContainer}
                        name={"Sharpe Refectory"}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fafafa",
    },
    scroll: {
        width: "100%",
    },
    search: {
        flex: 1,
        borderWidth: 0,
        borderRadius: 25,
        borderColor: "#BCBCBC",
        padding: 10,
        paddingLeft: 12,
        margin: 12,
        width: "88%",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",

        // shadows for ios
        shadowColor: "black",
        shadowRadius: 2,
        shadowOpacity: 0.25,
        backgroundColor: "white",
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    textInput: {
        borderWidth: 0,
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        fontSize: 18,
        color: "#9C9C9C",
    },
    header: {
        minWidth: "100%",
    },
    title: {
        fontSize: 25,
        marginVertical: 10,
    },
    inputContainer: {
        width: 332,
        maxWidth: "100%",
        height: 175,
        alignItems: "center",
    },
});

export default connect(mapDispatchToProps)(DiningScreen);
