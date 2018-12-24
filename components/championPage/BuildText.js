import React from "react";
import PropTypes from "prop-types";

const BuildText = ({ winrate, count }) => {
  return (
    <p>
      <span className="has-text-primary">{(winrate * 100).toFixed(2)}%</span>{" "}
      Win Rate | <span className="has-text-primary">{count}</span> Games
    </p>
  );
};

BuildText.propTypes = {
  winrate: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired
};

export default BuildText;
