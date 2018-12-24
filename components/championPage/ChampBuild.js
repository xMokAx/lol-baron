import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getSelectedRoleData } from "../../selectors/ggSelectors";

import ChampSummoners from "./ChampSummoners";
import ChampTrinket from "./ChampTrinket";
import ChampSkills from "./ChampSkills";
import ChampStartingItems from "./ChampStartingItems";
import ChampItems from "./ChampItems";
import ChampRunes from "../championPageRunes/ChampRunes";
import TitleMain from "./TitleMain";

const ChampBuild = ({ roleData, champ, version }) => {
  const {
    finalitemshashfixed,
    firstitemshash,
    runehash,
    skillorderhash,
    summonershash,
    trinkethash
  } = roleData.hashes;
  // TODO: make sure the object exist before using it as data prop
  return (
    <React.Fragment>
      <div className="column is-12-mobile is-6-tablet is-6-desktop has-border-right">
        <TitleMain title="Highest Win Rate Build" />
        <ChampSummoners title="Summoners" data={summonershash.highestWinrate} />
        <ChampRunes data={runehash.highestWinrate} />
        <ChampTrinket title="Trinket" data={trinkethash.highestWinrate} />
        <ChampStartingItems
          title="Starting Items"
          data={firstitemshash.highestWinrate}
        />
        <ChampItems
          title="Completed Items"
          data={
            finalitemshashfixed.highestWinrate
              ? finalitemshashfixed.highestWinrate
              : finalitemshashfixed.highestCount
          }
        />
        <ChampSkills
          version={version}
          title="Skill Order"
          data={skillorderhash.highestWinrate}
          champ={champ}
        />
      </div>
      <div className="column is-12-mobile is-6-tablet is-6-desktop has-border-right">
        <TitleMain title="Most Frequent Build" />
        <ChampSummoners title="Summoners" data={summonershash.highestCount} />
        <ChampRunes data={runehash.highestCount} />
        <ChampTrinket title="Trinket" data={trinkethash.highestCount} />
        <ChampStartingItems
          title="Starting Items"
          data={firstitemshash.highestCount}
        />
        <ChampItems
          title="Completed Items"
          data={finalitemshashfixed.highestCount}
        />
        <ChampSkills
          version={version}
          title="Skill Order"
          data={skillorderhash.highestCount}
          champ={champ}
        />
      </div>
    </React.Fragment>
  );
};

ChampBuild.propTypes = {
  version: PropTypes.string.isRequired,
  roleData: PropTypes.object.isRequired,
  champ: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  version: state.version,
  roleData: getSelectedRoleData(state)
});

export default connect(mapStateToProps)(ChampBuild);
