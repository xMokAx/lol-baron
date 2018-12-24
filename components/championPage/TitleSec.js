import React from "react";
import PropTypes from "prop-types";

function TitleSec({ title }) {
  return <h4 className="has-text-warning has-text-weight-semibold is-size-5 is-size-6-mobile mgy-2">{title}</h4>;
}

TitleSec.propTypes = {
  title: PropTypes.string.isRequired
};

export default TitleSec;
