import { AsyncStorage } from "react-native";
import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import appState from "./appState";

const Store = createStore(
  persistReducer(
    { key: "root", storage: AsyncStorage },
    combineReducers({
      appState
    })
  )
);

const persister = persistStore(Store);

export default Store;
export { persister };
