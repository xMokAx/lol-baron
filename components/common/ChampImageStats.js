import React from "react";
import PropTypes from "prop-types";

function ChampImageStats({ type, data, dataPerLvl }) {
  return (
    <p>
      {type}: {data && <span className="has-text-warning">{data}</span>}
      {dataPerLvl ? (
        <React.Fragment>
          (<span className="has-text-primary">+{dataPerLvl}</span>)
        </React.Fragment>
      ) : (
        ""
      )}
    </p>
  );
}

ChampImageStats.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.number,
  dataPerLvl: PropTypes.number
};

export default ChampImageStats;
