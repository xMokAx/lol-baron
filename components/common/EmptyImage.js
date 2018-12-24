import React from "react";
import PropTypes from "prop-types";

const EmptyImage = ({ className }) => {
  return <div className={className} />;
};

EmptyImage.propTypes = {
  className: PropTypes.string.isRequired
};

export default EmptyImage;
