import React from "react";
import PropTypes from "prop-types";

import ItemImage from "../common/ItemImage";
import BuildText from "./BuildText";
import TitleSec from "./TitleSec";

const ChampItems = ({ data }) => {
  const { count, hash, winrate } = data;
  const hashes = hash.split("-");
  const itemsIds = hashes.slice(1, hashes.length);

  return (
    <React.Fragment>
      <TitleSec title="Completed Items" />
      <div className="is-flex flex-justify-center">
        {itemsIds.map((id, i) => (
          <React.Fragment key={i}>
            <ItemImage itemId={Number(id)} className="image is-32x32 mgr-s" />
            {i !== itemsIds.length - 1 && (
              <span className="has-text-weight-bold mgr-vs"> ></span>
            )}
          </React.Fragment>
        ))}
      </div>
      <BuildText winrate={winrate} count={count} />
    </React.Fragment>
  );
};

ChampItems.propTypes = {
  data: PropTypes.object.isRequired
};

export default ChampItems;
