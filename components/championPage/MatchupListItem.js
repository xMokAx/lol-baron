import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "next/link";
import classNames from "classnames";
import Tippy from "@tippy.js/react";

import { ggRoles } from "../../constants/ggConstants";

import ChampImage from "../common/ChampImage";
import MatchupItemDetails from "./MatchupItemDetails";

class MatchupListItem extends Component {
  static propTypes = {
    matchup: PropTypes.object.isRequired,
    selectedElo: PropTypes.string.isRequired
  };

  state = {
    isDetailsOpened: false
  };

  openMatchupDetails = () => {
    this.setState({
      isDetailsOpened: !this.state.isDetailsOpened
    });
  };

  render() {
    const { selectedElo, matchup, champ, enemy } = this.props;
    const { isDetailsOpened } = this.state;
    const { champData, enemyData, count } = matchup;
    const role = ggRoles[champData.role];
    const enemyName = enemy.gameName.replace(/([^a-z]+)/gi, "").toLowerCase();
    const champName = champ.gameName.replace(/([^a-z]+)/gi, "").toLowerCase();
    const champWinRate = (champData.winrate * 100).toFixed(2);
    const enemyWinRate = (enemyData.winrate * 100).toFixed(2);
    let champColor, enemyColor;
    if (champWinRate > 52) {
      champColor = "info";
      enemyColor = "danger";
    } else if (champWinRate >= 48 && champWinRate <= 52) {
      champColor = "warning";
      enemyColor = "warning";
    } else {
      champColor = "danger";
      enemyColor = "info";
    }
    return (
      <React.Fragment>
        <tr
          className={classNames(isDetailsOpened && "has-background-black-bis")}
        >
          <td>
            <div className="is-flex flex-align-center">
              <Link
                href={`/champion?elo=${selectedElo}&champName=${enemyName}&role=${role}`}
                as={`/champion/${selectedElo}/${enemyName}/${role}`}
              >
                <a className="has-text-primary is-flex flex-align-center matchup-enemy">
                  <ChampImage
                    className="image is-40x40 mgr-s"
                    champ={enemy}
                    tooltip={true}
                  />
                  <p className="text-overflow">{enemy.gameName}</p>
                </a>
              </Link>
              <button
                className="button primary"
                style={{ backgroundColor: "transparent" }}
                onClick={this.openMatchupDetails}
              >
                <span className="icon">
                  <i className="material-icons">
                    {!isDetailsOpened ? "expand_more" : "expand_less"}
                  </i>
                </span>
              </button>
            </div>
          </td>
          <td>
            {champWinRate === enemyWinRate ? (
              <Tippy
                theme="translucent"
                arrow={true}
                arrowType="round"
                flipBehavior={["top", "bottom", "right", "left"]}
                followCursor={true}
                content={
                  <React.Fragment>
                    <p>
                      <span className={`has-text-${champColor}`}>
                        {champ.gameName} & {enemy.gameName} Win Rate:{" "}
                      </span>
                      {champWinRate}%
                    </p>
                    <p>
                      <span className={`has-text-${enemyColor}`}>
                        Enemy Win Rate:{" "}
                      </span>
                      {100 - champWinRate}%
                    </p>
                  </React.Fragment>
                }
              >
                <div className="is-flex has-text-black progress-bar mgx-auto is-size-7 text-vsm">
                  <div
                    className={`has-background-${champColor} has-border-right progress-left`}
                    style={{ width: `${champWinRate}%` }}
                  >
                    {champ.gameName} & {enemy.gameName}
                  </div>
                  <div
                    className={`has-background-${enemyColor} progress-right`}
                    style={{ width: `${100 - champWinRate}%` }}
                  >
                    Enemy
                  </div>
                </div>
              </Tippy>
            ) : (
              <Tippy
                theme="translucent"
                arrow={true}
                arrowType="round"
                flipBehavior={["top", "bottom", "right", "left"]}
                followCursor={true}
                content={
                  <React.Fragment>
                    <p>
                      <span className={`has-text-${champColor}`}>
                        {champ.gameName} Win Rate:{" "}
                      </span>
                      {champWinRate}%
                    </p>
                    <p>
                      <span className={`has-text-${enemyColor}`}>
                        {enemy.gameName} Win Rate:{" "}
                      </span>
                      {enemyWinRate}%
                    </p>
                  </React.Fragment>
                }
              >
                <div className="is-flex has-text-black progress-bar mgx-auto is-size-7 text-vsm">
                  <div
                    className={`has-background-${champColor} has-border-right progress-left`}
                    style={{ width: `${champWinRate}%` }}
                  >
                    {champ.gameName}
                  </div>
                  <div
                    className={`has-background-${enemyColor} progress-right`}
                    style={{ width: `${enemyWinRate}%` }}
                  >
                    {enemy.gameName}
                  </div>
                </div>
              </Tippy>
            )}

            <span>{count} Games</span>
          </td>
          <td>{champWinRate}%</td>
        </tr>
        {isDetailsOpened && (
          <MatchupItemDetails
            enemyData={enemyData}
            champData={champData}
            champ={champ}
            enemy={enemy}
            enemyName={enemyName}
            champName={champName}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { selectedElo, champs } = state;
  return {
    selectedElo,
    champ: champs[ownProps.matchup.champId],
    enemy: champs[ownProps.matchup.enemyId]
  };
};

export default connect(mapStateToProps)(MatchupListItem);
