import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Head from "next/head";

import { fetchOverall, selectElo } from "../actions/ggActions";

import Loading from "../components/common/Loading";
import OverviewTable from "../components/overviewPage/OverviewTable";

class overview extends Component {
  static propTypes = {
    isFetchingOverall: PropTypes.bool.isRequired,
    overallError: PropTypes.string.isRequired,
    fetchOverall: PropTypes.func.isRequired
  };

  static async getInitialProps({ reduxStore, req, query }) {
    const isServer = !!req;

    let { elo } = query;

    reduxStore.dispatch(selectElo(elo));
    if (isServer) {
      await reduxStore.dispatch(fetchOverall());
    } else {
      reduxStore.dispatch(fetchOverall());
    }

    return {};
  }

  render() {
    const { isFetchingOverall, overallError, fetchOverall } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>
            League of legends overview of champions performance in ranked -
            lolbaron.com
          </title>
          <meta
            key="desc"
            name="description"
            content="League of legends overview of champions performance in ranked including: win rate, overall performance, performance change from previous patch."
          />
          <meta
            property="og:title"
            content="League of legends overview of champions performance in ranked - lolbaron.com"
          />
          <meta
            property="og:description"
            content="League of legends overview of champions performance in ranked including: win rate, overall performance, performance change from previous patch."
          />
          <meta
            property="og:image"
            content="http://ec2-18-196-101-204.eu-central-1.compute.amazonaws.com/static/favicon/android-chrome-256x256.png"
          />
        </Head>
        {isFetchingOverall ? (
          <div className="is-flex flex-justify-center flex-align-center page-loader-height">
            <Loading className="loader-lg loader-color-light" />
          </div>
        ) : overallError ? (
          <React.Fragment>
            <div className="notification is-danger">
              <strong>{overallError}</strong>
            </div>
            <button className="button is-primary" onClick={fetchOverall}>
              Try Again
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="columns is-marginless is-mobile is-multiline is-centered mg-1 is-size-6-7 is-size-6-desktop">
              <OverviewTable
                dataProp="winrate"
                headers={["Highest", "Lowest"]}
                title="WIN RATES"
                sortBy="winRate"
                order="descend"
              />
              <OverviewTable
                dataProp="performanceScore"
                headers={["Best", "Worst"]}
                title="OVERALL PERFORMANCE RANKING"
                sortBy="positions.overallPerformanceScore"
                order="ascend"
              />
              <OverviewTable
                dataProp="performanceDelta"
                headers={["Most Improved", "Least Improved"]}
                title="CHAMPION RANKING CHANGE"
                sortBy="positions.overallPerformanceScoreDelta"
                order="descend"
              />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { overallError, isFetchingOverall } = state.eloDetailsByElo[
    state.selectedElo
  ]
    ? state.eloDetailsByElo[state.selectedElo]
    : {
        overallError: "",
        isFetchingOverall: true
      };
  return {
    overallError,
    isFetchingOverall
  };
};

const mapDispatchToProps = {
  fetchOverall
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(overview);
