import React from "react";
import PropTypes from "prop-types";

const Loading = ({ className }) => {
  return <div className={`loader ${className}`} aria-label="loading" />;
};

Loading.propTypes = {
  className: PropTypes.string
};

export default Loading;
