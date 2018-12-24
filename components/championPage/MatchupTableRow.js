import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "next/link";

import MatchupTableChamp from "./MatchupTableChamp";

const MatchupTableRow = ({
  type,
  champAverage,
  enemyAverage,
  champChange,
  enemyChange,
  selectedElo,
  role,
  sortByProp
}) => {
  const order = sortByProp === "deaths" ? "ascend" : "descend";
  return (
    <tr>
      <td>
        <Link
          href={`/statistics?elo=${selectedElo}&roleFilter=${role}&sortBy=${sortByProp}&order=${order}`}
          as={`/statistics/${selectedElo}?roleFilter=${role}&sortBy=${sortByProp}&order=${order}`}
        >
          <a className="has-text-primary">{type}</a>
        </Link>
      </td>
      <MatchupTableChamp
        type={type}
        average={champAverage}
        change={champChange}
      />
      <MatchupTableChamp
        type={type}
        average={enemyAverage}
        change={enemyChange}
      />
    </tr>
  );
};

MatchupTableRow.propTypes = {
  type: PropTypes.string.isRequired,
  champAverage: PropTypes.number.isRequired,
  enemyAverage: PropTypes.number.isRequired,
  champChange: PropTypes.number.isRequired,
  enemyChange: PropTypes.number.isRequired,
  selectedElo: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  sortByProp: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const { selectedElo } = state;
  return {
    selectedElo
  };
};

export default connect(mapStateToProps)(MatchupTableRow);
