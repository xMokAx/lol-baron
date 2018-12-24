import {
  SELECT_REGION,
  SELECT_SUMMONER,
  SUMMONER_REQUEST,
  SUMMONER_RECEIVE,
  SUMMONER_ERROR,
  SUMMONER_MATCHES_RECEIVE,
  SUMMONER_MATCHES_REQUEST,
  SUMMONER_MATCHES_ERROR,
  SUMMONER_MATCHES_RANGE,
  SUMMONER_MATCH_DETAILS_REQUEST,
  SUMMONER_MATCH_DETAILS_RECEIVE,
  SUMMONER_MATCH_DETAILS_ERROR,
  RESET_SUMMONER_DETAILS,
  SUMMONER_RANK_REQUEST,
  SUMMONER_RANK_RECEIVE,
  SUMMONER_RANK_ERROR,
  FINISH_FETCHING,
  SUMMONER_UPDATE
} from "../actions/lolActions";

export const selectedRegion = (state = "eune", action) => {
  switch (action.type) {
    case SELECT_REGION:
      return action.region;
    default:
      return state;
  }
};

export const selectedSummoner = (state = "", action) => {
  switch (action.type) {
    case SELECT_SUMMONER:
      return action.summonerName;
    default:
      return state;
  }
};

const summonerDetails = (
  state = {
    isFetching: false,
    shouldUpdate: false,
    isFetchingSummoner: false,
    isFetchingRank: false,
    isFetchingMatches: false,
    beginIndex: 0,
    endIndex: 10,
    summonerError: "",
    summonerRankError: "",
    summonerMatchesError: "",
    summonerInfo: {},
    summonerRank: [],
    summonerMatches: [],
    summonerMatchesDetails: []
  },
  action
) => {
  switch (action.type) {
    case SUMMONER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetchingSummoner: true,
        summonerError: ""
      };
    case SUMMONER_RECEIVE:
      return {
        ...state,
        isFetchingSummoner: false,
        summonerInfo: action.summonerInfo,
        shouldUpdate: false
      };
    case SUMMONER_ERROR:
      return {
        ...state,
        isFetchingSummoner: false,
        summonerError: action.summonerError
      };
    case SUMMONER_RANK_REQUEST:
      return {
        ...state,
        isFetchingRank: true,
        summonerRankError: ""
      };
    case SUMMONER_RANK_RECEIVE:
      return {
        ...state,
        isFetchingRank: false,
        summonerRank: action.summonerRank
      };
    case SUMMONER_RANK_ERROR:
      return {
        ...state,
        isFetchingRank: false,
        summonerRankError: action.summonerRankError
      };
    case SUMMONER_MATCHES_RANGE:
      return {
        ...state,
        beginIndex: state.beginIndex + 10,
        endIndex: state.endIndex + 10
      };
    case RESET_SUMMONER_DETAILS:
      return {
        ...state,
        beginIndex: 0,
        endIndex: 10,
        summonerInfo: {},
        summonerRank: [],
        summonerMatches: [],
        summonerMatchesDetails: []
      };
    case SUMMONER_MATCHES_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetchingMatches: true,
        summonerMatchesError: "",
        noMoreMatches: ""
      };
    case SUMMONER_MATCHES_RECEIVE:
      return {
        ...state,
        isFetchingMatches: false,
        summonerMatches: [...state.summonerMatches, ...action.summonerMatches]
      };
    case SUMMONER_MATCHES_ERROR:
      return {
        ...state,
        isFetching: false,
        isFetchingMatches: false,
        summonerMatchesError: action.summonerMatchesError
      };
    case SUMMONER_MATCH_DETAILS_REQUEST:
      return {
        ...state,
        summonerMatchesDetails: state.summonerMatchesDetails
          .filter(match => match.gameId !== action.summonerMatchRequest.gameId)
          .concat(action.summonerMatchRequest)
      };
    case SUMMONER_MATCH_DETAILS_RECEIVE:
      return {
        ...state,
        summonerMatchesDetails: state.summonerMatchesDetails
          .filter(match => match.gameId !== action.summonerMatchDetails.gameId)
          .concat(action.summonerMatchDetails)
      };
    case SUMMONER_MATCH_DETAILS_ERROR:
      return {
        ...state,
        summonerMatchesDetails: state.summonerMatchesDetails
          .filter(
            match => match.gameId !== action.summonerMatchDetailsError.gameId
          )
          .concat(action.summonerMatchDetailsError)
      };
    case FINISH_FETCHING:
      return {
        ...state,
        isFetching: false
      };
    case SUMMONER_UPDATE:
      return {
        ...state,
        shouldUpdate: true
      };
    default:
      return state;
  }
};

const summonerDetailsBySummoner = (state = {}, action) => {
  switch (action.type) {
    case SELECT_SUMMONER:
    case SUMMONER_REQUEST:
    case SUMMONER_RECEIVE:
    case SUMMONER_ERROR:
    case SUMMONER_MATCHES_RECEIVE:
    case SUMMONER_MATCHES_REQUEST:
    case SUMMONER_MATCHES_ERROR:
    case SUMMONER_MATCHES_RANGE:
    case SUMMONER_MATCH_DETAILS_REQUEST:
    case SUMMONER_MATCH_DETAILS_RECEIVE:
    case SUMMONER_MATCH_DETAILS_ERROR:
    case RESET_SUMMONER_DETAILS:
    case SUMMONER_RANK_REQUEST:
    case SUMMONER_RANK_RECEIVE:
    case SUMMONER_RANK_ERROR:
    case FINISH_FETCHING:
    case SUMMONER_UPDATE:
      return {
        ...state,
        [action.summonerName]: summonerDetails(
          state[action.summonerName],
          action
        )
      };
    default:
      return state;
  }
};

export const summonersByRegion = (state = {}, action) => {
  switch (action.type) {
    case SELECT_SUMMONER:
    case SUMMONER_REQUEST:
    case SUMMONER_RECEIVE:
    case SUMMONER_ERROR:
    case SUMMONER_MATCHES_RECEIVE:
    case SUMMONER_MATCHES_REQUEST:
    case SUMMONER_MATCHES_ERROR:
    case SUMMONER_MATCHES_RANGE:
    case SUMMONER_MATCH_DETAILS_REQUEST:
    case SUMMONER_MATCH_DETAILS_RECEIVE:
    case SUMMONER_MATCH_DETAILS_ERROR:
    case RESET_SUMMONER_DETAILS:
    case SUMMONER_RANK_REQUEST:
    case SUMMONER_RANK_RECEIVE:
    case SUMMONER_RANK_ERROR:
    case FINISH_FETCHING:
    case SUMMONER_UPDATE:
      return {
        ...state,
        [action.region]: summonerDetailsBySummoner(state[action.region], action)
      };
    default:
      return state;
  }
};
