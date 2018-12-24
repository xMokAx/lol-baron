import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "next/link";

import { ggRoles } from "../../constants/ggConstants";

import ChampImage from "../common/ChampImage";

const ChampionListItem = ({ champ, selectedElo }) => {
  const { id, roles, gameName } = champ;
  const champName = gameName.replace(/([^a-z]+)/gi, "").toLowerCase();
  return (
    <div className="column mgy-2 is-paddingless is-narrow champ-item-width champ-item-border is-flex flex-vertical flex-align-center has-text-centered">
      {roles.length && (
        <React.Fragment>
          <Link
            href={`/champion?elo=${selectedElo}&champName=${champName}&role=${
              ggRoles[roles[0].role]
            }`}
            as={`/champion/${selectedElo}/${champName}/${
              ggRoles[roles[0].role]
            }`}
          >
            <a className="has-text-white-ter has-text-weight-bold">
              <ChampImage
                champId={id}
                className="image is-64x64 mgx-auto"
                tooltip={true}
              />
              {gameName}
            </a>
          </Link>
          {roles.map(role => (
            <Link
              href={`/champion?elo=${selectedElo}&champName=${champName}&role=${
                ggRoles[role.role]
              }`}
              as={`/champion/${selectedElo}/${champName}/${ggRoles[role.role]}`}
              key={id + role.role}
            >
              <a className="has-text-primary is-capitalized">
                {role.role === "DUO_CARRY" ? "ADC" : ggRoles[role.role]}
              </a>
            </Link>
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

ChampionListItem.propTypes = {
  champ: PropTypes.object.isRequired,
  selectedElo: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  selectedElo: state.selectedElo
});

export default connect(mapStateToProps)(ChampionListItem);
