import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";

import { statMods } from "../../constants/ggConstants";

import SlotBlock from "./SlotBlock";

function PathColumn({
  runes,
  path,
  isPrimary,
  runesIds,
  statModsIds,
  priColor
}) {
  const pathRune = runes[path.id];
  const sectionId = isPrimary ? "primary-path" : "secondary-path";
  const pathName = path.name;
  const color = path.color;
  const secColor = path.secColor;
  return (
    <div className={classNames("path_column", isPrimary && "path_column_left")}>
      <section id={sectionId}>
        <SlotBlock
          height="path_block_height"
          rune={pathRune}
          type="path"
          path={path}
          pathName={pathName}
          color={color}
          secColor={secColor}
          isPrimary={isPrimary}
        />
        {runesIds.map((id, i) => {
          const rune = runes[id];
          const type = isPrimary && i === 0 ? "keystone" : "rune";
          const height =
            type === "keystone" ? "keystone_block_height" : "rune_block_height";
          return (
            <SlotBlock
              height={height}
              key={id}
              rune={rune}
              type={type}
              pathName={pathName}
              color={color}
              secColor={secColor}
              isPrimary={isPrimary}
            />
          );
        })}
        {!isPrimary && (
          <div className="stat_blocks">
            {statModsIds.map((id, i) => {
              const rune = statMods[id];
              const type = "stat";
              let statName;
              switch (i) {
                case 0:
                  statName = "OFFENSE";
                  break;
                case 1:
                  statName = "FLEX";
                  break;
                case 2:
                  statName = "DEFFENSE";
                  break;
              }
              return (
                <SlotBlock
                  height="stat_block_height"
                  index={i}
                  type={type}
                  key={i + id}
                  rune={rune}
                  statName={statName}
                  color={priColor}
                  isPrimary={false}
                />
              );
            })}
          </div>
        )}
      </section>
      <svg className="perks_svg_gradients" width="0" height="0">
        <linearGradient id={`gradient-${pathName}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={color} offset="0%" />
          <stop stopColor={secColor} offset="100%" />
        </linearGradient>
      </svg>
    </div>
  );
}

PathColumn.propTypes = {
  isPrimary: PropTypes.bool.isRequired,
  runesIds: PropTypes.array.isRequired,
  path: PropTypes.object.isRequired,
  priColor: PropTypes.string,
  statModsIds: PropTypes.array
};

const mapStateToProps = state => ({
  runes: state.runes
});

export default connect(mapStateToProps)(PathColumn);
