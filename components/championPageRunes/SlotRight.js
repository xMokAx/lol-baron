import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import KeystoneFlourish from "./KeystoneFlourish";
import RuneDescription from "./RuneDescription";
import PathDescription from "./PathDescription";

function SlotRight({
  type,
  title,
  color,
  secColor,
  description,
  path,
  isPrimary
}) {
  if (type === "path") {
    return (
      <div className="slot_right">
        <PathDescription path={path} />
        {isPrimary && (
          <h4
            className="is-size-8"
            style={{
              color: secColor,
              position: "absolute",
              opacity: "0.9",
              bottom: 0,
              fontSize: "10px"
            }}
          >
            KEYSTONES
          </h4>
        )}
      </div>
    );
  }

  if (type === "keystone") {
    const fontSize = "14px";
    return (
      <div className="slot_right">
        <KeystoneFlourish color={color} secColor={secColor} />
        <RuneDescription
          title={title}
          description={description}
          color={color}
          fontSize={fontSize}
        />
      </div>
    );
  }
  const paddingTop =
    type === "stat" ? "stat_description_block" : "description_block";
  return (
    <div className="slot_right">
      <RuneDescription
        title={title}
        description={description}
        color={color}
        type={type}
        paddingTop={paddingTop}
      />
    </div>
  );
}

SlotRight.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  secColor: PropTypes.string,
  isPrimary: PropTypes.bool.isRequired,
  path: PropTypes.object,
  description: PropTypes.string
};

export default SlotRight;
