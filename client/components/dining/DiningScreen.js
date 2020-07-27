import React, { Component, Fragment } from "react";
import DiningCard from "./DiningCard";
import DiningMenu from "./DiningMenu";
import {
  View,
  ScrollView,
  StyleSheet,
  Text
} from "react-native";
import { addStarred, deleteStarred } from "../../redux/ActionCreators";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DINING_DATA } from "../../data/dummydata/dining/endpoint";
import Header from "../reusable/Header";
import { diningHallInfo } from "./DiningUtils";
import LottieView from "lottie-react-native";

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
const DiningStack = createStackNavigator();

class DiningScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cards: DINING_DATA,
      emptySearchBar: true,
      suggestions: [],
    };
    this.cards = diningHallInfo,

    this.fetchCards = this.fetchCards.bind(this);
    this.starChanged = this.starChanged.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);

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
    this.setState({ loading: false });
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
      .filter((v) => v.toLowerCase().indexOf(text.toLowerCase()) != -1)
      .sort();
    }
    this.setState({
      emptySearchBar,
      suggestions: newSuggestions,
    });
  }

  // creates individual dining cards
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

  renderSuggestions = () => {
    const { emptySearchBar, suggestions } = this.state;
    let starred = this.props.starred.sort();

    if (emptySearchBar) {
      if (starred.length === 0) {
        return (
          <Fragment>
            <Text style={styles.textCentered}>
              No starred dining halls. Starred halls will appear at the
              top.
            </Text>
            <View style={styles.horizontalLine} />
            {this.mapToDiningCards(Object.keys(this.cards))}
          </Fragment>
        );
      }
    } else {
      if(suggestions.length === 0) {
        return (
          <Fragment>
            <Text style={styles.textCentered}>No results found.</Text>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            {this.mapToDiningCards(suggestions)}
          </Fragment>
        )
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
    const { search, loading} = this.state;
    // this.createMenuStack();
    if (loading) {
      return (
        <View style={styles.loading}>
          <LottieView
            source={require("./animations/dotted-loader.json")}
            autoPlay
            loop
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </View>
      );
    } else {
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
  textCentered: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 4,
    marginBottom: 4,
    textAlign: "center",
    fontSize: 20,
    color: "#9C9C9C",
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
