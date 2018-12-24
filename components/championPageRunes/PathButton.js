import React from "react";
import PropTypes from "prop-types";

import RuneImage from "../common/RuneImage";

function PathButton({ color, runeId, pathName }) {
  return (
    <div className="perk path">
      <svg className="path_circles">
        <linearGradient
          id={`circle-gradient-${pathName}`}
          x1="1"
          y1="0.6"
          x2="0"
          y2="0"
        >
          <stop stopOpacity="1" offset="0%" stopColor={color} />
          <stop stopOpacity="0" offset="70%" stopColor={color} />
        </linearGradient>
        <circle
          className="path_circle1"
          cx="50%"
          cy="50%"
          r="43%"
          fill="none"
          strokeWidth="2"
          stroke={`url(#circle-gradient-${pathName})`}
        />
        <circle
          className="path_circle2 path_circle1"
          cx="50%"
          cy="50%"
          r="43%"
          fill="none"
          strokeWidth="2"
          stroke={`url(#circle-gradient-${pathName})`}
        />
        <circle
          className="path_circle3 path_circle1"
          cx="50%"
          cy="50%"
          r="43%"
          fill="none"
          strokeWidth="2"
          stroke={`url(#circle-gradient-${pathName})`}
        />
      </svg>
      <svg className="path_cup">
        <linearGradient
          id={`cup-gradient-${pathName}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop stopOpacity="0" offset="80%" stopColor={color} />
          <stop stopOpacity="1" offset="100%" stopColor={color} />
        </linearGradient>
        <circle
          cx="42"
          cy="42"
          r="42"
          fill="none"
          strokeWidth="2"
          stroke={`url(#cup-gradient-${pathName})`}
        />
      </svg>
      <RuneImage
        className="perk_icon path_icon image is-32x32"
        runeId={runeId}
        imgStyle="is-rounded"
      />
    </div>
  );
}

PathButton.propTypes = {
  color: PropTypes.string.isRequired,
  pathName: PropTypes.string.isRequired,
  runeId: PropTypes.number.isRequired
};

export default PathButton;
