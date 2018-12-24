import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Tippy from "@tippy.js/react";

import { statMods } from "../../constants/ggConstants";

function StatImage({ statId, statName, className, imgStyle }) {
  const stat = statMods[statId];
  return (
    <Tippy
      theme="translucent"
      arrow={true}
      arrowType="round"
      flipBehavior={["top", "right", "left", "bottom"]}
      content={
        <div className="is-size-6-7 is-size-7-mobile">
          <div className="is-flex">
            <figure className="image is-48x48 mgr-1">
              <img
                src={stat.icon}
                alt={stat.name}
                className={classNames(
                  "is-size-9 selected-role",
                  imgStyle && imgStyle
                )}
              />
            </figure>
            <div className="is-flex flex-vertical flex-justify-center">
              <h5 className="is-size-6 is-uppercase has-text-weight-bold">
                {statName}
              </h5>
            </div>
          </div>
          <br />
          <p className="description">{stat.shortDesc}</p>
        </div>
      }
    >
      <figure className={className}>
        <img
          src={stat.icon}
          alt={stat.name}
          className={classNames("is-size-9", imgStyle && imgStyle)}
        />
      </figure>
    </Tippy>
  );
}

StatImage.propTypes = {
  statId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  statName: PropTypes.string.isRequired,
  imgStyle: PropTypes.string
};

export default StatImage;
