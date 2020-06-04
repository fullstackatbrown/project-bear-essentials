import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { initialRegion, mapStyle } from "./MapConfig";
import { BUILDINGS } from "../../data/mapdata/parsedBuildings";

// TODO: Change marker color, make it so that user can select which marker categories to render.
// TODO: figure out marker categories.
const ParseMarkers = () => {
  return (
    <>
      {BUILDINGS.map(e => (
        <Marker
          coordinate={{ latitude: e.latitude, longitude: e.longitude }}
          key={e.id}
          title={e.name}
          pinColor="blue"
        ></Marker>
      ))}
    </>
  );
};

export default function MapScreen() {
  return (
    <>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={initialRegion}
        >
          <ParseMarkers />
        </MapView>
        <Button
          buttonStyle={styles.button}
          icon={() => (
            <Icon reverse name="map-marker" type="font-awesome" color="red" />
          )}
        />
        <Button
          buttonStyle={styles.button}
          icon={() => (
            <Icon
              reverse
              name="location-arrow"
              type="font-awesome"
              color="red"
            />
          )}
        />
      </View>
    </>
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
});

MapScreen.navigationOptions = {
  header: null,
};
