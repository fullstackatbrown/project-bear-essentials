import React, { Component } from "react";
import DiningCard from "./DiningCard";
import { 
  Text,
  View, 
  StyleSheet, 
  CheckBox,
} from "react-native";
import { Ionicons, AntDesign} from '@expo/vector-icons';
import { addStarred, deleteStarred } from "../../redux/ActionCreators";
import { SearchBar, } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';

class DiningScreen extends Component {
  constructor(props) {
    super(props);

   this.state = {
      search: '',
    }
  };

  // replaces query with text user searches
  updateSearch = search => {
    this.setState({ search });
  };

  render() { 
    const { search } = this.state;

    return (
      <View style={styles.screen}>
        <ScrollView> 
          <SearchBar
          round lightTheme
          placeholder="Type Here..." 
          onChangeText = {this.updateSearch} 
          value = {search}
          />
          <DiningCard style={styles.inputContainer}>
            <Text style ={styles.title}> Dining Hall                   <AntDesign name="staro" size={24} color="black"/>
            </Text>

          </DiningCard>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title:{
    fontSize: 25,
    marginVertical: 10,
  },
  inputContainer:{
    width: 332,
    maxWidth: '100%',
    height: 175,
    alignItems: 'center',
  },
});

export default DiningScreen;