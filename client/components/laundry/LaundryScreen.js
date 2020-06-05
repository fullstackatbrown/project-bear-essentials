import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import LaundryCard from "./LaundryCard";
import { LAUNDRY_DATA } from "../../data/dummydata/laundry/endpoint";
import { addStarred, deleteStarred } from "../../redux/ActionCreators";

const mapStateToProps = state => {
  return {
    starred: state.laundry.starred,
  };
};

class LaundryScreen extends Component {
  constructor(props) {
    super(props);

    this.cards = LAUNDRY_DATA;

    this.state = {
      emptySearchBar: true,
      suggestions: [],
      starred: new Set(["125-127 WATERMAN STREET 003", "MILLER HALL"]),
      notifications: new Set(),
    };

    this.onTextChanged = this.onTextChanged.bind(this);
    this.onStarChanged = this.onStarChanged.bind(this);
  }

  // Called when a card is starred or unstarred
  onStarChanged = card => {
    const starred = this.state.starred;
    if (starred.has(card)) {
      starred.delete(card);
    } else {
      starred.add(card);
    }
    this.setState(() => ({})); // re-renders LaundryScreen
  };

  // Called on search bar text change
  onTextChanged = text => {
    let emptySearchBar = true;
    let newSuggestions = [];
    if (text.length > 0) {
      emptySearchBar = false;
      newSuggestions = Object.keys(this.cards)
        .sort()
        .filter(v => v.toLowerCase().indexOf(text.toLowerCase()) != -1);
    }
    this.setState(() => ({ emptySearchBar, suggestions: newSuggestions }));
  };

  // Returns scrolling card view, given list of cards (keys) to be rendered
  mapToCards(toMap) {
    return (
      <ScrollView>
        {toMap.map(card => (
          <LaundryCard
            key={card}
            card={this.cards[card]}
            starred={this.state.starred.has(card)}
            starAction={() => this.onStarChanged(card)}
          />
        ))}
      </ScrollView>
    );
  }

  // Returns search bar results, starred laundry rooms, or no results message
  renderSuggestions() {
    const { emptySearchBar, suggestions } = this.state;
    const starredArr = Array.from(this.state.starred).sort();
    if (suggestions.length === 0) {
      if (emptySearchBar) {
        if (starredArr.length === 0) {
          return (
            <Text style={styles.textCentered}>
              No starred laundry rooms yet.
            </Text>
          );
        }
        return this.mapToCards(starredArr);
      }
      return <Text style={styles.textCentered}>No search results found.</Text>;
    }

    return this.mapToCards(suggestions);
  }

  // Returns search bar's clear button when there is text in the search box
  crossHandler() {
    const { emptySearchBar } = this.state;
    if (!emptySearchBar) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.textInput.clear();
            this.onTextChanged("");
          }}
        >
          <AntDesign
            style={styles.crossIcon}
            name="close"
            size={24}
            color="#A9A9A9"
          />
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.searchBar}>
          <Ionicons
            style={styles.searchIcon}
            name="ios-search"
            size={24}
            color="gray"
          />
          <TextInput
            style={styles.textInput}
            ref={input => {
              this.textInput = input;
            }}
            placeholder="Search laundry"
            onChangeText={text => this.onTextChanged(text)}
          />
          {this.crossHandler()}
        </View>

        {this.renderSuggestions()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  textInput: {
    borderWidth: 0,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    fontSize: 18,
    color: "#9C9C9C",
  },
  textCentered: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 18,
    color: "#9C9C9C",
  },
  searchBar: {
    borderWidth: 0,
    borderRadius: 25,
    borderColor: "#BCBCBC",
    padding: 10,
    paddingLeft: 12,
    margin: 12,
    width: "88%",
    flexDirection: "row",
    alignSelf: "center",

    // shadows for ios
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 0.25,
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 1,
    },

    // shadows for android
    elevation: 5,
  },
  searchIcon: {
    marginTop: 2,
  },
  crossIcon: {
    marginTop: 2,
    marginRight: 3,
  },
});

export default connect(mapStateToProps)(LaundryScreen);
