import App, { Container } from "next/app";
import ErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";

import withReduxStore from "../lib/with-redux-store";
import "../sass/styles.scss";
import { fetchGeneral, fetchChampsList } from "../actions/ggActions";

import Layout from "../components/layout/Layout";

class MyApp extends App {
  static async getInitialProps({ Component, reduxStore, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx, reduxStore);
    }

    return { pageProps };
  }
  componentDidMount() {
    const { reduxStore } = this.props;
    const { dispatch, getState, subscribe } = reduxStore;

    let selectedElo = getState().selectedElo;
    function handleRouteChange() {
      let prevSelectedElo = selectedElo;
      selectedElo = getState().selectedElo;
      if (prevSelectedElo !== selectedElo) {
        dispatch(fetchChampsList());
        dispatch(fetchGeneral());
      }
    }
    this.unsubscribe = subscribe(handleRouteChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        {pageProps.statusCode && (
          <Head>
            <meta
              name="description"
              content="Lolmania.com provides League of Legends champion statistics, guides, builds, items, spells, runes, skill orders, counters, matchups - summoner match history and stats"
            />
          </Head>
        )}
        <Provider store={reduxStore}>
          <Layout>
            {pageProps.statusCode ? (
              <ErrorPage statusCode={pageProps.statusCode} />
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);