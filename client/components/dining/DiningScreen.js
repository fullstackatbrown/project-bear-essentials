import React, { Component } from "react";
import DiningCard from "./DiningCard";
import DiningMenu from "./DiningMenu";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import { addStarred, deleteStarred } from "../../redux/ActionCreators";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DINING_DATA } from "../../data/dummydata/dining/endpoint";
import { fetchCafes } from "./DinQueries";

// TODO: delete unused imports (other files too)

const mapDispatchToProps = (dispatch) => {
  return {
    addStarred: (flag) => dispatch(addStarred(flag)),
    deleteStarred: (flag) => dispatch(deleteStarred(flag)),
  };
};

// configures dining menu screen for navigator
const DINING_HALL = "Sharpe Refectory";
const DiningStack = createStackNavigator();

class DiningScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      cards: DINING_DATA,
      emptySearchBar: true,
    };

    this.starChanged = this.starChanged.bind(this);
  }

  //  fetches dining hall names
  fetchCafeNames = async () => {
    let cafeNames = [];
    const cafe = await fetchCafes();
    cafeNames.push(cafe.data.cafes.name);
  };

  // updates star's state when clicked
  starChanged = (card) => {
    if (!this.props.starred.includes(card)) {
      this.props.addStarred(card);
    } else {
      this.props.deleteStarred(card);
    }
  };

  // replaces query with text user searches
  updateSearch = (search) => {
    this.setState({ search });
  };

  // creates individual dining cards
  // TODO: key prop is missing
  mapDiningCard(starred) {
    return (
      <ScrollView>
        {starred.map((diningHall) => (
          <DiningCard
            key={diningHall}
            diningCard={this.state.cards[diningHall]}
            starPressed={() => this.starChanges(diningHall)}
            isStarre
            d={this.props.starred.includes(diningHall)}
            starAction={() => this.starChanged(diningHall)}
          />
        ))}
      </ScrollView>
    );
  }

  // creates navigator for dining menu
  createMenuStack = () => {
    return (
      <NavigationContainer>
        <DiningStack.Navigator initialRouteName="Dining Screen">
          <DiningStack.Screen name="Dining Screen" component={DiningScreen} />
          <DiningStack.Screen name="Dining Menu" component={DiningMenu} />
        </DiningStack.Navigator>
      </NavigationContainer>
    );
  };

  render() {
    const { search } = this.state;
    this.fetchCafeNames();
    this.createMenuStack();
    return (
      //TODO: set up navigation from card to menu
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Dining</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.search}>
            <Ionicons name="ios-search" size={24} color="gray" />
            <TextInput
              style={styles.textInput}
              placeholder="Search dining halls"
            />
          </View>
          <DiningCard style={styles.inputContainer} name={"Sharpe Refectory"} />
          <DiningCard style={styles.inputContainer} name={"Sharpe Refectory"} />
          <DiningCard style={styles.inputContainer} name={"Sharpe Refectory"} />
          <DiningCard style={styles.inputContainer} name={"Sharpe Refectory"} />
          <DiningCard style={styles.inputContainer} name={"Sharpe Refectory"} />
          <DiningCard style={styles.inputContainer} name={"Sharpe Refectory"} />
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
    height: 110,
    backgroundColor: "#f9f9f9",
    elevation: 0,
    shadowOpacity: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 26,
    paddingTop: Platform.OS === "ios" ? 30 : StatusBar.currentHeight,
  },
  title: {
    color: "#cc0200",
    paddingLeft: 12,
    fontSize: 40,
    fontWeight: "bold",
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
