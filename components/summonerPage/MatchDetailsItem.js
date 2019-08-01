import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import Link from "next/link";
import Tippy from "@tippy.js/react";

import { ggRoles } from "../../constants/ggConstants";
import { regions } from "../../constants/lolConstants";
import { getKeyByValue } from "../../utils/utils";

import ItemImage from "../common/ItemImage";
import EmptyImage from "../common/EmptyImage";
import RuneImage from "../common/RuneImage";
import SummonerSpellImage from "../common/SummonerSpellImage";
import ChampImage from "../common/ChampImage";

function MatchDetailsItem({
  p,
  index,
  champion,
  playersIds,
  summoner,
  champsList,
  gameDuration,
  totalKills,
  selectedElo,
  backgroundDark,
  badgeColor,
  badgeColorDark,
  backgroundDarkest
}) {
  const {
    championId,
    participantId,
    spell1Id,
    spell2Id,
    highestAchievedSeasonTier,
    stats
  } = p;
  const {
    perk0,
    perkSubStyle,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    kills,
    deaths,
    assists,
    totalDamageDealt,
    totalDamageDealtToChampions,
    totalMinionsKilled,
    neutralMinionsKilled,
    visionWardsBoughtInGame,
    wardsPlaced,
    wardsKilled,
    goldEarned,
    champLevel,
    win
  } = stats;
  const wardsPlacedCount = wardsPlaced ? wardsPlaced : "0";
  const wardsKilledCount = wardsKilled ? wardsKilled : "0";
  const totalFarm = totalMinionsKilled + neutralMinionsKilled;
  const farmPerM = (totalFarm / (gameDuration / 60)).toFixed(1);
  const isSummoner = participantId === summoner.participantId;
  const player = playersIds[index];
  const { currentPlatformId, summonerName } = player;
  const summonerLink = summonerName.toLowerCase().replace(/([ ]+)/gi, "");
  const champ = champsList.find(champion => champion.id == championId);
  const role = champ ? ggRoles[champ.roles[0].role] : "";
  const champName = champion.gameName.replace(/([^a-z]+)/gi, "").toLowerCase();
  const region = getKeyByValue(regions, currentPlatformId.toLowerCase());
  let kda;
  if (deaths === 0) {
    if (kills !== 0 || assists !== 0) {
      kda = `Perfect(${kills + assists})`;
    } else {
      kda = "0";
    }
  } else {
    kda = `${((kills + assists) / deaths).toFixed(1)}`;
  }
  const killParticipation =
    totalKills !== 0 ? Math.round(((kills + assists) / totalKills) * 100) : "0";

  const damageToChampionsPercent =
    (totalDamageDealtToChampions / totalDamageDealt) * 100;

  return (
    <tr
      className={classNames(
        win
          ? isSummoner
            ? "has-background-info has-text-white"
            : "has-background-info-light"
          : isSummoner
          ? "has-background-danger has-text-white"
          : "has-background-danger-light"
      )}
      key={participantId}
    >
      <td style={{ width: "80px" }}>
        <div style={{ width: "max-content" }} className="is-flex mgx-auto">
          {role ? (
            <Link
              href={`/champion?elo=${selectedElo}&champName=${champName}&role=${role}`}
              as={`/champion/${selectedElo}/${champName}/${role}`}
            >
              <a>
                <ChampImage
                  tooltip={true}
                  champ={champion}
                  className={classNames(
                    "image is-40x40 mgr-vs badge is-badge-bottom-left is-badge-small",
                    isSummoner ? badgeColorDark : badgeColor
                  )}
                  imgStyle="is-rounded"
                  badgeData={champLevel}
                />
              </a>
            </Link>
          ) : (
            <ChampImage
              tooltip={true}
              champ={champion}
              className={classNames(
                "image is-40x40 mgr-vs badge is-badge-bottom-left is-badge-small",
                isSummoner ? badgeColorDark : badgeColor
              )}
              imgStyle="is-rounded"
              badgeData={champLevel}
            />
          )}

          <div>
            {spell1Id ? (
              <SummonerSpellImage
                spellId={spell1Id}
                className="image is-20x20 mg-vs"
              />
            ) : (
              <EmptyImage className="image is-20x20 has-background-grey" />
            )}
            {spell2Id ? (
              <SummonerSpellImage
                spellId={spell2Id}
                className="image is-20x20 mg-vs"
              />
            ) : (
              <EmptyImage className="image is-20x20 has-background-grey" />
            )}
          </div>
          <div>
            {perk0 && (
              <RuneImage
                runeId={perk0}
                className="image is-24x24"
                imgStyle="is-rounded has-background-black"
              />
            )}
            {perkSubStyle && (
              <RuneImage
                runeId={perkSubStyle}
                className="image is-20x20 mgx-auto"
                imgStyle="is-rounded has-background-black"
              />
            )}
          </div>
        </div>
      </td>
      <td className="is-paddingless player-name-width">
        <div className="has-text-left text-overflow player-name-width">
          <Link
            href={`/summoner?region=${region}&summonerName=${summonerLink}`}
            as={`/summoner/${region}/${summonerLink}`}
          >
            <a
              title={summonerName}
              className={classNames(
                isSummoner
                  ? "has-text-weight-bold has-text-white"
                  : "has-text-black"
              )}
            >
              {summonerName}
            </a>
          </Link>
        </div>
      </td>
      <td className="players-items-width">
        <div className="is-flex flex-wrap" style={{ width: "88px" }}>
          <ItemImage itemId={item0} className="image is-20x20 mg" />
          <ItemImage itemId={item1} className="image is-20x20 mg" />
          <ItemImage itemId={item2} className="image is-20x20 mg" />
          <ItemImage itemId={item6} className="image is-20x20 mg" />
          <ItemImage itemId={item3} className="image is-20x20 mg" />
          <ItemImage itemId={item4} className="image is-20x20 mg" />
          <ItemImage itemId={item5} className="image is-20x20 mg" />
        </div>
      </td>
      <td className="is-hidden-vvvsm">
        <p>
          {kills}/{deaths}/{assists}
        </p>
        <p>
          {kda}{" "}
          <Tippy
            theme="translucent"
            arrow={true}
            arrowType="round"
            flipBehavior={["top", "right", "left", "bottom"]}
            content={<p>Kill Participation: {killParticipation}%</p>}
          >
            <span>
              ({killParticipation}
              %)
            </span>
          </Tippy>
        </p>
        <p />
      </td>
      <td className="is-hidden-vvsm">
        <p>{totalDamageDealtToChampions}</p>
        <Tippy
          theme="translucent"
          arrow={true}
          arrowType="round"
          flipBehavior={["top", "right", "left", "bottom"]}
          content={
            <React.Fragment>
              <p>Total Damage: {totalDamageDealt}</p>
              <p>Total Damage To Champions: {totalDamageDealtToChampions}</p>
            </React.Fragment>
          }
        >
          <div
            className={classNames(
              "border-radius-4 is-flex fullwidth has-background-grey-light",
              isSummoner ? "is-bordered" : "selected-role"
            )}
            style={{ height: "15px" }}
          >
            <div
              style={{ width: `${damageToChampionsPercent}%` }}
              className={classNames(
                "progress-left",
                isSummoner ? backgroundDarkest : backgroundDark
              )}
            />
          </div>
        </Tippy>
      </td>
      <td className="is-hidden-vsm">
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
          <div>
            <p>{totalFarm}</p>
            <p>
              {farmPerM}
              /m
            </p>
          </div>
        </Tippy>
      </td>
      <td className="is-hidden-sm">
        <p>{visionWardsBoughtInGame}</p>
        <p>
          {wardsPlacedCount}/{wardsKilledCount}
        </p>
      </td>
      <td className="is-hidden-vvsm">{goldEarned}</td>
      <td>
        {highestAchievedSeasonTier
          ? highestAchievedSeasonTier.toLowerCase()
          : "___"}
      </td>
    </tr>
  );
}

MatchDetailsItem.propTypes = {
  p: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  champion: PropTypes.object.isRequired,
  playersIds: PropTypes.array.isRequired,
  summoner: PropTypes.object.isRequired,
  champsList: PropTypes.array.isRequired,
  gameDuration: PropTypes.number.isRequired,
  totalKills: PropTypes.number.isRequired,
  selectedElo: PropTypes.string.isRequired,
  backgroundDark: PropTypes.string.isRequired,
  badgeColor: PropTypes.string.isRequired,
  badgeColorDark: PropTypes.string.isRequired,
  backgroundDarkest: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  champion: state.champs[ownProps.p.championId]
});

export default connect(mapStateToProps)(MatchDetailsItem);
