import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Head from "next/head";

import { ggRoles } from "../constants/ggConstants";
import { getKeyByValue } from "../utils/utils";

import {
  fetchChampsData,
  selectElo,
  toggleOrder,
  sortBy as sortAction,
  setRolesFilter,
  setTextFilter,
  SHOW_ALL
} from "../actions/ggActions";
import { getSortedChampsDataFilteredByRoleAndText } from "../selectors/ggSelectors";
import { tableHeadings } from "../constants/ggConstants";

import Loading from "../components/common/Loading";
import TableHeading from "../components/statisticsPage/TableHeading";
import RoleFilter from "../components/statisticsPage/RoleFilter";
import ChampFilter from "../components/statisticsPage/ChampFilter";
import StatsRow from "../components/statisticsPage/StatsRow";

class stats extends Component {
  static propTypes = {
    champsData: PropTypes.array.isRequired,
    isFetchingChampsData: PropTypes.bool.isRequired,
    champsDataError: PropTypes.string.isRequired,
    sortProp: PropTypes.string.isRequired,
    reverseOrder: PropTypes.bool.isRequired,
    toggleOrder: PropTypes.func.isRequired,
    fetchChampsData: PropTypes.func.isRequired
  };

  static async getInitialProps({ reduxStore, req, query }) {
    const isServer = !!req;

    const { dispatch } = reduxStore;
    let { elo, sortBy, order, roleFilter, search } = query;

    dispatch(selectElo(elo));
    const orderBool = order === "descend" ? true : false;
    dispatch(sortAction(sortBy, orderBool));
    roleFilter = getKeyByValue(ggRoles, roleFilter) || SHOW_ALL;
    dispatch(setRolesFilter(roleFilter));
    if (search) {
      dispatch(setTextFilter(search));
    }

    if (isServer) {
      await dispatch(fetchChampsData());
    } else {
      dispatch(fetchChampsData());
    }

    return {};
  }

  render() {
    const {
      toggleOrder,
      fetchChampsData,
      champsData,
      champsDataError,
      isFetchingChampsData,
      sortProp,
      reverseOrder
    } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>
            League of legends champions stats by champion role for the current
            patch - lolbaron.com
          </title>
          <meta
            key="desc"
            name="description"
            content="League of legends champions statistics including win rate, ban rate, play rate, KDA, gold earned, damage dealt, damage taken, killing spree and performance compared to other champions in the same role. You can filter champions by name or role and sort them depending on any of the stats like win rate."
          />
          <meta
            property="og:title"
            content="League of legends champions stats by champion role for the current patch - lolbaron.com"
          />
          <meta
            property="og:description"
            content="League of legends champions statistics including win rate, ban rate, play rate, KDA, gold earned, damage dealt, damage taken, killing spree and performance compared to other champions in the same role. You can filter champions by name or role and sort them depending on any of the stats like win rate."
          />
          <meta
            property="og:image"
            content="http://ec2-18-196-101-204.eu-central-1.compute.amazonaws.com/static/favicon/og-image.jpg"
          />
        </Head>
        {isFetchingChampsData ? (
          <div className="is-flex flex-justify-center flex-align-center page-loader-height">
            <Loading className="loader-lg loader-color-light" />
          </div>
        ) : champsDataError ? (
          <React.Fragment>
            <div className="notification is-danger">
              <strong>{champsDataError}</strong>
            </div>
            <button className="button is-primary" onClick={fetchChampsData}>
              Try Again
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="is-flex flex-justify-center flex-wrap">
              <div className="fullwidth is-size-5">
                <h1 className="title is-4 has-text-warning">
                  Current Patch Statistics
                </h1>
              </div>
              <div className="is-flex flex-align-center pd-s">
                <span className="mgr-s is-size-7-mobile">Role:</span>
                <RoleFilter />
              </div>
              <div className="pd-s" style={{ width: "50%" }}>
                <ChampFilter />
              </div>
            </div>

            <table className="table is-striped is-bordered is-borderless-y is-size-6-7 has-text-weight-semibold is-size-7-mobile">
              <thead>
                <tr>
                  <th className="is-paddingless sticky-heading">
                    <button
                      className="button pd-s is-radiusless fullwidth is-size-6-7 has-text-weight-bold table-button"
                      onClick={toggleOrder}
                    >
                      Rank
                    </button>
                  </th>
                  {Object.keys(tableHeadings).map(heading => (
                    <TableHeading
                      key={heading}
                      sortByProp={tableHeadings[heading]}
                    >
                      {heading}
                    </TableHeading>
                  ))}
                </tr>
              </thead>
              <tbody>
                {champsData.length ? (
                  champsData.map((champ, i) => {
                    let rank =
                      sortProp === "gameName" ||
                      sortProp === "role" ||
                      sortProp === "positions.overallPerformanceScore" ||
                      sortProp === "deaths"
                        ? reverseOrder
                          ? champsData.length - i
                          : i + 1
                        : reverseOrder
                        ? i + 1
                        : champsData.length - i;
                    return (
                      <StatsRow
                        champ={champ}
                        rank={rank}
                        key={champ.gameName + champ.role}
                      />
                    );
                  })
                ) : (
                  <tr className="notification is-danger">
                    <td colSpan="20" height="100" className="has-text-left">
                      <strong>No Match Found</strong>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { selectedElo } = state;
  const {
    champsDataError,
    isFetchingChampsData,
    sortProp,
    reverseOrder
  } = state.eloDetailsByElo[selectedElo]
    ? state.eloDetailsByElo[selectedElo]
    : {
        champsDataError: "",
        isFetchingChampsData: true,
        sortProp: "winRate",
        reverseOrder: true
      };
  const champsData = getSortedChampsDataFilteredByRoleAndText(state);
  return {
    selectedElo,
    champsData,
    champsDataError,
    isFetchingChampsData,
    sortProp,
    reverseOrder
  };
};

const mapDispatchToProps = {
  toggleOrder,
  fetchChampsData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(stats);
