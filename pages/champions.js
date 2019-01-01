import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Head from "next/head";

import { fetchChampsList, selectElo } from "../actions/ggActions";
import { getModifiedChampsList } from "../selectors/ggSelectors";

import Loading from "../components/common/Loading";
import ChampionListItem from "../components/championsPage/ChampionListItem";

class champions extends Component {
  static propTypes = {
    isFetchingChampsList: PropTypes.bool.isRequired,
    champsListError: PropTypes.string.isRequired,
    champsList: PropTypes.array.isRequired,
    fetchChampsList: PropTypes.func.isRequired
  };

  static async getInitialProps({ reduxStore, req, query }) {
    let { elo } = query;

    reduxStore.dispatch(selectElo(elo));

    return {};
  }

  render() {
    const {
      isFetchingChampsList,
      champsListError,
      champsList,
      fetchChampsList
    } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>
            League of legends champions list with currently played roles for
            each champion - lolbaron.com
          </title>
          <meta
            key="desc"
            name="description"
            content="League of legends champions list with currently played roles for each champion, choose any champion or role to see full statistics for that champion on that role."
          />
          <meta
            property="og:title"
            content="League of legends champions list with currently played roles for each champion - lolbaron.com"
          />
          <meta
            property="og:description"
            content="League of legends champions list with currently played roles for each champion, choose any champion or role to see full statistics for that champion on that role."
          />
          <meta
            property="og:image"
            content="/static/favicon/og-wide-image.png"
          />
        </Head>
        {isFetchingChampsList ? (
          <div className="is-flex flex-justify-center flex-align-center page-loader-height">
            <Loading className="loader-lg loader-color-light" />
          </div>
        ) : champsListError ? (
          <React.Fragment>
            <div className="notification is-danger">
              <strong>{champsListError}</strong>
            </div>
            <button className="button is-primary" onClick={fetchChampsList}>
              Try Again
            </button>
          </React.Fragment>
        ) : (
          <div className="columns mgy-0 is-mobile is-multiline is-centered mgx-1">
            {champsList.map(champ => {
              return <ChampionListItem key={champ.id} champ={champ} />;
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { champsListError, isFetchingChampsList } = state.eloDetailsByElo[
    state.selectedElo
  ] || {
    champsListError: "",
    isFetchingChampsList: true
  };
  const champsList = getModifiedChampsList(state);
  return {
    isFetchingChampsList,
    champsListError,
    champsList
  };
};

const mapDispatchToProps = {
  fetchChampsList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(champions);
