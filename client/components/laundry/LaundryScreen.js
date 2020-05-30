import * as React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LaundryCard from "./LaundryCard";

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
        <TextInput
          style={styles.textInput}
          placeholder="Search laundry"
          onChangeText={(text) => this.onTextChanged(text)}
        />
        {this.renderSuggestions()}
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
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
});
