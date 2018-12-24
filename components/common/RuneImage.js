import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Tippy from "@tippy.js/react";
import classNames from "classnames";

import { getRuneImage } from "../../utils/lolApiImages";

const RuneImage = ({ rune, className, imgStyle }) => {
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
                src={getRuneImage(rune.icon)}
                alt={rune.name}
                className={classNames(
                  "is-size-9 selected-role",
                  imgStyle && imgStyle
                )}
              />
            </figure>
            <div className="is-flex flex-vertical flex-justify-center">
              <h5 className="is-size-6 is-uppercase has-text-weight-bold">
                {rune.name}
              </h5>
            </div>
          </div>
          {rune.longDesc && (
            <React.Fragment>
              <br />
              <p
                className="description description-text"
                dangerouslySetInnerHTML={{ __html: rune.longDesc }}
              />
            </React.Fragment>
          )}
        </div>
      }
    >
      <figure className={className}>
        <img
          src={getRuneImage(rune.icon)}
          alt={rune.name}
          className={classNames("is-size-9", imgStyle && imgStyle)}
        />
      </figure>
    </Tippy>
  );
};

RuneImage.propTypes = {
  rune: PropTypes.object.isRequired,
  runeId: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  imgStyle: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
  rune: state.runes[ownProps.runeId]
});

export default connect(mapStateToProps)(RuneImage);
