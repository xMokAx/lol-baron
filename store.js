import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { combineReducers } from "redux";
import axios from "axios";

import {
  selectedRegion,
  selectedSummoner,
  summonersByRegion
} from "./reducers/lolReducers";
import { selectedElo, eloDetailsByElo } from "./reducers/ggReducers";

// combine reducers into one root reducer
const rootReducer = combineReducers({
  // 4 reducers that return state coz they will never change
  // so combine reducers don't remove dataDragon from store
  version: (state = "") => state,
  champs: (state = {}) => state,
  runes: (state = {}) => state,
  summonerSpells: (state = {}) => state,
  items: (state = {}) => state,
  selectedRegion,
  selectedSummoner,
  summonersByRegion,
  selectedElo,
  eloDetailsByElo
});

// a function that returns the store
export function initializeStore(initialState, req) {
  // we are on server if the req argument exits
  const isServer = !!req;

  // creating a different axios instance for client and server
  let headers = {};
  if (isServer) {
    const token = req.headers["x-access-token"];
    if (token) {
      headers["X-Access-Token"] = token;
    }
    if (req.get("cookie")) {
      headers.cookie = req.get("cookie");
    }
  }

  const axiosGg = isServer
    ? axios.create({
        method: "get",
        baseURL: "http://localhost:5000/ggapi",
        headers: headers
      })
    : axios.create({
        method: "get",
        baseURL: "/ggapi"
      });

  // creating a different axios instance for client and server
  const axiosLol = isServer
    ? axios.create({
        method: "get",
        baseURL: "http://localhost:5000/lolapi",
        headers: headers
      })
    : axios.create({
        method: "get",
        baseURL: "/lolapi"
      });
  const middleware = [thunk.withExtraArgument({ axiosGg, axiosLol })];
  // if (process.env.NODE_ENV !== "production") {
  //   middleware.push(createLogger());
  // }

  // return the store
  return createStore(
    rootReducer,
    initialState,
    // using composeWithDevTools to add redux dev tools
    // using thunk.withExtraArgument to add axios configurations as an object as it accepts single argument
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
