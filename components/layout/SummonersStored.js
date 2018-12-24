import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "next/link";
import { withRouter } from "next/router";
import classNames from "classnames";

import { getProfileIconImage } from "../../utils/lolApiImages";

import Image from "../common/Image";

const SummonersStored = ({ summonersByRegion, router, version }) => {
  const storedRegions = Object.keys(summonersByRegion);
  if (storedRegions.length) {
    return (
      <div className="tabs mg-vs is-boxed is-centered is-small is-block">
        <ul className="flex-wrap">
          {storedRegions.map(region => {
            const storedSummoners = Object.entries(summonersByRegion[region]);
            if (storedSummoners.length) {
              return (
                <React.Fragment key={region}>
                  {storedSummoners.map((entry, i, arr) => {
                    const summonerName = entry[0];
                    const summoner = entry[1];
                    const { summonerError, isFetchingSummoner } = summoner;
                    if (!isFetchingSummoner) {
                      if (
                        summonerError &&
                        storedRegions.length === 1 &&
                        arr.length === 1
                      ) {
                        return (
                          <p
                            className="has-text-warning has-text-centered is-size-7 pd-1"
                            key={region + i}
                          >
                            {summonerError}
                          </p>
                        );
                      } else {
                        const hasError = !!summonerError;
                        const isSelected =
                          router.asPath ===
                          `/summoner/${region}/${summonerName}`;
                        const summonerColor = isSelected
                          ? hasError
                            ? "has-text-danger"
                            : "has-text-primary"
                          : "";
                        const {
                          name,
                          profileIconId,
                          summonerLevel
                        } = summoner.summonerInfo;
                        return (
                          <li
                            className={classNames(isSelected && "is-active")}
                            key={region + i}
                          >
                            <Link
                              scroll={false}
                              href={`/summoner?region=${region}&summonerName=${summonerName}`}
                              as={`/summoner/${region}/${summonerName}`}
                            >
                              <a className={summonerColor}>
                                {!hasError ? (
                                  <div className="media">
                                    <div className="media-left">
                                      {profileIconId && (
                                        <Image
                                          tooltip={false}
                                          src={getProfileIconImage(
                                            profileIconId,
                                            version
                                          )}
                                          alt="profile icon"
                                          className="image is-40x40 badge is-badge-small is-badge-bottom-left is-badge-light"
                                          imgStyle="border-radius-4 selected-role"
                                          badgeData={summonerLevel}
                                        />
                                      )}
                                    </div>

                                    <div className="media-content">
                                      <div className="content">
                                        <p className="is-capitalized">
                                          <strong>{name}</strong>
                                          <br />
                                          <small>{region}</small>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="media">
                                    <div className="media-content">
                                      <div className="content">
                                        <p className="is-capitalized">
                                          <strong>{summonerName}</strong> -{" "}
                                          <small>{region}</small>
                                          <br />
                                          <small>
                                            {summonerError ===
                                            "Summoner Not Found"
                                              ? summonerError
                                              : "Connection Error"}
                                          </small>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </a>
                            </Link>
                          </li>
                        );
                      }
                    }
                  })}
                </React.Fragment>
              );
            }
          })}
        </ul>
      </div>
    );
  }
  return (
    <p className="has-text-warning has-text-centered is-size-7 pd-1">
      You did not search for any summoners yet
    </p>
  );
};

SummonersStored.propTypes = {
  version: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
  summonersByRegion: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { summonersByRegion, version } = state;
  return {
    version,
    summonersByRegion
  };
};

export default withRouter(connect(mapStateToProps)(SummonersStored));
