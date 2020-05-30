import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { dining } from "./dining";
import storage from "redux-persist/es/storage";

export const ConfigureStore = () => {
  const config = {
    key: "root",
    storage,
    debug: true,
  };

  const store = createStore(
    combineReducers({
      dining,
    }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store);
  return { persistor, store };
};
