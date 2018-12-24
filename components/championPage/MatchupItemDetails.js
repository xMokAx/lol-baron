import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip
} from "recharts";

import { fetchMatchup } from "../../actions/ggActions";

import Loading from "../common/Loading";
import MatchupTable from "./MatchupTable";

class MatchupItemDetails extends Component {
  static propTypes = {
    champName: PropTypes.string.isRequired,
    enemyName: PropTypes.string.isRequired,
    champ: PropTypes.object.isRequired,
    enemy: PropTypes.object.isRequired,
    champData: PropTypes.object.isRequired,
    enemyData: PropTypes.object.isRequired,
    fetchMatchup: PropTypes.func.isRequired,
    matchupData: PropTypes.object.isRequired,
    isFetchingMatchup: PropTypes.bool.isRequired,
    matchupError: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {
      fetchMatchup,
      champName,
      enemyName,
      champ,
      enemy,
      champData
    } = this.props;
    fetchMatchup(champName, enemyName, champ.id, enemy.id, champData.role);
  }

  handleMatchupRetry = () => {
    const {
      fetchMatchup,
      champName,
      enemyName,
      champ,
      enemy,
      champData
    } = this.props;
    fetchMatchup(champName, enemyName, champ.id, enemy.id, champData.role);
  };

  render() {
    const {
      champData,
      enemyData,
      enemy,
      champ,
      matchupData,
      isFetchingMatchup,
      matchupError
    } = this.props;
    const data = [
      {
        position: "Gold Earned (K)",
        A: Number((champData.goldEarned / 1000).toFixed(2)),
        B: Number((enemyData.goldEarned / 1000).toFixed(2))
      },
      {
        position: "Kills",
        A: Number(champData.kills.toFixed(2)),
        B: Number(enemyData.kills.toFixed(2))
      },
      {
        position: "Assists",
        A: Number(champData.assists.toFixed(2)),
        B: Number(enemyData.assists.toFixed(2))
      },
      {
        position: "Deaths",
        A: Number(champData.deaths.toFixed(2)),
        B: Number(enemyData.deaths.toFixed(2))
      },
      {
        position: "Dmg Dealt (K)",
        A: Number((champData.totalDamageDealtToChampions / 1000).toFixed(2)),
        B: Number((enemyData.totalDamageDealtToChampions / 1000).toFixed(2))
      }
    ];
    let champColor, enemyColor;
    if (champData.winrate < enemyData.winrate) {
      enemyColor = "#209cee";
      champColor = "#ff3860";
    } else {
      enemyColor = "#ff3860";
      champColor = "#209cee";
    }
    return (
      <React.Fragment>
        <tr>
          <td colSpan="3" className="has-background-black-bis">
            <h3 className="has-text-warning is-size-5 is-size-6-mobile mgy-2">
              Matchup Performance
            </h3>
            <ResponsiveContainer className="mgb-2 matchup-chart">
              <RadarChart
                data={data}
                fill="whitesmoke"
                className="is-size-7-mobile is-size-6-7 is-capitalized"
              >
                <PolarGrid stroke="#4a4a4a" />
                <PolarAngleAxis dataKey="position" />
                <PolarRadiusAxis
                  tickCount={6}
                  axisLine={false}
                  tick={false}
                  domain={[0, "auto"]}
                />
                <Radar
                  dot={true}
                  name={enemy.gameName}
                  dataKey="B"
                  stroke={enemyColor}
                  fill={enemyColor}
                  fillOpacity={0.6}
                />
                <Radar
                  dot={true}
                  name={champ.gameName}
                  dataKey="A"
                  stroke={champColor}
                  fill={champColor}
                  fillOpacity={0.4}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </td>
        </tr>
        <tr className="has-background-black-bis">
          {isFetchingMatchup ? (
            <td
              height="200"
              colSpan="3"
              style={{ borderBottom: "1px solid white" }}
            >
              <Loading className="loader-lg mgx-auto mgy-auto loader-color-white" />
            </td>
          ) : matchupError ? (
            <td
              height="100"
              colSpan="3"
              style={{ borderBottom: "1px solid white" }}
            >
              <div className="fullheight notification is-warning is-flex flex-justify-center flex-vertical flex-align-center">
                <p className="mgb-1">
                  <strong>{matchupError}</strong>
                </p>
                <button
                  className="button is-dark"
                  onClick={this.handleMatchupRetry}
                >
                  Try Again
                </button>
              </div>
            </td>
          ) : (
            <td
              colSpan="3"
              style={{ padding: "8px", borderBottom: "1px solid white" }}
            >
              <MatchupTable
                matchupData={matchupData}
                champ={champ}
                enemy={enemy}
              />
            </td>
          )}
        </tr>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { matchupData, isFetchingMatchup, matchupError } = state
    .eloDetailsByElo[state.selectedElo].champions[ownProps.champName].matchups[
    ownProps.enemyName
  ] || {
    isFetchingMatchup: true,
    matchupError: "",
    matchupData: {}
  };
  return {
    matchupData,
    isFetchingMatchup,
    matchupError
  };
};

const mapDispatchToProps = { fetchMatchup };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchupItemDetails);
