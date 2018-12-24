import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import classNames from "classnames";

import { regions } from "../../constants/lolConstants";
import { getKeyByValue } from "../../utils/utils";

import ChampImage from "../common/ChampImage";

const MatchPlayers = ({ champId, player, isSummoner, matchTextColor }) => {
  const { currentPlatformId, summonerName } = player;
  const summonerLink = summonerName.toLowerCase().replace(/([ ]+)/gi, "");
  const region = getKeyByValue(regions, currentPlatformId.toLowerCase());

  return (
    <div className="is-flex">
      <ChampImage
        tooltip={true}
        champId={champId}
        className="image is-16x16 mgr-vs"
        imgStyle={classNames(isSummoner && "is-rounded")}
      />
      <Link
        href={`/summoner?region=${region}&summonerName=${summonerLink}`}
        as={`/summoner/${region}/${summonerLink}`}
      >
        <a
          title={summonerName}
          style={{ width: "54px" }}
          className={classNames(
            "is-size-7 text-overflow has-text-left",
            isSummoner
              ? `has-text-weight-bold has-text-black ${matchTextColor}`
              : "has-text-white"
          )}
        >
          {summonerName}
        </a>
      </Link>
    </div>
  );
};

MatchPlayers.propTypes = {
  champId: PropTypes.number.isRequired,
  player: PropTypes.object.isRequired,
  isSummoner: PropTypes.bool.isRequired,
  matchTextColor: PropTypes.string.isRequired
};

export default MatchPlayers;
