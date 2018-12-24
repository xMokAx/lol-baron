import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Tippy from "@tippy.js/react";

import { getSummonerSpellImage } from "../../utils/lolApiImages";

const SummonerSpellImage = ({ spell, className, version }) => {
  return (
    <Tippy
      theme="translucent"
      arrow={true}
      arrowType="round"
      flipBehavior={["top", "right", "left", "bottom"]}
      content={
        <div className="is-size-6-7 is-size-7-mobile">
          <div className="is-flex">
            <figure className="image is-64x64 mgr-1">
              <img
                src={getSummonerSpellImage(spell.name, version)}
                alt={spell.gameName}
                className="is-size-9 selected-role"
              />
            </figure>
            <div className="is-flex flex-vertical flex-justify-center">
              <h5 className="is-size-6-7 is-size-6-tablet has-text-weight-bold">
                {spell.gameName}
              </h5>
              <p className="has-text-warning">
                Summoner Level: {spell.summonerLevel}
              </p>
              <p className="has-text-info">Cooldown: {spell.cooldown}s</p>
            </div>
          </div>

          <br />
          <p dangerouslySetInnerHTML={{ __html: spell.description }} />
        </div>
      }
    >
      <figure className={className}>
        <img
          src={getSummonerSpellImage(spell.name, version)}
          alt={spell.gameName}
          className="is-size-9"
        />
      </figure>
    </Tippy>
  );
};

SummonerSpellImage.propTypes = {
  version: PropTypes.string.isRequired,
  spell: PropTypes.object.isRequired,
  spellId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  version: state.version,
  spell: state.summonerSpells[ownProps.spellId]
});

export default connect(mapStateToProps)(SummonerSpellImage);
