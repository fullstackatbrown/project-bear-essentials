import React, { Component, Fragment } from "react";
import DiningCard from "./DiningCard";
import DiningMenu from "./DiningMenu";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import { addStarred, deleteStarred } from "../../redux/ActionCreators";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DINING_DATA } from "../../data/dummydata/dining/endpoint";
import Header from "../reusable/Header";
import { diningHallInfo } from "./DiningUtils";


// TODO: delete unused imports (other files too)

const mapStateToProps = (state) => {
  return {
    starred: state.laundry.starred,
    notifications: state.notifications.notifications,
  };
};

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
      loading: true,
      cards: DINING_DATA,
      emptySearchBar: true,
      suggestions: [],
    };
    this.cards = diningHallInfo,

    this.starChanged = this.starChanged.bind(this);
  }

  // fetch cards when mounted
  componentDidMount() {
    this.fetchCards();
  }

  /**
   * WE MAY NOT NEED ANY LOADING BC WE DO NOT MAKE AN API CALL HERE.
   * ALSO MAY NOT NEED FETCHDININGALL IN DINQUERIES OR FETCHCAFES
   */
  // fetches dining cards
  fetchCards = async () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    const fetchedCardsKeys = Object.keys(this.cards);
    this.props.starred.forEach((star) => {
      if (!fetchedCardsKeys.includes(star)) {
        this.props.deleteStarred(star);
      }
    });
    this.setState({loading: false});
  };

  // updates star's state when clicked
  starChanged = (card) => {
    if (!this.props.starred.includes(card)) {
      this.props.addStarred(card);
    } else {
      this.props.deleteStarred(card);
    }
  };

  onTextChanged = (text) => {
    let emptySearchBar = true;
    let newSuggestions = [];
    if (text.length > 0) {
      emptySearchBar = false;
      newSuggestions = Object.keys(this.cards)
    }

    this.setState({
      emptySearchBar,
      suggestions: newSuggestions,
      suggestionsLimit: 10,
    });
  }

  // replaces query with text user searches
  updateSearch = (search) => {
    this.setState({ search });
  };

  // creates individual dining cards
  // TODO: key prop is missing
  mapToDiningCards(toMap) {
    return (
      <Fragment>
        {toMap.map((diningHall) => (
          <DiningCard
            style={styles.inputContainer}
            key={diningHall}
            title={this.cards[diningHall].title}
            queryText={this.cards[diningHall].queryText}
            starPressed={() => this.starChanged(diningHall)}
            isStarred={this.props.starred.includes(diningHall)}
          />
        ))}
      </Fragment>
    );
  }

  //TODO: set up suggestion rendering
  renderSuggestions = () => {
    const { emptySearchBar, suggestions } = this.state;
    let starred = this.props.starred.sort();

    if (emptySearchBar) {
      if (suggestions.length === 0) {
        return (
          <Fragment>
            {starred.length !== 0 && <View style={styles.horizontalLine} />}
            {this.mapToDiningCards(Object.keys(this.cards))}
          </Fragment>
        );
      }
    }
  }

    // creates navigator for dining menu
    createMenuStack = () => {
      return (
        <NavigationContainer>
          <DiningStack.Navigator initialRouteName="Dining Screen">
            <DiningStack.Screen name="Dining Screen" component={DiningScreen} />
            <DiningStack.Screen name="Menu" component={DiningMenu} />
          </DiningStack.Navigator>
        </NavigationContainer>
      );
    };

  render() {
    const { search } = this.state;
    // this.createMenuStack();
    return (
      //TODO: set up navigation from card to menu
      <View style={styles.screen}>
        <Header onChangeText={this.onTextChanged}>Dining</Header>
        <ScrollView style={styles.scroll}>
          {this.renderSuggestions()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  scroll: {
    width: "100%",
  },
  textInput: {
    borderWidth: 0,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    fontSize: 18,
    color: "#9C9C9C",
  },
  inputContainer: {
    width: 332,
    maxWidth: "100%",
    height: 175,
    alignItems: "center",
  },
  horizontalLine: {
    marginTop: 14,
    marginBottom: 14,
    alignSelf: "center",
    width: "86%",
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DiningScreen);
