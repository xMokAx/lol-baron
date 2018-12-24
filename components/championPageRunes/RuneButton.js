import React from "react";
import PropTypes from "prop-types";

import RuneImage from "../common/RuneImage";
import StatImage from "../common/StatImage";

function RuneButton({ pathName, runeId, type, statName }) {
  let imgClass, className, outframeClass;
  let stroke = `url(#gradient-${pathName})`;
  switch (type) {
    case "keystone":
      className = "keystone";
      imgClass = "keystone_icon";
      outframeClass = "keystone_outerframe";
      break;
    case "rune":
      className = "rune";
      imgClass = "rune_icon";
      outframeClass = "rune_outerframe";
      break;
    case "stat":
      className = "stat";
      imgClass = "stat_icon";
      outframeClass = "stat_outerframe";
      stroke = "#BDB06A";
      break;
  }
  return (
    <div className={`perk ${className}`}>
      <svg className={`perk_outerframe ${outframeClass}`} viewBox="0 0 60 60">
        <circle
          cx="30"
          cy="30"
          r="28.5"
          strokeWidth="3"
          fill="none"
          stroke={stroke}
        />
      </svg>
      {type === "stat" ? (
        <StatImage
          statId={runeId}
          className={`perk_icon ${imgClass}`}
          imgStyle="is-rounded"
          statName={statName}
        />
      ) : (
        <RuneImage
          runeId={runeId}
          className={`perk_icon ${imgClass}`}
          imgStyle="is-rounded"
        />
      )}

      <svg className="rune_innerframe" viewBox="0 0 47 47">
        <circle
          cx="23.5"
          cy="23.5"
          r="22.5"
          strokeWidth="2"
          fill="none"
          stroke={stroke}
        />
      </svg>
    </div>
  );
}

RuneButton.propTypes = {
  pathName: PropTypes.string,
  runeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string.isRequired,
  statName: PropTypes.string
};

export default RuneButton;
