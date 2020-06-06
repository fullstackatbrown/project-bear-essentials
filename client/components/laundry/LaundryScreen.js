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

const mapDispatchToProps = dispatch => ({
  addStarred: flag => dispatch(addStarred(flag)),
  deleteStarred: flag => dispatch(deleteStarred(flag)),
});

class LaundryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: LAUNDRY_DATA,
      emptySearchBar: true,
      suggestions: [],
      notifications: new Set(),
    };

    this.onTextChanged = this.onTextChanged.bind(this);
    this.onNotifChanged = this.onNotifChanged.bind(this);
    this.onStarChanged = this.onStarChanged.bind(this);
  }

  // Called when a card is starred or unstarred
  onStarChanged = card => {
    if (this.props.starred.includes(card)) {
      this.props.deleteStarred(card);
    } else {
      this.props.addStarred(card);
    }
  };

  // Called when a machine's notification is set or unset
  onNotifChanged = room => machine => {
    const notifications = this.state.notifications;
    const roomMachine = `${room}///${machine}`;

    if (notifications.has(roomMachine)) {
      notifications.delete(roomMachine);
    } else {
      notifications.add(roomMachine);
    }

    this.setState(() => ({})); // re-renders LaundryScreen
  };

  // Called on search bar text change
  onTextChanged = text => {
    let emptySearchBar = true;
    let newSuggestions = [];
    if (text.length > 0) {
      emptySearchBar = false;
      newSuggestions = Object.keys(this.state.cards)
        .filter(v => v.toLowerCase().indexOf(text.toLowerCase()) != -1)
        .sort();
    }
    this.setState(() => ({ emptySearchBar, suggestions: newSuggestions }));
  };

  // Returns scrolling card view, given list of rooms (keys) to be rendered
  mapToCards(toMap) {
    return (
      <ScrollView>
        {toMap.map(room => (
          <LaundryCard
            key={room}
            card={this.state.cards[room]}
            isStarred={this.props.starred.includes(room)}
            notifList={Array.from(this.state.notifications)
              .map(str => str.split("///"))     // split into [room, machine]
              .filter(([r, _]) => (r === room)) // check room
              .map(rm => Number(rm[1]))}                // extract machine
            starAction={() => this.onStarChanged(room)}
            notifAction={this.onNotifChanged(room)}
          />
        ))}
      </ScrollView>
    );
  }

  // Returns search bar results, starred laundry rooms, or no results message
  renderSuggestions() {
    const { emptySearchBar, suggestions } = this.state;
    let starred = this.props.starred.sort();

    if (suggestions.length === 0) {
      if (emptySearchBar) {
        if (starred.length === 0) {
          return (
            <Text style={styles.textCentered}>
              No starred laundry rooms yet.
            </Text>
          );
        }
        return this.mapToCards(starred);
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

// connect to redux
export default connect(mapStateToProps, mapDispatchToProps)(LaundryScreen);
