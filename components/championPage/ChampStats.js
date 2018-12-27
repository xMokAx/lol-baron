import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import Tippy from "@tippy.js/react";

import { getSelectedRoleData } from "../../selectors/ggSelectors";
import { ggRoles } from "../../constants/ggConstants";

import ChampStatsRow from "./ChampStatsRow";
import TitleMain from "./TitleMain";

const ChampStats = ({ champName, roleData }) => {
  const {
    totalPositions,
    winRates,
    playRates,
    banRates,
    averageGamesScore,
    goldEarned,
    kills,
    deaths,
    assists,
    damageDealt,
    totalDamageTaken,
    minionsKilled,
    overallPerformanceScore,
    previousWinRates,
    previousPlayRates,
    previousBanRates,
    previousAverageGamesScore,
    previousGoldEarned,
    previousKills,
    previousDeaths,
    previousAssists,
    previousDamageDealt,
    previousTotalDamageTakenPosition,
    previousMinionsKilled,
    previousOverallPerformanceScore
  } = roleData.positions;
  const positionsHalf = totalPositions / 2;
  const data = [
    {
      position: "Win Rate",
      A: totalPositions - winRates,
      B: positionsHalf
    },
    {
      position: "Gold Earned",
      A: totalPositions - goldEarned,
      B: positionsHalf
    },
    {
      position: "Kills",
      A: totalPositions - kills,
      B: positionsHalf
    },
    {
      position: "Assists",
      A: totalPositions - assists,
      B: positionsHalf
    },
    {
      position: "Deaths",
      A: totalPositions - deaths,
      B: positionsHalf
    },
    {
      position: "Dmg Dealt",
      A: totalPositions - damageDealt,
      B: positionsHalf
    },
    {
      position: "Dmg Taken",
      A: totalPositions - totalDamageTaken,
      B: positionsHalf
    }
  ];

  const {
    percentMagical,
    percentPhysical,
    percentTrue,
    totalMagical,
    totalPhysical,
    totalTrue
  } = roleData.damageComposition;
  // TODO: tooltip to show damage
  const physicalDamage = `${(percentPhysical * 100).toFixed(2)}%`;
  const magicalDamage = `${(percentMagical * 100).toFixed(2)}%`;
  const trueDamage = `${(percentTrue * 100).toFixed(2)}%`;

  const role = ggRoles[roleData.role];
  return (
    <div className="column is-12-mobile is-9-tablet is-8-desktop has-border-right">
      <TitleMain title="Statistics" />
      <table className="table is-striped is-fullwidth has-text-weight-semibold is-size-7-mobile is-size-6-7">
        <thead>
          <tr className="has-background-dark">
            <th className="has-text-left">Type</th>
            <th>Average</th>
            <th>Role Placement</th>
            <th>Placement Change This Patch</th>
          </tr>
        </thead>
        <tbody>
          <ChampStatsRow
            role={role}
            sortByProp="winRate"
            type="Win Rate"
            average={`${(roleData.winRate * 100).toFixed(2)}%`}
            position={winRates}
            previousPosition={previousWinRates}
            totalPositions={totalPositions}
            positionChange={previousWinRates - winRates}
          />
          <ChampStatsRow
            role={role}
            sortByProp="playRate"
            type="Play Rate"
            average={`${(roleData.playRate * 100).toFixed(2)}%`}
            position={playRates}
            previousPosition={previousPlayRates}
            totalPositions={totalPositions}
          />
          <ChampStatsRow
            role={role}
            sortByProp="banRate"
            type="Ban Rate"
            average={`${(roleData.banRate * 100).toFixed(2)}%`}
            position={banRates}
            previousPosition={previousBanRates}
            totalPositions={totalPositions}
          />
          {roleData.averageGames && (
            <ChampStatsRow
              role={role}
              sortByProp="averageGames"
              type="Player Base Average Games Played"
              average={roleData.averageGames.toFixed(2)}
              position={averageGamesScore}
              previousPosition={previousAverageGamesScore}
              totalPositions={totalPositions}
            />
          )}
          <ChampStatsRow
            role={role}
            sortByProp="goldEarned"
            type="Gold Earned"
            average={Math.round(roleData.goldEarned).toString()}
            position={goldEarned}
            previousPosition={previousGoldEarned}
            totalPositions={totalPositions}
          />
          <ChampStatsRow
            role={role}
            sortByProp="kills"
            type="Kills"
            average={roleData.kills.toFixed(2)}
            position={kills}
            previousPosition={previousKills}
            totalPositions={totalPositions}
          />
          <ChampStatsRow
            role={role}
            sortByProp="deaths"
            type="Deaths"
            average={roleData.deaths.toFixed(2)}
            position={deaths}
            previousPosition={previousDeaths}
            totalPositions={totalPositions}
          />
          <ChampStatsRow
            role={role}
            sortByProp="assists"
            type="Assists"
            average={roleData.assists.toFixed(2)}
            position={assists}
            previousPosition={previousAssists}
            totalPositions={totalPositions}
          />
          <ChampStatsRow
            role={role}
            sortByProp="damageComposition.total"
            type="Damage Dealt"
            average={Math.round(roleData.damageComposition.total).toString()}
            position={damageDealt}
            previousPosition={previousDamageDealt}
            totalPositions={totalPositions}
          />
          <ChampStatsRow
            role={role}
            sortByProp="totalDamageTaken"
            type="Damage Taken"
            average={Math.round(roleData.totalDamageTaken).toString()}
            position={totalDamageTaken}
            previousPosition={previousTotalDamageTakenPosition}
            totalPositions={totalPositions}
          />
          <ChampStatsRow
            role={role}
            sortByProp="minionsKilled"
            type="Minions Killed"
            average={roleData.minionsKilled.toFixed(2)}
            position={minionsKilled}
            previousPosition={previousMinionsKilled}
            totalPositions={totalPositions}
          />
          <ChampStatsRow
            role={role}
            sortByProp="positions.overallPerformanceScore"
            type="OVERALL PLACEMENT"
            average={roleData.positions.overallPerformanceScore.toString()}
            position={overallPerformanceScore}
            previousPosition={previousOverallPerformanceScore}
            totalPositions={totalPositions}
          />
        </tbody>
      </table>
      <TitleMain title="Overall Champion Matrix" />
      <ResponsiveContainer className="mgb-2 champ-radar">
        <RadarChart
          data={data}
          fill="whitesmoke"
          className="is-size-7-mobile is-size-6-7 is-capitalized"
        >
          <PolarGrid stroke="#4a4a4a" />
          <PolarAngleAxis dataKey="position" />
          <PolarRadiusAxis
            tickCount={6}
            domain={[0, totalPositions]}
            axisLine={false}
            tick={false}
          />
          <Radar
            dot={true}
            name={`Average Of ${role} Champs`}
            dataKey="B"
            stroke="#dbdbdb"
            fill="#b5b5b5"
            fillOpacity={0.4}
          />
          <Radar
            dot={true}
            name={champName}
            dataKey="A"
            stroke="#b86bff"
            fill="#b86bff"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
      <TitleMain title="Damage Composition" />
      <div
        className="columns is-mobile is-multiline is-centered mgy-0 is-size-6-7 mgx-auto"
        style={{ maxWidth: "450px" }}
      >
        <Tippy
          theme="translucent"
          arrow={true}
          arrowType="round"
          flipBehavior={["top", "bottom", "right", "left"]}
          followCursor={true}
          content={
            <React.Fragment>
              <p>
                <span className="has-text-danger">Physical: </span>
                {Math.round(totalPhysical)}
              </p>
              <p>
                <span className="has-text-info">Magical: </span>
                {Math.round(totalMagical)}
              </p>
              <p>
                <span className="has-text-grey-light">True: </span>
                {Math.round(totalTrue)}
              </p>
            </React.Fragment>
          }
        >
          <div className="is-flex fullwidth">
            <div
              style={{ width: physicalDamage, height: "30px" }}
              className="has-background-danger progress-left"
            />
            <div
              style={{ width: magicalDamage, height: "30px" }}
              className="has-background-info"
            />
            <div
              style={{ width: trueDamage, height: "30px" }}
              className="has-background-grey-light progress-right"
            />
          </div>
        </Tippy>
        <div className="column is-narrow">
          <div className="has-background-danger is-inline-block mgr-s legend-colors" />
          Phyiscal
        </div>
        <div className="column is-narrow">
          <div className="has-background-info is-inline-block mgr-s legend-colors" />
          Magical
        </div>
        <div className="column is-narrow">
          <div className="has-background-grey-light is-inline-block mgr-s legend-colors" />
          True
        </div>
      </div>
    </div>
  );
};

ChampStats.propTypes = {
  roleData: PropTypes.object.isRequired,
  champName: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const roleData = getSelectedRoleData(state);
  return {
    roleData
  };
};

export default connect(mapStateToProps)(ChampStats);
