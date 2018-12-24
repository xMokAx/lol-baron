import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { ggRoles } from "../../constants/ggConstants";

import ChampImage from "../common/ChampImage";
import MatchDetailsItem from "./MatchDetailsItem";

const MatchDetails = ({
  players,
  playersIds,
  summoner,
  team,
  gameDuration,
  selectedElo,
  champsList
}) => {
  if (players.length) {
    let totalKills = 0,
      totalAssists = 0,
      totalDeaths = 0;
    for (let player of players) {
      totalKills += player.stats.kills;
      totalDeaths += player.stats.deaths;
      totalAssists += player.stats.assists;
    }
    const {
      baronKills,
      dragonKills,
      towerKills,
      inhibitorKills,
      riftHeraldKills,
      firstTower,
      firstDragon,
      firstBlood,
      firstRiftHerald,
      firstInhibitor,
      firstBaron,
      teamId,
      win,
      bans
    } = team;
    function hasFirst(prop) {
      return (
        <i
          className="material-icons is-size-7-mobile is-size-6-7 is-size-6-tablet text-vsm"
          aria-label="show match details"
        >
          {prop ? "check" : "close"}
        </i>
      );
    }
    const isWin = win === "Win";
    const backgroundLight = isWin
      ? "has-background-info-light"
      : "has-background-danger-light";
    const backgroundDark = isWin
      ? "has-background-info"
      : "has-background-danger";
    const backgroundDarkest = isWin
      ? "has-background-info-dark"
      : "has-background-danger-dark";
    const badgeColor = isWin ? "is-badge-info" : "is-badge-danger";
    const badgeColorDark = isWin
      ? "is-badge-info-dark"
      : "is-badge-danger-dark";
    return (
      <React.Fragment>
        <tr className="has-background-light has-text-weight-bold">
          <td colSpan="2">
            {win === "Win" ? (
              <strong className="has-text-info">Victory</strong>
            ) : (
              <strong className="has-text-danger">Defeat</strong>
            )}
            (
            {teamId === 100 ? (
              <span className="has-text-info">Blue team</span>
            ) : (
              <span className="has-text-danger">Red team</span>
            )}
            )
          </td>
          <td>items</td>
          <td className="is-hidden-vvvsm">Kda</td>
          <td className="is-hidden-vvsm">Damage</td>
          <td className="is-hidden-vsm">Cs</td>
          <td className="is-hidden-sm">Wards</td>
          <td className="is-hidden-vvsm">Gold</td>
          <td>tier</td>
        </tr>
        {players.map((p, i) => {
          return (
            <MatchDetailsItem
              p={p}
              index={i}
              key={i}
              playersIds={playersIds}
              summoner={summoner}
              gameDuration={gameDuration}
              champsList={champsList}
              totalKills={totalKills}
              selectedElo={selectedElo}
              backgroundDark={backgroundDark}
              badgeColor={badgeColor}
              badgeColorDark={badgeColorDark}
              backgroundDarkest={backgroundDarkest}
            />
          );
        })}
        {bans.length ? (
          <tr className={backgroundLight}>
            <td colSpan="9">
              <div className="is-flex flex-justify-center flex-align-center">
                <strong className="has-text-black mgr-s">Bans:</strong>
                {bans.map(ban => {
                  const { championId, pickTurn } = ban;
                  if (championId !== -1) {
                    const champ = champsList.find(
                      champ => champ.id == championId
                    );
                    const role = champ ? ggRoles[champ.roles[0].role] : "";
                    const champName = champ.gameName
                      .replace(/([^a-z]+)/gi, "")
                      .toLowerCase();
                    if (role) {
                      return (
                        <Link
                          key={pickTurn}
                          href={`/champion?elo=${selectedElo}&champName=${champName}&role=${role}`}
                          as={`/champion/${selectedElo}/${champName}/${role}`}
                        >
                          <a>
                            <ChampImage
                              tooltip={true}
                              champId={championId}
                              className="image is-40x40 mg-s"
                            />
                          </a>
                        </Link>
                      );
                    }
                  } else {
                    return (
                      <ChampImage
                        key={pickTurn}
                        tooltip={true}
                        champId={championId}
                        className="image is-40x40 mg-vs"
                      />
                    );
                  }
                })}
              </div>
            </td>
          </tr>
        ) : null}

        <tr className={backgroundLight}>
          <td colSpan="9" className="pdx-0" style={{ paddingTop: "0" }}>
            <table
              className={`table fullwidth is-bordered has-text-black ${backgroundLight}`}
            >
              <tbody>
                <tr>
                  <td />
                  <td>Kill(s)</td>
                  <td>Tower(s)</td>
                  <td>Drag(s)</td>
                  <td>Herald</td>
                  <td>Baron(s)</td>
                  <td>Inhib(s)</td>
                </tr>
                <tr>
                  <td>First</td>
                  <td>{hasFirst(firstBlood)}</td>
                  <td>{hasFirst(firstTower)}</td>
                  <td>{hasFirst(firstDragon)}</td>
                  <td>{hasFirst(firstRiftHerald)}</td>
                  <td>{hasFirst(firstBaron)}</td>
                  <td>{hasFirst(firstInhibitor)}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>
                    {totalKills}/{totalDeaths}/{totalAssists}
                  </td>
                  <td>{towerKills}</td>
                  <td>{dragonKills}</td>
                  <td>{riftHeraldKills}</td>
                  <td>{baronKills}</td>
                  <td>{inhibitorKills}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

MatchDetails.propTypes = {
  players: PropTypes.array.isRequired,
  playersIds: PropTypes.array.isRequired,
  summoner: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  gameDuration: PropTypes.number.isRequired,
  selectedElo: PropTypes.string.isRequired,
  champsList: PropTypes.array.isRequired
};

export default MatchDetails;
