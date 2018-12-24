import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import sortBy from "sort-by";

const getSummonerMatchesDetails = state => {
  const summonerMatchesDetails =
    state.summonersByRegion[state.selectedRegion][state.selectedSummoner]
      .summonerMatchesDetails || [];
  return summonerMatchesDetails;
};

export const getSortedSummonerMatchesDetails = createSelector(
  getSummonerMatchesDetails,
  summonerMatchesDetails => {
    const sortedSummonerMatchesDetails = summonerMatchesDetails.sort(
      sortBy("-gameCreation")
    );
    return sortedSummonerMatchesDetails;
  }
);

const getSummonerInfo = state =>
  state.summonersByRegion[state.selectedRegion][state.selectedSummoner]
    .summonerInfo;

// Normal reselect routine: declare "inputSelectors" and "resultFunc"
export const getSummonerPerMatch = createCachedSelector(
  // inputSelectors
  getSortedSummonerMatchesDetails,
  getSummonerInfo,
  (_state, index) => index,

  // resultFunc
  (summonerMatchesDetails, summonerInfo, index) => {
    let summonerId,
      summoner = {};

    const match = summonerMatchesDetails[index];
    if (match.gameDuration) {
      match.participantIdentities.forEach(p => {
        // TODO: maybe use p.player.currentAccountId === summonerInfo.accountId
        if (p.player.currentAccountId === summonerInfo.accountId) {
          summonerId = p.participantId;
        }
      });
      match.participants.forEach(p => {
        if (p.participantId === summonerId) {
          summoner = p;
        }
      });
    }

    return summoner;
  }
)((_state, index) => index);

export const getTeamsPerMatch = createCachedSelector(
  // inputSelectors
  match => match,
  match => {
    let blueTeamPlayers = [],
      redTeamPlayers = [],
      blueTeamPlayersIds = [],
      redTeamPlayersIds = [];
    if (match.seasonId) {
      blueTeamPlayers = match.participants.filter(p => p.teamId === 100);
      redTeamPlayers = match.participants.filter(p => p.teamId === 200);
      blueTeamPlayersIds = blueTeamPlayers.map(
        p =>
          match.participantIdentities.find(
            id => id.participantId === p.participantId
          ).player
      );
      redTeamPlayersIds = redTeamPlayers.map(
        p =>
          match.participantIdentities.find(
            id => id.participantId === p.participantId
          ).player
      );
    }
    return {
      blueTeamPlayers,
      redTeamPlayers,
      blueTeamPlayersIds,
      redTeamPlayersIds
    };
  }
)(match => match.gameId);
