import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import Link from "next/link";
import classNames from "classnames";
import TimeAgo from "react-timeago";
import Tippy from "@tippy.js/react";

import {
  fetchSummonerMatchDetails,
  errorSummonerMatchDetails
} from "../../actions/lolActions";
import {
  getSummonerPerMatch,
  getTeamsPerMatch
} from "../../selectors/lolSelectors";
import { getModifiedChampsList } from "../../selectors/ggSelectors";
import { queue, regions, multiKills } from "../../constants/lolConstants";
import { ggRoles } from "../../constants/ggConstants";

import ItemImage from "../common/ItemImage";
import ChampImage from "../common/ChampImage";
import RuneImage from "../common/RuneImage";
import SummonerSpellImage from "../common/SummonerSpellImage";
// import MatchDetails from "./MatchDetails";
import Loading from "../common/Loading";
import MatchPlayers from "./MatchPlayers";
const MatchDetails = dynamic(import("./MatchDetails"), {
  loading: () => (
    <tr>
      <td height="300" colSpan="7" className="has-background-grey">
        <Loading className="loader-lg mgx-auto mgy-auto loader-color-black" />
      </td>
    </tr>
  )
});

class Match extends Component {
  static propTypes = {
    selectedElo: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    match: PropTypes.object.isRequired,
    selectedRegion: PropTypes.string.isRequired,
    selectedSummoner: PropTypes.string.isRequired,
    summoner: PropTypes.object.isRequired,
    fetchSummonerMatchDetails: PropTypes.func.isRequired,
    blueTeamPlayers: PropTypes.array.isRequired,
    redTeamPlayers: PropTypes.array.isRequired,
    blueTeamPlayersIds: PropTypes.array.isRequired,
    redTeamPlayersIds: PropTypes.array.isRequired,
    champs: PropTypes.object.isRequired
  };

  state = {
    isDetailsOpened: false
  };

  openMatchDetails = () => {
    this.setState({
      isDetailsOpened: !this.state.isDetailsOpened
    });
  };

  handleMatchRetry = () => {
    const {
      selectedRegion,
      selectedSummoner,
      match,
      fetchSummonerMatchDetails
    } = this.props;

    fetchSummonerMatchDetails(
      selectedRegion,
      selectedSummoner,
      match.gameId,
      match.gameCreation,
      match.matchRegion
    );
  };

