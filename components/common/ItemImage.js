import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Tippy from "@tippy.js/react";

import { getItemImage } from "../../utils/lolApiImages";

import EmptyImage from "./EmptyImage";

const ItemImage = ({ item, itemId, className, version }) => {
  if (itemId === 0) {
    return <EmptyImage className={`${className} has-background-grey`} />;
  }

  if (!item) {
    return <EmptyImage className={`${className} has-background-warning`} />;
  }
  const { name, plaintext, description, gold } = item;
  const { total, base } = gold;
  return (
    <Tippy
      theme="translucent"
      arrow={true}
      arrowType="round"
      flipBehavior={["top", "right", "left", "bottom"]}
      content={
        <div className="is-size-7-mobile is-size-6-7">
          <div className="is-flex">
            <figure className="image is-48x48 mgr-1">
              <img
                src={getItemImage(itemId, version)}
                alt={name}
                className="is-size-9 selected-role"
              />
            </figure>
            <div className="is-flex flex-vertical flex-justify-center">
              <h5 className="is-size-6-7 is-size-6-tablet has-text-weight-bold">
                {name}
              </h5>
              {total !== 0 && (
                <p className="has-text-warning">
                  Cost: {total} ({base})
                </p>
              )}
            </div>
          </div>
          <br />
          {plaintext && (
            <p className="has-text-danger has-text-weight-semibold">
              {plaintext}
            </p>
          )}
          <br />
          <p
            className="description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      }
    >
      <figure className={className}>
        <img
          src={getItemImage(itemId, version)}
          alt={name}
          className="is-size-9"
        />
      </figure>
    </Tippy>
  );
};

ItemImage.propTypes = {
  version: PropTypes.string.isRequired,
  itemId: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  item: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  let props = {
    version: state.version
  };
  if (ownProps.itemId !== 0) {
    props.item = state.items[ownProps.itemId];
  }
  return props;
};

export default connect(mapStateToProps)(ItemImage);
