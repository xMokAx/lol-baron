import React from "react";
import PropTypes from "prop-types";

import { ggRoles } from "../../constants/ggConstants";

import MatchupTableRow from "./MatchupTableRow";
import ChampImage from "../common/ChampImage";

const MatchupTable = ({ matchupData, champ, enemy }) => {
  const champion1 = matchupData.champion1.stats;
  const champion2 = matchupData.champion2.stats;
  const role = ggRoles[champion1.role];
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
          champAverage={champion1.winrate}
          champChange={champion1.deltawinrate}
          enemyAverage={champion2.winrate}
          enemyChange={champion2.deltawinrate}
        />
        <MatchupTableRow
          role={role}
          sortByProp="goldEarned"
          type="Gold Earned"
          champAverage={champion1.goldEarned}
          champChange={champion1.deltagoldEarned}
          enemyAverage={champion2.goldEarned}
          enemyChange={champion2.deltagoldEarned}
        />
        <MatchupTableRow
          role={role}
          sortByProp="kills"
          type="Kills"
          champAverage={champion1.kills}
          champChange={champion1.deltakills}
          enemyAverage={champion2.kills}
          enemyChange={champion2.deltakills}
        />
        <MatchupTableRow
          role={role}
          sortByProp="assists"
          type="Assists"
          champAverage={champion1.assists}
          champChange={champion1.deltaassists}
          enemyAverage={champion2.assists}
          enemyChange={champion2.deltaassists}
        />
        <MatchupTableRow
          role={role}
          sortByProp="deaths"
          type="Deaths"
          champAverage={champion1.deaths}
          champChange={champion1.deltadeaths}
          enemyAverage={champion2.deaths}
          enemyChange={champion2.deltadeaths}
        />
        <MatchupTableRow
          role={role}
          sortByProp="damageComposition.total"
          type="Damage Dealt"
          champAverage={champion1.totalDamageDealtToChampions}
          champChange={champion1.deltatotalDamageDealtToChampions}
          enemyAverage={champion2.totalDamageDealtToChampions}
          enemyChange={champion2.deltatotalDamageDealtToChampions}
        />
        <MatchupTableRow
          role={role}
          sortByProp="minionsKilled"
          type="Minions Killed"
          champAverage={champion1.minionsKilled}
          champChange={champion1.deltaminionsKilled}
          enemyAverage={champion2.minionsKilled}
          enemyChange={champion2.deltaminionsKilled}
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
