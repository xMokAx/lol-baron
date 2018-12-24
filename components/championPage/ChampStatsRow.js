import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import Link from "next/link";

const ChampStatsRow = ({
  selectedElo,
  role,
  sortByProp,
  type,
  average,
  position,
  previousPosition,
  totalPositions
}) => {
  const getPositionColor = position => {
    const positionsHalf = totalPositions / 2;
    if (position < positionsHalf) {
      return "has-text-info";
    } else if (position > positionsHalf) {
      return "has-text-danger";
    } else {
      return "";
    }
  };

  const positionChange = previousPosition
    ? previousPosition - position
    : "New Meta";
  let changeSign = "",
    changeColor = "";
  if (positionChange < 0) {
    changeSign = "-";
    changeColor = "has-text-danger";
  } else if (positionChange > 0) {
    changeSign = "+";
    changeColor = "has-text-info";
  } else if (positionChange === "New Meta") {
    changeSign = "";
    changeColor = "has-text-warning";
  }

  const isOverall = type === "OVERALL PLACEMENT";
  const order = isOverall || sortByProp === "deaths" ? "ascend" : "descend";
  const positionColor = getPositionColor(position);
  return (
    <tr
      className={classNames(isOverall && "selected-role has-text-weight-bold")}
    >
      {isOverall ? (
        <td colSpan="2">
          <Link
            href={`/statistics?elo=${selectedElo}&roleFilter=${role}&sortBy=${sortByProp}&order=${order}`}
            as={`/statistics/${selectedElo}?roleFilter=${role}&sortBy=${sortByProp}&order=${order}`}
          >
            <a className="has-text-primary">{type}</a>
          </Link>
        </td>
      ) : (
        <React.Fragment>
          <td className="has-text-left">
            <Link
              href={`/statistics?elo=${selectedElo}&roleFilter=${role}&sortBy=${sortByProp}&order=${order}`}
              as={`/statistics/${selectedElo}?roleFilter=${role}&sortBy=${sortByProp}&order=${order}`}
            >
              <a className="has-text-primary">{type}</a>
            </Link>
          </td>
          <td>{average}</td>
        </React.Fragment>
      )}
      <td>
        <span className={positionColor}>{position}</span>/{totalPositions}
      </td>
      <td className={changeColor}>
        {changeSign}
        {typeof positionChange === "number"
          ? Math.abs(positionChange)
          : positionChange}
      </td>
    </tr>
  );
};

ChampStatsRow.propTypes = {
  selectedElo: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  sortByProp: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  average: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  previousPosition: PropTypes.number,
  totalPositions: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  const { selectedElo } = state;
  return {
    selectedElo
  };
};

export default connect(mapStateToProps)(ChampStatsRow);
