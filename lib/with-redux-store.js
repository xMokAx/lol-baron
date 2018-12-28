import React from "react";
import axios from "axios";

import { initializeStore } from "../store";
import { fetchGeneral, fetchChampsList } from "../actions/ggActions";

import { initialEloState } from "../reducers/ggReducers";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState, req) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState, req);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      let selectedRegion = "euwest",
        selectedElo = "platplus",
        dataDragon = {};
      if (isServer) {
        const { req, query } = appContext.ctx;
        const { elo, region } = query;
        const { prefRegion, prefElo } = req.session;
        selectedElo = elo ? elo : prefElo ? prefElo : selectedElo;
        selectedRegion = region
          ? region
          : prefRegion
          ? prefRegion
          : selectedRegion;
        // get datadragon using token at first time and then the cookie
        let headers = {};
        const token = req.headers["x-access-token"];
        if (token) {
          headers["X-Access-Token"] = token;
        }
        if (req.get("cookie")) {
          headers.cookie = req.get("cookie");
        }
        await axios
          .get("http://localhost:5000/datadragon", { headers })
          .then(res => {
            dataDragon = res.data;
          })
          .catch(err => {
            console.log(err.message);
          });
      }
      // get the default state depending on query which will be used on server
      // dataDragon (champs, items, summonerSpells, runes)
      const initialState = {
        ...dataDragon,
        selectedRegion,
        selectedSummoner: "",
        summonersByRegion: {},
        selectedElo,
        eloDetailsByElo: {
          [selectedElo]: initialEloState
        }
      };
      // pass the initialState depending
      // pass the request as the second argument to use it on initializeStore
      // to detect if we are on the server and to access cookies on axios server config
      const reduxStore = getOrCreateStore(initialState, appContext.ctx.req);

      // Provide the store to getInitialProps of app
      appContext.ctx.reduxStore = reduxStore;

      if (isServer) {
        const { dispatch } = reduxStore;
        await dispatch(fetchChampsList());
        await dispatch(fetchGeneral());
      }

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps.call(App, appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
