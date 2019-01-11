import { regions } from "../constants/lolConstants";

export const SELECT_REGION = "SELECT_REGION";
export const SELECT_SUMMONER = "SELECT_SUMMONER";
export const SUMMONER_REQUEST = "SUMMONER_REQUEST";
export const SUMMONER_RECEIVE = "SUMMONER_RECEIVE";
export const SUMMONER_ERROR = "SUMMONER_ERROR";
export const SUMMONER_RANK_REQUEST = "SUMMONER_RANK_REQUEST";
export const SUMMONER_RANK_RECEIVE = "SUMMONER_RANK_RECEIVE";
export const SUMMONER_RANK_ERROR = "SUMMONER_RANK_ERROR";
export const SUMMONER_MATCHES_REQUEST = "SUMMONER_MATCHES_REQUEST";
export const SUMMONER_MATCHES_RECEIVE = "SUMMONER_MATCHES_RECEIVE";
export const SUMMONER_MATCHES_ERROR = "SUMMONER_MATCHES_ERROR";
export const SUMMONER_MATCHES_RANGE = "SUMMONER_MATCHES_RANGE";
export const RESET_SUMMONER_DETAILS = "RESET_SUMMONER_DETAILS";
export const SUMMONER_MATCH_DETAILS_REQUEST = "SUMMONER_MATCH_DETAILS_REQUEST";
export const SUMMONER_MATCH_DETAILS_RECEIVE = "SUMMONER_MATCH_DETAILS_RECEIVE";
export const SUMMONER_MATCH_DETAILS_ERROR = "SUMMONER_MATCH_DETAILS_ERROR";
export const FINISH_FETCHING = "FINISH_FETCHING";
export const SUMMONER_UPDATE = "SUMMONER_UPDATE";

export const selectRegion = region => ({
  type: SELECT_REGION,
  region
});

export const selectSummoner = (summonerName, region) => ({
  type: SELECT_SUMMONER,
  summonerName,
  region
});

const shouldUpdateSummoner = (region, summonerName) => ({
  type: SUMMONER_UPDATE,
  region,
  summonerName
});

const requestSummoner = (region, summonerName) => ({
  type: SUMMONER_REQUEST,
  summonerName,
  region
});

const receiveSummoner = (region, summonerName, response) => ({
  type: SUMMONER_RECEIVE,
  summonerInfo: response.data,
  summonerName,
  region
});

const errorSummoner = (region, summonerName, error) => ({
  type: SUMMONER_ERROR,
  summonerError: error,
  summonerName,
  region
});

const requestSummonerRank = (region, summonerName) => ({
  type: SUMMONER_RANK_REQUEST,
  summonerName,
  region
});

const receiveSummonerRank = (region, summonerName, response) => ({
  type: SUMMONER_RANK_RECEIVE,
  summonerRank: response.data,
  summonerName,
  region
});

const errorSummonerRank = (region, summonerName, error) => ({
  type: SUMMONER_RANK_ERROR,
  summonerRankError: error,
  summonerName,
  region
});

const requestSummonerMatches = (region, summonerName) => ({
  type: SUMMONER_MATCHES_REQUEST,
  summonerName,
  region
});

const receiveSummonerMatches = (region, summonerName, response) => ({
  type: SUMMONER_MATCHES_RECEIVE,
  summonerMatches: response.data.matches,
  summonerName,
  region
});

const errorSummonerMatches = (region, summonerName, error) => ({
  type: SUMMONER_MATCHES_ERROR,
  summonerMatchesError: error,
  summonerName,
  region
});

const setMatchesRange = (region, summonerName) => ({
  type: SUMMONER_MATCHES_RANGE,
  summonerName,
  region
});

const resetSummonerDetails = (region, summonerName) => ({
  type: RESET_SUMMONER_DETAILS,
  summonerName,
  region
});

const requestSummonerMatchDetails = (
  region,
  summonerName,
  summonerMatchRequest
) => ({
  type: SUMMONER_MATCH_DETAILS_REQUEST,
  summonerName,
  region,
  summonerMatchRequest
});

