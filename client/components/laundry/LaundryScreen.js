import React, { Component, Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import LottieView from "lottie-react-native";

import {
    addNotification,
    deleteNotification,
    addStarred,
    deleteStarred,
} from "../../redux/ActionCreators";
import LaundryCard from "./LaundryCard";
import LaundryHeader from "./LaundryHeader";
import { fetchLaundryAll } from "./queries";

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

const SUGGESTIONS_LIMIT = 10;

// Component representing the laundry screen
class LaundryScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: null, // to be fetched
            loading: true,
            emptySearchBar: true,
            suggestions: [],
        };

        this.fetchCards = this.fetchCards.bind(this);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.onNotifChanged = this.onNotifChanged.bind(this);
        this.onStarChanged = this.onStarChanged.bind(this);
    }

    // fetch cards when mounted
    componentDidMount() {
        this.fetchCards();
    }

    // fetches cards and then cleans this.props.starred during loading state
    fetchCards = async () => {
        if (!this.state.loading) {
            this.setState({ loading: true });
        }
        const fetchedCards = await fetchLaundryAll();
        const fetchedCardsKeys = Object.keys(fetchedCards);
        this.props.starred.forEach(s => {
            if (!fetchedCardsKeys.includes(s)) {
                this.props.deleteStarred(s);
            }
        });

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
            <Fragment>
                {toMap.slice(0, SUGGESTIONS_LIMIT).map(room => (
                    <LaundryCard
                        key={room}
                        card={this.state.cards[room]}
                        isStarred={this.props.starred.includes(room)}
                        notifList={this.props.notifications
                            .map(str => str.split("///")) // split into [room, machine]
                            .filter(([r, _]) => r === room) // check room
                            .map(rm => rm[1])} // extract machine id
                        starAction={() => this.onStarChanged(room)}
                        notifAction={this.onNotifChanged(room)}
                    />
                ))}
                {toMap.length > SUGGESTIONS_LIMIT && (
                    <View>
                        <Text style={styles.smallTextCentered}>
                            Showing top {SUGGESTIONS_LIMIT} rooms. If you do
                            not see your laundry room above, try narrowing your
                            search.
                        </Text>
                    </View>
                )}
            </Fragment>
        );
    }

    // Returns search bar results, starred laundry rooms, or no results message
    renderSuggestions() {
        const { emptySearchBar, suggestions } = this.state;
        let starred = this.props.starred.sort();

        if (emptySearchBar) {
            if (starred.length === 0) {
                // no search, display "no starred rooms" message
                return (
                    <Fragment>
                        <Text style={styles.textCentered}>
                            No starred laundry rooms to show. Starred rooms
                            will appear at the top.
                        </Text>
                        <View style={styles.horizontalLine} />
                        {this.mapToCards(Object.keys(this.state.cards))}
                    </Fragment>
                );
            } else {
                // no search, display 1+ starred rooms at top
                return (
                    <Fragment>
                        {this.mapToCards(starred)}
                        <View style={styles.horizontalLine} />
                        {this.mapToCards(
                            Object.keys(this.state.cards).filter(
                                card => !starred.includes(card)
                            )
                        )}
                    </Fragment>
                );
            }
        } else {
            if (suggestions.length === 0) {
                // "no results found" message
                return (
                    <Fragment>
                        <Text style={styles.textCentered}>No results found.</Text>
                        {starred.length !== 0 && (
                            <View style={styles.horizontalLine} />
                        )}
                        {this.mapToCards(starred)}
                    </Fragment>
                );
            } else {
                // display results with starred results at top
                return (
                    <Fragment>
                        {this.mapToCards(
                            suggestions.filter(card => starred.includes(card))
                        )}
                        {starred.length !== 0 && <View style={styles.horizontalLine} />}
                        {this.mapToCards(
                            suggestions.filter(card => !starred.includes(card))
                        )}
                    </Fragment>
                );
            }
        }
    }

    // Render
    render() {
        if (this.state.loading) {
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
        }
        return (
            <View style={styles.screen}>
                <LaundryHeader onChangeText={this.onTextChanged} />
                <ScrollView>{this.renderSuggestions()}</ScrollView>
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
        marginLeft: 18,
        marginRight: 18,
        marginTop: 4,
        marginBottom: 4,
        textAlign: "center",
        fontSize: 20,
        color: "#9C9C9C",
    },
    smallTextCentered: {
        margin: 18,
        textAlign: "center",
        fontSize: 16,
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
    },
    loading: {
        flex: 1,
        justifyContent: "center",
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

// connect to redux
export default connect(mapStateToProps, mapDispatchToProps)(LaundryScreen);
