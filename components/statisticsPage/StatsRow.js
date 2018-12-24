import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "next/link";
import classNames from "classnames";

import { ggRoles } from "../../constants/ggConstants";

import ChampImage from "../common/ChampImage";

const StatsRow = ({ champ, rank, selectedElo, sortProp }) => {
  let {
    winRate,
    banRate,
    playRate,
    averageGames,
    kills,
    deaths,
    assists,
    largestKillingSpree,
    damageComposition,
    totalDamageTaken,
    minionsKilled,
    neutralMinionsKilledEnemyJungle,
    neutralMinionsKilledTeamJungle,
    totalHeal,
    goldEarned,
    positions,
    gameName,
    role,
    championId
  } = champ;
  role = ggRoles[champ.role];
  const winRateColor =
    winRate > 0.5 ? "has-text-info" : winRate < 0.5 ? "has-text-danger" : "";
  const {
    overallPerformanceScore,
    previousOverallPerformanceScore
  } = positions;
  const performanceScoreDelta = previousOverallPerformanceScore
    ? previousOverallPerformanceScore - overallPerformanceScore
    : "New Meta";
  let performanceColor = "",
    performanceSign = "";
  if (performanceScoreDelta > 0) {
    performanceColor = "has-text-info";
    performanceSign = "+";
  } else if (performanceScoreDelta < 0) {
    performanceColor = "has-text-danger";
    performanceSign = "-";
  } else if (performanceScoreDelta === "New Meta") {
    performanceColor = "has-text-warning";
    performanceSign = "";
  }
  const champName = gameName.replace(/([^a-z]+)/gi, "").toLowerCase();
  const isSelected = prop => sortProp === prop && "has-text-warning";
  return (
    <tr>
      <td>{rank}</td>
      <td>
        <Link
          href={`/champion?elo=${selectedElo}&champName=${champName}&role=${role}`}
          as={`/champion/${selectedElo}/${champName}/${role}`}
        >
          <a className="has-text-primary is-flex flex-align-center">
            <ChampImage
              className="image is-32x32 mgr-1"
              tooltip={true}
              champId={championId}
            />
            {gameName}
          </a>
        </Link>
      </td>
      <td className="has-text-warning is-capitalized">{role}</td>
      <td className={winRateColor}>{(winRate * 100).toFixed(2)}%</td>
      <td className={classNames(isSelected("playRate"))}>
        {(playRate * 100).toFixed(2)}%
      </td>
      <td className={classNames(isSelected("banRate"))}>
        {(banRate * 100).toFixed(2)}%
      </td>
      <td className={classNames(isSelected("averageGames"))}>
        {parseFloat(averageGames).toFixed(2)}
      </td>
      <td className={classNames(isSelected("kills"))}>
        {parseFloat(kills).toFixed(2)}
      </td>
      <td className={classNames(isSelected("deaths"))}>
        {parseFloat(deaths).toFixed(2)}
      </td>
      <td className={classNames(isSelected("assists"))}>
        {parseFloat(assists).toFixed(2)}
      </td>
      <td className={classNames(isSelected("largestKillingSpree"))}>
        {largestKillingSpree}
      </td>
      <td className={classNames(isSelected("damageComposition.total"))}>
        {Math.round(damageComposition.total)}
      </td>
      <td className={classNames(isSelected("totalDamageTaken"))}>
        {Math.round(totalDamageTaken)}
      </td>
      <td className={classNames(isSelected("totalHeal"))}>
        {Math.round(totalHeal)}
      </td>
      <td className={classNames(isSelected("minionsKilled"))}>
        {parseFloat(minionsKilled).toFixed(2)}
      </td>
      <td className={classNames(isSelected("neutralMinionsKilledEnemyJungle"))}>
        {parseFloat(neutralMinionsKilledEnemyJungle).toFixed(2)}
      </td>
      <td className={classNames(isSelected("neutralMinionsKilledTeamJungle"))}>
        {parseFloat(neutralMinionsKilledTeamJungle).toFixed(2)}
      </td>
      <td className={classNames(isSelected("goldEarned"))}>
        {Math.round(goldEarned)}
      </td>
      <td
        className={classNames(isSelected("positions.overallPerformanceScore"))}
      >
        {overallPerformanceScore}
      </td>
      <td className={performanceColor}>
        {performanceSign}
        {previousOverallPerformanceScore
          ? Math.abs(performanceScoreDelta)
          : performanceScoreDelta}
      </td>
    </tr>
  );
};

StatsRow.propTypes = {
  champ: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  sortProp: PropTypes.string.isRequired,
  selectedElo: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const { selectedElo } = state;
  const { sortProp } = state.eloDetailsByElo[selectedElo];
  return {
    selectedElo,
    sortProp
  };
};

export default connect(mapStateToProps)(StatsRow);
