import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Tippy from "@tippy.js/react";

const Image = ({ src, alt, className, imgStyle, tooltip, badgeData }) => {
  if (tooltip) {
    return (
      <Tippy
        arrow={true}
        arrowType="round"
        theme="translucent"
        flipBehavior={["top", "bottom", "right", "left"]}
        content={<p className="is-size-7-mobile">{alt}</p>}
      >
        <figure className={className} data-badge={badgeData}>
          <img
            src={src}
            alt={alt}
            className={classNames("is-size-9", imgStyle && imgStyle)}
          />
        </figure>
      </Tippy>
    );
  }
  return (
    <figure className={className} data-badge={badgeData}>
      <img
        src={src}
        alt={alt}
        className={classNames("is-size-9", imgStyle && imgStyle)}
      />
    </figure>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  tooltip: PropTypes.bool.isRequired,
  imgStyle: PropTypes.string,
  badgeData: PropTypes.number
};

export default Image;
