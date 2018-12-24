import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "./ProgressBar";
import PathButton from "./PathButton";
import RuneButton from "./RuneButton";

function SlotLeft({ type, color, runeId, pathName, isPrimary, statName }) {
  if (type === "path") {
    return (
      <div className="slot_left">
        <ProgressBar color={color} isPrimary={isPrimary} />
        <PathButton color={color} runeId={runeId} pathName={pathName} />
      </div>
    );
  }

  return (
    <div className="slot_left" style={{ height: type === "stat" && "60px" }}>
      {statName === "OFFENSE" && (
        <ProgressBar color={color} isPrimary={isPrimary} type={type} />
      )}
      <RuneButton
        type={type}
        runeId={runeId}
        pathName={pathName}
        statName={statName}
      />
    </div>
  );
}

SlotLeft.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  runeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isPrimary: PropTypes.bool.isRequired,
  pathName: PropTypes.string,
  statName: PropTypes.string
};

export default SlotLeft;
