import React from "react";
import PropTypes from "prop-types";

import ItemImage from "../common/ItemImage";
import BuildText from "./BuildText";
import TitleSec from "./TitleSec";

const ChampTrinket = ({ data }) => {
  const { count, hash, winrate } = data;

  return (
    <React.Fragment>
      <TitleSec title="Trinket" />
      <div className="is-flex flex-vertical flex-align-center">
        <ItemImage itemId={Number(hash)} className="image is-40x40" />
        <BuildText winrate={winrate} count={count} />
      </div>
    </React.Fragment>
  );
};

ChampTrinket.propTypes = {
  data: PropTypes.object.isRequired
};

export default ChampTrinket;
