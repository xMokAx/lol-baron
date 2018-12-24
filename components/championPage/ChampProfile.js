import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "next/link";
import classNames from "classnames";

import { getChampData, getSelectedRole } from "../../selectors/ggSelectors";
import { ggRoles } from "../../constants/ggConstants";

import ChampImage from "../common/ChampImage";

const ChampProfile = ({
  champName,
  champId,
  champData,
  selectedRole,
  selectedElo
}) => {
  const name = champName.replace(/([^a-z]+)/gi, "").toLowerCase();
  return (
    <div className="column is-12-mobile is-3-tablet is-4-desktop has-border-right">
      <ChampImage
        champId={champId}
        className="image is-128x128 mgx-auto"
        tooltip={true}
        imgStyle="border-radius-4 selected-role"
      />
      <h1 className="title is-3 has-text-primary">{champName}</h1>
      {champData.map(roleData => {
        const hasSingleRole = champData.length === 1;
        let role = ggRoles[roleData.role];
        const isSelected = selectedRole === roleData.role;
        return (
          <div
            key={roleData.role}
            className={classNames(
              "pd-1 mg-1 border-radius-4",
              isSelected
                ? "selected-role has-background-black-bis"
                : "has-background-darkest"
            )}
          >
            {hasSingleRole || isSelected ? (
              <h2 className="is-size-4 is-capitalized has-text-primary">
                {role}
              </h2>
            ) : (
              <Link
                href={`/champion?elo=${selectedElo}&champName=${name}&role=${role}`}
                as={`/champion/${selectedElo}/${name}/${role}`}
              >
                <a className="has-text-white">
                  <h2 className="is-size-4 is-capitalized">{role}</h2>
                </a>
              </Link>
            )}
            <small>
              {(roleData.percentRolePlayed * 100).toFixed(2)}% Role Rate
            </small>
            <br />
            <small>{roleData.gamesPlayed} Analyzed This Patch</small>
          </div>
        );
      })}
    </div>
  );
};

ChampProfile.propTypes = {
  champName: PropTypes.string.isRequired,
  champData: PropTypes.array.isRequired,
  selectedRole: PropTypes.string.isRequired,
  selectedElo: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const { selectedElo } = state;
  const selectedRole = getSelectedRole(state);
  const champData = getChampData(state);
  return {
    selectedElo,
    selectedRole,
    champData
  };
};

export default connect(mapStateToProps)(ChampProfile);
