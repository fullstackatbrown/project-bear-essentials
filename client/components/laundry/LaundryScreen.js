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
import {
    addNotification,
    deleteNotification,
    addStarred,
    deleteStarred,
} from "../../redux/ActionCreators";
import { fetchLaundryAll } from "../../data/queries/laundryQueries";

const mapStateToProps = state => {
    return {
        starred: state.laundry.starred,
        notifications: state.notifications.notifications,
    };
};

const mapDispatchToProps = dispatch => ({
    addNotification: notification => dispatch(addNotification(notification)),
    deleteNotification: notification =>
        dispatch(deleteNotification(notification)),
    addStarred: flag => dispatch(addStarred(flag)),
    deleteStarred: flag => dispatch(deleteStarred(flag)),
});

class LaundryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: null,
            loading: true, // initial loading of cards data
            emptySearchBar: true,
            suggestions: [],
        };

        this.fetchCards = this.fetchCards.bind(this);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.onNotifChanged = this.onNotifChanged.bind(this);
        this.onStarChanged = this.onStarChanged.bind(this);
    };

    componentDidMount() {
        this.fetchCards();
    };

    fetchCards = async () => {
        if (!this.state.loading) {
            this.setState({ loading: true });
        }
        const fetchedCards = await fetchLaundryAll();
        this.setState({ cards: fetchedCards, loading: false });
    };

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
        const roomMachine = `${room}///${machine}`;
        if (this.props.notifications.includes(roomMachine)) {
            this.props.deleteNotification(roomMachine);
        } else {
            this.props.addNotification(roomMachine);
        }
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
                        notifList={this.props.notifications
                            .map(str => str.split("///"))     // split into [room, machine]
                            .filter(([r, _]) => (r === room)) // check room
                            .map(rm => Number(rm[1]))}        // extract machine
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
                        name="close"
                        size={24}
                        color="#A9A9A9"
                    />
                </TouchableOpacity>
            );
        }
    }

    render() {
        if (this.state.loading) {
            return <Text>Loading... please wait.</Text>;
        }
        return (
            <View style={styles.screen}>
                <View style={styles.searchBar}>
                    <Ionicons
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

        // shadows for android
        elevation: 5,
    }
});

// connect to redux
export default connect(mapStateToProps, mapDispatchToProps)(LaundryScreen);
