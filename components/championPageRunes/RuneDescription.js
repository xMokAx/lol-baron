import React from "react";
import PropTypes from "prop-types";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";

function RuneDescription({
  title,
  description,
  color,
  fontSize,
  paddingTop = "description_block"
}) {
  return (
    <div className={paddingTop}>
      <h3
        className="description_title"
        style={{ color: color, fontSize: fontSize }}
      >
        {title}
      </h3>
      <HTMLEllipsis
        className="description_paragraph"
        unsafeHTML={description}
        maxLine="3"
        ellipsis="..."
        basedOn="words"
      />
    </div>
  );
}

RuneDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  paddingTop: PropTypes.string
};

export default RuneDescription;
