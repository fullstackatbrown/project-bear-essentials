import React, { Component, Fragment } from "react";
import DiningCard from "./DiningCard";
import {
    View,
    ScrollView,
    StyleSheet,
    Text
} from "react-native";
import { addDiningStarred, deleteDiningStarred } from "../../redux/ActionCreators";
import { connect } from "react-redux";
import { DINING_DATA } from "../../data/dummydata/dining/endpoint";
import Header from "../reusable/Header";
import { diningHallInfo } from "./DiningUtils";
import LottieView from "lottie-react-native";

const mapStateToProps = (state) => {
    return {
        starred: state.dining.starred,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addDiningStarred: (flag) => dispatch(addDiningStarred(flag)),
        deleteDiningStarred: (flag) => dispatch(deleteDiningStarred(flag)),
    };
};

class DiningScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            cards: DINING_DATA,
            emptySearchBar: true,
            suggestions: [],
        };
        this.navigation = this.props.navigation;
        this.cards = diningHallInfo,
        this.fetchCards = this.fetchCards.bind(this);
        this.starChanged = this.starChanged.bind(this);
        this.onTextChanged = this.onTextChanged.bind(this);
    }

    // fetch cards when mounted
    componentDidMount() {
        this.fetchCards();
    }

	// fetches dining cards
	fetchCards = () => {
	    if (!this.state.loading) {
	        this.setState({ loading: true });
	    }
	    const fetchedCardsKeys = Object.keys(this.cards);
	    this.props.starred.forEach((star) => {
	        if (!fetchedCardsKeys.includes(star)) {
	            this.props.deleteDiningStarred(star);
	        }
	    });
	    this.setState({ loading: false });
	};

	// updates star's state when clicked
	starChanged = (card) => {
	    if (this.props.starred.includes(card)) {
	        this.props.deleteDiningStarred(card);
	    } else {
	        this.props.addDiningStarred(card);
	    }
	};

	// changes search text when typed into search bar
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
	mapToDiningCards = (toMap) => {
	    this.cards = diningHallInfo;
	    return (
	        <Fragment>
	            {toMap.map((diningHall) => (
	                <DiningCard
	                    style={styles.inputContainer}
	                    key={diningHall}
	                    card={this.cards[diningHall]}
	                    starPressed={() => this.starChanged(diningHall)}
	                    isStarred={this.props.starred.includes(diningHall)}
	                    navigation={this.navigation}
	                />
	            ))}
	        </Fragment>
	    );
	}

	// renders suggestions based on search bar
	renderSuggestions = () => {
	    const { emptySearchBar, suggestions } = this.state;
	    let starred = this.props.starred.sort();

	    if (emptySearchBar) {
	        if (starred.length === 0) {
	            return (
	                <Fragment>
	                    <Text style={styles.textCentered}>
							No starred dining halls.
	                    </Text>
	                    <Text style={styles.textCentered2}>
							Starred halls will appear at the top.
	                    </Text>
	                    <View style={styles.horizontalLine} />
	                    {this.mapToDiningCards(Object.keys(this.cards))}
	                </Fragment>
	            );
	        } else {
	            return (
	                <Fragment>
	                    {this.mapToDiningCards(starred)}
	                    <View style={styles.horizontalLine} />
	                    {this.mapToDiningCards(Object.keys(this.cards).filter((card) => !starred.includes(card)))}
	                </Fragment>
	            );
	        }
	    } else {
	        if (suggestions.length === 0) {
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
	            );
	        }
	    }
	}

	render() {
	    const { loading } = this.state;
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
    loading: {
        flex: 1,
        justifyContent: "center",
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
        marginBottom: 0,
        textAlign: "center",
        fontSize: 20,
        color: "#9C9C9C",
    },
    textCentered2: {
        marginLeft: 18,
        marginRight: 18,
        marginTop: 0,
        marginBottom: 10,
        textAlign: "center",
        fontSize: 20,
        color: "#9C9C9C",
    },
    horizontalLine: {
        marginBottom: 18,
        alignSelf: "center",
        width: "86%",
        borderBottomColor: "#D3D3D3",
        borderBottomWidth: 1,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DiningScreen);