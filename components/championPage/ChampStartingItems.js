import React from "react";
import PropTypes from "prop-types";

import ItemImage from "../common/ItemImage";
import BuildText from "./BuildText";
import TitleSec from "./TitleSec";

const ChampStartingItems = ({ data }) => {
  const { count, hash, winrate } = data;
  const hashes = hash.split("-");
  const itemsIds = hashes.slice(1, hashes.length);
  return (
    <React.Fragment>
      <TitleSec title="Starting Items" />
      <div className="is-flex flex-justify-center">
        {itemsIds.map((id, i) => (
          <ItemImage
            key={i}
            itemId={Number(id)}
            className="image is-32x32 mgr-s"
          />
        ))}
      </div>
      <BuildText winrate={winrate} count={count} />
    </React.Fragment>
  );
};

ChampStartingItems.propTypes = {
  data: PropTypes.object.isRequired
};

export default ChampStartingItems;
