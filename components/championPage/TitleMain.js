import React from "react";
import PropTypes from "prop-types";

function TitleMain({ title }) {
  return <h3 className="title has-text-weight-bold has-text-warning is-4 is-size-5-mobile is-capitalized">{title}</h3>;
}

TitleMain.propTypes = { title: PropTypes.string.isRequired };

export default TitleMain;
