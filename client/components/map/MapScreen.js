import React, { useState } from "react";
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    CheckBox,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { connect } from "react-redux";
import Header from "../reusable/Header";
import { INITIAL_REGION, FLAGS, FLAGS_COLORS } from "./MapConfig";
import { BUILDINGS } from "../../data/mapdata/parsedBuildings";
import { addFlag, deleteFlag } from "../../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        flags: state.maps.flags,
    };
};

const mapDispatchToProps = dispatch => ({
    addFlag: flag => dispatch(addFlag(flag)),
    deleteFlag: flag => dispatch(deleteFlag(flag)),
});

const MapScreen = props => {
    const [modalVisible, setModalVisible] = useState(false);

    const RenderFlags = () => {
        return (
            <>
                {FLAGS.map((e, i) => (
                    <View style={styles.row} key={i}>
                        <CheckBox
                            value={props.flags.includes(e)}
                            onChange={() => {
                                console.log(props.flags);
                                if (props.flags.includes(e)) {
                                    props.deleteFlag(e);
                                } else {
                                    props.addFlag(e);
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
                {BUILDINGS.filter(e => props.flags.includes(e.use)).map(e => (
                    <Marker
                        coordinate={{
                            latitude: e.latitude,
                            longitude: e.longitude,
                        }}
                        key={e.id}
                        title={e.name}
                        pinColor={FLAGS_COLORS[e.use]}
                    ></Marker>
                ))}
            </>
        );
    };

    const FlagsModal = () => {
        return (
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)}
                >
                    <View style={styles.modal}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalTop}>
                                    <Text style={styles.modalTitle}>Flags</Text>
                                </View>
                                <View
                                    style={{ height: "85%" }}
                                    onStartShouldSetResponder={() => true}
                                >
                                    <ScrollView>
                                        <RenderFlags />
                                    </ScrollView>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <View style={styles.screen}>
            <Header>Map</Header>
            <View style={styles.app}>
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
                        <Icon
                            reverse
                            name="map-marker"
                            type="font-awesome"
                            color="transparent"
                        />
                    )}
                    onPress={() => setModalVisible(true)}
                />
                <FlagsModal />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    app: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-start",
    },
    container: {
        flex: 1,
    },
    button: {
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "red",
        width: 50,
        height: 50,
        shadowColor: "black",
        shadowRadius: 2,
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 10,
    },
    modal: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 20,
    },
    modalTitle: {
        fontSize: 30,
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 20,
        marginBottom: 50,
        textAlign: "center",
        width: "90%",
        height: "50%",
        padding: 10,
        shadowColor: "black",
        shadowRadius: 2,
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 5,
    },
    modalTop: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
});

MapScreen.navigationOptions = {
    header: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
