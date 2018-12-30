import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "next/link";
import Head from "next/head";

import {
  selectRegion,
  selectSummoner,
  fetchSummoner
} from "../actions/lolActions";

import SummonerInfo from "../components/summonerPage/SummonerInfo";
import Loading from "../components/common/Loading";
import MatchesList from "../components/summonerPage/MatchesList";

class summoner extends Component {
  static proptypes = {
    summonerError: PropTypes.string.isRequired,
    isFetchingSummoner: PropTypes.bool.isRequired,
    selectedSummoner: PropTypes.string.isRequired,
    selectedRegion: PropTypes.string.isRequired
  };

  static async getInitialProps({ reduxStore, req, query }) {
    const isServer = !!req;

    let { region, summonerName } = query;

    reduxStore.dispatch(selectRegion(region));
    reduxStore.dispatch(selectSummoner(summonerName, region));
    if (isServer) {
      await reduxStore.dispatch(fetchSummoner(region, summonerName));
    } else {
      reduxStore.dispatch(fetchSummoner(region, summonerName));
    }

    return {};
  }

  handleSummonerRetry = () => {
    const { selectedRegion, selectedSummoner, dispatch } = this.props;
    dispatch(fetchSummoner(selectedRegion, selectedSummoner));
  };

  render() {
    const {
      summonerError,
      isFetchingSummoner,
      selectedSummoner,
      selectedRegion,
      summonerInfo
    } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>
            {summonerInfo.name} - {selectedRegion} - LOL match history and stats
            - lolbaron.com
          </title>
          <meta
            key="desc"
            name="description"
            content={`league of legends, ${selectSummoner} match history, match details and match stats in ${selectRegion} region.`}
          />
          <meta
            property="og:title"
            content={`League of legends, ${selectedRegion}, ${selectedSummoner} match history and stats - lolbaron.com`}
          />
          <meta
            property="og:description"
            content={`league of legends, ${selectSummoner} match history, match details and match stats in ${selectRegion} region.`}
          />
          <meta
            property="og:image"
            content="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Olaf_0.jpg"
          />
        </Head>
        {isFetchingSummoner ? (
          <div className="is-flex flex-justify-center flex-align-center page-loader-height">
            <Loading className="loader-lg loader-color-light" />
          </div>
        ) : summonerError ? (
          summonerError ===
          "Can't Fetch Summoner Data, Please Check Your Connection" ? (
            <React.Fragment>
              <div className="notification is-danger">
                <strong>{summonerError}</strong>
              </div>
              <button
                className="button is-primary mgx-2"
                onClick={this.handleSummonerRetry}
              >
                Try Again
              </button>

              <Link href="/">
                <a className="button is-primary mgx-2">Home Page</a>
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="notification is-danger">
                <strong>{summonerError}</strong>
              </div>
              <div className="notification is-warning">
                <strong>
                  This Summoner Does Exist In This Region. Please, Enter a Valid
                  Summoner Name And Try Again.
                </strong>
              </div>
              <Link href="/">
                <a className="button is-primary">Home Page</a>
              </Link>
            </React.Fragment>
          )
        ) : (
          <div className="columns is-marginless is-multiline is-centered flex-justify-center">
            <SummonerInfo />
            <MatchesList />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { selectedRegion, selectedSummoner } = state;
  const { summonerError, isFetchingSummoner, summonerInfo } =
    state.summonersByRegion[selectedRegion] &&
    state.summonersByRegion[selectedRegion][selectedSummoner]
      ? state.summonersByRegion[selectedRegion][selectedSummoner]
      : {
          isFetchingSummoner: true,
          summonerError: "",
          summonerInfo: {}
        };

  return {
    selectedRegion,
    selectedSummoner,
    summonerError,
    isFetchingSummoner,
    summonerInfo
  };
};

export default connect(mapStateToProps)(summoner);
