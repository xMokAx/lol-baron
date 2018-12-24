import React from "react";
import PropTypes from "prop-types";

function PathDescription({ path }) {
  return (
    <div className="path_description_block">
      <h3 className="description_title" style={{ color: path.color }}>
        {path.name}
      </h3>
      <p
        className="description_paragraph"
        dangerouslySetInnerHTML={{ __html: path.description }}
      />
    </div>
  );
}

PathDescription.propTypes = {
  path: PropTypes.object.isRequired
};

export default PathDescription;
