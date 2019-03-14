import React from "react";
import PropTypes from "prop-types";

const MatchupTableChamp = ({ type, average, change }) => {
  switch (type) {
    case "Win Rate":
      average = (average * 100).toFixed(2) + "%";
      change = (change * 100).toFixed(2);
      break;
    case "Gold Earned":
    case "Damage Dealt":
      average = Math.round(average);
      change = Math.round(change);
      break;
    case "Kills":
    case "Deaths":
    case "Assists":
    case "Minions Killed":
      average = average.toFixed(2);
      change = change.toFixed(2);
      break;
  }
  let changeColor, changeSign;
  if (change < 0) {
    changeColor = "has-text-danger";
    changeSign = "-";
  } else if (change > 0) {
    changeColor = "has-text-info";
    changeSign = "+";
  }

  change = Math.abs(change);
  return (
    <React.Fragment>
      <td>{average}</td>
      <td className={changeColor}>
        {changeSign}
        {change}
        {type === "Win Rate" && "%"}
      </td>
    </React.Fragment>
  );
};

MatchupTableChamp.propTypes = {
  type: PropTypes.string.isRequired,
  average: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired
};

export default MatchupTableChamp;