const receiveSummonerMatchDetails = (
  region,
  summonerName,
  summonerMatchDetails
) => ({
  type: SUMMONER_MATCH_DETAILS_RECEIVE,
  summonerMatchDetails,
  summonerName,
  region
});

export const errorSummonerMatchDetails = (
  region,
  summonerName,
  summonerMatchDetailsError
) => ({
  type: SUMMONER_MATCH_DETAILS_ERROR,
  summonerMatchDetailsError,
  summonerName,
  region
});

const finishFetching = (region, summonerName) => ({
  type: FINISH_FETCHING,
  region,
  summonerName
});

const fetchSummonerInfo = (region, summonerName, shouldUpdate) => (
  dispatch,
  _getState,
  { axiosLol }
) => {
  dispatch(requestSummoner(region, summonerName));
  return axiosLol(
    `/summoner/${regions[region]}/${encodeURIComponent(summonerName)}${
      shouldUpdate ? `?update=${shouldUpdate}` : ""
    }`
  )
    .then(response => {
      dispatch(receiveSummoner(region, summonerName, response));
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        return Promise.resolve(
          dispatch(errorSummoner(region, summonerName, "Summoner Not Found"))
        );
      } else {
        return Promise.resolve(
          dispatch(
            errorSummoner(
              region,
              summonerName,
              "Can't Fetch Summoner Data, Please Check Your Connection"
            )
          )
        );
      }
    });
};

export const fetchSummonerRank = (region, summonerName, summonerId) => (
  dispatch,
  _getState,
  { axiosLol }
) => {
  dispatch(requestSummonerRank(region, summonerName));
  return axiosLol(
    `/rank/${regions[region]}/${encodeURIComponent(
      summonerName
    )}?summonerId=${summonerId}`
  )
    .then(response => {
      if (response.data.length === 0) {
        dispatch(
          errorSummonerRank(
            region,
            summonerName,
            "Summoner Is Not Ranked This Season"
          )
        );
      }
      dispatch(receiveSummonerRank(region, summonerName, response));
    })
    .catch(error => {
      dispatch(
        errorSummonerRank(
          region,
          summonerName,
          "Can't Fetch Summoner Rank Data, Please Check Your Connection"
        )
      );
    });
};

const fetchSummonerMatches = (
  region,
  summonerName,
  accountId,
  beginIndex,
  endIndex,
  timestamp
) => (dispatch, _getState, { axiosLol }) => {
  dispatch(requestSummonerMatches(region, summonerName));
  return axiosLol(
    `/matchesList/${regions[region]}/${encodeURIComponent(
      summonerName
    )}/${beginIndex}/${endIndex}?accountId=${accountId}${
      timestamp ? `&timestamp=${timestamp}` : ""
    }`
  )
    .then(response => {
      if (response.data.matches.length === 0 && beginIndex === 0) {
        dispatch(
          errorSummonerMatches(
            region,
            summonerName,
            "Summoner Didn't Play Any Matches This Season"
          )
        );
      } else if (response.data.matches.length === 0) {
        dispatch(
          errorSummonerMatches(
            region,
            summonerName,
            "Summoner Didn't Play Any More Matches This Season"
          )
        );
      } else {
        dispatch(receiveSummonerMatches(region, summonerName, response));
      }
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 422) {
          dispatch(
            errorSummonerMatches(
              region,
              summonerName,
              "No Matches Are Recorded. Summoner didn't play any matches recently"
            )
          );
        } else if (error.response.status === 404) {
          dispatch(
            errorSummonerMatches(
              region,
              summonerName,
              "No Matches Are Found For This Summoner"
            )
          );
        }
      } else {
        dispatch(
          errorSummonerMatches(
            region,
            summonerName,
            "Can't Fetch Summoner Matches, Please Check Your Connection"
          )
        );
      }
    });
};

