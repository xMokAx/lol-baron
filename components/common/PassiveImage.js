import React from "react";
import PropTypes from "prop-types";
import Tippy from "@tippy.js/react";

import { getPassiveImage } from "../../utils/lolApiImages";

const PassiveImage = ({ passive, className,version }) => {
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
                src={getPassiveImage(passive.icon, version)}
                alt={passive.name}
                className="is-size-9 selected-role"
              />
            </figure>
            <div className="is-flex flex-vertical flex-justify-center">
              <h5 className="is-size-6-7 is-size-6-tablet has-text-weight-bold">
                {passive.name}
              </h5>
            </div>
          </div>
          <br />
          <p dangerouslySetInnerHTML={{ __html: passive.description }} />
        </div>
      }
    >
      <figure className={className}>
        <img
          src={getPassiveImage(passive.icon, version)}
          alt={passive.name}
          className="is-size-9"
        />
      </figure>
    </Tippy>
  );
};

PassiveImage.propTypes = {
  version: PropTypes.string.isRequired,
  passive: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired
};

export default PassiveImage;
