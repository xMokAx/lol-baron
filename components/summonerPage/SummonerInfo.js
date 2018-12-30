import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";

import { updateSummoner, fetchSummonerRank } from "../../actions/lolActions";
import { getProfileIconImage } from "../../utils/lolApiImages";
import { queueType } from "../../constants/lolConstants";

import Image from "../common/Image";
import Loading from "../common/Loading";

class SummonerInfo extends Component {
  static propTypes = {
    version: PropTypes.string.isRequired,
    summonerInfo: PropTypes.object.isRequired,
    summonerRank: PropTypes.array.isRequired,
    selectedRegion: PropTypes.string.isRequired,
    selectedSummoner: PropTypes.string.isRequired,
    summonerRankError: PropTypes.string.isRequired,
    isFetchingRank: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    updateSummoner: PropTypes.func.isRequired,
    fetchSummonerRank: PropTypes.func.isRequired
  };

  handleSummonerUpdate = () => {
    const { updateSummoner, selectedRegion, selectedSummoner } = this.props;
    updateSummoner(selectedRegion, selectedSummoner);
  };

  handleRankRetry = () => {
    const {
      fetchSummonerRank,
      selectedRegion,
      selectedSummoner,
      summonerInfo
    } = this.props;
    fetchSummonerRank(selectedRegion, selectedSummoner, summonerInfo.id);
  };

  render() {
    const {
      version,
      summonerInfo,
      summonerRank,
      summonerRankError,
      selectedRegion,
      isFetching,
      isFetchingRank
    } = this.props;
    const { handleRankRetry, handleSummonerUpdate } = this;

    return (
      <div className="column is-12-tablet is-10-desktop has-text-weight-semibold">
        <div className="box columns is-marginless is-paddingless is-multiline is-mobile is-centered">
          <div className="column is-narrow">
            <div className="media">
              <div className="media-left has-text-centered">
                {summonerInfo.profileIconId && (
                  <Image
                    tooltip={true}
                    src={getProfileIconImage(
                      summonerInfo.profileIconId,
                      version
                    )}
                    alt="Profile icon"
                    className="image is-64x64 mgx-auto badge is-badge-bottom-left is-badge-light"
                    imgStyle="border-radius-4 selected-role"
                    badgeData={summonerInfo.summonerLevel}
                  />
                )}
              </div>
              <div
                className="media-content has-text-primary"
                style={{
                  alignItems: "flex-start",
                  justifyContent: "space-between"
                }}
              >
                <h1 className="is-size-4 has-text-weight-bold">
                  {summonerInfo.name}
                </h1>
                <h2 className="is-size-5 is-capitalized has-text-weight-semibold">
                  {selectedRegion}
                </h2>
              </div>
            </div>
          </div>
          <div className="column is-12">
            <div className="is-flex flex-align-center flex-justify-center flex-wrap">
              <button
                disabled={isFetching}
                className="button is-medium is-primary mg-1"
                onClick={handleSummonerUpdate}
              >
                <span className="icon">
                  <i className="material-icons" aria-hidden="true">
                    update
                  </i>
                </span>
                <span>Update</span>
              </button>
              <em className="tag is-light">
                <span className="mgr-vs">Last updated:</span>
                {summonerInfo.lastUpdated && (
                  <TimeAgo date={summonerInfo.lastUpdated} />
                )}
              </em>
            </div>
          </div>

          {isFetchingRank && (
            <div className="column is-12">
              <Loading className="loader-lg mgx-auto loader-color-light" />
            </div>
          )}

          {summonerRankError ? (
            <div className="column is-12 notification is-warning">
              <p className="mgb-1 is-size-7-mobile is-size-6-7 is-size-6-tablet">
                <strong>{summonerRankError}</strong>
              </p>
              {summonerRankError ===
                "Can't Fetch Summoner Rank Data, Please Check Your Connection" && (
                <button className="button is-dark" onClick={handleRankRetry}>
                  Try Again
                </button>
              )}
            </div>
          ) : summonerRank.length ? (
            summonerRank.map(rank => {
              let rankType = queueType[rank.queueType];
              const rankName =
                rank.tier === "MASTER" ||
                rank.tier === "CHALLENGER" ||
                rank.tier === "GRANDMASTER"
                  ? rank.tier
                  : `${rank.tier} ${rank.rank}`;
              return (
                <div className="column is-narrow" key={rank.queueType}>
                  <div className="is-flex flex-wrap flex-justify-center">
                    <Image
                      tooltip={true}
                      src={`/static/images/emblems/${rank.tier.toLowerCase()}_Emblem.png`}
                      alt={`${rankName} (${rank.leaguePoints} pts)`}
                      className="image is-64x64"
                      imgStyle="border-radius-4"
                    />
                    <div className="is-flex flex-vertical">
                      <div className="pd-1">
                        <strong>{rankType} </strong>
                        <strong className="tag is-primary">{rankName}</strong>
                      </div>
                      <div>
                        <span className="tag is-info">Wins: {rank.wins}</span>{" "}
                        <span className="tag is-danger">
                          Losses: {rank.losses}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedRegion, selectedSummoner, version } = state;
  const {
    summonerInfo,
    summonerRank,
    summonerRankError,
    isFetching,
    isFetchingRank
  } = state.summonersByRegion[selectedRegion][selectedSummoner];

  return {
    version,
    selectedRegion,
    selectedSummoner,
    summonerInfo,
    summonerRank,
    summonerRankError,
    isFetching,
    isFetchingRank
  };
};

const mapDispatchToProps = {
  updateSummoner,
  fetchSummonerRank
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummonerInfo);