  render() {
    const { isDetailsOpened } = this.state;
    const { openMatchDetails, handleMatchRetry } = this;
    const {
      selectedSummoner,
      selectedRegion,
      errorSummonerMatchDetails,
      selectedElo,
      champsList,
      match,
      summoner,
      champs,
      blueTeamPlayers,
      redTeamPlayers,
      blueTeamPlayersIds,
      redTeamPlayersIds
    } = this.props;
    if (match.isFetchingMatch) {
      return (
        <tr>
          <td height="100" colSpan="7" className="has-background-grey">
            <Loading className="loader-lg mgx-auto mgy-auto loader-color-black" />
          </td>
        </tr>
      );
    }

    if (match.error) {
      return (
        <tr>
          <td height="100" colSpan="7">
            <div className="fullheight notification is-warning is-flex flex-justify-center flex-vertical flex-align-center">
              <p className="mgb-1 is-size-7-mobile is-size-6-7 is-size-6-tablet">
                <strong>{match.error}</strong>
              </p>
              {match.error ===
                "Can't Fetch Match Details, Please Check Your Connection" && (
                <button className="button is-dark" onClick={handleMatchRetry}>
                  Try Again
                </button>
              )}
            </div>
          </td>
        </tr>
      );
    }

    if (!summoner.hasOwnProperty("participantId")) {
      const { gameId, gameCreation, platformId } = match;
      errorSummonerMatchDetails(selectedRegion, selectedSummoner, {
        error:
          "Sorry, Can't Show Match Details Properly As This Account Info Was Changed (This problem is caused by the official League of Legends API server).",
        gameCreation,
        gameId,
        isFetchingMatch: false,
        matchRegion: platformId
      });
      return null;
    }

    const { stats, championId, spell1Id, spell2Id, participantId } = summoner;
    const champion = champs[championId];
    const {
      totalMinionsKilled,
      neutralMinionsKilled,
      perk0,
      perkSubStyle,
      kills,
      assists,
      deaths,
      win,
      champLevel,
      item0,
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
      visionWardsBoughtInGame
    } = stats;

    let matchColor = "",
      matchColorDark = "",
      matchTextColor = "";
    if (win) {
      matchColor = "has-background-info";
      matchColorDark = "info-dark";
      matchTextColor = "has-text-info-dark";
    } else {
      matchColor = "has-background-danger";
      matchColorDark = "danger-dark";
      matchTextColor = "has-text-danger-dark";
    }
    const multiKill = summoner.stats.largestMultiKill;

    const largestMultiKill = multiKills[multiKill] || "";

    let kda;
    if (deaths === 0) {
      if (kills !== 0 || assists !== 0) {
        kda = `Perfect(${kills + assists})`;
      } else {
        kda = "0";
      }
    } else {
      kda = `${((kills + assists) / deaths).toFixed(2)}`;
    }
    let totalKills,
      summonerTeamPlayers,
      enemyTeamPlayers,
      summonerTeam,
      enemyTeam,
      summonerTeamIds,
      enemyTeamIds;
    if (blueTeamPlayers[0].teamId === summoner.teamId) {
      summonerTeamPlayers = blueTeamPlayers;
      enemyTeamPlayers = redTeamPlayers;
      summonerTeam = match.teams[0];
      enemyTeam = match.teams[1];
      summonerTeamIds = blueTeamPlayersIds;
      enemyTeamIds = redTeamPlayersIds;
      totalKills = blueTeamPlayers.reduce(
        (total, p) => (total += p.stats.kills),
        0
      );
    } else {
      summonerTeamPlayers = redTeamPlayers;
      enemyTeamPlayers = blueTeamPlayers;
      summonerTeam = match.teams[1];
      enemyTeam = match.teams[0];
      summonerTeamIds = redTeamPlayersIds;
      enemyTeamIds = blueTeamPlayersIds;
      totalKills = redTeamPlayers.reduce(
        (total, p) => (total += p.stats.kills),
        0
      );
    }

    const region = regions[selectedRegion];
    const gameDuration = match.gameDuration;
    const totalFarm = totalMinionsKilled + neutralMinionsKilled;
    const farmPerM = (totalFarm / (gameDuration / 60)).toFixed(1);
    const killParticipation =
      totalKills !== 0
        ? Math.round(((kills + assists) / totalKills) * 100)
        : "0";

    const champ = champsList.find(champ => champ.id == championId);
    const role = champ ? ggRoles[champ.roles[0].role] : "";
    const champName = champion.gameName
      .replace(/([^a-z]+)/gi, "")
      .toLowerCase();
    const matchType = queue[match.queueId]
      ? queue[match.queueId].mode
      : "Special Mode";
    return (
      <React.Fragment>
        <tr className={`height-100 ${matchColor}`}>
          <td>
            <p
              className="match-type-width text-overflow mgx-auto"
              title={matchType}
            >
              {matchType}
            </p>
            <p className="match-type-width text-overflow mgx-auto">
              <TimeAgo date={match.gameCreation + gameDuration * 1000} />
            </p>

            <p className={`has-text-weight-bold ${matchTextColor}`}>
              {win ? "Victory" : "Defeat"}
            </p>
            <p>{`${Math.floor(gameDuration / 60)}m ${gameDuration % 60}s`}</p>
          </td>
          <td style={{ maxWidth: "120px" }}>
            <div className="is-flex flex-justify-center">
              <div className="is-flex flex-vertical">
                <ChampImage
                  tooltip={true}
                  champ={champion}
                  className="image is-48x48 mgr-vs"
                  imgStyle="is-rounded"
                />
                {role ? (
                  <Link
                    href={`/champion?elo=${selectedElo}&champName=${champName}&role=${role}`}
                    as={`/champion/${selectedElo}/${champName}/${role}`}
                  >
                    <a
                      className="has-text-white text-overflow is-size-7"
                      style={{ maxWidth: "48px" }}
                    >
                      {champion.gameName}
                    </a>
                  </Link>
                ) : (
                  <p
                    className="has-text-white text-overflow is-size-7-tablet"
                    style={{ maxWidth: "48px" }}
                  >
                    {champion.gameName}
                  </p>
                )}
              </div>
              <div>
                <SummonerSpellImage
                  spellId={spell1Id}
                  className="image is-24x24 mg-vs"
                />
                <SummonerSpellImage
                  spellId={spell2Id}
                  className="image is-24x24 mg-vs"
                />
              </div>
              <div>
                {perk0 && (
                  <RuneImage
                    runeId={perk0}
                    className="image is-28x28"
                    imgStyle="is-rounded has-background-black"
                  />
                )}
                {perkSubStyle && (
                  <RuneImage
                    runeId={perkSubStyle}
                    className="image is-24x24 mgx-auto"
                    imgStyle="is-rounded has-background-black"
                  />
                )}
              </div>
            </div>
          </td>

          <td>
            <Tippy
              theme="translucent"
              arrow={true}
              arrowType="round"
              flipBehavior={["top", "right", "left", "bottom"]}
              content={<p>Kill Participation: {killParticipation}%</p>}
            >
              <p className={matchTextColor}>Kill P. {killParticipation}%</p>
            </Tippy>

            <p>
              {kills}/{deaths}/{assists}
            </p>
            <p>{kda} KDA</p>
            {largestMultiKill && (
              <p
                className={`tag has-text-white is-rounded has-background-${matchColorDark}`}
              >
                {largestMultiKill}
              </p>
            )}
          </td>
          <td>
            {queue[match.queueId] && (
              <p
                className="map-width text-overflow mgx-auto"
                title={queue[match.queueId].map}
              >
                {queue[match.queueId].map}
              </p>
            )}
            <Tippy
              theme="translucent"
              arrow={true}
              arrowType="round"
              flipBehavior={["top", "right", "left", "bottom"]}
              content={
                <React.Fragment>
                  <p>Minions: {totalMinionsKilled}</p>
                  <p>Monsters: {neutralMinionsKilled}</p>
                  <p>CS Per Minute: {farmPerM}</p>
                </React.Fragment>
              }
            >
              <p className={matchTextColor}>
                {totalFarm}({farmPerM}) Cs
              </p>
            </Tippy>
            <p>Champlvl {champLevel}</p>
          </td>
          <td className="is-hidden-vvsm summoner-items-width">
            <div className="is-flex flex-wrap" style={{ width: "fit-content" }}>
              <ItemImage itemId={item0} className="image is-24x24 mg" />
              <ItemImage itemId={item1} className="image is-24x24 mg" />
              <ItemImage itemId={item2} className="image is-24x24 mg" />
              <ItemImage itemId={item6} className="image is-24x24 mg" />
              <ItemImage itemId={item3} className="image is-24x24 mg" />
              <ItemImage itemId={item4} className="image is-24x24 mg" />
              <ItemImage itemId={item5} className="image is-24x24 mg" />
            </div>
            {visionWardsBoughtInGame ? (
              <p className="is-size-7">
                Control Wards: {visionWardsBoughtInGame}
              </p>
            ) : null}
          </td>
          <td className="is-hidden-sm">
            <div className="is-flex">
              <div className="mgr-s" style={{ width: "72px" }}>
                {blueTeamPlayers.map((p, i) => {
                  return (
                    <MatchPlayers
                      key={p.participantId}
                      champId={p.championId}
                      player={blueTeamPlayersIds[i]}
                      isSummoner={p.participantId === participantId}
                      matchTextColor={matchTextColor}
                    />
                  );
                })}
              </div>
              <div style={{ width: "72px" }}>
                {redTeamPlayers.map((p, i) => {
                  return (
                    <MatchPlayers
                      key={p.participantId}
                      champId={p.championId}
                      player={redTeamPlayersIds[i]}
                      isSummoner={p.participantId === participantId}
                      matchTextColor={matchTextColor}
                    />
                  );
                })}
              </div>
            </div>
          </td>
          <td className="is-paddingless is-hidden-mobile" height="100">
            <button
              className={classNames(
                "button fullheight fullwidth is-radiusless",
                `is-${matchColorDark}`,
                isDetailsOpened && "is-active"
              )}
              onClick={openMatchDetails}
              aria-label="show match details"
            >
              <span className="icon">
                <i
                  className="material-icons md-32"
                  style={{ position: "absolute", bottom: "10px" }}
                >
                  {isDetailsOpened ? "expand_less" : "expand_more"}
                </i>
              </span>
            </button>
          </td>
        </tr>
        <tr className="is-hidden-tablet">
          <td className="is-paddingless" colSpan="6">
            <button
              className={`button fullwidth is-small is-${matchColorDark}`}
              onClick={this.openMatchDetails}
              aria-label="show match details"
            >
              <span className="icon is-small">
                <i className="material-icons">
                  {isDetailsOpened ? "expand_less" : "expand_more"}
                </i>
              </span>
            </button>
          </td>
        </tr>
        {isDetailsOpened && (
          <tr>
            <td colSpan="7" className="is-paddingless">
              <table className="table fullwidth has-text-black mgb-1">
                <tbody>
                  <MatchDetails
                    players={summonerTeamPlayers}
                    playersIds={summonerTeamIds}
                    team={summonerTeam}
                    summoner={summoner}
                    gameDuration={gameDuration}
                    region={region}
                    selectedElo={selectedElo}
                    champsList={champsList}
                    champs={champs}
                  />
                  <MatchDetails
                    players={enemyTeamPlayers}
                    playersIds={enemyTeamIds}
                    team={enemyTeam}
                    summoner={summoner}
                    gameDuration={gameDuration}
                    region={region}
                    selectedElo={selectedElo}
                    champsList={champsList}
                    champs={champs}
                  />
                </tbody>
              </table>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { selectedRegion, selectedSummoner, selectedElo, champs } = state;
  const summoner = getSummonerPerMatch(state, ownProps.index);
  const {
    blueTeamPlayers,
    redTeamPlayers,
    blueTeamPlayersIds,
    redTeamPlayersIds
  } = getTeamsPerMatch(ownProps.match);
  const champsList = getModifiedChampsList(state);
  return {
    selectedElo,
    champsList,
    summoner,
    champs,
    selectedRegion,
    selectedSummoner,
    blueTeamPlayers,
    redTeamPlayers,
    blueTeamPlayersIds,
    redTeamPlayersIds
  };
};

const mapDispatchToProps = {
  fetchSummonerMatchDetails,
  errorSummonerMatchDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Match);
