import React from "react";
import PropTypes from "prop-types";

import { ggRoles } from "../../constants/ggConstants";

import MatchupTableRow from "./MatchupTableRow";
import ChampImage from "../common/ChampImage";

const MatchupTable = ({ matchupData, champ, enemy }) => {
  console.log(matchupData)
  let champion, opponent;
  if (champ.id == matchupData.champion1.championId) {
    champion = matchupData.champion1.stats;
    opponent = matchupData.champion2.stats;
  } else {
    opponent = matchupData.champion1.stats;
    champion = matchupData.champion2.stats;
  }

  const role = ggRoles[champion.role];
  return (
    <table className="table is-fullwidth is-striped is-size-6-7 is-size-7-mobile is-size-6-desktop">
      <thead>
        <tr className="has-background-dark">
          <td style={{ borderBottom: "0" }} />
          <td colSpan="2" style={{ borderBottom: "0" }}>
            <ChampImage
              className="image is-32x32 mgx-auto"
              champ={champ}
              tooltip={true}
            />
          </td>
          <td colSpan="2" style={{ borderBottom: "0" }}>
            <ChampImage
              className="image is-32x32 mgx-auto"
              champ={enemy}
              tooltip={true}
            />
          </td>
        </tr>
        <tr className="has-background-dark">
          <td>Type</td>
          <td>Average</td>
          <td>Change</td>
          <td>Average</td>
          <td>Change</td>
        </tr>
      </thead>
      <tbody>
        <MatchupTableRow
          role={role}
          sortByProp="winRate"
          type="Win Rate"
          champAverage={champion.winrate}
          champChange={champion.deltawinrate}
          enemyAverage={opponent.winrate}
          enemyChange={opponent.deltawinrate}
        />
        <MatchupTableRow
          role={role}
          sortByProp="goldEarned"
          type="Gold Earned"
          champAverage={champion.goldEarned}
          champChange={champion.deltagoldEarned}
          enemyAverage={opponent.goldEarned}
          enemyChange={opponent.deltagoldEarned}
        />
        <MatchupTableRow
          role={role}
          sortByProp="kills"
          type="Kills"
          champAverage={champion.kills}
          champChange={champion.deltakills}
          enemyAverage={opponent.kills}
          enemyChange={opponent.deltakills}
        />
        <MatchupTableRow
          role={role}
          sortByProp="assists"
          type="Assists"
          champAverage={champion.assists}
          champChange={champion.deltaassists}
          enemyAverage={opponent.assists}
          enemyChange={opponent.deltaassists}
        />
        <MatchupTableRow
          role={role}
          sortByProp="deaths"
          type="Deaths"
          champAverage={champion.deaths}
          champChange={champion.deltadeaths}
          enemyAverage={opponent.deaths}
          enemyChange={opponent.deltadeaths}
        />
        <MatchupTableRow
          role={role}
          sortByProp="damageComposition.total"
          type="Damage Dealt"
          champAverage={champion.totalDamageDealtToChampions}
          champChange={champion.deltatotalDamageDealtToChampions}
          enemyAverage={opponent.totalDamageDealtToChampions}
          enemyChange={opponent.deltatotalDamageDealtToChampions}
        />
        <MatchupTableRow
          role={role}
          sortByProp="minionsKilled"
          type="Minions Killed"
          champAverage={champion.minionsKilled}
          champChange={champion.deltaminionsKilled}
          enemyAverage={opponent.minionsKilled}
          enemyChange={opponent.deltaminionsKilled}
        />
      </tbody>
    </table>
  );
};

MatchupTable.propTypes = {
  matchupData: PropTypes.object.isRequired,
  champ: PropTypes.object.isRequired,
  enemy: PropTypes.object.isRequired
};

export default MatchupTable;
