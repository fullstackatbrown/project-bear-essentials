import * as React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LaundryCard from "./LaundryCard";
import { Ionicons } from '@expo/vector-icons';

export default class LaundryScreen extends React.Component {
  constructor(props) {
    super(props);

    this.cards = {
      // FAKE DATA
      "ANDREWS EAST 154": {
        title: "Andrews East",
        room: "154", // sometimes has a letter, so keep as string
      },
      "ANDREWS WEST 160": {
        title: "Andrews West",
        room: "160",
      },
      "METCALF HALL": {
        title: "Metcalf",
        room: "",
      },
      "MILLER HALL": {
        title: "Miller",
        room: null,
      },
    };

    this.state = {
      emptySearchBar: true,
      suggestions: [], // keys for cards
      starred: new Set(["ANDREWS EAST 154", "MILLER HALL"]), // keys for cards, pull user info
      notifications: new Set(), // keys for cards, pull user info
    };

    this.onTextChanged = this.onTextChanged.bind(this);
    this.onStarChanged = this.onStarChanged.bind(this);
  }

  onStarChanged = (card) => {
    const starred = this.state.starred;
    if (starred.has(card)) {
      starred.delete(card);
    } else {
      starred.add(card);
    }
    this.setState(() => ({})) // re-renders LaundryScreen
  };

  onTextChanged = (text) => {
    let emptySearchBar = true;
    let newSuggestions = [];
    if (text.length > 0) {
      emptySearchBar = false;
      newSuggestions = Object.keys(this.cards)
        .sort()
        .filter((v) => (v.toLowerCase().indexOf(text.toLowerCase()) != -1 ));
    }
    this.setState(() => ({ emptySearchBar, suggestions: newSuggestions }));
  };

  mapToCards (toMap) {
    return (
      <ScrollView>
        {toMap.map((card) =>
          <LaundryCard
            key={card}
            card={this.cards[card]}
            starred={this.state.starred.has(card)}
            starAction={() => this.onStarChanged(card)} />)}
      </ScrollView>
      )
  }

  renderSuggestions () {
    const { emptySearchBar, suggestions } = this.state;
    const starredArr = Array.from(this.state.starred).sort()
    if (suggestions.length === 0) {
      if (emptySearchBar) {
        if (starredArr.length === 0) {
          return <Text>No starred laundry rooms yet.</Text>;
        }
        return this.mapToCards(starredArr);
      }
      return <Text>No search results found.</Text>;
    }
    
    return this.mapToCards(suggestions);
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.searchBar}>
          <Ionicons name="ios-search" size={24} color="gray" />
          <TextInput
          style={styles.textInput}
          placeholder="Search laundry"
          onChangeText={(text) => this.onTextChanged(text)}
        />
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
    flex: 1
  },
  searchBar: {
    borderWidth: 0,
    borderRadius: 20,
    borderColor: "gray",
    padding: 8,
    paddingLeft: 12,
    margin: 10,
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',

    // shadows for ios
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.25,
    backgroundColor: 'white',
    shadowOffset: {
        width: 0,
        height: 1
    },

    // shadows for android
    elevation: 5
  }
});
