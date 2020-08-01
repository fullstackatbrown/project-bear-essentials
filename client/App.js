import * as React from "react";
import { Platform, StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import { SplashScreen, Linking } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useLinking } from "@react-navigation/native";


import BottomTabNavigator from "./components/navigation/BottomTabNavigator";
import { PersistGate } from "redux-persist/es/integration/react";
import { ConfigureStore } from "./redux/configureStore";

const Stack = createStackNavigator();
export const { persistor, store } = ConfigureStore();

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef, {
        prefixes: [Linking.makeUrl("/")],
        config: {
            Root: {
                path: "root",
                screens: {
                    Home: "home",
                    Links: "links",
                    Settings: "settings",
                },
            },
        },
    });

    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHide();
                setInitialNavigationState(await getInitialState());
            } catch (e) {
                console.warn(e);
            } finally {
                SplashScreen.hide();
                setLoadingComplete(true);
            }
        }
        loadResourcesAndDataAsync();
    }, []);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <View style={{ flex: 1 }}>
                        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                        <NavigationContainer
                            ref={containerRef}
                            initialState={initialNavigationState}
                        >
                            <Stack.Navigator screenOptions={{
                                headerShown: false,
                                cardShadowEnabled: false,
                                headerStyle: {
                                    height: 110,
                                    backgroundColor: "#f9f9f9",
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },
                                headerTitleStyle: {
                                    color: "#cc0200",
                                    paddingLeft: 12,
                                    fontSize: 40,
                                    fontWeight: "bold"
                                },
                            }}>
                                <Stack.Screen name="Root" component={BottomTabNavigator} />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </View>
                </PersistGate>
            </Provider>
        );
    }
}
