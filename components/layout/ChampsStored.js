import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "next/link";
import { withRouter } from "next/router";
import classNames from "classnames";

import { ggRoles } from "../../constants/ggConstants";

import ChampImage from "../common/ChampImage";

const ChampsStored = ({ eloDetailsByElo, router }) => {
  const storedElos = Object.keys(eloDetailsByElo);
  return (
    <div className="is-flex flex-wrap flex-justify-center has-text-centered">
      {storedElos.map(elo => {
        const storedChampions = Object.entries(eloDetailsByElo[elo].champions);
        const isSelected = router.asPath.includes(`/champion/${elo}`);
        if (storedChampions.length) {
          return (
            <div
              className={classNames(
                "is-flex flex-vertical pdx-vs mg-vs border-radius-4",
                isSelected ? "selected-role" : "is-bordered"
              )}
              key={elo}
            >
              <h4
                className={classNames(
                  "is-size-6-7 is-capitalized",
                  isSelected && "has-text-primary"
                )}
              >
                {elo}
              </h4>
              <div className="tabs is-boxed is-centered is-small is-block">
                <ul className="flex-wrap">
                  {storedChampions.map((entry, i) => {
                    const champName = entry[0];
                    const champion = entry[1];
                    const { champError, isFetchingChamp } = champion;

                    if (!isFetchingChamp) {
                      const { id } = champion;
                      let role = champion.selectedRole;
                      const champLink = champName
                        .replace(/([^a-z]+)/gi, "")
                        .toLowerCase();
                      role = ggRoles[role];
                      const selected = router.asPath.includes(
                        `/champion/${elo}/${champLink}`
                      );
                      const champColor = selected
                        ? champError
                          ? "has-text-danger"
                          : "has-text-primary"
                        : "";
                      return (
                        <li
                          className={classNames({
                            "is-active": selected
                          })}
                          key={i}
                        >
                          <Link
                            scroll={false}
                            href={`/champion?elo=${elo}&champName=${champLink}&role=${role}`}
                            as={`/champion/${elo}/${champLink}/${role}`}
                          >
                            <a className={champColor}>
                              <div className="is-flex">
                                <div className="mgr-1">
                                  <ChampImage
                                    tooltip={false}
                                    champId={id}
                                    className="image is-40x40"
                                    imgStyle="border-radius-4 selected-role"
                                  />
                                </div>
                                <div className="is-flex flex-vertical flex-justify-center is-capitalized">
                                  <p>
                                    <strong>{champName}</strong>
                                    <br />
                                    <small>{role}</small>
                                  </p>
                                </div>
                              </div>
                            </a>
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          );
        }
        return (
          <div className="is-flex flex-vertical" key={elo}>
            <h4 className="has-text-primary is-size-6-7 is-capitalized">
              {elo}
            </h4>
            <p className="has-text-warning has-text-centered is-size-7 pd-1">
              No Champs Searched
            </p>
          </div>
        );
      })}
    </div>
  );
};

ChampsStored.propTypes = {
  router: PropTypes.object.isRequired,
  eloDetailsByElo: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { eloDetailsByElo } = state;
  return {
    eloDetailsByElo
  };
};

export default withRouter(connect(mapStateToProps)(ChampsStored));
