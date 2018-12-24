import React from "react";
import PropTypes from "prop-types";

import BuildText from "./BuildText";
import SkillImage from "../common/SkillImage";
import PassiveImage from "../common/PassiveImage";
import TitleSec from "./TitleSec";

const ChampSkills = ({ data, champ, version }) => {
  const { count, hash, winrate } = data;
  const skillOrder = hash.split("-");
  const skillCount = ["Q", "W", "E", "R"];
  return (
    <React.Fragment>
      <TitleSec title="Skill Order" />
      <table className="table is-striped is-paddingless is-bordered is-fullwidth is-size-7 skill-order has-text-weight-semibold">
        <thead>
          <tr className="has-background-black-bis">
            {skillOrder.map((_s, i) => (
              <th key={i} className="skill has-text-weight-semibold">
                {i === 0 ? (
                  <PassiveImage
                    version={version}
                    passive={champ.passive}
                    className="image is-32x32"
                  />
                ) : (
                  i
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {skillCount.map((s, index) => {
            const skillObj = champ.spells[index];
            return (
              <tr key={s}>
                {skillOrder.map((skill, i) => {
                  if (i === 0) {
                    return (
                      <td key={i} className="skill">
                        <SkillImage
                          version={version}
                          className="image is-32x32"
                          skill={skillObj}
                        />
                      </td>
                    );
                  } else if (s === skill) {
                    return (
                      <td
                        key={i}
                        className="skill has-background-black"
                        style={{ padding: "1px" }}
                      >
                        <div className="has-background-primary has-text-black selected-skill">
                          <span className="selected-skill-text">{skill}</span>
                        </div>
                      </td>
                    );
                  } else {
                    return <td key={i} className="skill" />;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <BuildText winrate={winrate} count={count} />
    </React.Fragment>
  );
};

ChampSkills.propTypes = {
  version: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  champ: PropTypes.object.isRequired
};

export default ChampSkills;
