import React from "react";
import PropTypes from "prop-types";

function ProgressBar({ color, isPrimary, type }) {
  const className = isPrimary
    ? "progress_block_primary"
    : type
    ? "progress_block_stat"
    : "progress_block_secondary";
  if (type) {
    color = "#BDB06A";
  }
  return (
    <div className={`progress_block ${className}`}>
      <div className="progress_border">
        <div className="progress_bar_outer">
          <div className="progress_bar_height">
            <div
              className="progress_bar_inner"
              style={{ backgroundColor: color }}
            >
              <div className="progress_bar_highlight" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  color: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool.isRequired,
  type: PropTypes.string
};

export default ProgressBar;
