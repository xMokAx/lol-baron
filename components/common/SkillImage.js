import React from "react";
import PropTypes from "prop-types";
import Tippy from "@tippy.js/react";

import { getSkillImage } from "../../utils/lolApiImages";

const SkillImage = ({ skill, className, version }) => {
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
                src={getSkillImage(skill.id, version)}
                alt={skill.name}
                className="is-size-9 selected-role"
              />
            </figure>
            <div className="is-flex flex-vertical flex-justify-center">
              <h5 className="is-size-6-7 is-size-6-tablet has-text-weight-bold">
                {skill.name}
              </h5>
              <p className="has-text-info">Cooldown: {skill.cooldown}s</p>
            </div>
          </div>
          <br />
          <p dangerouslySetInnerHTML={{ __html: skill.description }} />
        </div>
      }
    >
      <figure className={className}>
        <img
          src={getSkillImage(skill.id, version)}
          alt={skill.name}
          className="is-size-9"
        />
      </figure>
    </Tippy>
  );
};

SkillImage.propTypes = {
  version: PropTypes.string.isRequired,
  skill: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired
};

export default SkillImage;
