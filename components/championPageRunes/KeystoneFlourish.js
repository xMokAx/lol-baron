import React from "react";
import PropTypes from "prop-types";

function KeystoneFlourish({ color, secColor }) {
  return (
    <React.Fragment>
      <svg
        className="keystone_flourish keystone_flourish_up"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 286 9"
      >
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={secColor} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={secColor} stopOpacity="0" />
        </linearGradient>
        <path fill="none" stroke="url('#grad1')" d="M0 4.5h193l4 4" />
        <path fill="none" stroke="url('#grad1')" d="M286 8.5H62l-7-8H20l-4 4" />
      </svg>
      <svg
        className="keystone_flourish keystone_flourish_down"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 286 9"
      >
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <path fill="none" stroke="url('#grad1')" d="M0 4.5h193l4 4" />
        <path fill="none" stroke="url('#grad1')" d="M286 8.5H62l-7-8H20l-4 4" />
      </svg>
    </React.Fragment>
  );
}

KeystoneFlourish.propTypes = {
  color: PropTypes.string.isRequired,
  secColor: PropTypes.string.isRequired
};

export default KeystoneFlourish;
