import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "next/link";

import ChampImage from "../common/ChampImage";

function OverviewTableRaw({
  bestData,
  worstData,
  role,
  selectedElo,
  bestChamp,
  worstChamp,
  title,
  sortBy,
  order
}) {
  let bestScore, worstScore;
  switch (title) {
    case "WIN RATES":
      bestScore = (bestData.score * 100).toFixed(1) + "%";
      worstScore = (worstData.score * 100).toFixed(1) + "%";
      break;
    case "OVERALL PERFORMANCE RANKING":
      bestScore = Math.round(bestData.score);
      worstScore = Math.round(worstData.score);
      break;
    case "CHAMPION RANKING CHANGE":
      bestScore = "+" + Math.round(bestData.score);
      worstScore = Math.round(worstData.score);
      break;
  }
  const bestChampName = bestChamp.name.replace(/([^a-z]+)/gi, "").toLowerCase();
  const worstChampName = worstChamp.name
    .replace(/([^a-z]+)/gi, "")
    .toLowerCase();
  return (
    <tr>
      <td>
        <Link
          href={`/statistics?elo=${selectedElo}&sortBy=${sortBy}&order=${order}&roleFilter=${role}`}
          as={`/statistics/${selectedElo}?sortBy=${sortBy}&order=${order}&roleFilter=${role}`}
        >
          <a className="is-capitalized has-text-primary">{role}</a>
        </Link>
      </td>
      <td className="has-text-info">
        <div className="is-flex flex-align-center flex-justify-space-between fullwidth">
          <Link
            href={`/champion?elo=${selectedElo}&champName=${bestChampName}&role=${role}`}
            as={`/champion/${selectedElo}/${bestChampName}/${role}`}
          >
            <a className="has-text-info is-flex flex-align-center">
              <ChampImage
                tooltip={true}
                className="image is-32x32 mgr-s"
                champ={bestChamp}
              />
              <p className="overview-champ text-overflow">
                {bestChamp.gameName}
              </p>
            </a>
          </Link>
          <p>{bestScore}</p>
        </div>
      </td>
      <td className="has-text-danger">
        <div className="is-flex flex-align-center flex-justify-space-between">
          <Link
            href={`/champion?elo=${selectedElo}&champName=${worstChampName}&role=${role}`}
            as={`/champion/${selectedElo}/${worstChampName}/${role}`}
          >
            <a className="has-text-danger is-flex flex-align-center">
              <ChampImage
                tooltip={true}
                className="image is-32x32 mgr-s"
                champ={worstChamp}
              />
              <p className="overview-champ text-overflow">
                {worstChamp.gameName}
              </p>
            </a>
          </Link>
          <p>{worstScore}</p>
        </div>
      </td>
    </tr>
  );
}

OverviewTableRaw.propTypes = {
  bestData: PropTypes.object.isRequired,
  worstData: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  selectedElo: PropTypes.string.isRequired,
  bestChamp: PropTypes.object.isRequired,
  worstChamp: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { selectedElo, champs } = state;
  return {
    selectedElo,
    bestChamp: champs[ownProps.bestData.championId],
    worstChamp: champs[ownProps.worstData.championId]
  };
};

export default connect(mapStateToProps)(OverviewTableRaw);
