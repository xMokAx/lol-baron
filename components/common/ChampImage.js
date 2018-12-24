import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import Tippy from "@tippy.js/react";

import { getChampionImage } from "../../utils/lolApiImages";

import ChampImageStats from "./ChampImageStats";
import EmptyImage from "./EmptyImage";

const ChampImage = ({
  version,
  champ,
  champId,
  className,
  imgStyle,
  tooltip,
  badgeData
}) => {
  if (champId === -1) {
    return <EmptyImage className={`${className} has-background-grey`} />;
  }

  if (!champ) {
    return <EmptyImage className={`${className} has-background-warning`} />;
  }

  if (tooltip) {
    const {
      hp,
      hpperlevel,
      mp,
      mpperlevel,
      movespeed,
      armor,
      armorperlevel,
      spellblock,
      spellblockperlevel,
      attackrange,
      hpregen,
      hpregenperlevel,
      mpregen,
      mpregenperlevel,
      attackdamage,
      attackdamageperlevel,
      attackspeedperlevel
    } = champ.stats;
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
                  src={getChampionImage(champ.name, version)}
                  alt={champ.gameName}
                  className="is-size-9 selected-role"
                />
              </figure>
              <div className="is-flex flex-vertical flex-justify-center">
                <h5 className="is-size-6-7 is-size-6-tablet has-text-weight-bold">
                  {champ.gameName}
                </h5>
                <p className="has-text-danger">{champ.title}</p>
                <p className="has-text-info">
                  {champ.tags.map((tag, i, arr) => (
                    <span key={tag}>
                      {tag}
                      {i !== arr.length - 1 && " - "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <br />
            <div className="is-flex">
              <div className="mgr-1">
                <ChampImageStats
                  type="Health"
                  data={hp}
                  dataPerLvl={hpperlevel}
                />
                <ChampImageStats
                  type="Health Reg"
                  data={hpregen}
                  dataPerLvl={hpregenperlevel}
                />
                <ChampImageStats
                  type="Mana/Energy"
                  data={mp}
                  dataPerLvl={mpperlevel}
                />
                <ChampImageStats
                  type="Ma/En Reg"
                  data={mpregen}
                  dataPerLvl={mpregenperlevel}
                />
                <ChampImageStats type="Move. Speed" data={movespeed} />
              </div>
              <div>
                <ChampImageStats
                  type="Armor"
                  data={armor}
                  dataPerLvl={armorperlevel}
                />
                <ChampImageStats
                  type="Magic Res"
                  data={spellblock}
                  dataPerLvl={spellblockperlevel}
                />
                <ChampImageStats
                  type="Att. Dmg"
                  data={attackdamage}
                  dataPerLvl={attackdamageperlevel}
                />
                <ChampImageStats type="Att. Range" data={attackrange} />
                <ChampImageStats
                  type="Att. speed/Lvl"
                  dataPerLvl={attackspeedperlevel}
                />
              </div>
            </div>
          </div>
        }
      >
        <figure className={className} data-badge={badgeData}>
          <img
            src={getChampionImage(champ.name, version)}
            alt={champ.gameName}
            className={classNames("is-size-9", imgStyle && imgStyle)}
          />
        </figure>
      </Tippy>
    );
  }
  return (
    <figure className={className} data-badge={badgeData}>
      <img
        src={getChampionImage(champ.name, version)}
        alt={champ.gameName}
        className={classNames("is-size-9", imgStyle && imgStyle)}
      />
    </figure>
  );
};

ChampImage.propTypes = {
  version: PropTypes.string.isRequired,
  champId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  champ: PropTypes.object,
  className: PropTypes.string.isRequired,
  tooltip: PropTypes.bool.isRequired,
  imgStyle: PropTypes.string,
  badgeData: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const mapStateToProps = (state, ownProps) => {
  let props = {
    version: state.version
  };
  if (!ownProps.champ && ownProps.champId !== -1) {
    props.champ = state.champs[ownProps.champId];
  }
  return props;
};

export default connect(mapStateToProps)(ChampImage);
