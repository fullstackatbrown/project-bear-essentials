import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class LaundryScreen extends React.Component {
	
	constructor (props) {
		super(props);

		this.cards = { // FAKE DATA
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
			expanded: new Set(), // keys for cards
			starred: new Set(), // keys for cards, pull user info
			notifications: new Set(), // keys for cards, pull user info
		};
	}

	onTextChanged = (text) => {
		let emptySearchBar = true;
		let newSuggestions = [];
		if (text.length > 0) {
			emptySearchBar = false;
			const regex = new RegExp(`${text}`, 'i');
			newSuggestions = Object.keys(this.cards).sort().filter(v => regex.test(v));
		}
		this.setState(() => ({ suggestions: newSuggestions, emptySearchBar }));
	}

	renderCard (card) { // TODO: Create collapsable
		const attrs = this.cards[card];
		return (
			<View>
				<Text>{attrs.title}</Text>
				<Text>{attrs.room && "Room " + attrs.room}</Text>
			</View>
		);
	}

	renderSuggestions () {
		const { emptySearchBar, suggestions } = this.state
		if (suggestions.length === 0) {
			if (emptySearchBar) {
				return <Text>TODO: Display starred rooms</Text> // "You do not have any starred laundry rooms" OR display all starred rooms
			}
			return <Text>No search results found</Text>;
		}
		return (
			<ScrollView>
				{ suggestions.map((card) => this.renderCard(card) )}
			</ScrollView>
		);
	}

	render () {
		return (
			<View style={styles.screen}>
				<TextInput
					style={styles.textInput}
					placeholder='Search laundry'
					onChangeText={(text) => this.onTextChanged(text)} />
					{this.renderSuggestions()}
			</View>
		);
	}
}



const styles = StyleSheet.create({
	screen: {
	    flex: 1,
	    alignItems: 'center',
	    backgroundColor: '#fafafa',
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#777',
		padding: 8,
		margin: 10,
		width: 200,
	}
})