export const fetchSummonerMatchDetails = (
  region,
  summonerName,
  matchId,
  gameCreation,
  matchRegion
) => (dispatch, _getState, { axiosLol }) => {
  dispatch(
    requestSummonerMatchDetails(region, summonerName, {
      gameId: matchId,
      gameCreation,
      isFetchingMatch: true
    })
  );
  return axiosLol(`/match/${matchRegion}/${matchId}`)
    .then(response => {
      dispatch(
        receiveSummonerMatchDetails(region, summonerName, {
          ...response.data,
          isFetchingMatch: false
        })
      );
    })
    .catch(error => {
      console.log("Match Error", error);
      dispatch(
        errorSummonerMatchDetails(region, summonerName, {
          error: "Can't Fetch Match Details, Please Check Your Connection",
          gameCreation,
          gameId: matchId,
          isFetchingMatch: false,
          matchRegion
        })
      );
    });
};

export const fetchMatches = (region, summonerName) => (dispatch, getState) => {
  const accountId = getState().summonersByRegion[region][summonerName]
    .summonerInfo.accountId;

  const {
    beginIndex,
    endIndex,
    summonerMatchesError
  } = getState().summonersByRegion[region][summonerName];
  if (
    summonerMatchesError &&
    summonerMatchesError !==
      "Can't Fetch Summoner Matches, Please Check Your Connection"
  ) {
    return;
  }

  let summonerMatches, timestamp;
  if (beginIndex > 0) {
    summonerMatches = getState().summonersByRegion[region][summonerName]
      .summonerMatches;
    timestamp = summonerMatches[summonerMatches.length - 1].timestamp;
  }

  return dispatch(
    fetchSummonerMatches(
      region,
      summonerName,
      accountId,
      beginIndex,
      endIndex,
      timestamp
    )
  ).then(() => {
    const summonerMatchesError = getState().summonersByRegion[region][
      summonerName
    ].summonerMatchesError;
    if (summonerMatchesError) {
      return;
    }
    const matches = getState().summonersByRegion[region][summonerName]
      .summonerMatches;
    return Promise.all(
      matches.map((match, index) => {
        if (index >= beginIndex) {
          let matchRegion = match.platformId;
          return dispatch(
            fetchSummonerMatchDetails(
              region,
              summonerName,
              match.gameId,
              match.timestamp,
              matchRegion
            )
          );
        }
      })
    ).then(() => {
      dispatch(finishFetching(region, summonerName));
    });
  });
};

const fetchSummonerDetails = (region, summonerName, shouldUpdate) => (
  dispatch,
  getState
) => {
  return dispatch(fetchSummonerInfo(region, summonerName, shouldUpdate)).then(
    async () => {
      const summonerError = getState().summonersByRegion[region][summonerName]
        .summonerError;

      if (summonerError) {
        return;
      }

      const summonerId = getState().summonersByRegion[region][summonerName]
        .summonerInfo.id;

      await dispatch(fetchSummonerRank(region, summonerName, summonerId));
      return dispatch(fetchMatches(region, summonerName));
    }
  );
};

export const fetchSummoner = (region, summonerName) => (dispatch, getState) => {
  const { summonerInfo, summonerError } =
    getState().summonersByRegion[region] &&
    getState().summonersByRegion[region][summonerName]
      ? getState().summonersByRegion[region][summonerName]
      : { summonerInfo: {}, summonerError: "" };
  if (
    (summonerInfo && summonerInfo.name) ||
    summonerError === "Summoner Not Found"
  ) {
    return;
  }

  dispatch(resetSummonerDetails(region, summonerName));
  const shouldUpdate = getState().summonersByRegion[region][summonerName]
    .shouldUpdate;
  return dispatch(fetchSummonerDetails(region, summonerName, shouldUpdate));
};

export const fetchMoreMatches = (region, summonerName) => dispatch => {
  dispatch(setMatchesRange(region, summonerName));
  return dispatch(fetchMatches(region, summonerName));
};

export const updateSummoner = (region, summonerName) => (
  dispatch,
  getState
) => {
  dispatch(shouldUpdateSummoner(region, summonerName));
  dispatch(resetSummonerDetails(region, summonerName));
  const shouldUpdate = getState().summonersByRegion[region][summonerName]
    .shouldUpdate;
  dispatch(fetchSummonerDetails(region, summonerName, shouldUpdate));
};
