import React from "react";
import PropTypes from "prop-types";

import SlotLeft from "./SlotLeft";
import SlotRight from "./SlotRight";

function SlotBlock({
  type,
  rune,
  statName,
  path,
  color,
  secColor,
  pathName,
  isPrimary,
  height
}) {
  const { shortDesc, id } = rune;
  const name = statName ? statName : rune.name;

  return (
    <div className={`slot_block ${height}`}>
      <SlotLeft
        type={type}
        pathName={pathName}
        color={color}
        runeId={id}
        isPrimary={isPrimary}
        statName={statName}
      />
      <SlotRight
        type={type}
        color={color}
        secColor={secColor}
        path={path}
        title={name}
        description={shortDesc}
        isPrimary={isPrimary}
      />
    </div>
  );
}

SlotBlock.propTypes = {
  type: PropTypes.string.isRequired,
  rune: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  secColor: PropTypes.string,
  pathName: PropTypes.string,
  isPrimary: PropTypes.bool.isRequired,
  height: PropTypes.string.isRequired,
  path: PropTypes.object,
  statName: PropTypes.string
};

export default SlotBlock;
