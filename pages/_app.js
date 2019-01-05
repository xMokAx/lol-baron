import React from "react";
import App, { Container } from "next/app";
import ErrorPage from "next/error";
import Head from "next/head";
import { withRouter } from "next/router";
import { Provider } from "react-redux";
import Router from "next/router";
import withGA from "next-ga";

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
    const { Component, pageProps, reduxStore, router } = this.props;
    const { asPath } = router;
    const pathName = asPath.includes("?")
      ? asPath.substring(0, asPath.indexOf("?"))
      : asPath;
    return (
      <Container>
        {pageProps.statusCode ? (
          <Head>
            <meta
              name="description"
              content="lolbaron.com provides League of Legends champion statistics, analytics, guides, builds, items, spells, runes, skill orders, counters, matchups - summoner match history and stats"
            />
            <meta property="og:url" content="https://lolbaron.com/" />
          </Head>
        ) : (
          <Head>
            <meta
              property="og:url"
              content={`https://lolbaron.com${pathName}`}
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

export default withGA("UA-131564404-1", Router)(
  withRouter(withReduxStore(MyApp))
);
