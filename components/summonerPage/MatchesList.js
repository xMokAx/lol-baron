import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getSortedSummonerMatchesDetails } from "../../selectors/lolSelectors";
import { fetchMatches, fetchMoreMatches } from "../../actions/lolActions";

import Loading from "../common/Loading";
import Match from "./Match";

class MatchesList extends Component {
  static propTypes = {
    selectedRegion: PropTypes.string.isRequired,
    selectedSummoner: PropTypes.string.isRequired,
    summonerMatchesDetails: PropTypes.array.isRequired,
    isFetchingMatches: PropTypes.bool.isRequired,
    summonerMatchesError: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchMatches: PropTypes.func.isRequired,
    fetchMoreMatches: PropTypes.func.isRequired
  };

  handleMatchesRetry = () => {
    const { fetchMatches, selectedSummoner, selectedRegion } = this.props;
    fetchMatches(selectedRegion, selectedSummoner);
  };

  handleShowMore = () => {
    const { fetchMoreMatches, selectedRegion, selectedSummoner } = this.props;
    fetchMoreMatches(selectedRegion, selectedSummoner);
  };

  render() {
    const {
      summonerMatchesDetails,
      isFetchingMatches,
      summonerMatchesError,
      isFetching
    } = this.props;
    const { handleMatchesRetry, handleShowMore } = this;

    return (
      <React.Fragment>
        <div className="column is-12 has-text-centered pdx-0">
          <table className="table is-narrow is-very-narrow-mobile has-background-dark is-fullwidth table-maxwidth has-text-white has-text-weight-semibold is-size-7-mobile is-size-6-7 is-size-6-tablet text-vsm mgx-auto">
            <tbody>
              {summonerMatchesDetails.map((match, index) => (
                <Match key={match.gameId} index={index} match={match} />
              ))}
              {isFetchingMatches ? (
                <tr>
                  <td height="100" colSpan="7" className="has-background-grey">
                    <Loading className="loader-lg mgx-auto mgy-1 loader-color-black" />
                  </td>
                </tr>
              ) : null}
              {summonerMatchesError ? (
                <tr>
                  <td height="100" colSpan="7" className="is-paddingless">
                    <div className="fullheight notification is-warning is-flex flex-justify-center flex-vertical flex-align-center">
                      <p className="mgb-1 is-size-7-mobile is-size-6-7 is-size-6-tablet">
                        <strong>{summonerMatchesError}</strong>
                      </p>
                      {summonerMatchesError ===
                        "Can't Fetch Summoner Matches, Please Check Your Connection" && (
                        <button
                          className="button is-dark"
                          onClick={handleMatchesRetry}
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="7">
                    <button
                      className="button is-primary is-medium has-text-weight-semibold fullwidth"
                      onClick={handleShowMore}
                      disabled={isFetching}
                    >
                      <span className="icon">
                        <i className="material-icons md-36" aria-hidden="true">
                          expand_more
                        </i>
                      </span>
                      <span>Show More</span>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { selectedRegion, selectedSummoner } = state;
  const {
    isFetchingMatches,
    summonerMatchesError,
    isFetching
  } = state.summonersByRegion[selectedRegion][selectedSummoner];
  const summonerMatchesDetails = getSortedSummonerMatchesDetails(state);
  return {
    selectedRegion,
    selectedSummoner,
    isFetchingMatches,
    summonerMatchesError,
    summonerMatchesDetails,
    isFetching
  };
};

const mapDispatchToProps = {
  fetchMatches,
  fetchMoreMatches
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchesList);
