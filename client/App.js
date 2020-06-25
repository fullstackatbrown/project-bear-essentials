import * as React from "react";
import { Platform, StatusBar, View } from "react-native";
import { SplashScreen } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./components/navigation/BottomTabNavigator";
import useLinking from "./components/navigation/useLinking";

const Stack = createStackNavigator();

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { ConfigureStore } from "./redux/configureStore";
const { persistor, store } = ConfigureStore();

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef);

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
                                cardShadowEnabled: false,
                                headerStyle: {
                                    height: 110,
                                    backgroundColor: "#f9f9f9",
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },
                                headerTitleStyle: {
                                    color: "#cc0200",
                                    padding: 10,
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
