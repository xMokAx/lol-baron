import React from "react";
import PropTypes from "prop-types";

import SummonerSpellImage from "../common/SummonerSpellImage";
import BuildText from "./BuildText";
import TitleSec from "./TitleSec";

const ChampSummoners = ({ data }) => {
  const { count, hash, winrate } = data;
  const [summoner1Id, summoner2Id] = hash.split("-");
  return (
    <React.Fragment>
      <TitleSec title="Summoners" />
      <div className="is-flex flex-vertical">
        <div>
          <SummonerSpellImage
            className="image is-40x40 mgr-s is-inline-block"
            spellId={summoner1Id}
          />
          <SummonerSpellImage
            className="image is-40x40 is-inline-block"
            spellId={summoner2Id}
          />
        </div>
        <BuildText winrate={winrate} count={count} />
        <div />
      </div>
    </React.Fragment>
  );
};

ChampSummoners.propTypes = {
  data: PropTypes.object.isRequired
};

export default ChampSummoners;
