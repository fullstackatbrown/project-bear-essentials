import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { dining } from "./dining";
import { laundry } from "./laundry";
import { notifications } from "./notifications";
import { maps } from "./maps";
import { settings } from "./settings";

export const ConfigureStore = () => {
    const config = {
        key: "root",
        storage: AsyncStorage,
        debug: true,
    };

    const store = createStore(
        persistCombineReducers(config, {
            dining,
            laundry,
            notifications,
            maps,
            settings,
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);
    return { persistor, store };
};
