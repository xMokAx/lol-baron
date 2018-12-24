import React from "react";
import PropTypes from "prop-types";

import { paths } from "../../constants/ggConstants";

import PathColumn from "./PathColumn";
import BuildText from "../championPage/BuildText";
import TitleSec from "../championPage/TitleSec";

function ChampRunes({ data }) {
  const { count, hash, winrate } = data;
  const runesIds = hash.split("-");
  const primaryPathId = runesIds.slice(0, 1);
  const primaryRunesIds = runesIds.slice(1, 5);
  const secondaryPathId = runesIds.slice(5, 6);
  const secondaryRunesIds = runesIds.slice(6, 8);
  const statModsIds = runesIds.slice(8, 11);
  const primaryPath = paths[primaryPathId];
  const secondaryPath = paths[secondaryPathId];
  return (
    <React.Fragment>
      <TitleSec title="Runes" />
      <div className="app_block">
        <div className="app_outer">
          <div className="app_inner" id="perks-app">
            <div className="path_block">
              <div className="path_body">
                <PathColumn
                  path={primaryPath}
                  runesIds={primaryRunesIds}
                  isPrimary={true}
                />
                <PathColumn
                  priColor={primaryPath.color}
                  path={secondaryPath}
                  runesIds={secondaryRunesIds}
                  statModsIds={statModsIds}
                  isPrimary={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BuildText winrate={winrate} count={count} />
    </React.Fragment>
  );
}

ChampRunes.propTypes = {
  data: PropTypes.object.isRequired
};

export default ChampRunes;
