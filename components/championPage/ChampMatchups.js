import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import sortBy from "sort-by";

import { getSelectedRoleData } from "../../selectors/ggSelectors";
import { ggRoles } from "../../constants/ggConstants";

import MatchupsList from "./MatchupsList";

const ChampMatchups = ({ roleData, champName, champId }) => {
  const { matchups, role } = roleData;
  let matchupRole = ggRoles[role];
  const roleMatchups = matchups[role];
  let strongAgainst = [],
    weakAgainst = [],
    duoStrongAgainst,
    duoWeakAgainst,
    duoGoodSynergy,
    duoBadSynergy,
    duoMatchupRole;
  if (role === "DUO_SUPPORT" || role === "DUO_CARRY") {
    duoMatchupRole = role === "DUO_SUPPORT" ? "ADC" : "Support";
    duoStrongAgainst = [];
    duoWeakAgainst = [];
    duoGoodSynergy = [];
    duoBadSynergy = [];
    matchups.ADCSUPPORT.forEach(matchup => {
      let enemyId, enemyData, champData;
      const { champ1_id, champ2_id, champ1, champ2 } = matchup;
      if (champId == champ1_id) {
        champData = champ1;
        enemyId = champ2_id;
        enemyData = champ2;
      } else {
        champData = champ2;
        enemyId = champ1_id;
        enemyData = champ1;
      }

      if (champData.winrate < 0.5) {
        duoWeakAgainst.push({
          champId,
          enemyId,
          champData,
          enemyData,
          count: matchup.count
        });
      } else {
        duoStrongAgainst.push({
          champId,
          enemyId,
          champData,
          enemyData,
          count: matchup.count
        });
      }
    });
    matchups.SYNERGY.forEach(matchup => {
      let enemyId, enemyData, champData;
      const { champ1_id, champ2_id, champ1, champ2 } = matchup;
      if (champId == champ1_id) {
        champData = champ1;
        enemyId = champ2_id;
        enemyData = champ2;
      } else {
        champData = champ2;
        enemyId = champ1_id;
        enemyData = champ1;
      }

      if (champData.winrate < 0.5) {
        duoBadSynergy.push({
          champId,
          enemyId,
          champData,
          enemyData,
          count: matchup.count
        });
      } else {
        duoGoodSynergy.push({
          champId,
          enemyId,
          champData,
          enemyData,
          count: matchup.count
        });
      }
    });
    duoStrongAgainst.sort(sortBy("-champData.winrate"));
    duoWeakAgainst.sort(sortBy("champData.winrate"));
    duoGoodSynergy.sort(sortBy("-champData.winrate"));
    duoBadSynergy.sort(sortBy("champData.winrate"));
  }
  roleMatchups.forEach(matchup => {
    let enemyId, enemyData, champData;
    const { champ1_id, champ2_id, champ1, champ2 } = matchup;
    if (champId == champ1_id) {
      champData = champ1;
      enemyId = champ2_id;
      enemyData = champ2;
    } else {
      champData = champ2;
      enemyId = champ1_id;
      enemyData = champ1;
    }

    if (champData.winrate < 0.5) {
      weakAgainst.push({
        champId,
        enemyId,
        champData,
        enemyData,
        count: matchup.count
      });
    } else {
      strongAgainst.push({
        champId,
        enemyId,
        champData,
        enemyData,
        count: matchup.count
      });
    }
  });
  weakAgainst.sort(sortBy("champData.winrate"));
  strongAgainst.sort(sortBy("-champData.winrate"));
  return (
    <React.Fragment>
      <MatchupsList
        matchups={strongAgainst}
        champName={champName}
        title={`${matchupRole} Champions That ${champName} Counters`}
      >
        <div className="columns is-mobile is-centered is-size-6-7">
          <div className="column is-narrow">
            <div className="has-background-info is-inline-block mgr-s legend-colors" />
            High Performance
          </div>
          <div className="column is-narrow">
            <div className="has-background-warning is-inline-block mgr-s legend-colors" />
            Average
          </div>
          <div className="column is-narrow">
            <div className="has-background-danger is-inline-block mgr-s legend-colors" />
            Low
          </div>
        </div>
      </MatchupsList>
      <MatchupsList
        champName={champName}
        matchups={weakAgainst}
        title={`${matchupRole} Champions That Counter ${champName}`}
      >
        <div className="columns is-mobile is-centered is-size-6-7">
          <div className="column is-narrow">
            <div className="has-background-info is-inline-block mgr-s legend-colors" />
            High Performance
          </div>
          <div className="column is-narrow">
            <div className="has-background-warning is-inline-block mgr-s legend-colors" />
            Average
          </div>
          <div className="column is-narrow">
            <div className="has-background-danger is-inline-block mgr-s legend-colors" />
            Low
          </div>
        </div>
      </MatchupsList>
      {duoStrongAgainst && (
        <MatchupsList
          matchups={duoStrongAgainst}
          champName={champName}
          title={`${duoMatchupRole} Champions That ${champName} Counters`}
        />
      )}
      {duoWeakAgainst && (
        <MatchupsList
          champName={champName}
          matchups={duoWeakAgainst}
          title={`${duoMatchupRole} Champions That Counter ${champName}`}
        />
      )}
      {duoGoodSynergy && (
        <MatchupsList
          matchups={duoGoodSynergy}
          champName={champName}
          title={`${duoMatchupRole} Champions That Synergize Well With ${champName}`}
        />
      )}
      {duoBadSynergy && (
        <MatchupsList
          champName={champName}
          matchups={duoBadSynergy}
          title={`${duoMatchupRole} Champions That Synergize Poorly With ${champName}`}
        />
      )}
    </React.Fragment>
  );
};

ChampMatchups.propTypes = {
  roleData: PropTypes.object.isRequired,
  champName: PropTypes.string.isRequired,
  champId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const roleData = getSelectedRoleData(state);
  return {
    roleData
  };
};

export default connect(mapStateToProps)(ChampMatchups);
