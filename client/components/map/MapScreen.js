import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  CheckBox,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { INITIAL_REGION, FLAGS, FLAGS_COLORS, MAP_STYLE } from "./MapConfig";
import { BUILDINGS } from "../../data/mapdata/parsedBuildings";

export default function MapScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [flags, setFlags] = useState([]);

  const RenderFlags = () => {
    console.log(flags);
    return (
      <>
        {FLAGS.map(e => (
          <View style={styles.row}>
            <CheckBox
              value={flags.includes(e)}
              onChange={() => {
                if (flags.includes(e)) {
                  setFlags(flags.filter(f => f !== e));
                } else {
                  setFlags(flags.concat(e));
                }
              }}
            />
            <Text>{e}</Text>
          </View>
        ))}
      </>
    );
  };

  const RenderMarkers = () => {
    return (
      <>
        {BUILDINGS.filter(e => flags.includes(e.use)).map(e => (
          <Marker
            coordinate={{ latitude: e.latitude, longitude: e.longitude }}
            key={e.id}
            title={e.name}
            pinColor={FLAGS_COLORS[e.use]}
          ></Marker>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ ...StyleSheet.absoluteFillObject }}
        initialRegion={INITIAL_REGION}
      >
        <RenderMarkers />
      </MapView>
      <Button
        buttonStyle={styles.button}
        icon={() => (
          <Icon reverse name="map-marker" type="font-awesome" color="red" />
        )}
        onPress={() => setModalVisible(true)}
      />
      <Button
        buttonStyle={styles.button}
        icon={() => (
          <Icon reverse name="location-arrow" type="font-awesome" color="red" />
        )}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableHighlight onPress={() => setModalVisible(false)}>
          <Text style={styles.modalTitle}>X</Text>
        </TouchableHighlight>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Flags</Text>
          <RenderFlags />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  map: {
    flex: 1,
  },
  button: {
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "red",
    width: 50,
    height: 50,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  modalTitle: {
    fontSize: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

MapScreen.navigationOptions = {
  header: null,
};
