import { combineReducers } from "redux";
import config from "./slices/configParamsSlice";
import map from "./reducers/map";
import portalItem from "./reducers/portalItem";

export const rootReducer = combineReducers({
  config,
  map,
  portalItem,
});

export type RootState = ReturnType<typeof rootReducer>;
